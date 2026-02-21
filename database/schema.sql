-- ============================================================================
-- INEKTRA SELF-OPTIMIZING SEO DATABASE SCHEMA
-- ============================================================================
-- This schema supports the self-optimizing website with:
-- - Page content versioning
-- - A/B testing
-- - Ranking tracking (Google Search Console + Sistrix)
-- - Automatic optimization queue
-- ============================================================================

-- ── 1. PAGE VERSIONS ────────────────────────────────────────────────────────
-- Stores different versions of page content for A/B testing and rollback
CREATE TABLE IF NOT EXISTS page_versions (
  id SERIAL PRIMARY KEY,
  page_slug VARCHAR(255) NOT NULL,
  version INT NOT NULL DEFAULT 1,
  
  -- SEO Metadata
  title TEXT NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Content (Structured as JSON for flexibility)
  content JSONB NOT NULL,
  -- Example structure:
  -- {
  --   "hero": { "headline": "...", "subheadline": "...", "cta": "..." },
  --   "sections": [ { "type": "text", "heading": "...", "body": "..." }, ... ],
  --   "faq": [ { "question": "...", "answer": "..." }, ... ]
  -- }
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT 'manual', -- 'manual', 'auto', 'ai'
  is_active BOOLEAN DEFAULT false,
  
  -- Performance tracking (filled after 14 days)
  performance_score FLOAT,
  avg_position FLOAT,
  clicks INT,
  impressions INT,
  ctr FLOAT,
  
  UNIQUE(page_slug, version)
);

CREATE INDEX idx_page_versions_slug ON page_versions(page_slug);
CREATE INDEX idx_page_versions_active ON page_versions(is_active);

-- ── 2. A/B TESTS ────────────────────────────────────────────────────────────
-- Manages A/B tests between different page versions
CREATE TABLE IF NOT EXISTS ab_tests (
  id SERIAL PRIMARY KEY,
  page_slug VARCHAR(255) NOT NULL,
  variant_a_id INT REFERENCES page_versions(id) ON DELETE CASCADE,
  variant_b_id INT REFERENCES page_versions(id) ON DELETE CASCADE,
  
  -- Test period
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP,
  
  -- Results
  winner CHAR(1), -- 'A', 'B', or NULL (ongoing)
  confidence_level FLOAT, -- Statistical confidence (0-1)
  
  -- Metrics
  variant_a_clicks INT DEFAULT 0,
  variant_b_clicks INT DEFAULT 0,
  variant_a_impressions INT DEFAULT 0,
  variant_b_impressions INT DEFAULT 0,
  
  status VARCHAR(20) DEFAULT 'running' -- 'running', 'completed', 'cancelled'
);

CREATE INDEX idx_ab_tests_slug ON ab_tests(page_slug);
CREATE INDEX idx_ab_tests_status ON ab_tests(status);

-- ── 3. SEO RANKINGS (Extended from existing schema) ────────────────────────
-- Tracks keyword rankings over time from GSC + Sistrix
CREATE TABLE IF NOT EXISTS seo_rankings (
  id SERIAL PRIMARY KEY,
  keyword VARCHAR(255) NOT NULL,
  page_slug VARCHAR(255), -- NULL if not ranking
  position FLOAT,
  url TEXT,
  date DATE NOT NULL,
  
  -- Search Console metrics
  clicks INT DEFAULT 0,
  impressions INT DEFAULT 0,
  ctr FLOAT,
  search_volume INT,
  
  -- Source
  source VARCHAR(20) DEFAULT 'gsc', -- 'gsc', 'sistrix'
  device VARCHAR(20) DEFAULT 'desktop', -- 'desktop', 'mobile'
  country VARCHAR(2) DEFAULT 'de',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(keyword, date, source, device)
);

CREATE INDEX idx_seo_rankings_keyword ON seo_rankings(keyword);
CREATE INDEX idx_seo_rankings_slug ON seo_rankings(page_slug);
CREATE INDEX idx_seo_rankings_date ON seo_rankings(date DESC);
CREATE INDEX idx_seo_rankings_position ON seo_rankings(position);

-- ── 4. MONITORED KEYWORDS ───────────────────────────────────────────────────
-- Keywords to track (auto + manual)
CREATE TABLE IF NOT EXISTS monitored_keywords (
  id SERIAL PRIMARY KEY,
  keyword VARCHAR(255) UNIQUE NOT NULL,
  target_page_slug VARCHAR(255), -- Intended target page
  priority INT DEFAULT 5, -- 1-10 priority score
  added_by VARCHAR(50) DEFAULT 'manual', -- 'manual', 'auto'
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_monitored_keywords_active ON monitored_keywords(is_active);
CREATE INDEX idx_monitored_keywords_priority ON monitored_keywords(priority DESC);

-- ── 5. OPTIMIZATION QUEUE ───────────────────────────────────────────────────
-- AI-suggested optimizations waiting for approval
CREATE TABLE IF NOT EXISTS optimization_queue (
  id SERIAL PRIMARY KEY,
  page_slug VARCHAR(255) NOT NULL,
  optimization_type VARCHAR(50) NOT NULL, -- 'title', 'meta', 'content', 'new_page'
  
  -- Proposed changes (JSON)
  proposed_change JSONB NOT NULL,
  -- Example:
  -- {
  --   "current": "Old Title",
  --   "proposed": "New Optimized Title | Brand",
  --   "reason": "Keyword 'XYZ' should be first",
  --   "expected_impact": "+5 positions"
  -- }
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT 'ai',
  
  -- Approval workflow
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'deployed'
  reviewed_by VARCHAR(50),
  reviewed_at TIMESTAMP,
  deployed_at TIMESTAMP,
  
  -- Results tracking (after deployment)
  performance_delta JSONB -- Changes in rankings after deployment
);

CREATE INDEX idx_optimization_queue_slug ON optimization_queue(page_slug);
CREATE INDEX idx_optimization_queue_status ON optimization_queue(status);
CREATE INDEX idx_optimization_queue_created ON optimization_queue(created_at DESC);

-- ── 6. OPTIMIZATION LOGS (Existing, kept for compatibility) ────────────────
CREATE TABLE IF NOT EXISTS optimization_logs (
  id SERIAL PRIMARY KEY,
  keyword VARCHAR(255),
  action_taken TEXT,
  ranking_at_time FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_optimization_logs_created ON optimization_logs(created_at DESC);

-- ── 7. VISIBILITY INDEX (Existing, kept for compatibility) ─────────────────
CREATE TABLE IF NOT EXISTS seo_visibility (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  value FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(domain, date)
);

CREATE INDEX idx_seo_visibility_date ON seo_visibility(date DESC);

-- ── 8. COMPETITOR TRACKING (Future) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS competitor_rankings (
  id SERIAL PRIMARY KEY,
  competitor_domain VARCHAR(255) NOT NULL,
  keyword VARCHAR(255) NOT NULL,
  position FLOAT,
  url TEXT,
  date DATE NOT NULL,
  
  UNIQUE(competitor_domain, keyword, date)
);

CREATE INDEX idx_competitor_rankings_keyword ON competitor_rankings(keyword);
CREATE INDEX idx_competitor_rankings_date ON competitor_rankings(date DESC);

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert initial monitored keywords (from kalibrieren-direkt.de analysis)
INSERT INTO monitored_keywords (keyword, priority, added_by) VALUES
  ('kalibrierservice', 10, 'manual'),
  ('messgeräte kalibrieren', 10, 'manual'),
  ('kalibrierung dienstleister', 9, 'manual'),
  ('vor ort kalibrierung', 9, 'manual'),
  ('mobile kalibrierung', 8, 'manual'),
  ('kalibrierlabor', 8, 'manual'),
  ('messmittel kalibrierung', 7, 'manual'),
  ('kalibrierung varel', 6, 'manual')
ON CONFLICT (keyword) DO NOTHING;

-- ============================================================================
-- VIEWS FOR EASY QUERYING
-- ============================================================================

-- Active page content (currently deployed versions)
CREATE OR REPLACE VIEW active_pages AS
SELECT 
  page_slug,
  title,
  meta_description,
  content,
  created_at,
  performance_score
FROM page_versions
WHERE is_active = true;

-- Low Hanging Fruits (Position 5-20 with traffic potential)
CREATE OR REPLACE VIEW low_hanging_fruits AS
SELECT 
  r.keyword,
  r.page_slug,
  r.position,
  r.url,
  r.search_volume,
  r.clicks,
  r.impressions,
  r.ctr,
  ROUND((r.search_volume::float / (r.position + 0.1)), 2) as priority_score
FROM seo_rankings r
WHERE 
  r.position BETWEEN 5 AND 20
  AND r.date = (SELECT MAX(date) FROM seo_rankings WHERE keyword = r.keyword)
ORDER BY priority_score DESC;

-- Pending optimizations (awaiting approval)
CREATE OR REPLACE VIEW pending_optimizations AS
SELECT 
  oq.id,
  oq.page_slug,
  oq.optimization_type,
  oq.proposed_change,
  oq.created_at,
  COUNT(r.keyword) as affected_keywords
FROM optimization_queue oq
LEFT JOIN seo_rankings r ON r.page_slug = oq.page_slug
WHERE oq.status = 'pending'
GROUP BY oq.id, oq.page_slug, oq.optimization_type, oq.proposed_change, oq.created_at
ORDER BY oq.created_at DESC;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

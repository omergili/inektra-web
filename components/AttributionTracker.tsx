'use client';

import { useEffect } from 'react';
import { initTracking } from '@/lib/tracking';

/**
 * Unsichtbare Komponente die beim ersten Seitenaufruf
 * Attribution-Daten (GCLID, UTM, Referrer) in einem Cookie speichert.
 */
export default function AttributionTracker() {
  useEffect(() => {
    initTracking();
  }, []);

  return null;
}

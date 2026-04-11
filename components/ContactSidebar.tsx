'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';
import EmailLink from '@/components/EmailLink';
import { trackConversion, trackPhoneConversion, trackLead } from '@/components/GoogleAdsTag';
import { getAttribution } from '@/lib/tracking';

export default function ContactSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    dataPrivacy: false,
  });
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('company', formData.company);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('message', formData.message);
      if (file) {
        body.append('file', file);
      }

      // Attribution-Daten aus Cookie anhängen
      const attrib = getAttribution();
      if (attrib) {
        body.append('_attrib', JSON.stringify(attrib));
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        trackConversion();
        trackLead();
        setFormData({ name: '', company: '', email: '', phone: '', message: '', dataPrivacy: false });
        setFile(null);
        setTimeout(() => setIsOpen(false), 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toggle Button (Mobile) - ORANGE & PROMINENT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-accent-500 text-white px-6 py-4 rounded-full shadow-xl hover:bg-accent-600 transition-all font-bold text-lg hover:scale-110"
      >
        {isOpen ? '✕ Schließen' : '✉️ Anfrage'}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-20 right-0 z-40 w-full lg:w-96 h-[calc(100vh-5rem)]
          bg-white border-l border-neutral-200 shadow-2xl
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          overflow-y-auto pointer-events-auto
        `}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Schnellanfrage
          </h3>
          <p className="text-sm text-neutral-600 mb-6">
            Senden Sie uns Ihre Anfrage oder laden Sie Ihre Messmittelliste hoch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <input
                type="text"
                id="quick-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Name*"
              />
            </div>

            {/* Firma */}
            <div>
              <input
                type="text"
                id="quick-company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Firma*"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                id="quick-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Telefon"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                id="quick-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="E-Mail*"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                id="quick-message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-500 resize-y"
                placeholder="Nachricht*"
              ></textarea>
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="quick-privacy"
                required
                checked={formData.dataPrivacy}
                onChange={(e) => setFormData({ ...formData, dataPrivacy: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 shrink-0"
              />
              <label htmlFor="quick-privacy" className="text-sm text-neutral-700 leading-snug">
                Ich habe die <a href="/datenschutz" target="_blank" className="text-primary-600 underline hover:text-primary-800 font-medium">Datenschutzerklärung</a> zur Kenntnis genommen.
              </label>
            </div>

            {/* File Upload */}
            <div>
              <p className="text-sm text-neutral-600 font-medium mb-1.5">Optional: Messmittel-Liste hochladen</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="file-upload"
                  accept=".xlsx,.xls,.pdf,.csv"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-neutral-100 border border-neutral-300 rounded-lg text-sm text-neutral-700 font-medium cursor-pointer hover:bg-neutral-200 transition-colors"
                >
                  Datei auswählen
                </label>
                <span className="text-sm text-neutral-500 truncate">
                  {file ? file.name : 'Keine ausgewählt'}
                </span>
              </div>
            </div>

            {/* Submit Button - RED like screenshot */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.dataPrivacy}
              className="w-full bg-accent-500 text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-accent-600 transition-all shadow-md hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Senden'}
            </button>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                ✓ Anfrage erfolgreich gesendet! Wir melden uns zeitnah.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                ✗ Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.
              </div>
            )}

            <p className="text-sm text-accent-600 font-medium">
              Wir melden uns in der Regel innerhalb eines Werktages.
            </p>
          </form>

          {/* Direct Contact */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-sm font-medium text-neutral-700 mb-3">Oder direkt kontaktieren:</p>
            <div className="space-y-2">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                onClick={() => trackPhoneConversion()}
                className="flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.contact.phone}
              </a>
              <EmailLink
                email={siteConfig.contact.email}
                className="flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteConfig.contact.email}
              </EmailLink>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop (Mobile) */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

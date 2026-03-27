export default function ServiceBanner() {
  return (
    <div className="bg-accent-500 text-white py-3 px-4 text-sm font-medium relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 flex items-center gap-2 flex-wrap">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          <strong>30.03. – 06.04.2026:</strong> Telefonisch nur eingeschränkt erreichbar. Bitte kontaktieren Sie uns per E-Mail an{' '}
          <a href="mailto:info@inektra.de" className="underline hover:text-white/90 font-bold">info@inektra.de</a>
        </span>
      </div>
    </div>
  );
}

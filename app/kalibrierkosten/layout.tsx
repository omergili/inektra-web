import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Kalibrierkosten – Preise & Preisliste',
  description: 'Kalibrierkosten auf einen Blick: Transparente Preise für Werkskalibrierung. Preisliste mit über 3.200 Gerätetypen durchsuchen.',
  keywords: ['kalibrierkosten', 'kalibrierung kosten', 'kalibrierung preise', 'werkskalibrierung preis', 'messgeräte kalibrierung kosten'],
  alternates: {
    canonical: 'https://inektra.de/kalibrierkosten',
  },
};

export default function KalibrierKostenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Kalibrierkosten' }]} />
      {children}
    </>
  );
}

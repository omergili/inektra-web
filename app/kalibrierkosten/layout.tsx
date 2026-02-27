import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalibrierkosten – Transparente Preise für Werkskalibrierung',
  description: 'Kalibrierkosten auf einen Blick: Faire, transparente Preise für Werkskalibrierung nach ISO-Normen. Durchsuchen Sie unsere Preisliste mit über 3.200 Gerätetypen.',
  keywords: ['kalibrierkosten', 'kalibrierung kosten', 'kalibrierung preise', 'werkskalibrierung preis', 'messgeräte kalibrierung kosten'],
  alternates: {
    canonical: 'https://kalibrierservice.com/kalibrierkosten',
  },
};

export default function KalibrierKostenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

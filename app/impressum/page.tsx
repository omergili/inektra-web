import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
          <p>
            {siteConfig.legal.company}<br />
            {siteConfig.contact.legal_address.street}<br />
            {siteConfig.contact.legal_address.city}<br />
            {siteConfig.contact.legal_address.country}
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Vertreten durch:</h3>
          <p>Geschäftsführer: {siteConfig.legal.ceo}</p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Kontakt:</h3>
          <p>
            Telefon: <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-blue-600 hover:underline">{siteConfig.contact.phone}</a><br />
            E-Mail: <a href={`mailto:${siteConfig.contact.email}`} className="text-blue-600 hover:underline">{siteConfig.contact.email}</a>
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Registereintrag:</h3>
          <p>
            Eintragung im Handelsregister.<br />
            Registergericht: {siteConfig.legal.registerCourt}<br />
            Registernummer: {siteConfig.legal.register}
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Umsatzsteuer:</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            {siteConfig.legal.vatId}
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Verantwortlich i.S.d. § 18 Abs. 2 MStV:</h3>
          <p>
            {siteConfig.legal.ceo}<br />
            {siteConfig.contact.legal_address.street}<br />
            {siteConfig.contact.legal_address.city}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
            Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen 
            zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. 
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. 
            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten 
            ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  );
}

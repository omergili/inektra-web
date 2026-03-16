import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import EmailLink from '@/components/EmailLink';
import PhoneLink from '@/components/PhoneLink';
import { CookieSettingsButton } from '@/components/CookieConsent';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 py-12">{/* pr-96 = Platz für ContactSidebar (384px) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/logo.png" 
              alt={siteConfig.brandName}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm mb-4">
              Professionelle Kalibrierung für Industrie und Labor. Präzise, schnell und deutschlandweit.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-xs text-gray-400">{siteConfig.contact.address.subtitle}</p>
              <p>{siteConfig.contact.address.street}</p>
              <p>{siteConfig.contact.address.city}</p>
              <p className="pt-2">
                <PhoneLink className="hover:text-white">
                  Tel: {siteConfig.contact.phone}
                </PhoneLink>
              </p>
              <p>
                <EmailLink email={siteConfig.contact.email} className="hover:text-white cursor-pointer" />
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-semibold mb-4 text-base">Leistungen</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kalibrierservice" className="hover:text-white transition-colors">
                  Kalibrierservice
                </Link>
              </li>
              <li>
                <Link href="/messgeraete-kalibrieren" className="hover:text-white transition-colors">
                  Messgeräte kalibrieren
                </Link>
              </li>
              <li>
                <Link href="/kalibrierkosten" className="hover:text-white transition-colors">
                  Kalibrierkosten
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-white font-semibold mb-4 text-base">Unternehmen</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ueber-uns" className="hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center md:text-left">
          <p>
            © {currentYear} {siteConfig.brandName}. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

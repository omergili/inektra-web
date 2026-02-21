import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/logo.png" 
              alt={siteConfig.brandName}
              width={180}
              height={90}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="hidden sm:flex items-center text-sm text-gray-700 hover:text-blue-600"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.contact.phone}
            </a>
            <Link
              href="/kontakt"
              className="bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all font-medium shadow-sm hover:shadow-md"
            >
              Angebot anfragen
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4 flex flex-wrap gap-4">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-700 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* Header bleibt full-width */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt={siteConfig.brandName}
              width={280}
              height={140}
              className="h-16 w-auto md:h-20"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-accent-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button + Hamburger */}
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="hidden sm:flex items-center text-sm text-gray-700 hover:text-accent-600"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.contact.phone}
            </a>
            <Link
              href="/kontakt"
              className="hidden sm:inline-flex bg-accent-500 text-white px-5 py-2.5 rounded-xl hover:bg-accent-600 transition-all font-bold shadow-sm hover:shadow-md"
            >
              Angebot anfragen
            </Link>

            {/* Hamburger Button (Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Dropdown) */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-100 pt-3">
            <div className="flex flex-col space-y-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-accent-600 font-medium px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center bg-accent-500 text-white px-5 py-3 rounded-xl hover:bg-accent-600 transition-all font-bold shadow-sm"
              >
                Angebot anfragen
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

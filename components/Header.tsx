'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, type NavItem } from '@/lib/config';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileSubmenu = (name: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === name ? null : name);
  };

  const closeAll = () => {
    setMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
    setOpenDropdown(null);
  };

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
          <nav ref={navRef} className="hidden md:flex space-x-2">
            {siteConfig.navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center text-gray-700 hover:text-accent-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-50 ${
                      openDropdown === item.name ? 'text-accent-600 bg-slate-50' : ''
                    }`}
                    aria-expanded={openDropdown === item.name}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-[220px] z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href!}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-gray-700 hover:text-accent-600 hover:bg-slate-50 transition-colors text-sm font-medium"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="text-gray-700 hover:text-accent-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  {item.name}
                </Link>
              )
            )}
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
              {siteConfig.navigation.map((item) =>
                item.children ? (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleMobileSubmenu(item.name)}
                      className={`w-full flex items-center justify-between text-gray-700 hover:text-accent-600 font-medium px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors ${
                        openMobileSubmenu === item.name ? 'text-accent-600 bg-slate-50' : ''
                      }`}
                      aria-expanded={openMobileSubmenu === item.name}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMobileSubmenu === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {openMobileSubmenu === item.name && (
                      <div className="ml-3 border-l-2 border-slate-200 pl-3 mt-1 mb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href!}
                            onClick={closeAll}
                            className="block text-gray-600 hover:text-accent-600 font-medium px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={closeAll}
                    className="text-gray-700 hover:text-accent-600 font-medium px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              )}
              <Link
                href="/kontakt"
                onClick={closeAll}
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

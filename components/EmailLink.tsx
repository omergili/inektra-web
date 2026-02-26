'use client';

import { useState } from 'react';

interface EmailLinkProps {
  email: string;
  className?: string;
  children?: React.ReactNode;
}

export default function EmailLink({ email, className = '', children }: EmailLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Versuche zuerst mailto: (falls Mailclient vorhanden)
    window.location.href = `mailto:${email}`;

    // Kopiere gleichzeitig in Zwischenablage
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback für ältere Browser
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <span className="relative inline-flex items-center gap-1">
      <a
        href={`mailto:${email}`}
        onClick={handleClick}
        className={className}
        title="Klicken zum Kopieren oder E-Mail öffnen"
      >
        {children || email}
      </a>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
          ✓ Kopiert!
        </span>
      )}
    </span>
  );
}

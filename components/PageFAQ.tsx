'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface PageFAQProps {
  faqs: FAQItem[];
  title?: string;
}

export default function PageFAQ({ faqs, title = "Häufige Fragen" }: PageFAQProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">{title}</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-accent-300 hover:shadow-lg transition-all duration-300"
            >
              <summary className="cursor-pointer font-bold text-lg text-slate-900 flex justify-between items-center">
                {faq.question}
                <svg
                  className="w-6 h-6 text-accent-600 transform group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

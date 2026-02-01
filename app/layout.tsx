import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains-mono' 
});

export const metadata: Metadata = {
  title: 'Quota — Forensic API Cost Monitoring & Runway Protection',
  description:
    'Quota is the forensic accounting dashboard for API cost monitoring. Track usage and costs across Stripe, OpenAI, Twilio, and AWS; detect zombie webhooks, runaway loops, and optimize spend.',
  keywords: [
    'API cost monitoring',
    'forensic accounting dashboard',
    'API sprawl',
    'cloud cost optimization',
    'OpenAI cost',
    'Stripe usage',
    'Twilio billing',
  ],
  openGraph: {
    title: 'Quota — Forensic API Cost Monitoring & Runway Protection',
    description:
      'Track API usage and cloud spend across Stripe, OpenAI, Twilio and AWS. Identify redundant calls, zombie webhooks and automatic kill-switches to protect your runway.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quota — Forensic API Cost Monitoring',
    description:
      'Reduce API spend and catch runaway loops. Join the Quota waitlist for early access.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        {/* Structured data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Quota",
          "url": "https://quota.live/",
          "description": "Forensic API cost monitoring and cloud spend optimization for startups.",
          "applicationCategory": "BusinessApplication",
          "provider": {
            "@type": "Organization",
            "name": "Quota"
          }
        }) }} />
        {children}
      </body>
    </html>
  );
}

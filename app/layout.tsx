import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Banquet Hall | Elegant Venue for Weddings, Receptions & Celebrations',
  description: 'A modern, elegant single-page website for Banquet Hall featuring event gallery, amenities, capacity guide, online booking form, marquee reviews, and venue location.',
  openGraph: {
    title: 'Banquet Hall | Elegant Venue for Weddings, Receptions & Celebrations',
    description: 'A modern, elegant single-page website for Banquet Hall featuring event gallery, amenities, capacity guide, online booking form, marquee reviews, and venue location.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banquet Hall | Elegant Venue for Weddings, Receptions & Celebrations',
    description: 'A modern, elegant single-page website for Banquet Hall featuring event gallery, amenities, capacity guide, online booking form, marquee reviews, and venue location.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

import '../index.css';

import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilWithQueryProvider from '@/components/templates/RecoilWithQueryProvider';
import ModalManager from '@/components/modal/ModalManager';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '리액트 템플릿',
  // description: '루틴온',
  // metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL || 'https://routineon.com'),
  // icons: {
  //     icon: '/favicon/logo.png',
  // },
  // openGraph: {
  //     images: [
  //         {
  //             url: `/images/share/weather-share.png`,
  //             width: 800,
  //             height: 400,
  //             alt: '루틴온 썸네일 이미지',
  //         },
  //     ],
  // },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body
        className={`flex flex-col overflow-y-auto w-full max-w-screen-md mx-auto h-screen ${inter.className}`}
      >
        <RecoilWithQueryProvider>
          {children}
          <ModalManager />
        </RecoilWithQueryProvider>
      </body>
    </html>
  );
}

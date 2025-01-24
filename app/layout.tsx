
import LayoutContainer from '@/components/layout-container';
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_Gothic } from 'next/font/google';
import MainLayoutWrapper from '@/components/main-layout-wrapper';
import localFont from 'next/font/local'

const notoSansGothic = Noto_Sans_Gothic({
  weight: '400',
  subsets: ['latin'],
})

const lexJoey = localFont({
  src: [
    {
      path: './fonts/Lex-Joey-Regular.woff',
      style: 'normal',
      weight: '400',
    },
    {
      path: './fonts/Lex-Joey-Bold.woff',
      style: 'normal',
      weight: '700',
    }
  ],
})

export const metadata: Metadata = {
  title: 'Lex auto lease Checkout',
  description: 'Lex autolease checkout page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexJoey.className} suppressHydrationWarning>
        <LayoutContainer>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </LayoutContainer>
      </body>
    </html>
  );
}

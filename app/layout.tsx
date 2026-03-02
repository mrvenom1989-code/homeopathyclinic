import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Dr. Mayank Raval | Advanced Homeopathy Clinic',
  description: 'Experience safe, natural, and effective homeopathy treatments for hair fall, skin disorders, respiratory issues, and chronic diseases by Dr. Mayank Raval.',
  keywords: 'Homeopathy doctor near me, Nearest homeopathic doctor, Homeopathy treatment, Homeopathic doctor, Homeopathic specialist doctor, Homeopathy clinic, Nearby homeopathy clinic, Homeopathy treatment near me, Homeopathy specialist',
  openGraph: {
    title: 'Dr. Mayank Raval | Advanced Homeopathy Clinic',
    description: 'Expert Homeopathic care for 100+ ailments including hair loss, skin conditions, and respiratory issues.',
    url: 'https://drmayankraval.com', // Placeholder URL
    siteName: 'Dr. Mayank Raval Homeopathy',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-clinic-cream text-gray-800`}>
        {children}
      </body>
    </html>
  )
}
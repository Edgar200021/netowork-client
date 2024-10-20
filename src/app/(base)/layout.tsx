import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='grid min-h-[100svh] grid-rows-[auto_1fr_auto] gap-y-8 sm:gap-y-[50px]'>
      <Header />
      <div className="box">{children}</div>
      <Footer />
    </div>
  )
}

import { Header } from '@/components/Header/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className="box">{children}</div>
    </>
  )
}

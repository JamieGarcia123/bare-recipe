import HeaderNav from './components/headerNav'
import Footer from './components/footer'
import './globals.css'
import'../app/home/home.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HeaderNav />
        {children}
        <Footer />
      </body>
    </html>
  )
}


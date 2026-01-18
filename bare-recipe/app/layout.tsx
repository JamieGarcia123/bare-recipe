import HeaderNav from './components/headerNav'
import Footer from './components/footer'
import './globals.css'
import'../app/home/home.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Bare Recipe | Easy Recipes. No ads, no frills, beginner cook to kid-friendly.</title>
        <meta name="description" content="No ads, no scrolling past essays — just the bare recipe. Easy, beginner-friendly, kid-friendly recipes with clear ingredients and simple steps." />
        <meta property="og:title" content="Bare Recipe | Easy Recipes Without the Annoying Ads" />
        <meta property="og:description" content="Cook without scrolling past pop-ups, videos, or life stories. Just clean, simple recipes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bare-recipe.com/" />
        <meta property="og:image" content="https://bare-recipe.com/recipe-book-svg.svg" />
              </head>
              <body>
        <HeaderNav />
        {children}
        <Footer />
      </body>
    </html>
  )
}


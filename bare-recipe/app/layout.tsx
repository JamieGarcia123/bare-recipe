import Script from "next/script";

import HeaderNav from './components/headerNav'
import Footer from './components/footer'
import './globals.css'
import './App.css'; 


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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

 
      </head>
      <body>
        <HeaderNav />
        {children}
        <Footer />
    </body>
    </html>
  )
}


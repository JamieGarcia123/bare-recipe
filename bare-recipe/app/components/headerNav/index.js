import Link from 'next/link'
import MobileNav from '../../components/mobileNav/index.js'
import Image from 'next/image'
import logo from '../../assets/images/bare-recipe-logo.svg'
import './HeaderNav.css'

function HeaderNav() {
 
 const navCategories = {
  'beginner-cook': 'Beginner',
  'sweet-treat': 'Sweets',
};


  return (

    <div className="head-container">
        <div className="head-content"> 
        <Link href="/"><Image
        id="logo"
        src={logo}
        alt="Bare Recipe"
        width={125}
        height={100}
        priority
      /></Link>
        <nav>  
          <div className='mobile-only'><MobileNav navCategories={navCategories}/></div>
         <div className='desktop-only'><Link href="/search">Search</Link>
          {Object.entries(navCategories).map(([slug, label]) => (
            <Link key={slug} href={`/category/${slug}`}>
              {label}
            </Link>
          ))}  </div>       
          </nav>
      </div>
    </div>
  )
}

export default HeaderNav

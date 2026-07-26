import Link from 'next/link'
import MobileNav from '../../components/mobileNav/index.js'
import Image from 'next/image'
import logo from '../../assets/images/bare-recipe-logo.svg'
import styles from './headernav.module.css'

function HeaderNav() {
 
 const navCategories = {
  'beginner-recipes': 'Beginner',
  'sweet-treat': 'Sweets',
  'quick-dinner': 'Quick Meals',
};


  return (

    <div className={styles.headContainer}>
        <div className={styles.headContent}> 
        <Link href="/"><Image
        id="logo"
        src={logo}
        alt="Bare Recipe"
        width={125}
        height={100}
        priority
      /></Link><Link href="https://www.facebook.com/profile.php?id=61587035770390" target="_blank"
>Follow us!!&nbsp;<i className="fa fa-facebook-f" aria-hidden="true"></i></Link>

        <nav className={styles.row}>  
          <div className={styles.mobileOnly}><MobileNav navCategories={navCategories}/></div>
          <div className={styles.desktopOnly} >  <Link href={`/blogs`}>
              Blog
            </Link>
          {Object.entries(navCategories).map(([slug, label]) => (
            <Link key={slug} href={`/category/${slug}`}>
              {label}
            </Link>
          ))} <Link className={styles.search} href="/search"><i className="fa fa-search"></i></Link></div>       
          </nav>
      </div>
    </div>
  )
}

export default HeaderNav

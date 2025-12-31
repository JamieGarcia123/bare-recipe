import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/images/bare-recipe-logo.svg'
import './HeaderNav.css'

function HeaderNav() {
  return (
    <div className="head-container">
      <Image
        id="logo"
        src={logo}
        alt="Bare Recipe"
        width={125}
        height={100}
        priority
      />

      <div className="head-content">
        <nav>
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
        </nav>
      </div>
    </div>
  )
}

export default HeaderNav

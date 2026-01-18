import Image from 'next/image';
import styles from './hero.module.css'

 function Hero({imageUrl, title, subText, showTitle}) {
    return  (
        <header className={styles.heroBg}>
        <Image
        src={imageUrl.src}
        alt="Header image for background of page"
        fill
        priority={true}  
        className={styles.heroBgImg}
        />
            {showTitle ? <div className={styles.grid1Col}>
                <h1>
                  {title}
                </h1>
                <p>{subText}</p>
        </div> : null }
        </header>
    )

}
export default Hero;
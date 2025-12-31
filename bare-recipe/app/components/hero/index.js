import './Hero.css'

 function Hero({imageUrl, title, subText, showTitle}) {
    return  (
        <header style={{backgroundImage: `url(${imageUrl.src})`}} className="hero-bg">
            {showTitle ? <div className="grid-1-col">
                <h1>
                  {title}
                </h1>
                <p>{subText}</p>
        </div> : null }
        </header>
    )

}
export default Hero;
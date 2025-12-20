import './Hero.css'

 function Hero({imageUrl, title, subText}) {
    return  (
        <header style={{backgroundImage: `url(${imageUrl.src})`}} className="hero-bg">
            <div className="grid-1-col">
                <h1>
                  {title}
                </h1>
                <p>{subText}</p>
        </div>
        </header>
    )

}
export default Hero;
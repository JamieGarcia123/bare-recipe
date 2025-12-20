import './footer.css'

function Footer(){
    return(
        <div className='footer-container'>
            <div className='footer-content'>
                <div></div>
                <div  style={{paddingBottom: '25px'}}>
                   <p> Only Recipes... From your fridge/freezer to your plate!</p> 
                   <br/>
                   <p><small>2025</small> Creation and design by <a target="_blank" rel='nofollow' href="https://jamiegarcia.dev">jamiegarcia.dev</a></p>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Footer;
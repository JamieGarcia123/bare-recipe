import { urlFor } from "../../sanity/client";

import Image from 'next/image';
import './ResultsCard.css'

function Card({_key, name, imageUrl, description, ingredients, prepTime, cookTime, isVegan, isGlutenFree, isLowCarb, isVegetarian}){
    return (
        <div key={_key} className="card-container">
            <div className='image-container'>
            <Image src={urlFor(imageUrl)} width={250} alt={"Recipe image from results"} height={250}/>
            <div className='badge-container'>
            {isVegan ? <span id="vegan" className='recipe-badge'>Vegan</span> : null}
            {isGlutenFree ? <span id="gf" className='recipe-badge'>Gluten Free</span> : null}
            {isVegetarian ? <span id="veg" className='recipe-badge'>Vegetarian</span> : null}
            {isLowCarb ? <span id="lowC" className='recipe-badge'>Low Carb</span> : null}
            </div></div>
            <div className="card-content">
                <h3 id="cardName">{name}</h3>
                <p className="card-description">{description}</p>
                <div style={{display: 'flex', justifyContent: 'space-between' }}><p><b>Preptime:</b> {prepTime}m</p><p><b>Cooktime:</b> {cookTime}m</p></div>
                {/* <ul className="ingredient-ul">
                {ingredients?.slice(0, 3).map(i => (
                    <li key={i.id}>{i.name}</li>
                ))}
                </ul> */}
                <button id="viewmore">View Recipe</button>
            </div>
        </div>
    )
}

export default Card;
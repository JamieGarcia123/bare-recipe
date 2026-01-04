import { client, urlFor } from './client'

export async function fetchRecipes() {
  const query = `*[_type == "recipe"]{
 _id,
  title,
  "slug": slug.current,
  image,
  ingredients[]{name, amount, measurement},
  categories,
  snippet,
  isGlutenFree,
  isVegan,
  isVegetarian,
  isLowCarb,
  prepTime,
  cookTime,
  gallery[]{
  _key,
  alt,
  caption,
  asset
},
  "goesWellWith": goesWellWith[]->{
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }
  }`;

  return await client.fetch(query);
}



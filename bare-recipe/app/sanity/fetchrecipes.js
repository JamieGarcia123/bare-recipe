import { client, urlFor } from './client'

export async function fetchRecipes() {
  const query = `*[_type == "recipe"]{
 _id,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  ingredients[]{name, amount, measurement},
  categories,
  snippet,
  isGlutenFree,
  isVegan,
  isVegetarian,
  isLowCarb,
  prepTime,
  cookTime,
  "goesWellWith": goesWellWith[]->{
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }
  }`;

  return await client.fetch(query);
}



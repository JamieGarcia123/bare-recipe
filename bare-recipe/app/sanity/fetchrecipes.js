import { client, urlFor } from './client'

export async function fetchRecipes() {
  const query = `*[_type == "recipe"] | order(_createdAt desc){
 ...,
    "slug": slug.current,
    
    
  }`

  return await client.fetch(query);
}



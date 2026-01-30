import { client, urlFor } from './client'

export async function fetchRecipes() {
  const query = `*[_type == "recipe"]{
 ...,
    "slug": slug.current,
    
  }`

  return await client.fetch(query);
}



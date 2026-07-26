import { client, urlFor } from './client'

export async function fetchblogs() {
  const query = `*[_type == "cookingTips"]{
 ...,
    "slug": slug.current,
    
    
  }`

  return await client.fetch(query);
}



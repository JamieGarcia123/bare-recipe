import { client, urlFor } from './client'

export async function fetchblogs() {
  const query = `*[_type == "cookingTips"]  | order(_createdAt desc){
 ...,
    "slug": slug.current,
    
    
  }`

  return await client.fetch(query);
}



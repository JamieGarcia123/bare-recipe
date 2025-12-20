import { client } from './client'

export async function fetchSauces() {
  const query = `*[_type == "sauce"]{
   ...,
    "slug": slug.current,
    
  }`
  return await client.fetch(query)
}


import { client } from './client'

export async function fetchSauces() {
  const query = `*[_type == "sauce" ]| order(_createdAt desc){
   ...,
    "slug": slug.current,
    
  }`
  return await client.fetch(query)
}


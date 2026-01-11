import { client } from './client'


async function migratePostsToRecipes() {
  const posts = await client.fetch(`*[_type == "post"]{_id}`)
  for (const post of posts) {
    await client
      .patch(post._id)
      .set({ _type: "recipe" })
      .commit()
  }
}

migratePostsToRecipes()
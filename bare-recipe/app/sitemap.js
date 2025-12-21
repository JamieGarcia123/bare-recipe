import { client } from "@/sanity/client";

export default async function sitemap() {
  // Fetch recipes
  const recipes = await client.fetch(`
    *[_type == "recipe"]{
      slug,
      _updatedAt
    }
  `);

  // Fetch sauces
  const sauces = await client.fetch(`
    *[_type == "sauce"]{
      slug,
      _updatedAt
    }
  `);

  const recipeUrls = recipes.map((item) => ({
    url: `https://www.bare-recipe.com/recipe/${item.slug.current}`,
    lastModified: item._updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const sauceUrls = sauces.map((item) => ({
    url: `https://www.bare-recipe.com/sauce/${item.slug.current}`,
    lastModified: item._updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.bare-recipe.com",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.bare-recipe.com/recipes",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.bare-recipe.com/sauces",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...recipeUrls,
    ...sauceUrls,
  ];
}

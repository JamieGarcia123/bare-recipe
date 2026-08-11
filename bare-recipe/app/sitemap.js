export const dynamic = "force-static";
export const revalidate = 3600;


import { client } from "./sanity/client";

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

    // Fetch sauces
  const blogs = await client.fetch(`
    *[_type == "cookingTips"]{
      slug,
      _updatedAt
    }
  `);

  const recipeUrls = recipes.map((item) => ({
    url: `https://bare-recipe.com/recipe/${item.slug.current}/`,
    lastModified: item._updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const sauceUrls = sauces.map((item) => ({
    url: `https://bare-recipe.com/sauce/${item.slug.current}/`,
    lastModified: item._updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
    const blogUrls = blogs.map((item) => ({
    url: `https://bare-recipe.com/blog/${item.slug.current}/`,
    lastModified: item._updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: "https://bare-recipe.com",
      changeFrequency: "weekly",
      priority: 1,
    },
      {
      url: "https://bare-recipe.com/search/",
      changeFrequency: "weekly",
      priority: 1,
    },     {
      url: "https://bare-recipe.com/category/beginner-recipes/",
      changeFrequency: "weekly",
      priority: 1,
    },
       {
      url: "https://bare-recipe.com/category/sweet-treat/",
      changeFrequency: "weekly",
      priority: 1,
    },
       {
      url: "https://bare-recipe.com/category/quick-dinner/",
      changeFrequency: "weekly",
      priority: 1,
    },
    ...recipeUrls,
    ...sauceUrls,
    ...blogUrls
  ];
}

import Link from 'next/link';
import Head from 'next/head';
import { client, urlFor } from '../../sanity/client';
import Hero from '../../components/hero';
import Card from '../../components/resultsCard';
import heroUrl from '../../assets/images/blank-recipe.webp';
import './Search.css';
  

export async function generateMetadata({ params }) {
  const {slug}  = await params;
  if (!slug) {
    return {
      title: "Recipe Not Found | Bare Recipe",
      description: "No recipe slug provided",
      openGraph: {
        title: "Recipe Not Found | Bare Recipe",
        description: "No recipe slug provided",
        images: [
          { url: '/default-og-image.jpg', 
            width: 1200, 
            height: 630 
          }
        ],
      },
      // alternates: {
      //   canonical: `https://bare-recipe.com/category/${slug}/`,
      // },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
  const query = `*[_type == "category" && slug.current == $slug][0]{
   
  }`;

  const recipe = await client.fetch(query, { slug });
  if (!recipe) {
    return {
      title: `Category Not Found | Bare Recipe`,
      description: `Oops! This category does not exist.`,
      openGraph: {
        title: `Category Not Found | Bare Recipe`,
        description: `Oops! This recipe does not exist.`,
        images: [{ url: '/default-og-image.jpg', width: 1200, height: 630 }],
      },
    };
  }

  // const imageUrl = recipe.image ? urlFor(recipe.image) : '/default-og-image.jpg';

  return {
    title: `Category | Bare Recipe`,
    description: "Find exceiting recipes for this categor!y",
    openGraph: {
      title: `Category Recipes | Bare Recipe`,
      description: "Find",
      // images: [
      //   {
      //     url: imageUrl,
      //     width: 1200,
      //     height: 630,
      //   },
      // ],
    },  
    alternates: {
        canonical: `https://bare-recipe.com/category/${slug}/`,
      },
      robots: {
        index: true,
        follow: true,
      },
  };
}

export async function generateStaticParams() {
  const categories = await client.fetch(`
  array::unique(*[_type == "recipe"].categories[])
`);


  return categories
    .filter(c => typeof c === "string" && c.length > 0)
    .map(c => ({
      slug: c.toLowerCase().replace(/\s+/g, '-'),
    }));
}

const categoryMap = {
  'beginner-cook': 'Beginner Cook',
  'sweet-treat': "Sweet Treat",
};

export default async function Category({ params }) {
  const { slug } = await params;

  const category = categoryMap[slug];

  if (!category) {
    return <p>Category not found</p>;
  }

  const query = `
    *[_type == "recipe" && $category in categories]{
      _id,
      title,
      snippet,
      image,
      categories,
      isGlutenFree,
      isVegan,
      isVegetarian,
      isLowCarb,
      ingredients,
      "slug": slug.current,
      cookTime,
      prepTime
    }
  `;

  const recipes = await client.fetch(query, {category });

  if (!recipes.length) {
    return (<p>No recipes found for this category.</p>);
  }

  return (
    <>
      <Hero imageUrl={heroUrl} showTitle={true} title={`${category}`} subText={`Looking for ${category} ideas? Check out these recipes! Easy to follow, no ads, no lag!`}/>
      <section className="results-grid">
        {recipes.map((item) => (
          <Link key={item._id} href={`/recipe/${item.slug}`}>
            <Card
              name={item.title}
              imageUrl={urlFor(item.image)}
              description={item.snippet}
              isGlutenFree={item.isGlutenFree}
              isVegan={item.isVegan}
              isVegetarian={item.isVegetarian}
              isLowCarb={item.isLowCarb}
              ingredients={item.ingredients}
              prepTime={item.prepTime}
              cookTime={item.cookTime}
            />
          </Link>
        ))}
      </section>
    </>
  );
}

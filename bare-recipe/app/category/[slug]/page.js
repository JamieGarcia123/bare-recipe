import Link from 'next/link';
import { client } from '../../sanity/client';
import Hero from '../../components/hero';
import Card from '../../components/resultsCard';
import heroUrl from '../../assets/images/blank-recipe.webp';
import './category.css';

const categoryMap = {
  beginner: {
    label: 'Beginner',
    seoTitle: 'Easy Beginner Recipes',
    seoDescription:
      'Simple, easy recipes for beginners with step-by-step instructions and minimal ingredients.',
  },
    'beginner-recipes': {      label: 'Beginner',
    seoTitle: 'Easy Beginner Recipes',
    seoDescription: 'Simple recipes for beginners.',
  },

  'sweet-treat': {
    label: 'Sweet Treat',
    seoTitle: 'Easy Dessert Recipes & Sweet Treats',
    seoDescription:
      'Quick and easy dessert recipes, from cookies to no-bake treats.',
  },
  'quick-dinner': {
    label: 'Quick Dinner',
    seoTitle: 'Easy Recipes Under 30 Minutes',
    seoDescription:
      'Quick and easy recipes you can make in under 30 minutes. Perfect for busy weeknights.',
  },
};

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categoryMap[slug];

  if (!category) {
    return {
      title: 'Category Not Found | Bare Recipe',
      description: "The requested category doesn't exist.",
    };
  }

  return {
    title: `${category.seoTitle} | Bare Recipe`,
    description: category.seoDescription,
    openGraph: {
      title: `${category.seoTitle} | Bare Recipe`,
      description: category.seoDescription,
      images: [{ url: '/default-og-image.jpg', width: 1200, height: 630 }],
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

  const recipes = await client.fetch(query, {
    category: category.label,
  });

  if (!recipes.length) {
    return <p>No recipes found for this category.</p>;
  }

  return (
    <>
      <Hero
        imageUrl={heroUrl}
        showTitle={true}
        title={category.seoTitle}
        subText={category.seoDescription}
      />
      <section className="results-grid">
        {recipes.map((item) => (
          <Link key={item._id} href={`/recipe/${item.slug}`}>
            <Card
              name={item.title}
              imageUrl={item.image}
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
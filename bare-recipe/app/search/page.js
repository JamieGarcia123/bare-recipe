import SearchClient from "./SearchClient"

export async function generateMetadata() {

  const FALLBACK_IMAGE = 'https://bare-recipe.com/blank-recipe.jpg';


  const ogImage = FALLBACK_IMAGE;

  return {
    title: 'Search Our Easy Recipes | Bare Recipe',
    description: 'Easy recipes for you or your family without the annoying ads, frills, stories.',
    openGraph: {
      title: 'Search Our Easy Recipes | Bare Recipe',
      description: 'Easy recipes for you or your family without the annoying ads, frills, stories.',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: 'https://bare-recipe.com/search/',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
export default function Search() {
  return <SearchClient/>
}
import BlogClient from "./BlogClient"

export async function generateMetadata() {

  const FALLBACK_IMAGE ='https://bare-recipe.com/blank-recipe.jpg';

  const ogImage = FALLBACK_IMAGE;

  return {
    title: 'Home Cooking Tips, Guides, Ideas and More!',
    description: 'Easy recipes for you or your family without the annoying ads, frills, stories.',
    openGraph: {
      title: 'Bare Recipe',
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
      canonical: 'https://bare-recipe.com/blogs/',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
export default function Blogs() {
  return <BlogClient/>
}
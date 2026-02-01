import Hero from '../../components/hero';
import { client, urlFor } from '../../sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import PrintButton from '../../components/button/printbutton.js';
import { decimalToFraction } from '../../assets/helpers/helpers';
import "./detail.css"; 
import heroImage from "../../assets/images/emptykitchcounter.webp";
import GalleryCarousel from '../../components/gallery/index.js';
import RandomCards from '../../components/randomCard';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const FALLBACK_IMAGE =
    'https://bare-recipe.com/blank-recipe.jpg';

  if (!slug) {
    return {
      title: 'Recipe Not Found | Bare Recipe',
      description: 'No recipe slug provided',
      openGraph: {
        title: 'Recipe Not Found | Bare Recipe',
        description: 'No recipe slug provided',
        images: [
          {
            url: FALLBACK_IMAGE,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }

  const query = `*[_type == "recipe" && slug.current == $slug][0]{
    seoTitle,
    seoDescription,
    image
  }`;

  const sauce = await client.fetch(query, { slug });

  const ogImage =
    sauce?.image?.asset
      ? urlForOG(recipe.image)
          .width(1200)
          .height(630)
          .format('jpg')
          .url()
      : FALLBACK_IMAGE;

  return {
    title: recipe?.seoTitle || 'Bare Recipe',
    description: recipe?.seoDescription || 'Easy recipes without the annoying ads',
    openGraph: {
      title: recipe?.seoTitle || 'Bare Recipe',
      description: recipe?.seoDescription || 'Easy recipes without the annoying ads',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `https://bare-recipe.com/sauce/${slug}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const query = `*[_type == "recipe"]{ "slug": slug.current }`;
  const recipes = await client.fetch(query);
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function Detail({ params }) {
  const {slug}  = await params;

  const query = `*[_type == "recipe" && slug.current == $slug][0]{
    ...,     
    slug
    }`;

  const recipe = await client.fetch(query, { slug });
  if (!recipe) {
    return (
      <p style={{ padding: '2rem', textAlign: 'center' }}>
        UH-OH!!! This recipe sheet seems to have fallen off the counter!
      </p>
    );
  }

  return (
    <>
      <Hero
        title={recipe.title}
        imageUrl={heroImage}
        showTitle={false}
      />
      <section className="section-grid">
        <div className="sectionCol1">
            <GalleryCarousel  featuredImage={urlFor(recipe.image)}
            images={recipe.gallery} /> 
          <h1>{recipe.title}</h1>
          <h2>{recipe.snippet}</h2>
          <PrintButton/>
        </div>
        <div className="timeRow">
          <p>Cook time: {recipe.cookTime} mins</p>

          <p>Prep time: {recipe.prepTime} mins</p>
        </div>
        <div className="ingredientCol">
          <h3>Ingredients</h3>
          {recipe.ingredients?.length ? (
            <ul>
              {recipe.ingredients.map((item, i) => (
                <li key={i} style={{ textTransform: 'capitalize' }}>
                  <strong>{item.name}</strong>:{' '}
                  {decimalToFraction(item.amount)} {item.measurement}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ingredients found.</p>
          )}
        </div>
        <div className="ingredientCol">
          <h3>Instructions</h3>
          {recipe.instructions?.length ? (
            <ol>
              {recipe.instructions.map((step, i) => (
                <li key={i} style={{ textTransform: 'capitalize' }}>
                  <strong>Step {i + 1}:</strong> {step}
                </li>
              ))}
            </ol>
          ) : (
            <p>
              Erm… looks like Grandma’s instructions were not written
              down. Let’s wing it.
            </p>
          )}
        </div>
      </section>
      {recipe.goesWellWith?.length > 0 && (
        <aside className="sauce-section">
          <h3>Try This With</h3>
          <p>Sauces that pair well with this recipe! Look like a master chef with these combinations to complete your meal!</p>
          <div className="sauce-grid">
            {recipe.goesWellWith.map((sauce, i) => (
              <div 
              key={sauce._id ?? `sauce-${i}`} 
              className="sauce-card">
                <Link
                  href={`/sauce/${sauce.slug}`}
                  className="sauce-link"
                >
                  <Image
                    src={sauce.imageUrl}
                    alt={sauce?.title || 'sauce repice card'}
                    width={250}
                    height={250}
                    className="sauce-image"
                  />
                  <h4>{sauce.title}</h4>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      )}
      <RandomCards/>
    </>
  );
}

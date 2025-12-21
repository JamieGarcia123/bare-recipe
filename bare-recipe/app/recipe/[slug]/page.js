import Hero from '../../components/hero';
import Head from 'next/head';
import { client, urlFor } from '../../sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import PrintButton from '../../components/button/printbutton.js';
import { decimalToFraction } from '../../assets/helpers/helpers';
import "./detail.css"; 
import heroImage from "../../assets/images/emptykitchcounter.webp";

export async function generateStaticParams() {
  const query = `*[_type == "recipe"]{ "slug": slug.current }`;
  const recipes = await client.fetch(query);
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}


export async function generateMetadata({ params }) {
  const { slug } = params;

  const query = `*[_type == "recipe" && slug.current == $slug][0]{
    title,
    snippet,
    image
  }`;

  const recipe = await client.fetch(query, { slug });
const imageUrl = recipe.image ? imageUrlFor(recipe.image).url() : '/default-og-image.jpg';

  return {
    title: `${recipe.title} | Bare Recipe`,
    description: recipe.snippet,
    openGraph: {
      title: `${recipe.title} | Bare Recipe`,
      description: recipe.snippet,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Detail({ params }) {
  const { slug } = await params;

  const query = `*[_type == "recipe" && slug.current == $slug][0]{
    title,
    snippet,
    image,
    slug,
    cookTime,
    prepTime,
    ingredients[] {
      name,
      amount,
      measurement
    },
    instructions,
    goesWellWith[]->{
      title,
      _id,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }
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
      />

      <section className="section-grid">
        <div className="sectionCol1">
          {recipe.image && (
            <Image
              width={800}
              height={400}
              className="detail-image"
              src={urlFor(recipe.image)}
              alt={recipe.title}
            />
          )}

          <h2>{recipe.title}</h2>
          <p>{recipe.snippet}</p>
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
                <li key={i}>
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

          <div className="sauce-grid">
            {recipe.goesWellWith.map((sauce) => (
              <div key={sauce._id} className="sauce-card">
                <Link
                  href={`/sauce/${sauce.slug}`}
                  className="sauce-link"
                >
                  <Image
                    src={sauce.imageUrl}
                    alt={sauce.title}
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
    </>
  );
}

import Image from 'next/image';
import Hero from "../../components/hero";
import { client, urlFor, urlForOG } from "../../sanity/client";
import PrintButton from '../../components/button/printbutton.js'
import detailImage from '../../assets/images/emptykitchcounter.webp'
import { decimalToFraction } from '../../assets/helpers/helpers'
import './saucedetail.css';
import RandomCards from '../../components/randomCard';


// 2️⃣ Generate dynamic metadata for each recipe page
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const FALLBACK_IMAGE =
    'https://bare-recipe.com/blank-recipe.jpg';

  if (!slug) {
    return {
      title: 'Sauce Not Found | Bare Recipe',
      description: 'No sauce slug provided',
      openGraph: {
        title: 'Sauce Not Found | Bare Recipe',
        description: 'No sauce slug provided',
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

  const query = `*[_type == "sauce" && slug.current == $slug][0]{
    seoTitle,
    seoDescription,
    image
  }`;

  const sauce = await client.fetch(query, { slug });

  const ogImage =
    sauce?.image?.asset
      ? urlForOG(sauce.image)
          .width(1200)
          .height(630)
          .format('jpg')
          .url()
      : FALLBACK_IMAGE;

  return {
    title: sauce?.seoTitle || 'Bare Recipe',
    description: sauce?.seoDescription || 'Easy recipes without the annoying ads',
    openGraph: {
      title: sauce?.seoTitle || 'Bare Recipe',
      description: sauce?.seoDescription || 'Easy recipes without the annoying ads',
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
  const query = `*[_type == "sauce"]{ "slug": slug.current }`;
  const saucees = await client.fetch(query);

  return saucees.map((sauce) => ({
    slug: sauce.slug,
  }));
}

export default async function SauceDetail({ params}) {
  const {slug}  = await params;  
        const query = `*[_type == "sauce" && slug.current == $slug][0]{
          ...,
            slug,
            image{
            ...,
            asset->
          },
        }`;
       
  const sauce = await client.fetch(query, { slug });
  
  if (!sauce) {
    return (
    <p>Loading...
      UH-OH!!! We licked the rest of the sauce out of the bowl... sorry, will be right back with more!! 
    </p>
    );
  }

  return (
    <>

      <Hero title={sauce.title} imageUrl={detailImage} showTitle={false}/>
      <section className="section-grid">
        <div className="sectionCol1">
          <Image 
          className="detail-image" 
          width={800} 
          height={400} 
          alt={sauce.title} 
          src={urlFor(sauce.image)}/>
          <h1>{sauce.title}</h1>
          <h2>{sauce.snippet}</h2>
          <PrintButton/>
        </div>
        <div className="timeRow">
          <p>Cook time: {sauce.cookTime} mins</p>
          <p>Prep time: {sauce.prepTime} mins</p>
        </div>
        <div className="ingredientCol">
        <h3>Ingredients</h3>
        {sauce.ingredients && sauce.ingredients.length > 0 ? (
        <ul>
            {sauce.ingredients.map((item, index) => (
           <li style={{textTransform: 'capitalize'}} key={index}>
                <strong>{item.name}</strong>:
                {' '}
                {decimalToFraction(parseFloat(item.amount))} {item.measurement}
            </li>
            ))}
        </ul>
        ) : (
        <p>No ingredients found.</p>
        )}
        </div>
        <div className="ingredientCol">
          <h3>Instructions</h3>
            {sauce.instructions && sauce.instructions.length > 1 ? (
                <ol>
                {sauce.instructions.map((step, index) => (
                    <li key={index}><strong>Step {index + 1}:</strong><span style={{ textTransform: 'capitalize' }}> {step} </span></li>
                ))}
                </ol>
            ) : (
                <p>Erm, looks like Grandma's instructions were not written down.... Let's just wing it.</p>
            )}
        </div>
      </section>
      <RandomCards/>
    </>
  );
}

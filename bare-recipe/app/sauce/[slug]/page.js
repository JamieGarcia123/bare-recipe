import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Hero from "../../components/hero";
import { client, urlFor } from "../../sanity/client";
import PrintButton from '../../components/button/printbutton.js'
import detailImage from '../../assets/images/emptykitchcounter.webp'
import { decimalToFraction } from '../../assets/helpers/helpers'
import './saucedetail.css';


// // 2️⃣ Generate dynamic metadata for each recipe page
// export async function generateMetadata({ params }) {
//   const {slug} =  params;

//   if (!slug) {
//     return {
//       title: "Sauce Not Found | Bare Recipe",
//       description: "No sauce slug provided",
//       openGraph: {
//         title: "Sauce Not Found | Bare Recipe",
//         description: "No Sauce slug provided",
//         images: [{ url: '/default-og-image.jpg', width: 1200, height: 630 }],
//       },
//     };
//   }

//   const query = `*[_type == "sauce" && slug.current == $slug][0]{
//     title,
//     snippet,
//     image
//   }`;

//   const sauce = await client.fetch(query, { slug });

//   if (!sauce) {
//     return {
//       title: `Sauce Not Found | Bare Recipe`,
//       description: `Oops! This sauce does not exist.`,
//       openGraph: {
//         title: `Sauce Not Found | Bare Recipe`,
//         description: `Oops! This sauce does not exist.`,
//         images: [{ url: '/default-og-image.jpg', width: 1200, height: 630 }],
//       },
//     };
//   }

//   const imageUrl = sauce.image ? urlFor(sauce.image) : '/default-og-image.jpg';

//   return {
//     title: `${sauce.title} | Bare Recipe`,
//     description: sauce.snippet,
//     openGraph: {
//       title: `${sauce.title} | Bare Recipe`,
//       description: sauce.snippet,
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//   };
// }

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
          "imageUrl": image.asset->url,
             slug
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

      <Hero title={sauce.title} imageUrl={detailImage}/>
      <section className="section-grid">
        <div className="sectionCol1">
          <Image 
          className="detail-image" 
          width={800} 
          height={400} 
          alt={sauce.title} 
          src={urlFor(sauce.image)}/>
          <h2>{sauce.title}</h2>
          <p>{sauce.snippet}</p>
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
                    <li key={index}><strong>Step {index + 1}:</strong> {step} </li>
                ))}
                </ol>
            ) : (
                <p>Erm, looks like Grandma's instructions were not written down.... Let's just wing it.</p>
            )}
        </div>
      </section>
    </>
  );
}


'use client'
import Hero from '../components/hero';
// import { client, urlFor, urlForOG } from '../../sanity/client';
import Link from 'next/link';
import Image from 'next/image';
// import PrintButton from '../../components/button/printbutton.js';
// import { decimalToFraction } from '../../assets/helpers/helpers';
// import "./detail.css"; 
import heroImage from "../assets/images/emptykitchcounter.webp";
// import GalleryCarousel from '../../components/gallery/index.js';
// import RandomCards from '../../components/randomCard';

// export async function generateMetadata({ params }) {
//   const { slug } = await params;

//   const FALLBACK_IMAGE =
//     'https://bare-recipe.com/blank-recipe.jpg';

//   if (!slug) {
//     return {
//       title: 'Blogs Not Found | Bare Recipe',
//       description: 'No Blog slug provided',
//       openGraph: {
//         title: 'Recipe Not Found | Bare Recipe',
//         description: 'No recipe slug provided',
//         images: [
//           {
//             url: FALLBACK_IMAGE,
//             width: 1200,
//             height: 630,
//           },
//         ],
//       },
//     };
//   }

//   const query = `*[_type == "cookingTips" && slug.current == $slug][0]{
//     seoTitle,
//     seoDescription,
//     image {
//     asset->
//   }
//   }`;

//   const blog = await client.fetch(query, { slug });

//   const ogImage =
//     blog?.image?.asset
//       ? urlForOG(blog.image)
//           .width(1200)
//           .height(630)
//           .format('jpg')
//           .url()
//       : FALLBACK_IMAGE;

//   return {
//     title: blog?.seoTitle || 'Bare Recipe',
//     description: blog?.seoDescription || 'Easy recipes without the annoying ads',
//     openGraph: {
//       title: blog?.seoTitle || 'Bare Recipe',
//       description: blog?.seoDescription || 'Easy recipes without the annoying ads',
//       images: [
//         {
//           url: ogImage,
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//     alternates: {
//       canonical: `https://bare-recipe.com/cooking-tips/${slug}/`,
//     },
//     robots: {
//       index: true,
//       follow: true,
//     },
//   };
// }

// export async function generateStaticParams() {
//   const query = `*[_type == "cookingTips"]{ "slug": slug.current }`;
//   const cookingTips = await client.fetch(query);
//   return cookingTips.map((cookingTip) => ({
//     slug: cookingTip.slug,
//   }));
// }


function BlogList() {
  return (
    <>
      <Hero
        title="Cooking Blog and Tips"
        imageUrl={heroImage}
        showTitle={true}
        subText="Bare Recipe has easy beginner recipes for people who just want clear, simple recipes without ads, popups, or life stories. We focus on fast, readable instructions so you can start cooking immediately…"
      />
      <section className="">
        <div className="wrapper">
          <div className="container-new">
           <p>Blog cards</p>
          </div>
        </div>
    </section>
    </>
  );
}

export default BlogList;

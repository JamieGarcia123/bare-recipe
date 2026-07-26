
import Hero from '../../components/hero';
import { client, urlFor, urlForOG } from '../../sanity/client';
import { PortableText } from "@portabletext/react";
import Image from 'next/image';

import Link from 'next/link';
import styles from "./blogDetail.module.css"; 
import heroImage from "../../assets/images/emptykitchcounter.webp";

export async function generateMetadata({ params }) {
  const { slug } = await params;
console.log('SLUG:', slug);

  const FALLBACK_IMAGE =
    'https://bare-recipe.com/blank-recipe.jpg';

  if (!slug) {
    return {
      title: 'Blog article not found | Bare Recipe',
      description: 'No blog slug provided',
      openGraph: {
        title: 'Blog article Not Found | Bare Recipe',
        description: 'No blog slug provided',
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

  const query = `*[_type == "cookingTips" && slug.current == $slug][0]{
    seoTitle,
    seoDescription,
    image {
    asset->
  }
  }`;

  const blog = await client.fetch(query, { slug });

  const ogImage =
    blog?.image?.asset
      ? urlForOG(blog.image)
          .width(1200)
          .height(630)
          .format('jpg')
          .url()
      : FALLBACK_IMAGE;

  return {
    title: blog?.seoTitle || 'Bare Recipe',
    description: blog?.seoDescription || 'Easy recipes without the annoying ads',
    openGraph: {
      title: blog?.seoTitle || 'Bare Recipe',
      description: blog?.seoDescription || 'Easy recipes without the annoying ads',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `https://bare-recipe.com/blog/${slug}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const query = `*[_type == "cookingTips"]{ "slug": slug.current }`;
  const cookingTips = await client.fetch(query);
  return cookingTips.map((cookingTip) => ({
    slug: cookingTip.slug,
  }));
}

export default async function Detail({ params }) {
  const {slug}  = await params;

  const query = `*[_type == "cookingTips" && slug.current == $slug][0]{
    ...,
    slug,
  }`;

  const blog = await client.fetch(query, { slug });
  if (!blog) {
    return (
      <p style={{ padding: '2rem', textAlign: 'center' }}>
        UH-OH!!! This blog seems to have fallen off the counter!
      </p>
    );
  }

  return (
    <>
      {/* <Hero
        title={blog.title}
        imageUrl={heroImage}
        showTitle={false}
      /> */}
      <section className={styles.sectionGrid}>
        
            <Image 
                className={styles.detailImage} 
                width={1200} 
                height={700} 
                alt={blog.title} 
                src={urlFor(blog.image)}/>
          <div className={styles.sectionCol1}>
          <div className='titleWrapper'>
            <h1 className='recipeTitle'>{blog.title}</h1>
          </div>
        </div>
        <PortableText value={blog.content} />      
      </section>
      </>
  )
}
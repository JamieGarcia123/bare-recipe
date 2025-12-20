'use client'

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from 'next/link'
import { fetchRecipes } from "../sanity/fetchrecipes";
import { urlFor } from '../sanity/client';
import Hero from '../components/hero';
import spices from '../assets/images/spices-header-bg.webp'
import ogImageUrl from '../assets/images/recipe-book-svg.svg'
import ImageTextSection from '../components/ImageTextSection';
import wonderingImg from '../assets/images/ponderingwhattoeat.webp'
import sauteeing from '../assets/images/girl-sauteeing.webp'
import Image from "next/image";


function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  useEffect(() => {
  const loadData = async () => {
    const allRecipes = await fetchRecipes();
    const shuffled = [...allRecipes].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3); // change to 2
    setRandomRecipes(selected);
  };

  loadData();
}, []);

  return (
    <>
    <Head>
      <meta name="keywords" content="Simple Recipes, leftovers, cook easy meals, what to cook with what i have" />       
      <meta property="og:image" content={ogImageUrl} />
      <meta property="title" content="No ads, no stories. Bare Recipe so you can cook and enjoy!"/>
      <meta property="og:description" content={"Can't figure out what to make with what you have??? Let's help you out! Enter what you have and see what we come up with."} />
      <meta name="description" content="Can't figure out what to make with what you have??? Let's help you out! Enter what you have and see what we come up with." />
    </Head>
    <div className="mainbody">
        <Hero title={"Hungry???"} imageUrl={spices} subText={"No ads, no pointless back stories of auntie Sue at thanksgiving. Just. Simple. Recipes. "} />
        <ImageTextSection
          col1Class="firstsectioncard"
          col2Class="secondsectioncard"
          titleClass=""
          showButton={true}
          buttonText="Find what to cook..."
          buttonUrl="/search"
          title="What to Eat?"
          buttonClass="goToSearch"
          snippet="Search recipes by ingredients you already have. No waste, no stress — just good food."
          imageClass="section_img"
          altText="Man in kitchen wondering what to eat."
          imageUrl={wonderingImg} />
          <section className="midGrid">
            {randomRecipes.map((recipe) => (
              <div key={recipe._id} className="midCol">
                <Image
                  src={urlFor(recipe.image)}
                  alt={recipe.title}
                  width={250}
                  height={250}
                  className="midImage"
                />
                <Link href={`/recipe/${recipe.slug}`} className="midButton">
                  {recipe.title}
                </Link>
              </div>
            ))}
          </section>
      
          <ImageTextSection
          col1Class="reversefirstsectioncard"
          col2Class="reversesecondsectioncard"
          titleClass=""
          showButton={false}
          title="Find something new"
          buttonClass="goToSearch"
          snippet="Help clear those last few items taking up your fridge's space and turn them into something flavour-ful!"
          imageClass="reversesection_img"
          altText="Sauteeing on pan, in kitchen with woman in apron."
          imageUrl={sauteeing} />
      </div></>
  );
}

export default Home;

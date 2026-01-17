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
import "./home.css"
export const metadata = {
  title: "Bare Recipe | No ads, no frills. Just the bare recipe!",
  description:
    "Can't figure out what to make with what you have??? Let's help you out! Enter what you have and see what we come up with.",
  keywords:
    "Simple Recipes, leftovers, cook easy meals, what to cook with what i have",
  openGraph: {
    title: "Bare Recipe | No ads, no frills. Just the bare recipe!",
    description:
      "Can't figure out what to make with what you have??? Let's help you out! Enter what you have and see what we come up with.",
    images: [ogImageUrl],
  },
};

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
    {/* <Head>
        <title>Bare Recipe | No ads, no frills. Just the bare recipe!</title>

      <meta name="keywords" content="Simple Recipes, leftovers, cook easy meals, what to cook with what i have" />       
      <meta property="og:image" content={ogImageUrl} />
      <meta property="title" content="Bare Recipe | No ads, no frills. Just the bare recipe!"/>
      <meta property="og:description" content={"Can't figure out what to make with what you have??? Let's help you out! Enter what you have and see what we come up with."} />
      <meta name="description" content="Can't figure out what to make with what you have??? Let's help you out! Enter what you have and see what we come up with." />
    </Head> */}
    <div className="mainbody">
        <Hero title={"Bare Recipe"} imageUrl={spices} showTitle={true} subText={"No ads, no pointless back stories of auntie Sue at thanksgiving. Just. the bare recipe. "} />
        <ImageTextSection
          col1Class="firstsectioncard"
          col2Class="secondsectioncard"
          titleClass=""
          showButton={true}
          buttonText="Find what to cook..."
          buttonUrl="/search"
          title="What to Eat?"
          buttonClass="goToSearch"
          snippet="Bare Recipe is built for people who just want to cook - not scroll past pop-ups, life stories, or endless ads playing. Every recipe is straightforward, easy to follow, and designed to get you from idea to plate with as little friction as possible."
          imageClass="section_img"
          altText="Man in kitchen wondering what to eat."
          imageUrl={wonderingImg} />
          <section className="midSection">
            <h2>Cooking should be simple.</h2>
            <ul>
              <li>Clear ingredients & steps - no fluff, no distractions.
              </li>
              <li>Easy filtering by category, skill level, and type.
              </li>
              <li>Simple sharing - share a recipe without sending an essay.
              </li>
              <li>Beginner-friendly recipes alongside more advance options.
              </li>
            </ul>
            <p>Every recipe is designed to be readable, practival, and usable - whether you're cooking on your phone or printing it out.</p>
          </section>
          <section className="midGrid">
            <h3 className="gridTitle">Check out these recipes!</h3>
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
          snippet="Bare Recipe is made from a simple recipe seeker that had an idea to keep recipes on hand without clutter or scrolling through overlapping video ads!"
          imageClass="reversesection_img"
          altText="Sauteeing on pan, in kitchen with woman in apron."
          imageUrl={sauteeing} />
      </div></>
  );
}

export default Home;

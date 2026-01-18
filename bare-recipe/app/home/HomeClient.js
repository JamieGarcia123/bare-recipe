'use client'

import { useEffect, useState } from "react";
import { fetchRecipes } from "../sanity/fetchrecipes";
import Hero from "../components/hero";
import spices from "../assets/images/spices-header-bg.webp";
import ImageTextSection from "../components/ImageTextSection";
import wonderingImg from "../assets/images/ponderingwhattoeat.webp";
import sauteeing from "../assets/images/girl-sauteeing.webp";
import Image from "next/image";
import "./home.css";
import RandomCards from "app/components/randomCard";

function HomeClient() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const allRecipes = await fetchRecipes();
      const shuffled = [...allRecipes].sort(() => Math.random() - 0.5);
      setRandomRecipes(shuffled.slice(0, 3));
    };

    loadData();
  }, []);

  return (
    <div className="mainbody">

      <Hero
        title="Bare Recipe"
        imageUrl={spices}
        showTitle={true}
        subText="No ads, no pointless back stories of auntie Sue at thanksgiving. Just. the bare recipe."
      />

      <ImageTextSection
        col1Class="firstsectioncard"
        col2Class="secondsectioncard"
        showButton={true}
        buttonText="Find what to cook..."
        buttonUrl="/search"
        title="What to Eat?"
        buttonClass="goToSearch"
        snippet="Bare Recipe is built for people who just want to cook..."
        imageClass="section_img"
        altText="Man in kitchen wondering what to eat."
        imageUrl={wonderingImg}
      />

      <section className="midSection">
        <h2>Cooking should be simple.</h2>
        <ul>
          <li>Clear ingredients & steps - no fluff, no distractions.</li>
          <li>Easy filtering by category, skill level, and type.</li>
          <li>Simple sharing - share a recipe without sending an essay.</li>
          <li>Beginner-friendly recipes alongside more advance options.</li>
        </ul>
        <p>
          Every recipe is designed to be readable, practical, and usable.
        </p>
      </section>
      <RandomCards/>
      <ImageTextSection
        col1Class="reversefirstsectioncard"
        col2Class="reversesecondsectioncard"
        showButton={false}
        title="Find something new"
        snippet="Bare Recipe is made from a simple recipe seeker..."
        imageClass="reversesection_img"
        altText="Sauteeing on pan."
        imageUrl={sauteeing}
      />
    </div>
  );
}

export default HomeClient;

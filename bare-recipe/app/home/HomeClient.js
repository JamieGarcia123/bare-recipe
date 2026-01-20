'use client'
import Hero from "../components/hero";
import spices from "../assets/images/spices-header-bg.webp";
import ImageTextSection from "../components/ImageTextSection";
import wonderingImg from "../assets/images/ponderingwhattoeat.webp";
import sauteeing from "../assets/images/girl-sauteeing.webp";
import "./home.css";
import RandomCards from "../components/randomCard";

function HomeClient() {
  return (
    <div className="mainbody">
      <Hero
        title="Bare Recipe"
        imageUrl={spices}
        showTitle={true}
        subText="Bare Recipe is built for people who just want clear, simple recipes without ads, popups, or life stories. We focus on fast, readable instructions so you can start cooking immediately…"
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
        <div className="container">
        <h2>What Makes Us Different</h2>
        <ul>
          <li><i className="fa fa-times"></i>
              No ads or walls of text</li>
          <li><i className="fa fa-cutlery"></i>Ingredient-first layout</li>
          <li><i className="fa fa-list-ol"></i>Beginner-friendly steps</li>
          <li><i className="fa fa-filter"></i>Quick filtering</li>
          <li><i className="fa fa-clock"></i>Straightforward cooking times</li>
          <li><i className="fa fa-book"></i>Real-life, practical recipes</li>
        </ul>
        </div>
        <div className="container">
        <h2>Cooking should be simple.</h2>
        <ul>
          <li><i className="fa fa-list-ol"></i>Clear ingredients & steps - no fluff, no distractions.</li>
          <li><i className="fa fa-filter"></i>Easy filtering by category, skill level, and type.</li>
          <li><i className="fa fa-share"></i>Simple sharing - share a recipe without sending an essay.</li>
          <li><i className="fa fa-certificate"></i>Beginner-friendly recipes alongside more advance options.</li>
        </ul>
        <p>
          Every recipe is designed to be readable, practical, and usable.
        </p>
        </div>
        <div className="container">
        <h2>Who this website is for</h2>
        <ul>
          <li><i className="fa fa-users"></i>Busy cooks</li>
          <li><i className="fa fa-mobile"></i>People who hate scrolling through ads</li>
          <li><i className="fa fa-list-ol"></i>Beginners who want simple steps</li>
          <li><i className="fa fa-shopping-bag"></i>People cooking with limited ingredients</li>
          <li><i className="fa fa-clock"></i>Straightforward cooking times</li>
          <li><i className="fa fa-cutlery"></i>Families looking for quick meals</li>
        </ul>
        </div>
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

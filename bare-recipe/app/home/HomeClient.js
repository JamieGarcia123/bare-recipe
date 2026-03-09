'use client'
import Hero from "../components/hero";
import spices from "../assets/images/spices-header-bg.webp";
import ImageTextSection from "../components/ImageTextSection";
import Image from "next/image";
import wonderingImg from "../assets/images/ponderingwhattoeat.webp";
import sauteeing from "../assets/images/girl-sauteeing.webp";
import "./home.css";
import RandomCards from "../components/randomCard";

function HomeClient() {
  return (
    <>
      <Hero
        title="Bare Recipe"
        imageUrl={spices}
        showTitle={true}
        subText="Bare Recipe is built for people who just want clear, simple recipes without ads, popups, or life stories. We focus on fast, readable instructions so you can start cooking immediately…"
      />
      <section className="">
        <div className="wrapper">
          <div className="container-new">
            <div className="col-large">
              <h2>Cooking should be simple.</h2>
              <ul>
                <li><i className="fa fa-list-ol"></i>Clear ingredients & steps - no fluff, no distractions.</li>
                <li><i className="fa fa-filter"></i>Easy filtering by category, skill level, and type.</li>
                <li><i className="fa fa-share"></i>Simple sharing - share a recipe without sending an essay.</li>
                <li><i className="fa fa-certificate"></i>Beginner-friendly recipes alongside more advance options.</li>
              </ul>
            </div>
            <div className="col-large">
              <Image src={sauteeing} className="" alt="" height={300} width={500}/>

            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="container-new">
            <div className="col-large">
                  {/* <Image src={wonderingImg} className="" alt="" height={300} width={500}/> */}
              <RandomCards/>
            </div>
            <div className="col-large">
                <h2 className="">What Makes Us Different</h2>
                <ul>
                  <li><i className="fa fa-times"></i>No ads or walls of text</li>
                  <li><i className="fa fa-cutlery"></i>Ingredient-first layout</li>
                  <li><i className="fa fa-list-ol"></i>Beginner-friendly steps</li>
                  <li><i className="fa fa-filter"></i>Quick filtering</li>
                  <li><i className="fa fa-clock"></i>Straightforward cooking times</li>
                  <li><i className="fa fa-book"></i>Real-life, practical recipes</li>
                </ul>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="container-new">
            <div className="col-large">
                  <Image src={wonderingImg} className="" alt="" height={300} width={500}/>
            </div>
            <div className="col-large">
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
          </div>
        </div>
    </section>
    </>
  );
}

export default HomeClient;

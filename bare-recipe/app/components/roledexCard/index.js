'use client';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../../sanity/fetchrecipes';
import { urlFor } from '../../sanity/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './roledexCard.module.css';

function RoledexCard() {
  const [recipes, setRecipes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const allRecipes = await fetchRecipes();
      const shuffled = [...allRecipes].sort(() => Math.random() - 0.5);
      setRecipes(shuffled.slice(0, 6));
    };
    loadData();
  }, []);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % recipes.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const getCardPosition = (index) => {
    const offset = (index - activeIndex + recipes.length) % recipes.length;

    if (offset === 0) return styles.active;
    if (offset === 1) return styles.next;
    if (offset === 2) return styles.nextTwo;
    return styles.hidden;
  };

  if (!recipes.length) {
    return (
      <section className={styles.randomSection}>
        <h3 className={styles.gridTitle}>Check out these tasty recipes!</h3>
        <div className={styles.cardStage}>
          <div className={`${styles.recipeCard} ${styles.skeleton}`}></div>
        </div>
      </section>
    );
  }

  return (
    <aside className={styles.randomSection}>
      <h3 className={styles.gridTitle}>Check out these tasty recipes!</h3>

      <div className={styles.rolodexWrap}>
        <button
          onClick={prevCard}
          className={`${styles.navBtn} ${styles.left}`}         
          aria-label="Previous recipe"
        >
          <span className='fa fa-chevron-left'></span>
        </button>

        <div className={styles.cardStage}>
          {recipes.map((recipe, index) => (
            <div
              key={recipe._id}
              className={`${styles.recipeCard} ${getCardPosition(index)}`}
            >
              <Link
                href={`/recipe/${recipe.slug.current}`}
                className={styles.randomLink}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={urlFor(recipe.image)}
                    alt={recipe.title}
                    fill
                    id={"randomImage"}
                    className={styles.randomImage}
                    sizes="320px"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h4>{recipe.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={nextCard}
className={`${styles.navBtn} ${styles.right}`}          aria-label="Next recipe"
        >
          <span className='fa fa-chevron-right'></span>
        </button>
      </div>
    </aside>
  );
}

export default RoledexCard;
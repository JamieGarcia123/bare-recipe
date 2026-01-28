
'use client';
import { useEffect, useState } from 'react'
import { fetchRecipes } from '../../sanity/fetchrecipes';
import {  urlFor } from '../../sanity/client';
import Image from 'next/image'
import Link from 'next/link'
import styles from "./randomCard.module.css"


function RandomCards() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const allRecipes = await fetchRecipes();
      const shuffled = [...allRecipes].sort(() => Math.random() - 0.5);
      setRandomRecipes(shuffled.slice(0, 3));
    };
    loadData();
  }, []);

  if (!randomRecipes.length) {
    return (
      <section className={styles.randomMidGrid}>
        <h3 className={styles.gridTitle}>Check out these recipes!</h3>
        {/* Lightweight skeleton placeholders */}
        <div className={`${styles.midCol} ${styles.skeleton}`}></div>
        <div className={`${styles.midCol} ${styles.skeleton}`}></div>
        <div className={`${styles.midCol} ${styles.skeleton}`}></div>
      </section>
    );
  }

  return (
    <aside className={styles.randomSection}>
      <h3 className={styles.gridTitle}>Check out these tasty recipes!</h3>
     <div className={styles.randomMidGrid}>
      {randomRecipes.map((recipe) => (
        <div key={recipe._id} className={styles.randomCard}>
          <Link href={`/recipe/${recipe.slug}`} className={styles.rahdomLink}>
          <Image
            src={urlFor(recipe.image)}
            alt={recipe.title}
            width={250}
            height={250}
            loading="lazy"
            className={styles.randomImage}
          />
            <h4>{recipe.title}</h4>
          </Link>
        </div>
      ))}
      </div>
    </aside>
  );
}

export default RandomCards

'use client';
import { useEffect, useState } from 'react'
import { fetchRecipes } from '../../sanity/fetchrecipes';
import {  urlFor } from '../../sanity/client';
import Image from 'next/image'
import Link from 'next/link'
import styles from "./randomcard.module.css"


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
    <section className={styles.randomMidGrid}>
      <h3 className={styles.gridTitle}>Check out these recipes!</h3>
      {randomRecipes.map((recipe) => (
        <div key={recipe._id} className={styles.midCol}>
          <Image
            src={urlFor(recipe.image)}
            alt={recipe.title}
            width={250}
            height={250}
            loading="lazy"
          />
          <Link href={`/recipe/${recipe.slug}`} className={styles.midButton}>
            {recipe.title}
          </Link>
        </div>
      ))}
    </section>
  );
}

export default RandomCards
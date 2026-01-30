'use client'

import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../sanity/fetchrecipes';
import { fetchSauces } from '../sanity/fetchsauces';
import { urlFor } from '../sanity/client';
import Hero from '../components/hero';
import Card from '../components/resultsCard';
import heroUrl from '../assets/images/slate-herbs-bg.webp';
import './Search.css';
import ogImageUrl from '../assets/images/fridgefoods2.webp'
function Search() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [showSauces, setShowSauces] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [activeCat, setActiveCat] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch recipes & sauces once
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const recipeData = await fetchRecipes();
      const sauceData = await fetchSauces();
      setRecipes(recipeData);
      setSauces(sauceData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Reset page when query, category, or sauce toggle changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeCat, showSauces]);
(showSauces ? sauces : recipes).forEach(item => {
  if (item.categories?.some(c => c.toLowerCase().includes('beginner'))) {
  }
})

  // Get all unique categories
  const categories = [
    ...new Set(
      (showSauces ? sauces : recipes).flatMap((item) => item.categories || [])
    ),
  ];

  // Filter recipes by query
  const filteredRecipes = recipes.filter((recipe) => {
    if (!query.trim()) return true;
    const terms = query.toLowerCase().split(' ').filter(Boolean);
    const title = recipe.title?.toLowerCase() || '';
    const ingredients = recipe.ingredients?.map((ing) => ing.name.toLowerCase()) || [];
    return terms.some((term) => title.includes(term) || ingredients.some((ing) => ing.includes(term)));
  });

  // Filter sauces by query
  const filteredSauces = sauces.filter((sauce) => {
    if (!query.trim()) return true;
    const terms = query.toLowerCase().split(' ').filter(Boolean);
    return terms.every((term) =>
      sauce.ingredients?.some((ing) => ing.name.toLowerCase().includes(term))
    );
  });

  // Apply category filter
  const applyCategoryFilter = (items) => {
    if (!activeCat) return items;
    return items.filter((item) => item.categories?.includes(activeCat));
  };

  // Combine filters
  const items = showSauces
    ? applyCategoryFilter(filteredSauces)
    : applyCategoryFilter(filteredRecipes);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCatClick = (c) => {
    setActiveCat(c === activeCat ? null : c);
  };

  const clearCat = () => {
    setActiveCat(null);
  };

  return (
    <>
      <Head>
        <meta name="keywords" content="find recipes, leftover ingredient recipes, recipe finder, easy recipe, kid friendly recipes, simple recipes, search recipes by ingredients" />       
        <meta property="og:image" content={ogImageUrl} />
        <meta property="title" content="Recipe Search - Find Recipes by Ingredients"/>
        <meta property="og:description" content="Find recipes by searching ingredients you have, filter by category, or just browse around! " />
        <meta name="description" content="Find recipes by searching ingredients you have, filter by category, or just browse around! " />
      </Head>
      <Hero imageUrl={heroUrl} title={"Let's EAT!"} />

      <section className="search-input-container">
        <label>
          <input
            className="search-input"
            placeholder="List what you have..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button onClick={() => setShowSauces(!showSauces)}>
          {showSauces ? 'View Recipes' : 'View Sauces'}
        </button>
      </section>

      {!showSauces && (
        <section className="filter-input-container">
          <div className="cat-filter">
            {categories.map((c) => (
              <button
                key={c}
                className={`tag-btn ${activeCat === c ? 'active' : ''}`}
                onClick={() => handleCatClick(c)}
              >
                {c}
              </button>
            ))}
          </div>
          {activeCat && (
            <button className="clear-btn" onClick={clearCat}>
              ✕ Clear
            </button>
          )}
        </section>
      )}

      <section className="results-grid">
        {loading ? (
          <p>Loading...</p>
        ) : paginatedItems?.length ? (
          paginatedItems.map((item) => (
            <Link
              key={item._id}
              href={`/${showSauces ? 'sauce' : 'recipe'}/${item.slug}`}
            >
              <Card
                name={item.title}
                imageUrl={item.image}
                description={item.snippet}
                isGlutenFree={item.isGlutenFree}
                isVegan={item.isVegan}
                isVegetarian={item.isVegetarian}
                isLowCarb={item.isLowCarb}
                ingredients={item.ingredients}
                prepTime={item.prepTime}
                cookTime={item.cookTime}
              />
            </Link>
          ))
        ) : (
          <p>
            Oooof our roledex fell onto the floor. This may take a while to get the
            cards back in order....
          </p>
        )}
      </section>

      {totalPages > 1 && (
        <section className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active-page' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </section>
      )}
    </>
  );
}

export default Search;

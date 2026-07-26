'use client'

import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchblogs } from '../sanity/fetchblogs';
import Hero from '../components/hero';
import BlogCard from '../components/blogCard';
import heroUrl from '../assets/images/slate-herbs-bg.webp';
import styles from './blog.module.css';
import ogImageUrl from '../assets/images/fridgefoods2.webp'



function Blog() {
  const [query, setQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // const [activeCat, setActiveCat] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blogs
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const blogData = await fetchblogs();
      setBlogs(blogData);
      console.log(blogData)
      setLoading(false);
    };
    loadData();
  }, []);

  // Reset page when query, category, or sauce toggle changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [query, activeCat, showSauces]);
// (showSauces ? sauces : recipes).forEach(item => {
//   if (item.categories?.some(c => c.toLowerCase().includes('beginner'))) {
//   }
// })

  // Get all unique categories
  // const categories = [
  //   ...new Set(
  //     (showSauces ? sauces : recipes).flatMap((item) => item.categories || [])
  //   ),
  // ];



  // Apply category filter
  // const applyCategoryFilter = (items) => {
  //   if (!activeCat) return items;
  //   return items.filter((item) => item.categories?.includes(activeCat));
  // };


  // const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // const paginatedItems = blogs.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handleCatClick = (c) => {
  //   setActiveCat(c === activeCat ? null : c);
  // };

  // const clearCat = () => {
  //   setActiveCat(null);
  // };

  return (
    <>
      <Head>
        <meta name="keywords" content="find recipes, leftover ingredient recipes, recipe finder, easy recipe, kid friendly recipes, simple recipes, search recipes by ingredients" />       
        <meta property="og:image" content={ogImageUrl} />
        <meta property="title" content="Recipe Blog and Cooking Tips | Bare Recipe"/>
        <meta property="og:description" content="Find recipes by searching ingredients you have, filter by category, or just browse around! " />
        <meta name="description" content="Find recipes by searching ingredients you have, filter by category, or just browse around! " />
      </Head>
      <Hero imageUrl={heroUrl} showTitle={true} title={"Let's EAT!"}  subText="Enter ingredients you may have on hand or want to use more and we will load recipes relevant to those! Not sure what to search click on a category and find some inspiration!!"
 />

     
      <section className={styles.blogGrid}>
        {loading ? (
          <p>Loading...</p>
        ) : blogs?.length ? (
          blogs.map((item) => (
            <Link
              key={item._id}
              href={`/blog/${item.slug}`}
            >
              <BlogCard 
              title={item.title} 
              imageUrl={(item.image)}
              date={item.date}
              snippet={item.snippet}
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

      {/* {totalPages > 1 && (
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
      )} */}
    </>
  );
}

export default Blog;
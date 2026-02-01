// app/components/gallery/index.js
'use client' // ensure this component runs on the client
import { useState, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'
import 'react-multi-carousel/lib/styles.css'
import { urlFor,safeImageUrl } from '../../sanity/client'
import "./gallery.css"
import Image from 'next/image';

// Dynamic import of Carousel to avoid Turbopack SSR issues
const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false })
// const isSanityImage = (img) => img?.asset?
//  const isSanityImage = (img) => !!img?.asset


export default function GalleryCarousel({ featuredImage, images }) {

  const galleryRef = useRef(null)
  // Filter out invalid images upfront

  // const validImages = Array.isArray(images)
  // ? images.filter(img => img && img.asset)
  // : []
  const validImages = [
    featuredImage,   // always push featured image first
    ...(Array.isArray(images) ? images : [])
  ];


  const imageCount = validImages.length
const isMounted = useRef(false);

useEffect(() => {
  isMounted.current = true;
  return () => {
    isMounted.current = false;
  };
}, []);


useEffect(() => {
  const handleClickOutside = (event) => {
    if (galleryRef.current && !galleryRef.current.contains(event.target)) {
      setActiveImage(validImages[0] || null);
    }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  }
}, [validImages]);

  // useEffect(() => {
  // function handleClickOutside(event) {
  //   if (
  //     galleryRef.current &&
  //     !galleryRef.current.contains(event.target)
  //   ) {
  //     setActiveImage(
  //       isSanityImage(featuredImage)
  //         ? featuredImage
  //         : validImages[0] || null
  //     )    }
  // }
  // document.addEventListener('mousedown', handleClickOutside)
  // return () => {
  //   document.removeEventListener('mousedown', handleClickOutside)
  // }
  // }, [featuredImage])

  // const [activeImage, setActiveImage] = useState(
  //   isSanityImage(featuredImage)
  //     ? featuredImage
  //     : validImages[0] || null
  // )
// const [activeImage, setActiveImage] = useState(validImages[0] || null);
const [activeImage, setActiveImage] = useState(featuredImage || images?.[0] || null)

const imageSrc = safeImageUrl(activeImage);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: Math.min(3, imageCount),
      width: 500,
      height: 800
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: Math.min(2, imageCount),
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  }
  console.log('RENDER activeImage:', activeImage);


  return ( 

  <>
  <div className="">
    {imageSrc && (
      <Image
        src={imageSrc}
        alt={activeImage?.alt || ''}
        width={800}
        height={500}
        className="detail-image"

      />
    )}
  </div>
     {validImages.length > 0 && (
      <div className="gallery-wrapper"  ref={galleryRef}>
        <Carousel
          responsive={responsive}
          arrows
          keyBoardControl
          showDots
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
    {validImages?.map((img) => {
  const thumbSrc = safeImageUrl(img);

  return (
    thumbSrc && (
      <Image
        key={img.asset?._id}
        src={thumbSrc}
        alt={img.alt || ''}
        loading="lazy"
        height={150}
        width={150}
        onClick={() => setActiveImage(img)}
        className="thumbnail"
        title={img.alt || 'Image from recipe steps'}
      />
    )
  );
})}
        </Carousel>
      </div>)}
    </>
  )
}
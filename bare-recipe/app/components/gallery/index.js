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

const [activeImage, setActiveImage] = useState(featuredImage || images?.[0] || null)

const imageSrc = safeImageUrl(activeImage);

const CustomRightArrow = ({ onClick, ...rest }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Next"
      className="carousel-arrow carousel-arrow-right"
    >
      <i className="fa fa-circle-right" />
    </button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Previous"
      className="carousel-arrow carousel-arrow-left"
    >
      <i className="fa fa-circle-left" />
    </button>
  );
};
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
     {validImages.length > 1 && (
      <div className="gallery-wrapper"  ref={galleryRef}>
        <Carousel
          responsive={responsive}
          arrows
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
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
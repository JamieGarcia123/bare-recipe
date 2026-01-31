// app/components/gallery/index.js
'use client' // ensure this component runs on the client
import { useState, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'
import 'react-multi-carousel/lib/styles.css'
import { urlFor } from '../../sanity/client'
import "./gallery.css"
import Image from 'next/image';

// Dynamic import of Carousel to avoid Turbopack SSR issues
const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false })
const isSanityImage = (img) => Boolean(img?.asset?._ref)

export default function GalleryCarousel({ featuredImage, images }) {

  const galleryRef = useRef(null)
  
  // Filter out invalid images upfront
  const validImages = Array.isArray(images)
  ? images.filter(img => img && img.asset)
  : []

  const [activeImage, setActiveImage] = useState(
    isSanityImage(featuredImage)
    ? featuredImage
    : validImages[0] || null
  )

  const imageCount = validImages.length

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      galleryRef.current &&
      !galleryRef.current.contains(event.target)
    ) {
      setActiveImage(
        isSanityImage(featuredImage)
          ? featuredImage
          : validImages[0] || null
      )    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
  }, [featuredImage])

const CustomLeftArrow = ({ onClick }) => (
  <button className="custom-arrow left" onClick={onClick} aria-label="Previous">
    ‹
  </button>
)

const CustomRightArrow = ({ onClick }) => (
  <button className="custom-arrow right" onClick={onClick} aria-label="Next">
    ›
  </button>
)

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: Math.min(3, imageCount),
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


  return ( <>
  <div className="">
   {isSanityImage(activeImage) && (
  <Image
    width={800}
    height={500}
    className="detail-image"
    src={urlFor(activeImage).width(800).height(600).url()}
    alt={activeImage.alt || ''}
  />
)}
  </div>
     {validImages.length > 0 && (
      <div className="gallery-wrapper"  ref={galleryRef}>
        <Carousel
          responsive={responsive}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          arrows
          keyBoardControl
          showDots
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {validImages?.map((img, i) => (
              <Image
                src={urlFor(img).width(800).height(600).url()}
                alt={img.alt || ''}
                loading="lazy"
                height={150}
                width={150}
                onClick={() => isSanityImage(img) && setActiveImage(img)}
                className='thumbnail'
                title={img.alt || 'Image from recipe steps'} />
          ))}
        </Carousel>
      </div>)}
    </>
  )
}


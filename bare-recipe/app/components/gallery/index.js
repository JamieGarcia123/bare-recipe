// app/components/gallery/index.js
'use client' // ensure this component runs on the client
import { useState } from 'react'

import dynamic from 'next/dynamic'
import 'react-multi-carousel/lib/styles.css'
import { urlFor } from '../../sanity/client'
import "./gallery.css"
import Image from 'next/image';
// Dynamic import of Carousel to avoid Turbopack SSR issues
const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false })

export default function GalleryCarousel({ featuredImage, images }) {

  const [activeImage, setActiveImage] = useState(
  featuredImage || images[0]
)
  // Filter out invalid images upfront
const validImages = Array.isArray(images)
  ? images.filter(img => img && img.asset)
  : []



  // Carousel responsive settings (adjust as needed)
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1, slidesToSlide: 1 },
  }

  return ( <>
  <div className="">
    <Image
      width={800}
      height={500}
      className="detail-image"
      src={urlFor(activeImage)}
      alt={activeImage.alt || ''} />
  </div>
  <div className="gallery-wrapper">
          {validImages.length > 0 && (
      <Carousel
        responsive={responsive}
        keyBoardControl
        showDots
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {validImages.map((img, i) => (
          // <figure key={img._key || i}>
            <img
              src={urlFor(img)}
              alt={img.alt || ''}
              loading="lazy"
              height={150}
              width={150}
              onClick={() => setActiveImage(img)}
              className='thumbnail'
              title={img.alt || 'Image from recipe steps'} />
          // </figure>
        ))}
      </Carousel>
      )}
    </div></>
  )
}


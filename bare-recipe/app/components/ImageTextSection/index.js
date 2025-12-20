import Link from 'next/link';
import styles from "./ImageTextSection.module.css"
import { useEffect, useState } from "react";
import Image from 'next/image';

function ImageTextSection({title, imageUrl, snippet, titleClass, col1Class, col2Class, imageClass, altText, showButton, buttonUrl, buttonText, buttonClass}){
       const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []); // 
    
    return (
        <section
        className={`${styles.sectionGrid} ${isVisible ? styles.visible : ''}`}
        >
            <div className={col1Class}>
                <h2 className={titleClass}>{title}</h2>
                <p>{snippet}</p>
                {showButton ? <Link href={buttonUrl}><div className={buttonClass}>{buttonText}</div></Link> : null}
            </div>
            <div className={col2Class}>
                <Image src={imageUrl.src} className={imageClass} alt={altText} height={300} width={250}
/> 
            </div>
        </section>
    )
}

export default ImageTextSection;
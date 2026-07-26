import { urlFor } from "../../sanity/client";
import Image from 'next/image';
import styles from'./BlogCard.module.css'

function BlogCard({_key, title, imageUrl, date, snippet}){
    return (
        <div key={_key} className={styles.blogcardContainer}>
            <div className={styles.imageContainer}>
            <Image src={urlFor(imageUrl)} width={250} alt={"Recipe image from results"} height={250}/>
            </div>
            <div className={styles.blogcardContent}>
                <h2 id="cardName">{title}</h2>
                <p className={styles.blogcardDescription}>{snippet}</p>
                <button id="readmore" className={styles.read}>Read More</button>
            </div>
        </div>
    )
}

export default BlogCard;
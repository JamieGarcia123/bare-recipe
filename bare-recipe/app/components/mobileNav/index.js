"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./mobilenav.module.css";
export default function MobileNav({ navCategories }) {
  const pathname = usePathname(); // Detects route changes

  const [isOpen, setIsOpen] = useState(false);

  // Close menu each time the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.mobileNav}>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.mobileMenuBtn}
      >
        {isOpen ? "X" : "☰"}
      </button>

      {/* Menu */}
      <div className={`${styles.mobileDropDown} ${isOpen ? "open" : ""}`}>
        <Link href="/search">Search</Link>
        {Object.entries(navCategories).map(([slug, label]) => (
          <Link key={slug} href={`/category/${slug}`}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

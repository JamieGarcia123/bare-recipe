export const metadata = {
  title: "Bare Recipe | No ads, no frills. Just the bare recipe!",
  description:
    "Can't figure out what to make with what you have??? Let's help you out!",
  keywords:
    "Simple Recipes, leftovers, cook easy meals, what to cook with what i have",
  openGraph: {
    title: "Bare Recipe | No ads, no frills. Just the bare recipe!",
    description:
      "Can't figure out what to make with what you have??? Let's help you out!",
    images: [ogImageUrl],
  },
};

import Home from "app/home/page";

export default function Home() {
  return <HomeClient />;
}

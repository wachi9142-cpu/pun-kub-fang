import { CartProvider } from "@/components/cart/CartContext";
import { CategoryProvider } from "@/components/category/CategoryContext";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import BestSellers from "@/components/sections/BestSellers";
import DrinkMenu from "@/components/sections/DrinkMenu";
import MixTeaser from "@/components/sections/MixTeaser";
import MixPairings from "@/components/sections/MixPairings";
import Promotions from "@/components/sections/Promotions";
import About from "@/components/sections/About";
import Reviews from "@/components/sections/Reviews";
import SiteFooter from "@/components/sections/SiteFooter";
import BackToTop from "@/components/sections/BackToTop";

export default function HomePage() {
  return (
    <CartProvider>
      <CategoryProvider>
        <Navbar />
        <main>
          <Hero />
          <Categories />
          <BestSellers />
          <DrinkMenu />
          <MixTeaser />
          <MixPairings />
          <Promotions />
          <Reviews />
          <About />
        </main>
        <SiteFooter />
        <BackToTop />
      </CategoryProvider>
    </CartProvider>
  );
}

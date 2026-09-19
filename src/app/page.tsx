import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import BestSellers from "@/components/sections/BestSellers";
import LuckyTeaser from "@/components/sections/LuckyTeaser";
import MixTeaser from "@/components/sections/MixTeaser";
import FreshBuffetTeaser from "@/components/sections/FreshBuffetTeaser";
import MixPairings from "@/components/sections/MixPairings";
import Promotions from "@/components/sections/Promotions";
import About from "@/components/sections/About";
import Reviews from "@/components/sections/Reviews";
import SiteFooter from "@/components/sections/SiteFooter";
import BackToTop from "@/components/sections/BackToTop";
import { getMenuItems, getSiteData } from "@/lib/api";
import { hydrateSiteData } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [menuItems, siteData] = await Promise.all([getMenuItems(), getSiteData()]);
  hydrateSiteData(siteData);
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <BestSellers items={menuItems} />
        <MixTeaser />
        <LuckyTeaser />
        <FreshBuffetTeaser />
        <MixPairings />
        <Promotions />
        <Reviews />
        <About />
      </main>
      <SiteFooter />
      <BackToTop />
      <CartDrawer />
    </CartProvider>
  );
}

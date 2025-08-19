import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TrustedBySection } from "@/components/trusted-by-section"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { PaymentsSection } from "@/components/payments-section"
import { ProductsSection } from "@/components/products-section"
import { DevelopersSection } from "@/components/developers-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { ImagePreloader } from "@/components/image-preloader"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ImagePreloader />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TrustedBySection />
        <section id="about">
          <AboutSection />
        </section>
        <section id="payments">
          <PaymentsSection />
        </section>
        <section id="products">
          <ProductsSection />
        </section>
        <section id="developers">
          <DevelopersSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

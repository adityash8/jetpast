import { Hero } from '@/components/hero'
import { SearchSection } from '@/components/search-section'
import { Features } from '@/components/features'
import { PopularAirports } from '@/components/popular-airports'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/cta'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <SearchSection />
        <Features />
        <PopularAirports />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

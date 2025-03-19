import Cards from "@/components/layout/cards"
import Content from "@/components/layout/content"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Content />
        <Cards />
      </main>
      <Footer />
    </div>
  )
}


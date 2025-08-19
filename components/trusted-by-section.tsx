"use client"
import Image from "next/image"
import { useState, useEffect } from "react"

export function TrustedBySection() {
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [showLogos, setShowLogos] = useState(false)
  const [logoLoadStates, setLogoLoadStates] = useState<boolean[]>(new Array(9).fill(false))

  const companies = [
    { name: "Commercial Bank of Ethiopia", logo: "/logos/cbe.png" },
    { name: "Dashen Bank", logo: "/logos/dashen.png" },
    { name: "Bunna Bank", logo: "/logos/bunna-bank.png" },
    { name: "Wegagen Bank", logo: "/logos/wegagen-bank.png" },
    { name: "Telebirr", logo: "/logos/telebirr.png" },
    { name: "Cooperative Bank of Oromia", logo: "/logos/coop-bank-oromia.png" },
    { name: "Zemen Bank", logo: "/logos/zemen-bank.png" },
    { name: "Awash Bank", logo: "/logos/awash-bank.png" },
    { name: "Ethio Telecom", logo: "/logos/ethio-telecom.png" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogos(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => prev + 1)
    setTimeout(() => {
      setLogoLoadStates((prev) => {
        const newStates = [...prev]
        newStates[index] = true
        return newStates
      })
    }, index * 150) // Staggered appearance with 150ms delay between logos
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Trusted by 5000 businesses in Ethiopia</h2>
          <p className="text-slate-600">From startups to Unicorns</p>
        </div>

        <div className="relative overflow-hidden">
          {!showLogos && (
            <div className="flex gap-12 items-center justify-center py-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="h-12 w-24 bg-slate-200 rounded animate-pulse flex-shrink-0" />
              ))}
            </div>
          )}

          {showLogos && (
            <div
              className="flex gap-12 items-center animate-scroll"
              style={{
                width: "calc(200% + 48px)",
              }}
            >
              {/* First set of logos */}
              {companies.map((company, index) => (
                <div key={index} className="flex items-center justify-center flex-shrink-0">
                  {!logoLoadStates[index] && <div className="h-12 w-24 bg-slate-200 rounded animate-pulse absolute" />}
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={96}
                    height={48}
                    className={`h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-500 ${
                      logoLoadStates[index] ? "opacity-80" : "opacity-0"
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companies.map((company, index) => (
                <div key={`duplicate-${index}`} className="flex items-center justify-center flex-shrink-0">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={96}
                    height={48}
                    className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

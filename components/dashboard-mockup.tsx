"use client"
import { BarChart3, CreditCard } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function DashboardMockup() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative">
      <div className="relative w-full max-w-4xl mx-auto">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl animate-pulse flex items-center justify-center">
            <div className="text-slate-500">Loading dashboard...</div>
          </div>
        )}
        <Image
          src="/new-dashboard-screenshot.png"
          alt="Payment Gateway Dashboard showing mobile payment interface and analytics"
          width={1200}
          height={800}
          className={`rounded-2xl shadow-2xl transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {imageLoaded && (
        <>
          <div className="absolute -left-8 top-32 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
            <BarChart3 className="w-8 h-8 text-green-500" />
          </div>

          <div className="absolute -right-8 bottom-20 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-bounce">
            <CreditCard className="w-6 h-6 text-blue-500" />
          </div>
        </>
      )}
    </div>
  )
}

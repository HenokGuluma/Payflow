"use client"
import { useEffect } from "react"

export function ImagePreloader() {
  useEffect(() => {
    const criticalImages = ["/dashboard-screenshot.png", "/logos/cbe.png", "/logos/dashen.png", "/logos/bunna-bank.png"]

    criticalImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return null
}

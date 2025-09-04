import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden shadow-lg backdrop-blur-md bg-white/10 border border-white/20">
      {/* Image Placeholder */}
      <div className="bg-white/20 h-60 w-full" />
      
      {/* Text Placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
        <div className="h-3 bg-white/20 rounded w-1/2"></div>
        <div className="h-4 bg-white/20 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  )
}

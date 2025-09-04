import React, { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../services/productApi'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

export default function Gallery() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getProducts()
      .then((data) => {
        if (mounted) {
          setProducts(data)
          setLoading(false)
        }
      })
      .catch(() => setLoading(false))
    return () => (mounted = false)
  }, [])

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQ = q.trim() === '' || p.name.toLowerCase().includes(q.toLowerCase())
      const matchesCat = category === 'All' || p.category === category
      return matchesQ && matchesCat
    })
  }, [products, q, category])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-cyan-600 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title & Filters */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
              Explore Our 3D Collection
            </h1>
            <p className="text-gray-200 mt-2">Click any product to view it in 3D</p>
          </div>

          <div className="flex gap-3 items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-2 rounded-full outline-none border border-white/30 bg-white/20 text-white placeholder-white/70 backdrop-blur-md"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Product Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.length > 0 ? (
              filtered.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <div className="col-span-full text-center py-20 text-white/80">
                No products found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

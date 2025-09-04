import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const price = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="rounded-2xl overflow-hidden shadow-lg backdrop-blur-md bg-white/20 border border-white/30"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-60 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white text-lg">{product.name}</h3>
          <p className="text-sm text-gray-200">{product.category}</p>
          <div className="mt-2 text-white font-bold">{price}</div>
        </div>
      </Link>
    </motion.div>
  )
}

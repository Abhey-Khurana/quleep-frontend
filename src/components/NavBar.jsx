import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg">
              A
            </div>
            <div>
              <div className="text-lg font-bold text-white">ArNXT</div>
              <div className="text-xs text-white/80">3D Viewer</div>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Search className="w-4 h-4 text-white/70" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white placeholder-white/70 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  navigate(`/?search=${encodeURIComponent(e.target.value.trim())}`)
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useFavorites } from '../context/FavoritesContext'
import RecipeSidebar from '../components/RecipeSidebar'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { favorites } = useFavorites()
  const [isOpen, setIsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (pathname === '/recipes') {
      setSidebarOpen(!sidebarOpen)
    }
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
              Recipe Finder
            </Link>
          </div>

          {/* Responsive Sidebar -- Only show on recipes page */}
          {pathname === '/recipes' && (
            <>
              <div className={`${sidebarOpen ? 'fixed inset-0 z-40 bg-black bg-opacity-50' : 'hidden'} md:hidden`} onClick={() => setSidebarOpen(false)} />
              <div className={`fixed md:relative md:sticky md:block top-0 h-screen w-64 bg-gray-100 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
                <RecipeSidebar filters={filters} setFilters={setFilters} />
              </div>
            </>
          )}

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/recipes" 
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Browse Recipes
              </Link>
              <Link 
                href="/saved" 
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Saved Recipes {favorites.length > 0 && `(${favorites.length})`}
              </Link>
            </div>
          </div>

          {/* Hamburger button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/"
              className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/recipes" 
              className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Browse Recipes
            </Link>
            <Link 
              href="/saved" 
              className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Saved Recipes ({favorites.length})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
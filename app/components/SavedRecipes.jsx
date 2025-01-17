'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useFavorites } from '../context/FavoritesContext'

export default function SavedRecipes() {
  const { favorites, removeFromFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Saved Recipes</h1>
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
            <h2 className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">No saved recipes yet</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Start exploring and save your favorite recipes!</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-orange-600 text-white text-sm sm:text-base rounded-lg hover:bg-orange-700 transition-colors"
            >
              Explore Recipes
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Saved Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {favorites.map((recipe) => (
            <div 
              key={recipe.uri} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 sm:h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {recipe.label}
                </h3>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {recipe.cuisineType?.map((cuisine, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <Link
                    href={`/recipe/${encodeURIComponent(recipe.uri.split('_')[1])}`}
                    className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm"
                  >
                    View Recipe
                  </Link>
                  
                  <button
                    onClick={() => removeFromFavorites(recipe.uri)}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
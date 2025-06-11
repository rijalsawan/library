'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const Page = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    
    // Update URL with search term
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      <div className="bg-gradient-to-br mt-32 max-sm:mt-14 from-slate-50 mb-12 to-stone-100">
          {/* Hero Section */}
          <main className="max-w-7xl mx-auto px-6">
            <div className="text-center my-auto">
              <h2 className="text-5xl font-light text-slate-900 mb-6 leading-tight">
                Discover Your Next
                <span className="block text-slate-600">Great Read</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Explore thousands of books, manage your reading list, and connect with fellow readers in our digital library.
              </p>
            </div>
          </main>
        </div>
      
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto text-center">
          
          <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto">
            <div className="relative group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for books..."
                className="w-full p-4 pr-16 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md"
              />
              <button
                type="submit"
                className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 p-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page;

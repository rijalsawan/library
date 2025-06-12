'use client'
import React from 'react'
import Link from 'next/link';


const Page = () => {

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
          <svg className="w-16 h-16 mx-auto mb-6 text-gray-500 animate-float" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          <Link href="/search">
          <button className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-black transition duration-300">
            <span className="text-lg font-semibold">Search Books</span>
          </button>
          </Link>

        </div>
      </div>
    </>
  )
}

export default Page;

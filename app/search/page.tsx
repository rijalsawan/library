'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Book {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: {
    title: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    industryIdentifiers?: Array<{
      type: string
      identifier: string
    }>
    pageCount?: number
    categories?: string[]
    averageRating?: number
    ratingsCount?: number
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
    }
    language?: string
    previewLink?: string
  }
  saleInfo?: {
    country: string
    saleability: string
    isEbook: boolean
  }
}

const BookCard: React.FC<{ book: Book; index: number }> = ({ book, index }) => {
  const { volumeInfo } = book
  const [isInLibrary, setIsInLibrary] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)

  // Check if book is already in library
  useEffect(() => {
    const library = JSON.parse(localStorage.getItem('myLibrary') || '[]')
    setIsInLibrary(library.some((libraryBook: Book) => libraryBook.id === book.id))
  }, [book.id])

  const addToLibrary = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent Link navigation
    setIsAdding(true)
    
    try {
      const library = JSON.parse(localStorage.getItem('myLibrary') || '[]')
      
      if (!library.some((libraryBook: Book) => libraryBook.id === book.id)) {
        const updatedLibrary = [...library, book]
        localStorage.setItem('myLibrary', JSON.stringify(updatedLibrary))
        setIsInLibrary(true)
      }
    } catch (error) {
      console.error('Failed to add book to library:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const removeFromLibrary = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent Link navigation
    setIsAdding(true)
    
    try {
      const library = JSON.parse(localStorage.getItem('myLibrary') || '[]')
      const updatedLibrary = library.filter((libraryBook: Book) => libraryBook.id !== book.id)
      localStorage.setItem('myLibrary', JSON.stringify(updatedLibrary))
      setIsInLibrary(false)
    } catch (error) {
      console.error('Failed to remove book from library:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const formatDescription = (description?: string) => {
    if (!description) return 'No description available.'
    return description.length > 150 ? description.substring(0, 150) + '...' : description
  }
  
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      style={{
        animationName: 'fadeInUp',
        animationDuration: '0.8s',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="p-4 sm:p-8">
        <div className="flex flex-col max-sm:space-y-4 sm:flex-row sm:items-start sm:space-x-6">
          <div className="flex-shrink-0 max-sm:self-center">
            <div className="relative w-20 h-28 max-sm:w-24 max-sm:h-32 sm:w-24 sm:h-32 rounded-lg overflow-hidden shadow-md">
              {volumeInfo.imageLinks?.thumbnail ? (
                <img
                  src={volumeInfo.imageLinks.thumbnail}
                  alt={volumeInfo.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-xl max-sm:text-2xl sm:text-2xl">📚</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0 max-sm:text-center sm:text-left">
            <h2 className="text-lg max-sm:text-xl sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {volumeInfo.title}
            </h2>
            {volumeInfo.authors && (
              <p className="text-sm text-gray-600 mb-3">
                by {volumeInfo.authors.join(', ')}
              </p>
            )}
            
            <div className="flex flex-wrap max-sm:justify-center sm:justify-start items-center gap-2 max-sm:gap-1 sm:space-x-4 text-xs text-gray-500 mb-4">
              {volumeInfo.publisher && <span>{volumeInfo.publisher}</span>}•
              {volumeInfo.publisher && volumeInfo.publishedDate && <span className="max-sm:hidden">•</span>}
              {volumeInfo.publishedDate && (
                <span>{new Date(volumeInfo.publishedDate).getFullYear()}</span>
              )}•
              {volumeInfo.pageCount && (
                <>
                  <span className="max-sm:hidden">•</span>
                  <span>{volumeInfo.pageCount} pages</span>
                </>
              )}
            </div>

            <div className="flex flex-col max-sm:items-center sm:items-start mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(volumeInfo.averageRating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-0 max-sm:ml-0 sm:ml-2 text-sm text-gray-600 max-sm:mt-1 sm:mt-0">
                {volumeInfo.averageRating
                  ? `${volumeInfo.averageRating} (${volumeInfo.ratingsCount || 0} reviews)`
                  : 'No ratings yet'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-700 leading-relaxed mb-4 max-sm:text-center sm:text-left">
            {formatDescription(volumeInfo.description)}
          </p>

          <div className="flex flex-wrap gap-2 mb-6 max-sm:justify-center sm:justify-start">
            {volumeInfo.categories?.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="flex flex-col max-sm:space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 mt-4">
            {volumeInfo.previewLink && (
              <Link
                href={`/books/${book.id}`}
                rel="noopener noreferrer"
                className="flex-1 bg-gray-900 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Preview
              </Link>
            )}
            
            <button
              onClick={isInLibrary ? removeFromLibrary : addToLibrary}
              disabled={isAdding}
              className={`flex-1 cursor-pointer py-2 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isInLibrary
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isAdding ? 'Processing...' : isInLibrary ? 'Remove' : 'Add to Library'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = ({ searchParams }: PageProps) => {
  const router = useRouter()
  const [books, setBooks] = React.useState<Book[]>([])
  const [loading, setLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  
  // Load search term and results from searchParams on component mount
  useEffect(() => {
    const urlSearchTerm = searchParams.q
    if (urlSearchTerm && typeof urlSearchTerm === 'string') {
      setSearchTerm(urlSearchTerm)
      performSearch(urlSearchTerm)
    }
  }, [searchParams])

  const performSearch = async (term: string) => {
    setLoading(true)
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      console.log('Search results:', data)
      setBooks(data.items || [])
    } catch (error) {
      console.error('Failed to fetch books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    
    // Update URL with search term
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    await performSearch(searchTerm)
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
      
      <div className=" py-4 px-2 max-sm:px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className=" mx-auto text-center mb-8 max-sm:mb-12 sm:mb-12">
          <h1 className="text-2xl max-sm:text-3xl sm:text-4xl font-light text-gray-900 mb-4">Search Books</h1>
          <p className="text-base max-sm:text-lg sm:text-lg text-gray-600 mb-6 max-sm:mb-8 sm:mb-8">Discover your next great read</p>
          
          <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto px-2 max-sm:px-0">
            <div className="relative group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for books..."
                className="w-full p-3 max-sm:p-4 sm:p-4 pr-14 max-sm:pr-16 sm:pr-16 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md text-sm max-sm:text-base sm:text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 max-sm:p-3 sm:p-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200"
              >
                <svg className="w-4 h-4 max-sm:w-5 max-sm:h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Books Section */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-16 max-sm:py-24 sm:py-24">
              <div className="relative">
                <div className="w-12 h-12 max-sm:w-16 max-sm:h-16 sm:w-16 sm:h-16 border-2 border-gray-200 rounded-full"></div>
                <div className="w-12 h-12 max-sm:w-16 max-sm:h-16 sm:w-16 sm:h-16 border-2 border-gray-900 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 max-sm:gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3 lg:gap-8">
              {books.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
              {books.length === 0 && !loading && (
                <div className="col-span-full text-center py-16 max-sm:py-24 sm:py-24">
                  <div className="animate-float mb-6">
                    <div className="w-20 h-20 max-sm:w-24 max-sm:h-24 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl max-sm:text-3xl sm:text-3xl">📚</span>
                    </div>
                  </div>
                  <p className="text-lg max-sm:text-xl sm:text-xl text-gray-400 font-light">Search books to see results here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Page;

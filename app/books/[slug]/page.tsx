import React from 'react'

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publisher?: string;
        publishedDate?: string;
        description?: string;
        pageCount?: number;
        categories?: string[];
        language?: string;
        industryIdentifiers?: Array<{
            type: string;
            identifier: string;
        }>;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
            medium?: string;
            large?: string;
            extraLarge?: string;
        };
    };
    saleInfo?: {
        listPrice?: {
            amount: number;
            currencyCode: string;
        };
        retailPrice?: {
            amount: number;
            currencyCode: string;
        };
        buyLink?: string;
    };
    accessInfo?: {
        webReaderLink?: string;
    };
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

const page = async ({ params }: PageProps) => {
    
    try {
        const { slug } = await params;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${slug}`);
        
        if (!response.ok) {
            throw new Error('Book not found');
        }
        
        const book: Book = await response.json();
        
        const isbn = book.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || 
                    book.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier;
        
        return (
            <div className="min-h-screen bg-neutral-50">
                <div className="max-w-5xl mx-auto px-6 py-12">
                    
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
                        {/* Book Cover */}
                        <div className="lg:col-span-2 flex justify-center lg:justify-start">
                            {book.volumeInfo.imageLinks?.large || book.volumeInfo.imageLinks?.thumbnail ? (
                                <div className="relative">
                                    <img 
                                        src={book.volumeInfo.imageLinks.thumbnail} 
                                        alt={book.volumeInfo.title}
                                        className="w-64 h-96 object-cover rounded-xl shadow-2xl"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            ) : (
                                <div className="w-64 h-96 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-xl flex items-center justify-center shadow-2xl">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <span className="text-neutral-500 font-light">No Cover Available</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Book Info */}
                        <div className="lg:col-span-3 space-y-6">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-light text-neutral-900 leading-tight mb-4">
                                    {book.volumeInfo.title}
                                </h1>
                                {book.volumeInfo.authors && (
                                    <p className="text-xl text-neutral-600 font-light">
                                        {book.volumeInfo.authors.join(' • ')}
                                    </p>
                                )}
                            </div>
                            
                            {/* Categories */}
                            {book.volumeInfo.categories && book.volumeInfo.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {book.volumeInfo.categories.slice(0, 3).map((category, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 text-sm font-medium text-neutral-700 bg-neutral-200/50 rounded-full border border-neutral-200"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Purchase Options */}
                            {book.saleInfo && (book.saleInfo.retailPrice || book.saleInfo.buyLink || book.accessInfo?.webReaderLink) && (
                                <div className="space-y-4 pt-4">
                                    {book.saleInfo.retailPrice && (
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl font-light text-neutral-900">
                                                ${book.saleInfo.retailPrice.amount}
                                            </span>
                                            {book.saleInfo.listPrice && book.saleInfo.listPrice.amount > book.saleInfo.retailPrice.amount && (
                                                <span className="text-lg text-neutral-400 line-through font-light">
                                                    ${book.saleInfo.listPrice.amount}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    
                                    <div className="flex gap-3">
                                        {book.saleInfo.buyLink && (
                                            <a 
                                                href={book.saleInfo.buyLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-8 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-all duration-200 hover:shadow-lg"
                                            >
                                                Purchase
                                            </a>
                                        )}
                                        {book.accessInfo?.webReaderLink && (
                                            <a 
                                                href={book.accessInfo.webReaderLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-8 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-all duration-200"
                                            >
                                                Preview
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Details */}
                    <div className="border-t border-neutral-200 pt-12 mb-12">
                        <h2 className="text-2xl font-light text-neutral-900 mb-8">Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { label: 'Publisher', value: book.volumeInfo.publisher },
                                { label: 'Published', value: book.volumeInfo.publishedDate },
                                { label: 'Pages', value: book.volumeInfo.pageCount?.toString() },
                                { label: 'Language', value: book.volumeInfo.language?.toUpperCase() },
                                { label: 'ISBN', value: isbn },
                                { label: 'Book ID', value: book.id }
                            ].filter(item => item.value).map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <dt className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                                        {item.label}
                                    </dt>
                                    <dd className="text-neutral-900 font-light">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    {book.volumeInfo.description && (
                        <div className="mb-16">
                            <h2 className="text-2xl font-light text-neutral-900 mb-6">About</h2>
                            <div 
                                className="text-neutral-700 leading-relaxed text-lg font-light max-w-4xl prose prose-neutral prose-lg"
                                dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    } catch {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-20 h-20 bg-neutral-100 rounded-full mx-auto flex items-center justify-center mb-8">
                        <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-light text-neutral-900 mb-4">Book Not Found</h1>
                    <p className="text-neutral-600 font-light mb-8 leading-relaxed">
                        The book youre looking for doesnt exist or has been removed from our collection.
                    </p>
                    <button className="text-neutral-900 hover:text-neutral-700 font-medium transition-colors duration-200">
                        ← Return to Library
                    </button>
                </div>
            </div>
        );
    }
}

export default page;

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
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Main Content */}
                    <div className="py-16">
                        <div className="grid lg:grid-cols-12 gap-16">
                            {/* Book Cover */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-8">
                                    <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-50">
                                        {book.volumeInfo.imageLinks?.large || book.volumeInfo.imageLinks?.thumbnail ? (
                                            <img 
                                                src={book.volumeInfo.imageLinks.thumbnail} 
                                                alt={book.volumeInfo.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="text-center space-y-2">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-medium">No Cover</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Book Information */}
                            <div className="lg:col-span-8 space-y-12">
                                {/* Title and Author */}
                                <div className="space-y-4">
                                    <h1 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 leading-tight">
                                        {book.volumeInfo.title}
                                    </h1>
                                    {book.volumeInfo.authors && (
                                        <p className="text-lg text-gray-600 font-light">
                                            by {book.volumeInfo.authors.join(', ')}
                                        </p>
                                    )}
                                </div>
                                
                                {/* Price and Actions */}
                                {book.saleInfo && (
                                    <div className="space-y-6">
                                        {book.saleInfo.retailPrice && (
                                            <div className="flex items-baseline space-x-4">
                                                <span className="text-2xl font-light text-gray-900">
                                                    ${book.saleInfo.retailPrice.amount}
                                                </span>
                                                {book.saleInfo.listPrice && book.saleInfo.listPrice.amount > book.saleInfo.retailPrice.amount && (
                                                    <span className="text-lg text-gray-400 line-through">
                                                        ${book.saleInfo.listPrice.amount}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {book.saleInfo.buyLink && (
                                                <a 
                                                    href={book.saleInfo.buyLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors duration-200"
                                                >
                                                    Purchase
                                                </a>
                                            )}
                                            {book.accessInfo?.webReaderLink && (
                                                <a 
                                                    href={book.accessInfo.webReaderLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    Preview
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Book Details */}
                                <div className="space-y-6">
                                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Details</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Publisher', value: book.volumeInfo.publisher },
                                            { label: 'Published', value: book.volumeInfo.publishedDate },
                                            { label: 'Pages', value: book.volumeInfo.pageCount?.toString() },
                                            { label: 'Language', value: book.volumeInfo.language?.toUpperCase() },
                                            { label: 'ISBN', value: isbn }
                                        ].filter(item => item.value).map((item, index) => (
                                            <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                                                <span className="text-sm text-gray-500 font-medium">
                                                    {item.label}
                                                </span>
                                                <span className="text-sm text-gray-900 font-light text-right">
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Description */}
                                {book.volumeInfo.description && (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Description</h3>
                                        <div 
                                            className="text-gray-700 leading-relaxed prose prose-gray max-w-none prose-p:text-gray-700 prose-p:font-light prose-p:leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
                                        />
                                    </div>
                                )}
                                
                                {/* Categories */}
                                {book.volumeInfo.categories && book.volumeInfo.categories.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Categories</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {book.volumeInfo.categories.map((category, index) => (
                                                <span 
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md mx-auto px-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-serif font-light text-gray-900">Book Not Found</h1>
                        <p className="text-gray-600 font-light">
                            The book youre looking for doesnt exist or has been removed.
                        </p>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium">
                        ← Back to Books
                    </button>
                </div>
            </div>
        );
    }
}

export default page;
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Book {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        industryIdentifiers: Array<{
            type: string;
            identifier: string;
        }>;
        readingModes: {
            text: boolean;
            image: boolean;
        };
        pageCount: number;
        printType: string;
        categories: string[];
        averageRating: number;
        ratingsCount: number;
        maturityRating: string;
        allowAnonLogging: boolean;
        contentVersion: string;
        panelizationSummary: {
            containsEpubBubbles: boolean;
            containsImageBubbles: boolean;
        };
        imageLinks: {
            smallThumbnail: string;
            thumbnail: string;
        };
        language: string;
        previewLink: string;
        infoLink: string;
        canonicalVolumeLink: string;
    };
    saleInfo: {
        country: string;
        saleability: string;
        isEbook: boolean;
        listPrice: {
            amount: number;
            currencyCode: string;
        };
        retailPrice: {
            amount: number;
            currencyCode: string;
        };
        buyLink: string;
    };
    accessInfo: {
        country: string;
        viewability: string;
        embeddable: boolean;
        publicDomain: boolean;
        textToSpeechPermission: string;
        epub: {
            isAvailable: boolean;
            acsTokenLink: string;
        };
        pdf: {
            isAvailable: boolean;
        };
        webReaderLink: string;
        accessViewStatus: string;
        quoteSharingAllowed: boolean;
    };
    searchInfo: {
        textSnippet: string;
    };
}

export default function MyLibrary() {
    const [books, setBooks] = useState<Book[]>([]);
    const [bookToDelete, setBookToDelete] = useState<string | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const libraryData = localStorage.getItem('myLibrary');
        setLoading(true);
        if (libraryData) {
            try {
                const parsedBooks = JSON.parse(libraryData);
                setBooks(Array.isArray(parsedBooks) ? parsedBooks : [parsedBooks]);
            } catch (error) {
                console.error('Error parsing library data:', error);
            }
        }
        setLoading(false);
    }, []);

    const handleRemoveClick = (bookId: string) => {
        setBookToDelete(bookId);
        setIsConfirming(true);
    };

    const confirmRemove = () => {
        if (bookToDelete) {
            const updatedBooks = books.filter(book => book.id !== bookToDelete);
            setBooks(updatedBooks);
            
            if (updatedBooks.length === 0) {
                localStorage.removeItem('myLibrary');
            } else {
                localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));
            }
        }
        setIsConfirming(false);
        setBookToDelete(null);
    };

    const cancelRemove = () => {
        setIsConfirming(false);
        setBookToDelete(null);
    };

    const formatDescription = (description: string) => {
        return description.length > 250 
            ? description.substring(0, 140) + '...' 
            : description;
    };

    if (books.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-24 h-24 mx-auto mb-8 opacity-20">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-light text-gray-800 mb-3">Your Library Awaits</h2>
                    <p className="text-gray-500 leading-relaxed">Start building your personal collection by adding books you love.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-extralight text-gray-900 mb-4 tracking-tight">Library</h1>
                        <p className="text-gray-500 text-lg font-light">Your curated collection</p>
                        <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {loading && (
                            <div className="col-span-1 lg:col-span-2 xl:col-span-3 text-center py-16">
                                <svg className="w-12 h-12 animate-spin text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4V2m0 20v-2m8.485-14.485l1.414-1.414M4.929 19.071l1.414-1.414M20 12h2m-20 0h2m14.485 8.485l1.414 1.414M4.929 4.929l1.414 1.414" />
                                </svg>
                            </div>
                        )}
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/50 relative"
                            >
                                <button
                                    onClick={() => handleRemoveClick(book.id)}
                                    className="absolute top-1 right-1 z-10 bg-gray-900/10 hover:bg-red-500 text-gray-600 hover:text-white rounded-full p-2.5 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                                    title="Remove from library"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="p-8">
                                    <div className="flex items-start space-x-6 mb-6">
                                        <div className="flex-shrink-0">
                                            <div className="relative w-20 h-28 rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-900/5">
                                                <img
                                                    src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.jpg'}
                                                    alt={book.volumeInfo.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                                                {book.volumeInfo.title}
                                            </h2>
                                            <p className="text-sm text-gray-500 mb-4 font-light">
                                                {book.volumeInfo.authors?.join(', ')}
                                            </p>
                                            
                                            {book.volumeInfo.averageRating && (
                                                <div className="flex items-center mb-4">
                                                    <div className="flex items-center space-x-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-3.5 h-3.5 ${
                                                                    i < Math.floor(book.volumeInfo.averageRating)
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-200'
                                                                }`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="ml-2 text-xs text-gray-400 font-light">
                                                        {book.volumeInfo.averageRating}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-600 leading-relaxed font-light">
                                            {formatDescription(book.volumeInfo.description)}
                                        </p>

                                        {book.volumeInfo.categories && book.volumeInfo.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {book.volumeInfo.categories.slice(0, 2).map((category) => (
                                                    <span
                                                        key={category}
                                                        className="px-2.5 py-1 bg-gray-100/80 text-gray-600 text-xs rounded-full font-light"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {book.volumeInfo.previewLink && (
                                            <div className="pt-2">
                                                <Link
                                                    href={`/books/${book.id}`}
                                                    className="inline-flex items-center justify-center w-full bg-gray-900 text-white text-center py-3 px-4 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
                                                >
                                                    Preview Book
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isConfirming && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-3">Remove Book</h3>
                            <p className="text-gray-500 mb-8 font-light leading-relaxed">
                                Are you sure you want to remove this book from your library? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={cancelRemove}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-2xl text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmRemove}
                                    className="flex-1 bg-red-500 text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-red-600 transition-colors duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
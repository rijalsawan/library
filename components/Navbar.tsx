'use client';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-3xl bg-gradient-to-r">
                            Readly
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link 
                            href="/mylibrary" 
                            className="relative px-6 py-2.5 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full hover:from-gray-800 hover:to-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            My Library
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none transition-colors duration-200"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-2 pt-4 pb-4 space-y-3 border-t border-gray-200/50">
                        <Link 
                            href="/" 
                            className="block px-4 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/mylibrary" 
                            className="block px-4 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            My Library
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

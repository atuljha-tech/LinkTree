"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const showNavbar = ["/", "/generate"].includes(pathname)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <>
            {showNavbar &&
                <nav className='bg-white/90 backdrop-blur-md shadow-lg w-[90vw] max-w-6xl flex justify-between items-center fixed top-6 left-1/2 transform -translate-x-1/2 rounded-full p-4 px-4 md:px-8 z-50 border border-gray-100' style={{ marginTop: 'env(safe-area-inset-top)' }}>
                    {/* Logo */}
                    <div className="logo flex items-center gap-4 md:gap-12">
                        <Link href={"/"} className="flex items-center gap-2" onClick={closeMenu}>
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                               LinkTree
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className='hidden lg:flex gap-6 text-sm font-medium text-gray-700'>
                            {[
                                { href: "/", label: "Templates" },
                                { href: "/", label: "Marketplace" },
                                { href: "/", label: "Discover" },
                                { href: "/", label: "Pricing" },
                                { href: "/", label: "Learn" }
                            ].map((item, index) => (
                                <Link key={index} href={item.href} className="hover:text-purple-600 transition-colors duration-200">
                                    <li className="px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                                        {item.label}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Buttons */}
                    <div className='hidden md:flex gap-3'>
                        <button className="login bg-transparent text-gray-700 px-6 py-2 rounded-full font-semibold border border-gray-300 hover:border-purple-600 hover:text-purple-600 transition-colors duration-200">
                            Log in
                        </button>
                        <button className="signup bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                            Sign up free
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden flex flex-col w-6 h-6 justify-center items-center gap-1"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>

                    {/* Mobile Menu Overlay */}
                    {isMenuOpen && (
                        <div 
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                            onClick={closeMenu}
                        />
                    )}

                    {/* Mobile Menu */}
                    <div className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex flex-col h-full pt-20 pb-6 px-6">
                            {/* Close Button */}
                            <button 
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                                onClick={closeMenu}
                                aria-label="Close menu"
                            >
                                ✕
                            </button>

                            {/* Mobile Navigation Links */}
                            <div className="flex-1">
                                <ul className='space-y-2'>
                                    {[
                                        { href: "/", label: "Templates" },
                                        { href: "/", label: "Marketplace" },
                                        { href: "/", label: "Discover" },
                                        { href: "/", label: "Pricing" },
                                        { href: "/", label: "Learn" }
                                    ].map((item, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={item.href} 
                                                className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Mobile Buttons */}
                            <div className='space-y-3 pt-6 border-t border-gray-200'>
                                <button 
                                    className="w-full bg-transparent text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:border-purple-600 hover:text-purple-600 transition-colors duration-200"
                                    onClick={closeMenu}
                                >
                                    Log in
                                </button>
                                <button 
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                                    onClick={closeMenu}
                                >
                                    Sign up free
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            }
        </>
    )
}

export default Navbar
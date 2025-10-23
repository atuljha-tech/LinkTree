"use client"
import React from 'react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Share Your World
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Create your personalized link hub. Connect all your important links in one beautiful, customizable LinkTree.
                    </p>
                    
                    <div className="flex gap-4 justify-center mb-20 flex-wrap">
                        <Link href="/generate">
                            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1">
                                Create Your LinkTree
                            </button>
                        </Link>
                        <Link href="#features">
                            <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border border-gray-200 hover:border-purple-300 hover:text-purple-600 hover:shadow-lg transition-all duration-300">
                                Learn More
                            </button>
                        </Link>
                    </div>

                    {/* Floating Elements */}
                    <div className="flex justify-center gap-8 opacity-60 mb-8">
                        <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white/50 backdrop-blur-sm -mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Why Choose LinkTree?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to create an amazing link hub
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="group text-center p-6 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:transform hover:-translate-y-2">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl text-white">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            How It Works
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-full flex items-center justify-center text-xl font-bold text-purple-600 shadow-lg border border-purple-100">
                                    {step.number}
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="max-w-4xl mx-auto text-center text-white px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Build Your Link Hub?
                    </h2>
                    <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                        Join thousands of creators, entrepreneurs, and professionals who use LinkTree to share their world.
                    </p>
                    <Link href="/generate">
                        <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            Get Started Free
                        </button>
                    </Link>
                    <p className="mt-4 text-white/70 text-sm">
                        No credit card required • Setup in 2 minutes
                    </p>
                </div>
            </section>
        </div>
    )
}

const features = [
    {
        icon: "⚡",
        title: "Lightning Fast",
        description: "Create your link hub in seconds with our intuitive interface. No technical skills required."
    },
    {
        icon: "🎨",
        title: "Beautiful Design",
        description: "Choose from professionally designed templates that make your links look amazing."
    },
    {
        icon: "🔗",
        title: "Easy Sharing",
        description: "One simple link to share everything that matters to your audience."
    }
]

const steps = [
    {
        number: "1",
        title: "Create Your Profile",
        description: "Sign up and set up your unique handle in seconds"
    },
    {
        number: "2",
        title: "Add Your Links",
        description: "Connect all your social media, websites, and important links"
    },
    {
        number: "3",
        title: "Share Everywhere",
        description: "Share your single LinkTree link across all platforms"
    }
]
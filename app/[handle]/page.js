import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 py-8 px-4">
            <div className="max-w-md mx-auto">
                {/* Profile Card */}
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                    
                    {/* Profile Header with Gradient */}
                    <div className="relative h-32 bg-gradient-to-r from-purple-600 to-pink-600">
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <img 
                                    src={item.pic || "/default-avatar.png"} 
                                    alt={item.handle}
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-2xl object-cover"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20"></div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-16 pb-8 px-8">
                        {/* Profile Info */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                @{item.handle}
                            </h1>
                            {item.desc && (
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            )}
                        </div>

                        {/* Links */}
                        <div className="space-y-3">
                            {item.links.map((link, index) => (
                                <Link key={index} href={link.link} target="_blank">
                                    <div className="group relative">
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:border-purple-300 hover:transform hover:-translate-y-0.5">
                                            <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                                {link.linktext}
                                            </span>
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-purple-500 text-sm">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="mt-6 flex justify-around border-t border-gray-100 pt-6">
                            <div className="text-center">
                                <div className="text-lg font-bold text-purple-600">{item.links.length}</div>
                                <div className="text-xs text-gray-500">Links</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-pink-600">1</div>
                                <div className="text-xs text-gray-500">Profile</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Your Own */}
                <div className="text-center mt-6">
                    <Link href="/generate">
                        <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold text-sm border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl">
                            ✨ Create Your BitTree
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
"use client"
import React, { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Generate = () => {
  const searchParams = useSearchParams()
  const [links, setLinks] = useState([{link: "", linktext: ""}])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [pic, setpic] = useState("")
  const [desc, setdesc] = useState("")
  const [recentBitTrees, setRecentBitTrees] = useState([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleChange = (index, link, linktext) => { 
    setLinks((initialLinks)=>{
      return initialLinks.map((item, i)=>{
        if (i==index){
          return {link, linktext}
        }
        else {
          return item
        }
      })
    })
  }

  const addLink = () => { 
    setLinks(links.concat([{link: "", linktext: ""}]))
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        setpic(reader.result)
        setUploading(false)
        toast.success('Image uploaded successfully!')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setUploading(false)
      toast.error('Error uploading image')
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links, 
      "handle": handle,
      "pic": pic,
      "desc": desc
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const r = await fetch("/api/add", requestOptions)
    const result = await r.json()
    if(result.success){ 
      toast.success(result.message)
      const newBitTree = {
        handle: handle,
        pic: pic,
        desc: desc,
        links: links,
        _id: Date.now().toString()
      }
      setRecentBitTrees(prev => [newBitTree, ...prev])
      setLinks([{link: "", linktext: ""}])
      setpic("")
      sethandle("")
    }
    else{
      toast.error(result.message)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white pt-24'>
      <div className='max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 py-8 px-4'>
        
        {/* Left Column - Form (2/3 width) */}
        <div className="col1 lg:col-span-2">
          <div className='bg-white rounded-3xl shadow-xl p-8 border border-gray-100'>
            <div className='text-center mb-8'>
              <h1 className='font-bold text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3'>
                Create Your LinkTree
              </h1>
              <p className='text-gray-600'>Build your personalized link hub in minutes</p>
            </div>

            {/* Step 1: Handle */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <h2 className='font-semibold text-xl text-gray-800'>Claim Your Handle</h2>
              </div>
              <input 
                value={handle || ""} 
                onChange={e=>{sethandle(e.target.value)}} 
                className='w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
                type="text" 
                placeholder='Choose a unique handle...' 
              />
            </div>

            {/* Step 2: Profile Picture */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <h2 className='font-semibold text-xl text-gray-800'>Add Profile Picture</h2>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                {pic ? (
                  <div className="relative">
                    <img 
                      src={pic} 
                      alt="Profile preview" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                    />
                    <button 
                      onClick={() => setpic("")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={triggerFileInput}
                    className="w-32 h-32 rounded-full border-4 border-dashed border-purple-300 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors bg-purple-50"
                  >
                    {uploading ? (
                      <div className="text-purple-500">Uploading...</div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl">📷</div>
                        <div className="text-xs text-purple-600 mt-1">Add Photo</div>
                      </div>
                    )}
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  onClick={triggerFileInput}
                  className="px-6 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm hover:bg-purple-200 transition-colors"
                >
                  {pic ? 'Change Photo' : 'Upload Photo'}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Upload from your device or take a photo
                </p>
              </div>
            </div>

            {/* Step 3: Description */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <h2 className='font-semibold text-xl text-gray-800'>Add Description</h2>
              </div>
              <textarea 
                value={desc || ""} 
                onChange={e=>{setdesc(e.target.value)}} 
                className='w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none'
                rows="3"
                placeholder='Tell the world about yourself...'
              />
            </div>

            {/* Step 4: Links */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                <h2 className='font-semibold text-xl text-gray-800'>Add Your Links</h2>
              </div>
              
              {links && links.map((item, index)=>{
                return (
                  <div key={index} className='mb-4 p-4 bg-gray-50 rounded-2xl border border-gray-200'>
                    <input 
                      value={item.linktext || ""} 
                      onChange={e=>{handleChange(index, item.link, e.target.value)}} 
                      className='w-full px-4 py-3 mb-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
                      type="text" 
                      placeholder='Link title (e.g., My Portfolio)' 
                    />
                    <input 
                      value={item.link || ""} 
                      onChange={e=>{handleChange(index, e.target.value, item.linktext)}} 
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400'
                      type="text" 
                      placeholder='https://...' 
                    />
                  </div>
                )
              })}
              
              <button 
                onClick={()=> addLink()} 
                className='w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2'
              >
                <span>+</span>
                Add Another Link
              </button>
            </div>

            {/* Submit Button */}
            <button 
              disabled={!pic || !handle || !links[0].linktext} 
              onClick={submitLinks} 
              className='w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:-translate-y-0.5 text-lg'
            >
              Create Your LinkTree
            </button>
          </div>
        </div>

        
        <div className="col2 space-y-6">
          {/* Recent BitTrees */}
          <div className='bg-white rounded-3xl shadow-xl p-6 border border-gray-100'>
            <h2 className='font-bold text-xl text-gray-800 mb-4 text-center'>
              Recently Created
            </h2>
            
            {recentBitTrees.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentBitTrees.map((tree, index) => (
                  <Link key={tree._id || index} href={`/${tree.handle}`}>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <img 
                          src={tree.pic || "/default-avatar.png"} 
                          alt={tree.handle}
                          className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm truncate">
                            @{tree.handle}
                          </h3>
                          {tree.desc && (
                            <p className="text-xs text-gray-600 truncate">
                              {tree.desc}
                            </p>
                          )}
                        </div>
                        <div className="text-purple-500 text-sm">
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">🌳</div>
                <p className="text-gray-500 text-sm">No LinkTrees created yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  )
}

export default Generate
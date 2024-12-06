'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { OktoContextType, useOkto } from 'okto-sdk-react'

export default function Navbar() {
  const [navBackground, setNavBackground] = useState('bg-transparent')
  const { isLoggedIn, showOnboardingModal, showWidgetModal, getWallets } = useOkto() as OktoContextType;


  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50
      if (show) {
        setNavBackground('bg-white dark:bg-black')
      } else {
        setNavBackground('bg-transparent')
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed w-full z-[100] transition-colors duration-300 ${navBackground}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            BDSM
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/find-a-match" className="hover:text-gray-300">Find a match</Link>
          <Link href="/profile" className="hover:text-gray-300">Profile</Link>
          {!isLoggedIn ? <Button onClick={() => showOnboardingModal()}>Signin</Button> : <Button onClick={() => showWidgetModal()}>Logged In </Button>}
        </div>
      </div>
    </nav>
  )
}


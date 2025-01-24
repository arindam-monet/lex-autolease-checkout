import Link from "next/link"
import { Twitter, Linkedin } from 'lucide-react'
import Image from "next/image"

export function Footer() {
  const links = [
    { href: "/legal", label: "Legal" },
    { href: "/privacy", label: "Privacy" },
    { href: "/cookies-policy", label: "Cookies Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/accessibility", label: "Accessibility" },
    { href: "/careers", label: "Careers" },
    { href: "/sitemap", label: "Sitemap" },
  ]

  return (
    <footer className="text-white">
       <nav className="py-4 flex flex-wrap justify-center gap-x-6 gap-y-2 bg-accent">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-300 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      <div className="container mx-auto px-4">
       
        <div className="border-t border-gray-700 py-8 flex flex-col items-center gap-4 text-center">
          <Image src={'/images/lex-logo.svg'} alt="Lex autolease" width={150} height={50} />
          <div className="text-sm text-gray-400 space-y-1">
            <p>© 2025 Lex Autolease Limited. Registered office: 25 Gresham Street, London EC2V 7HN</p>
            <p>Registered in England and Wales No: 1090741</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


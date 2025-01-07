import Link from "next/link"
import { Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <nav className="space-y-4">
            <Link href="/" className="block text-gray-500 hover:text-[#67004D]">Home</Link>
            <Link href="/life-insurance" className="block text-gray-500 hover:text-[#67004D]">Life Insurance</Link>
            <Link href="/about" className="block text-gray-500 hover:text-[#67004D]">About</Link>
            <Link href="/contact" className="block text-gray-500 hover:text-[#67004D]">Contact</Link>
          </nav>
          <nav className="space-y-4">
            <Link href="/news" className="block text-gray-500 hover:text-[#67004D]">Life Insurance News</Link>
            <Link href="/faqs" className="block text-gray-500 hover:text-[#67004D]">FAQs</Link>
            <Link href="/terms" className="block text-gray-500 hover:text-[#67004D]">Terms & Conditions</Link>
            <Link href="/cookies" className="block text-gray-500 hover:text-[#67004D]">Cookies Policy</Link>
          </nav>
          <nav className="space-y-4">
            <Link href="/privacy" className="block text-gray-500 hover:text-[#67004D]">Privacy Policy</Link>
            <Link href="/careers" className="block text-gray-500 hover:text-[#67004D]">Careers</Link>
            <Link href="/feedback" className="block text-gray-500 hover:text-[#67004D]">Feedback & Complaints</Link>
          </nav>
          
          {/* Connect With Us Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[#67004D] font-semibold mb-4">CONNECT WITH US</h3>
              <div className="flex space-x-4">
                <Link href="https://linkedin.com" className="text-[#67004D] hover:text-[#4D0039]">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="https://twitter.com" className="text-[#67004D] hover:text-[#4D0039]">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            
            {/* Trustpilot Widget */}
            {/* <div className="bg-white p-2 rounded-md inline-block">
              <img 
                src="/placeholder.svg?height=24&width=100" 
                alt="Trustpilot"
                className="h-6"
              />
              <span className="text-sm text-gray-600">2855 reviews</span>
            </div> */}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-2">We're here to help</h2>
          <p className="text-gray-600 mb-4">
            Our friendly team are on hand to provide any help you may need.
          </p>
          <p className="text-[#67004D] text-3xl font-bold mb-1">03456 442 540</p>
          <p className="text-[#67004D]">Monday to Friday 9am – 5.30pm</p>
        </div>

        {/* Legal Text */}
        <div className="text-sm text-gray-600 space-y-4 mb-8">
          <p>
            © 2025 Cavendish Online, part of Lloyds Banking Group, is authorised & 
            regulated by the Financial Conduct Authority (Ref 469385).
          </p>
          <p>
            Cavendish Online is registered in England No. 04045709. Registered Office: 
            Cavendish Online, 234 High Street, Exeter, EX4 3NL.
          </p>
        </div>

        {/* Powered By */}
        <div className="text-center text-sm text-gray-500">
          <p>Powered by Monet</p>
        </div>
      </div>
    </footer>
  )
}


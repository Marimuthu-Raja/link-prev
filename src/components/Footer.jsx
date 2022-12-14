import React from 'react'

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a href='/' className="flex title-font font-medium items-center md:justify-start justify-center text-white">
      <span className="ml-3 text-xl">Link Prev</span>
    </a>
    <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2022 Link-Prev
    </p>
  </div>
</footer>
  )
}

export default Footer
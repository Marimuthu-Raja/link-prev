import React from 'react'
import HeroImg from '../assets/hero.png'
const Hero = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
      <img className="object-cover object-center rounded" alt="hero" src={HeroImg}/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Preview URL
        <br className="hidden lg:inline-block"/>
      </h1>
      <p className="mb-8 leading-relaxed">
      When you add a URL to an email message on Whatsapp or Instagram app, or when you receive an email message with a URL in the body, you'll see a rich preview that includes a link title, thumbnail image, and description of the link. This tool helps you to get the details of the link.
      </p>
      <div className="flex justify-center">
        <a href="#preview">
        <button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Get Started</button>
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero
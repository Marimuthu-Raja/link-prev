import React, { useState } from "react"
import { getPreviewFromContent } from "link-preview-js"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import validator from "validator"
import Hero from "./components/Hero"
const App = () => {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [previewData, setPreviewData] = useState(null)

  const successAlert = () => {
    toast.success("I found the Preview🥳", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
  const errorAlert = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  // const getImagefromUri = (uri) => {
  //   let binarydata = []
  //   binarydata.push(uri)
  //   let img = URL.createObjectURL(new Blob(binarydata))
  //   console.log(img)
  //   return img
  // }

  const getPreview = () => {
    if (!url) {
      return errorAlert("Enter an URL🤨")
    }
    if (!validator.isURL(url)) {
      return errorAlert("Looks like not a valid URL🤔")
    }
    setLoading(true)
    let httpAdded = url.split("://")[0] === ("https" || "http")
    let getUrl = httpAdded ? url : `https://${url}`
    axios
      .get(getUrl)
      .then((res) => {
        res.url = getUrl
        getPreviewFromContent(res)
          .then((data) => {
            console.log(data)
            setPreviewData(data)
            successAlert()
            setLoading(false)
            setUrl("")
          })
          .catch((err) => {
            setLoading(false)
            errorAlert("Oops! Broken Url😢")
          })
      })
      .catch((err) => {
        setLoading(false)
        errorAlert("Oops! Broken Url😢")
      })
  }
  return (
    <div>
      <Header />
      <Hero />
      <section id="preview" className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Get Preview of your URL
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Get meta titles,thumbnails,images,description and a lot more at
              jus one click
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
            <div className="relative sm:mb-0 flex-grow w-full">
              <label for="full-name" class="leading-7 text-sm text-gray-400">
                Enter your URL
              </label>
              <input
                placeholder="Enter the URL to get Preview"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                id="url"
                name="url"
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={getPreview}
              disabled={loading}
              className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-xl"
            >
              Preview
            </button>
          </div>
        </div>
      </section>
      <section className="text-gray-400 bg-gray-900 body-font">
        {!previewData ? (
          <div style={{ height: "90px" }}></div>
        ) : (
          // <div className="container px-5 py-24 mx-auto">
          //   <div className="flex flex-wrap -m-4">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-white rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={
                    previewData?.images[0]
                      ? previewData?.images[0]
                      : "https://dummyimage.com/720x400"
                  }
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                    {previewData?.siteName}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {previewData?.title}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {previewData?.description}
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a
                      href={previewData?.url}
                      target="_blank"
                      className="text-red-400 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      View Site
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          //   </div>
          // </div>
        )}
      </section>
      {previewData ? (
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                {previewData?.title}
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                {previewData?.description}
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              {previewData?.images?.map((img) => (
                <div key={img} className="lg:w-1/3 sm:w-1/2 p-4">
                  <div className="flex relative">
                    <img
                      alt="gallery"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src={img ? img : "https://dummyimage.com/600x360"}
                    />
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                      <h2 className="tracking-widest text-sm title-font font-medium text-red-400 mb-1">
                        {previewData?.siteName}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-white mb-3">
                        {previewData?.title}
                      </h1>
                      <p className="leading-relaxed">
                        {previewData?.description}
                      </p>
                      <div className="flex items-center flex-wrap ">
                        <a
                          href={previewData?.url}
                          target="_blank"
                          className="text-red-400 inline-flex items-center md:mb-2 lg:mb-0"
                        >
                          View Site
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div
          className="text-gray-400 bg-gray-900 body-font"
          style={{ height: "90px" }}
        ></div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </div>
  )
}

export default App

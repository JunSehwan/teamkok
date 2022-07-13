import Image from 'next/image';
import Link from 'next/link';
// import { IoFileTrayOutline } from 'react-icons/io5'
// import { BiMessageAlt } from 'react-icons/bi'
// import { FaUserCircle } from 'react-icons/fa'
// import { BsGem } from 'react-icons/bs'

import logo from 'public/logo/teamkok.png';

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="bg-white dark:bg-gray-800  shadow ">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <div className="h-8 w-8">
                  <Image
                    src={logo}
                    width={32}
                    alt="logo"
                    height={32}
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">

                  </div>
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                  <a href="https://github.com/Charlie85270/tail-kit" className="p-1 rounded-full text-gray-400 focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">
                      View github
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200" viewBox="0 0 1792 1792">
                      <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                      </path>
                    </svg>
                  </a>
                  <div className="ml-3 relative">
                    <div className="relative inline-block text-left">
                      <div>
                        <button type="button" className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </button>
                      </div>
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <span className="flex flex-col">
                              <span>
                                Settings
                              </span>
                            </span>
                          </a>
                          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <span className="flex flex-col">
                              <span>
                                Account
                              </span>
                            </span>
                          </a>
                          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <span className="flex flex-col">
                              <span>
                                Logout
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                  <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>


          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

            </div>
          </div>
        </nav>
      </div>

      <div className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
              <svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Help Center</p>
                <p className="mt-1 text-sm text-gray-500">Get all of your questions answered in our forums or contact support.</p>
              </div>
            </a>

            <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
              <svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Guides</p>
                <p className="mt-1 text-sm text-gray-500">Learn how to maximize our platform to get the most out of it.</p>
              </div>
            </a>

            <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
              <svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Events</p>
                <p className="mt-1 text-sm text-gray-500">See what meet-ups and other events we might be planning near you.</p>
              </div>
            </a>

            <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
              <svg className="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Security</p>
                <p className="mt-1 text-sm text-gray-500">Understand how we take your privacy seriously.</p>
              </div>
            </a>
          </div>
          <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
            <div>
              <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">Recent Posts</h3>
              <ul role="list" className="mt-4 space-y-4">
                <li className="text-base truncate">
                  <a href="#" className="font-medium text-gray-900 hover:text-gray-700"> Boost your conversion rate </a>
                </li>

                <li className="text-base truncate">
                  <a href="#" className="font-medium text-gray-900 hover:text-gray-700"> How to use search engine optimization to drive traffic to your site </a>
                </li>

                <li className="text-base truncate">
                  <a href="#" className="font-medium text-gray-900 hover:text-gray-700"> Improve your customer experience </a>
                </li>
              </ul>
            </div>
            <div className="mt-5 text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> View all posts <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className='flex flex-row justify-between items-center h-14 bg-gray-darker text-white px-2'>
    //   <span className='flex flex-row justify-start items-center'>
    //     <Image
    //       src={logo}
    //       width={40}
    //       height={40}
    //     />
    //     <Link href="/">
    //       <a className='hover:text-purple mx-4 text-lg font-semibold'>Following</a>
    //     </Link>
    //     <Link href="/">
    //       <a className='hover:text-purple mx-4 text-lg font-semibold'>Browse</a>
    //     </Link>
    //     <Link href="/">
    //       <a className='hover:text-purple mx-4 text-lg font-semibold'>Esports</a>
    //     </Link>
    //     <Link href="/">
    //       <a className='hover:text-purple mx-4 text-lg font-semibold'>Music</a>
    //     </Link>
    //   </span>

    //   <input type='text' className='w-1/4 bg-gray-lightest border-2 border-gray-lightest rounded px-2 py-1 focus:outline-none focus:border-2 focus:border-purple' placeholder='Search' />

    //   <span className='flex flex-row justify-end items-center'>
    //     <Link href="/"><a className='mx-1 text-xl'></a></Link>
    //     <Link href="/"><a className='mx-1 text-xl'></a></Link>
    //     <button className='font-semibold mx-2 text-sm bg-gray-lighter hover:bg-gray-lightest px-3 py-1 rounded'><span>Get Bits</span></button>
    //     <Link href="/"><a className='mx-1 text-2xl'></a></Link>
    //   </span>
    // </div>
  )
}

export default Navbar;
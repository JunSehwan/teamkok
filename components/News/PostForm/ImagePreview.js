import React from 'react';
import Image from 'next/image';
import holderPicture from 'public/image/holderimage.png';
import PropTypes from 'prop-types';

const ImagePreview = ({ URLs, length, selectedImages }) => {

  return (

    <>

      <div>
        <div className="">
          <div className='flex'>
            {/* <p className='text-blue-800'>{index + 1}</p>
                <button
                  type="button"
                  onClick={() => removeImg(image)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button> */}

          </div>
          <div className="relative w-[auto]">
            <div className='w-full'>
              {length === 1 &&
                <>
                  <div className="flex justify-between ">
                    <div className="flex" >
                      <Image unoptimized width={648} height={520} alt="pic" className="rounded-md object-cover max-w-full" src={selectedImages[0]?.url || holderPicture} />
                    </div>
                  </div>
                </>
              }
              {length === 2 &&
                <>
                  <div
                    className="flex justify-between gap-[4px] "

                  >
                    <a className="flex" >
                      <Image unoptimized width={324} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[0]?.url || holderPicture} />
                    </a>
                    <a className="flex" >
                      <Image unoptimized width={324} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[1]?.url || holderPicture} />
                    </a>
                  </div>
                </>
              }
              {length === 3 &&
                <div
                  className="flex flex-row "

                >
                  <div className="flex justify-between gap-[4px]">
                    <a className="flex" >
                      <Image unoptimized width={520} height={260} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[0]?.url || holderPicture} />
                    </a>
                  </div>
                  <div className="flex flex-col justify-between gap-[4px]">
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full" src={selectedImages[1]?.url || holderPicture} />
                    </a>
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full" src={selectedImages[2]?.url || holderPicture} />
                    </a>
                  </div>

                </div>
              }
              {length === 4 &&
                <div
                  className=" "

                >
                  <div className="flex justify-between gap-[4px] mb-[4px]">
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full" src={selectedImages[0]?.url || holderPicture} />
                    </a>
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full" src={selectedImages[1]?.url || holderPicture} />
                    </a>
                  </div>
                  <div className="flex justify-between gap-[4px]">
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[2]?.url || holderPicture} />
                    </a>
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[3]?.url || holderPicture} />
                    </a>
                  </div>
                </div>
              }
              {length >= 5 &&
                <div
                  className=" "

                >
                  <div className="flex justify-between gap-[4px] mb-[4px]">
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full" src={selectedImages[0]?.url || holderPicture} />
                    </a>
                    <a className="flex" >
                      <Image unoptimized width={324} height={260} alt="pic" className="rounded-md object-cover max-w-full" src={selectedImages[1]?.url || holderPicture} />
                    </a>
                  </div>
                  <div className="flex justify-between gap-[4px]">
                    <a className="flex" >
                      <Image unoptimized width={216} height={260} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[2]?.url || holderPicture} />
                    </a>
                    <a className="flex" >
                      <Image unoptimized width={216} height={260} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[3]?.url || holderPicture} />
                    </a>
                    <a className="flex relative overflow-hidden rounded-md" >
                      {length > 5 &&
                        <>
                          <div className="text-white text-xl absolute z-1 inset-0 bg-slate-700/50 h-[100%] flex justify-center items-center">
                            <span className='text-3xl font-bold'>+{length - 4}</span>
                          </div>
                        </>}
                      <Image unoptimized width={216} height={260} alt="pic" className="rounded-md object-cover max-w-full " src={selectedImages[4]?.url || holderPicture} />
                    </a>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
ImagePreview.propTypes = {
  URLs: PropTypes.array,
  length: PropTypes.number,
};

export default ImagePreview;
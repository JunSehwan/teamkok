import React from 'react';
import logo from '/public/logo/jobcoc_logo_white.png';
// import logo from '/public/logo/apple-icon-180x180.png';
import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  /* background: repeating-linear-gradient(90deg, #44A6B2, #44A6B2 8px, #3C929E 0, #3C929E 11px); */
background-color: #684395;
background-image: linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),
linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),
linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),
linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%);
background-size: 13px, 29px, 37px, 53px;
`

const LeftBar = () => {

  return (
    <div className='left_bar hidden lg:flex '>
      <Container className='min-w-[280px] h-full '>
        <div className='bg-blue   flex justify-center p-4 pt-8 w-full'>
          <div className='w-auto h-auto rounded-2xl p-4 shadow-inner '>
          <Image
            className='shadow-lg'
            src={logo}
            width={80}
            alt="logo"
            height={80}
            unoptimized
          />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LeftBar;
import React, { useRef } from 'react';

const StickScroll = ({ children }) => {

  let aElSection = useRef();
  // let aElSection = document?.querySelectorAll("section");
  let curSIdx = 0;
  console.log(aElSection, "fuck")
  let wheelTimer;
  window.addEventListener("wheel", function (e) {
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () {
      if (e.deltaY < 0) doScroll(++curSIdx);
      else doScroll(--curSIdx);
    }, 50);
  });

  function doScroll(sidx) {
    console.log(sidx);
    sidx = sidx < 0 ? 0 : sidx;
    sidx = sidx > aElSection?.length - 1 ? aElSection?.length - 1 : sidx;

    curSIdx = sidx;

    aElSection[curSIdx]?.scrollIntoView({
      block: "start", inline: "start", behavior: "smooth"
    });
  }

  return (
    <div 
    ref={aElSection}
    >
        {children}
    </div>
  );
};

export default StickScroll;
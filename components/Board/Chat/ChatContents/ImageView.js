/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';


const ImageView = ({ src, isOpened, setIsOpened }) => {
  return (
    <div
      onClick={() => setIsOpened(false)}
      className={`fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080] transition-all duration-300 ${
        isOpened ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          onClick={(e) => e.stopPropagation()}
          src={src}
          className="h-auto max-h-full w-auto max-w-full"
        />
      )}

      <button
        onClick={() => setIsOpened(false)}
        className="bg-dark-lighten fixed right-2 top-2 z-30 flex h-10 w-10 items-center justify-center rounded-full text-white transition duration-300 hover:brightness-125"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-4xl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};


ImageView.propTypes = {
  src: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};


export default ImageView;
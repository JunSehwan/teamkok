import { useEffect } from "react";
import PropTypes from 'prop-types';

const Alert = ({
  isOpened,
  setIsOpened,
  text,
  isError,
  duration,
}) => {
  useEffect(() => {
    if (isOpened) {
      setTimeout(() => {
        setIsOpened(false);
      }, duration);
    }
  }, [isOpened, duration, setIsOpened]);

  return (
    <div
      className={`fixed top-5 right-5 ${isError ? "bg-red-500" : "bg-[#323232]"
        } z-[9999] w-[calc(100vw-40px)] max-w-[300px] scale-100 rounded p-4 text-white transition-all duration-300 ${isOpened
          ? "visible scale-100 opacity-100"
          : "invisible scale-50 opacity-0"
        }`}
    >
      {text}
    </div>
  );
};


Alert.propTypes = {
  isOpened: PropTypes.bool,
  setIsOpened: PropTypes.bool,
  text: PropTypes.string,
  isError: PropTypes.bool,
  duration: PropTypes.number
};

export default Alert;
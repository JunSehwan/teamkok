import { useState } from "react";

import { FILE_ICON } from "hooks/constants";
import PropTypes from 'prop-types';
import Image from 'next/image';

const FileIcon = ({ extension, className }) => {
  const [isError, setIsError] = useState(false);
  if (isError) return
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
  return (
    <Image
      width={20}
      height={20}
      alt="file_icon"
      className={className || ""}
      onError={() => setIsError(true)}
      src={FILE_ICON(extension)}
    ></Image>
  );
};



FileIcon.propTypes = {
  extension: PropTypes.string,
  className: PropTypes.string,
};

export default FileIcon;
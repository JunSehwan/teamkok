
export default function initialize() {
  const { Kakao } = window;
  // const dotenv = require('dotenv');
  Kakao?.init(process.env.NEXT_PUBLIC_KAKAO);
}
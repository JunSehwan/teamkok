
export default function kakaoInit() {
  const { Kakao } = window;
  if (Kakao) {
    !Kakao?.isInitialized() && Kakao?.init(process.env.NEXT_PUBLIC_KAKAO);
  }
}

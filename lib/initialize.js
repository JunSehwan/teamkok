
export default function kakaoInit() {
  !Kakao.isInitialized() && Kakao.init(process.env.NEXT_PUBLIC_KAKAO);
}

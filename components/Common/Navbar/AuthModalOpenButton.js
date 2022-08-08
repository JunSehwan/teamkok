export default function AuthModalOpenButton({ onclick, text, isMobile = false }) {
  const style = text === "회원가입"
    ? isMobile
      ? "w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white font-bold bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
      : "ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-[0.88rem] font-medium text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
    : isMobile
      ? "w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-purple-600 font-bold bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg"
      : "whitespace-nowrap px-4 py-2 border border-transparent rounded-md text-[0.88rem] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg"

  return (
    <button
      className={style}
      onClick={onclick}
    >
      {text}
    </button>
  )
}

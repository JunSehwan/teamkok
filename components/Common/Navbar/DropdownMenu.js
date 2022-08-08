import Link from 'next/link';
import { AvartarImage } from './Buttons/AvartarButton';

export default function DropdownMenu({ user, showLogoutModal, modalRef }) {
  return (
    <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center ">
      <div className="w-[100%] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          ref={modalRef}
          className="absolute top-[60px] right-[2vw] z-20 w-56 py-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
          <Link href="/profile">
            <a className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              <AvartarImage avartar={user?.avartar} isDropdown={true} />
              <div className="mx-1">
                <h1 className="text-sm w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis break-all font-semibold text-gray-700 dark:text-gray-200">
                  {user?.username}
                </h1>
                <p className="text-sm w-[150px] whitespace-nowrap	overflow-hidden overflow-ellipsis break-all text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </a>
          </Link>

          <hr className="border-gray-200 dark:border-gray-700 " />
          <Link href="/profile">
            <a className="font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              👀 내 프로필
            </a>
          </Link>
          <hr className="border-gray-200 dark:border-gray-700 " />
          <Link href="/favorite">
            <a className="font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              💗 참여기업
            </a>
          </Link>
          <Link href="/board/add">
            <a className="font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              📝 기업보드 개설
            </a>
          </Link>
          <hr className="border-gray-200 dark:border-gray-700 " />
          <Link href="/about">
            <a className="font-bold block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              🔎 Help
            </a>
          </Link>
          <button
            onClick={()=>showLogoutModal()}
            className="w-[100%] text-left block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

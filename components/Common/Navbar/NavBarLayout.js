export default function NavBarLayout({ children }) {
  return (
    <nav className="fixed z-10 bg-white w-full shadow-sm">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
          {children}
        </div>
      </div>
    </nav>
  )
}

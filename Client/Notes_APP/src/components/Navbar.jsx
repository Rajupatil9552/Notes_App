const Navbar = () => {
  return (
    <nav className="bg-[#202124] border-b border-[#5f6368] px-6 py-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#8ab4f8] rounded-full flex items-center justify-center">
              <span className="text-lg">📝</span>
            </div>
            <h1 className="text-xl font-medium text-white">Notes App</h1>
          </div>
        </div>

        {/* Right side - User info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#8ab4f8] rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-[#202124]">U</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
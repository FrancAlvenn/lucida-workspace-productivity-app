import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import { PanelRight } from 'lucide-react'

function Workspace() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)

  useEffect(() => {
    const closeListener = () => setIsRightSidebarOpen(false)
    window.addEventListener('closeRightSidebar', closeListener)
    return () => window.removeEventListener('closeRightSidebar', closeListener)
  }, [])


  return (
    <div className="flex h-[100vh] overflow-hidden">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isLeftSidebarOpen={isLeftSidebarOpen}
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
      />


      {/* Main content */}
      <main className="flex-1 relative lg:my-3 lg:mr-3 lg:border lg:border-gray-500 lg:rounded-lg  primary w-[100vw]">
        <div className="h-11 border-b border-gray-500 px-4 flex items-center justify-between sm:justify-end">
          <div className="flex gap-2 justify-between items-center w-full ">
            <button className="lg:hidden text-color-secondary hover:text-color cursor-pointer transition-colors duration-200" onClick={() => setIsMobileOpen(true)}>
              <PanelRight size={18} />
            </button>
            <button
             className="hidden lg:block text-color-secondary hover:text-color cursor-pointer transition-colors duration-200"
              onClick={() => setIsLeftSidebarOpen(prev => !prev)}
            >
              <PanelRight size={18} />
            </button>
            <button
              className="text-color-secondary hover:text-color cursor-pointer transition-colors duration-200"
              onClick={() => setIsRightSidebarOpen(prev => !prev)}
            >
              <PanelRight size={18} className='rotate-180' />
            </button>
          </div>
        </div>


        <div className="flex h-[calc(100%-56px)]">
          <div className="flex-1">
            {/* Outlet passes sidebar control as context */}
            <Outlet context={{ isRightSidebarOpen }} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Workspace

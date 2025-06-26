import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { useEffect, useRef, useState } from 'react'
import { PanelRight } from 'lucide-react'

function Workspace() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)
  const timeout = useRef(null);

  useEffect(() => {
    const closeListener = () => setIsRightSidebarOpen(false)
    window.addEventListener('closeRightSidebar', closeListener)
    return () => window.removeEventListener('closeRightSidebar', closeListener)
  }, [])

  useEffect(() => {
    let sequence = [];

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (e.altKey && key === 'l') {
        e.preventDefault();
        console.log('Logout triggered');
        return;
      }

      sequence.push(key);
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        sequence = [];
      }, 1000);

      const combo = sequence.join('');

      switch (combo) {
        case 'gs':
          console.log('Open Settings triggered');
          sequence = [];
          break;
        case 'ow':
          console.log('Switch Workspace triggered');
          sequence = [];
          break;
        default:
          if (sequence.length > 2) sequence.shift();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (timeout.current) clearTimeout(timeout.current); // ✅ also safe cleanup
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div className="flex h-full secondary overflow-auto">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isLeftSidebarOpen={isLeftSidebarOpen}
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
      />


      {/* Main content */}
      <div className="h-svh w-svw lg:py-2 lg:pr-2">
      <main className="flex-1 h-full relative lg:border lg:border-gray-500 lg:rounded-lg primary ">
        <div className='h-full flex flex-col'>
          <div className="h-10 border-b border-gray-500 px-4 flex items-center justify-between sm:justify-end">
            {/* Sidebar */}
            <div className="flex gap-2 justify-between items-center w-full ">
              <button className="lg:hidden text-color-secondary hover:text-color cursor-pointer transition-colors duration-200" onClick={() => setIsMobileOpen(true)}>
                <PanelRight size={16} />
              </button>
              <button
              className="hidden lg:block text-color-secondary hover:text-color cursor-pointer transition-colors duration-200"
                onClick={() => setIsLeftSidebarOpen(prev => !prev)}
              >
                <PanelRight size={16} />
              </button>
              <button
                className="text-color-secondary hover:text-color cursor-pointer transition-colors duration-200"
                onClick={() => setIsRightSidebarOpen(prev => !prev)}
              >
                <PanelRight size={16} className='rotate-180' />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="h-10 border-b border-gray-500 px-4 flex items-center justify-between sm:justify-end">
            <div className="flex gap-2 justify-between items-center w-full ">
            </div>
          </div>


          {/* Sidebar */}
          <div className="flex flex-1 rounded-lg ">
            <div className="flex-1 rounded-lg">
              {/* Outlet passes sidebar control as context */}
              <Outlet context={{ isRightSidebarOpen }} />
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

export default Workspace

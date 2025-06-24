import { useState, useEffect } from "react"
import { CaretLeft } from "phosphor-react"
import { ResizableBox } from "react-resizable"

function Sidebar({ isMobileOpen, setIsMobileOpen, isLeftSidebarOpen, setIsLeftSidebarOpen }) {
  const [width, setWidth] = useState(250)

  const [isDesktop, setIsDesktop] = useState(false)

  const MIN_WIDTH = 230
  const COLLAPSE_THRESHOLD = 100
  const MINIMIZED_WIDTH = 15

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleResize = (event, { size }) => {
    if (size.width < COLLAPSE_THRESHOLD) {
      setIsLeftSidebarOpen(true)
    } else {
      setIsLeftSidebarOpen(false)
      setWidth(size.width)
    }
  }

  return (
    <>
      {/* Desktop Sidebar - only shown on lg screens and above */}
      {isDesktop && (
        <div className="relative secondary h-full hidden lg:block transition-all duration-300">
          {!isLeftSidebarOpen ? (
            <div style={{ width: `${width}px` }}>
              <ResizableBox
                width={width}
                height={Infinity}
                minConstraints={[MIN_WIDTH, Infinity]}
                maxConstraints={[400, Infinity]}
                axis="x"
                resizeHandles={['e']}
                onResize={handleResize}
                className="h-[97vh] relative mt-3"
                handle={
                  <div className="absolute hover:bg-gray-400 top-1/2 right-0 w-[1px] h-[95vh] transform -translate-y-1/2 cursor-ew-resize z-20" />
                }
              >
                <div className="relative h-[97vh] py-4 pl-1 pr-4 flex flex-col">
                  {/* Sidebar Content */}
                </div>
              </ResizableBox>
            </div>
          ) : (
            <div
              className="group relative border-r border-gray-700 transition-all duration-300 ease-in-out overflow-hidden"
              style={{ width: `${MINIMIZED_WIDTH}px` }}
            >
              {/* Hover Flyout */}
            </div>
          )}
        </div>
      )}

      {/* Mobile Sidebar - shown on screens below 1024px */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div
          className={`w-72 h-full secondary p-4 shadow-lg transform transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            {/* Mobile header content */}
          </div>
          {/* Mobile sidebar content */}
        </div>
      </div>
    </>
  )
}

export default Sidebar
import { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

function MainView() {
  const { isRightSidebarOpen } = useOutletContext()
  const [width, setWidth] = useState(300)
  const [windowWidth, setWindowWidth] = useState(0)
  const [maxConstraint, setMaxConstraint] = useState(450)
  const sidebarRef = useRef(null)
  const containerRef = useRef(null)

  const MIN_WIDTH = 348
  const MAX_WIDTH = 450

  // Detect screen width and update states
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      
      if (isRightSidebarOpen && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        setMaxConstraint(Math.min(MAX_WIDTH, containerWidth))
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [isRightSidebarOpen])

  // Update width if it exceeds the new max constraint
  useEffect(() => {
    if (width > maxConstraint) {
      setWidth(maxConstraint)
    }
  }, [maxConstraint])

  // Determine positioning based on screen size
  const isMobile = windowWidth < 640
  const isLargeScreen = windowWidth <= 1024

  return (
    <div 
      className="h-full flex relative transition-all duration-300"
      ref={containerRef}
    >
      {/* Main Content */}
      <div className="flex-1 primary h-[92vh]">
        {/* Main Content */}
      </div>

      {/* Right Sidebar */}
      {isRightSidebarOpen && (
        <div 
          ref={sidebarRef}
          className={isLargeScreen 
            ? "absolute inset-y-0 right-0 z-10" 
            : "relative"
          }
        >
          {!isMobile ? (
            <ResizableBox
              width={Math.min(width, maxConstraint)}
              height={Infinity}
              minConstraints={[MIN_WIDTH, Infinity]}
              maxConstraints={[maxConstraint, Infinity]}
              axis="x"
              resizeHandles={['w']}
              onResizeStop={(e, data) => setWidth(data.size.width)}
              className={`relative primary border-l border-gray-500 h-[92vh] min-w-[${MIN_WIDTH}px] p-4 primary`}
              handle={
                <div className="absolute top-0 left-0 w-[1px] h-[92vh] hover:bg-gray-500 cursor-ew-resize z-20" />
              }
            >
              <div className="h-full">
                {/* Sidebar content */}
              </div>
            </ResizableBox>
          ) : (
            <div 
              className="shadow-md primary border-l border-gray-500 h-[92vh] p-4"
              style={{ width: `${Math.min(width, maxConstraint)}px` }}
            >
              <div className="h-full">
                {/* Sidebar content */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MainView
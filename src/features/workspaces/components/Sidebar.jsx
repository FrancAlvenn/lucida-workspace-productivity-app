import { useState, useEffect } from "react"
import { CaretLeft } from "phosphor-react"
import { ResizableBox } from "react-resizable"
import { Button, IconButton, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import { useWorkspace } from "../../../contexts/WorkspaceContext";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUpIcon, Search, SquarePen } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

function Sidebar({ isMobileOpen, setIsMobileOpen, isLeftSidebarOpen, setIsLeftSidebarOpen }) {
    const { currentUser } = useAuth();
    const { currentWorkspace, isLoading } = useWorkspace();
    const [openMenu, setOpenMenu] = useState(false);

    const [width, setWidth] = useState(250)

    const [isDesktop, setIsDesktop] = useState(false)

    const MIN_WIDTH = 200
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

    function getInitials(name) {
        if (!name) return '';
        const words = name.trim().split(/\s+/);
        if (words.length === 1) return words[0][0]?.toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    }


    return (
        <>
        {/* Desktop Sidebar - only shown on lg screens and above */}
        {isDesktop && (
            <div className="relative secondary h-full pl-2 hidden lg:block transition-all duration-300">
            {!isLeftSidebarOpen ? (
                <div style={{ width: `${width}px` }}>
                <ResizableBox
                    width={width}
                    height={Infinity}
                    minConstraints={[MIN_WIDTH, Infinity]}
                    maxConstraints={[300, Infinity]}
                    axis="x"
                    resizeHandles={['e']}
                    onResize={handleResize}
                    className="h-[97vh] relative mt-2"
                    handle={
                    <div className="absolute hover:bg-gray-400 top-1/2 right-0 w-[1px] h-[95vh] transform -translate-y-1/2 cursor-ew-resize z-20" />
                    }
                >
                    <div className="relative h-full pl-1 pr-4 flex flex-col">
                        {/* Sidebar Content */}
                        <div className="flex items-center justify-between h-10 mb-4">
                            <Menu placement="bottom-start" className="w-full">
                                <MenuHandler>
                                    <Button
                                        variant="text"
                                        size="sm"
                                        className="flex items-center text-sm font-semibold justify-between p-1.5 hover:bg-gray-700 gap-2 text-color rounded-lg"
                                        >
                                        <div className="py-0.5 px-1 flex items-center justify-center accent-bg text-xs font-bold text-color rounded-sm">
                                            {getInitials(currentWorkspace?.name)}
                                        </div>
                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                            {isLoading ? 'Loading...' : currentWorkspace?.name ?? 'No Workspace'}
                                        </div>
                                        <ChevronDown size={16} className="text-color-secondary" />
                                    </Button>
                                </MenuHandler>
                                <MenuList className="overlay text-color-secondary backdrop-blur-md w-full p-1 max-w-[230px] border-gray-700">
                                    <MenuItem className="text-color text-sm py-1.5 px-2 flex items-center justify-between hover:bg-gray-700">
                                        Settings
                                        <span className="text-xs text-color-secondary ml-2">G then S</span>
                                    </MenuItem>

                                    <MenuItem className="text-color text-sm py-1.5 px-2 flex items-center justify-between hover:bg-gray-700">Invite and manage members</MenuItem>
                                    <div className="h-px my-1 bg-gray-700" />
                                    <MenuItem className="text-color text-sm py-1.5 px-2 flex items-center justify-between hover:bg-gray-700">Download desktop App</MenuItem>
                                    <div className="h-px my-1 bg-gray-700" />
                                    <Menu
                                        placement="right-start"
                                        open={openMenu}
                                        handler={setOpenMenu}
                                        allowHover
                                        offset={15}
                                        >
                                        <MenuHandler className="text-color text-sm py-1.5 px-2 flex items-center justify-between hover:bg-gray-700">
                                            <MenuItem>
                                            Switch workspace
                                            <span className="flex items-center gap-2">
                                                <span className="text-xs text-color-secondary ml-2">O then W</span>
                                                <ChevronUpIcon
                                                    strokeWidth={2.5}
                                                    className={`h-3.5 w-3.5 text-color-secondary transition-transform ${
                                                    openMenu ? "rotate-90 text-color" : ""
                                                    }`}
                                                />
                                            </span>
                                            </MenuItem>
                                        </MenuHandler>
                                        <MenuList className="overlay text-color-secondary backdrop-blur-md w-full p-2 max-w-[200px] border-gray-700">
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                {currentUser?.email}
                                            </div>
                                            <MenuItem>
                                            <Button
                                                variant="text"
                                                size="sm"
                                                className="flex items-center text-sm font-semibold justify-between p-1.5 hover:bg-gray-700 gap-2 text-color rounded-lg"
                                                >
                                                <div className="py-0.5 px-1 flex items-center justify-center accent-bg text-xs font-bold text-color rounded-sm">
                                                    {getInitials(currentWorkspace?.name)}
                                                </div>
                                                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {isLoading ? 'Loading...' : currentWorkspace?.name ?? 'No Workspace'}
                                                </div>
                                            </Button>
                                            </MenuItem>
                                            <div className="h-px my-1 bg-gray-700" />
                                            <MenuItem className="text-color text-sm py-1.5 px-2 flex items-center justify-between hover:bg-gray-700">Create or join a workspace</MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <MenuItem className="text-color text-sm py-1.5 px-2 flex items-center justify-between hover:bg-gray-700">
                                        Logout
                                        <span className="text-xs text-color-secondary ml-2">Alt then L</span>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <div className="flex items-center gap-1">
                                <Button variant="text" ripple={true} className="text-color-secondary w-fit p-2 hover:bg-gray-700">
                                    <Search size={16} className="text-color-secondary" />
                                </Button>
                                <Button variant="filled" ripple={true} className="text-color-secondary w-fit p-2 hover:bg-gray-700">
                                    <SquarePen size={16} className="text-color-secondary" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </ResizableBox>
                </div>
            ) : (
                <div
                className="group relative border-r border-gray-500 transition-all duration-300 ease-in-out overflow-hidden"
                style={{ width: `${MINIMIZED_WIDTH}px` }}
                >
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
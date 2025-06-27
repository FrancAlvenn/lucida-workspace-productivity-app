import { useEffect, useState } from 'react'
import { Box, PanelRight } from 'lucide-react'
import { useSidebar } from '../../contexts/SidebarContext'
import MainView from './components/ProjectView'
import { Outlet, useNavigate } from 'react-router'
import { Chip, Typography } from '@material-tailwind/react'
import { useWorkspace } from '../../contexts/WorkspaceContext'

function Projects() {

    const { currentWorkspace } = useWorkspace();

    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
    const { setIsLeftSidebarOpen, setIsMobileOpen } = useSidebar();

    const navigate = useNavigate();

    useEffect(() => {
        const closeListener = () => setIsRightSidebarOpen(false)
        window.addEventListener('closeRightSidebar', closeListener)
        return () => window.removeEventListener('closeRightSidebar', closeListener)
    }, [])


    return (
        <main className="flex-1 h-full relative lg:border lg:border-gray-500 lg:rounded-lg primary ">
            <div className='h-full flex flex-col'>
            <div className="h-10 border-b border-gray-500 px-4 flex items-center justify-between sm:justify-end">
                {/* Sidebar */}
                <div className="flex gap-2 justify-between items-center w-full ">
                    <div className='flex items-center justify-between w-full'>
                        <button className="lg:hidden text-color-secondary hover:text-color cursor-pointer transition-colors duration-200" onClick={() => setIsMobileOpen(true)}>
                            <PanelRight size={16} />
                        </button>
                        <button
                        className="hidden lg:block text-color-secondary hover:text-color cursor-pointer transition-colors duration-200"
                            onClick={() => setIsLeftSidebarOpen(prev => !prev)}
                        >
                            <PanelRight size={16} />
                        </button>
                        <Typography className='text-color text-sm font-bold'>Projects</Typography>
                        <Chip
                            variant="ghost"
                            value={
                                <span className="flex items-center gap-1">
                                <Box size={16} className="text-color-secondary" />
                                <Typography className='text-color text-xs font-semibold'>All Projects</Typography>
                                </span>
                            }
                            className="bg-gray-700 text-color px-2 py-1 rounded-md cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => navigate(`/${currentWorkspace.url}/projects/all`)}
                        />
                        <div className="h-4 border-l border-gray-500 mx-2"></div>

                    </div>
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
                <Outlet context={{ isRightSidebarOpen }}></Outlet>
                </div>
            </div>
            </div>
        </main>
    )
}

export default Projects

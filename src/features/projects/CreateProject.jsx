import React, { useEffect, useState } from 'react';
import { BoxIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CreateProject({ open, onClose }) {

    const [error, setError] = useState('');

  // Handle Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
            <motion.div
                className="overlay border px-7 min-h-[85vh] border-gray-700 rounded-lg w-full max-w-4xl text-color"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{
                scale: 1,
                y: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    mass: 0.5
                }
                }}
                exit={{
                scale: 0.95,
                opacity: 0,
                transition: { duration: 0.15 }
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center py-4  border-gray-700">
                    <h2 className="text-sm font-semibold">Create Project</h2>
                    <motion.button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X size={20} className='hover:bg-gray-700 rounded'/>
                    </motion.button>
                </div>
                
                {/* Body */}
                <div className="space-y-3 flex-1">
                    {/* Project Icon */}
                    <div className='p-1 bg-gray-700 rounded w-fit'><BoxIcon size={20} className='text-gray-500'/></div>
                    {/* Project Name */}
                    <div>
                        <input
                        type="text"
                        placeholder="Project name"
                        className="w-full overlay rounded  text-color text-2xl placeholder-gray-500 border-none focus:outline-none"
                        />
                    </div>
                    {/* Short Summary */}
                    <div>
                        <input
                        cols={3}
                        type="text"
                        placeholder="Add a short summary"
                        className="w-full overlay resize-none rounded text-color text-md placeholder-gray-500 border-none focus:outline-none"
                        />
                    </div>
                    {/* Attributes */}
                    <div className='h-5'>

                    </div>
                    <div className="border-t border-gray-700 my-4"></div>
                    {/* Description Editor */}
                    <div className="flex-1">
                        <textarea
                        cols={20}
                        placeholder="Write a description, a project brief, or collect ideas ... "
                        className="w-full h-[50vh]  resize-none overlay rounded text-color text-md placeholder-gray-500 border-none focus:outline-none"
                        />
                    </div>
                </div>
                
                {/* Footer */}
                <div className="p-4 flex gap-2 border-t border-gray-700 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 h-fit text-sm gap-2 font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-1.5 h-fit text-sm font-medium text-white accent-bg hover:bg-blue-500 rounded"
                    >
                        Create Project
                    </button>
                </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CreateProject;
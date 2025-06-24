import React, { useState, useEffect } from 'react';
import { CaretLeft } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateWorkspace() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceURL, setWorkspaceURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-generate the workspace URL whenever the name changes
  useEffect(() => {
    const slug = workspaceName.trim().toLowerCase().replace(/\s+/g, '-');
    setWorkspaceURL(`lucida-workspace/${slug}`);
  }, [workspaceName]);

  const handleCreateWorkspace = async () => {
    if (!workspaceName || !workspaceURL || !currentUser) return;

    setIsLoading(true);
    try {
      const newWorkspace = {
        name: workspaceName,
        url: workspaceURL,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        members: [currentUser.uid],
      };

      await addDoc(collection(db, 'workspaces'), newWorkspace);

      // Optionally update user’s last workspace
      await updateDoc(doc(db, "users", currentUser.uid), {
        workspaceURL
      });

      // Navigate to the workspace
      navigate(`/${workspaceURL}`);
    } catch (err) {
      console.error("Error creating workspace:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-[90vh] overflow-y-auto primary'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-10 py-3 w-full h-auto mb-4 gap-4 sm:gap-0'>
        <div className='flex items-center gap-1'>
          <CaretLeft size={16} className='text-white cursor-pointer' />
          <p className='text-color-secondary text-xs font-semibold'>Back to Lucida Workspace</p>
        </div>
        <div className='flex flex-col items-end sm:items-start gap-1 ml-auto'>
          <p className='text-color-secondary text-xs font-semibold'>Logged in as</p>
          <p className='text-color text-xs font-semibold break-all'>{currentUser?.email}</p>
        </div>
      </div>

      {/* Body */}
      <div className='flex justify-center items-center px-4 sm:px-10 w-full h-full'>
        <div className='flex flex-col items-center gap-5 w-full max-w-md h-full'>

          {/* Header Text */}
          <div className='flex flex-col justify-center items-center gap-4 text-center'>
            <p className='text-color text-2xl font-semibold'>Create a new workspace</p>
            <p className='text-color-secondary text-sm font-semibold'>
              Workspaces are shared environments where teams collaborate on projects and get things done.
            </p>
          </div>

          {/* Form */}
          <div className='secondary flex flex-col justify-center items-center gap-5 w-full rounded-lg'>
            <form className='flex flex-col gap-5 w-full p-4 sm:p-10' onSubmit={e => e.preventDefault()}>
              <div className='flex flex-col items-start gap-2 w-full'>
                <label htmlFor="workspaceName" className='text-color text-sm font-semibold'>Workspace Name</label>
                <input
                  type="text"
                  id='workspaceName'
                  placeholder='Enter your workspace name'
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className='secondary border border-gray-500 w-full h-10 px-3 rounded-md text-color-secondary text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div className='flex flex-col items-start gap-2 w-full mt-4'>
                <label htmlFor="workspaceURL" className='text-color text-sm font-semibold'>Workspace URL</label>
                <input
                  type="text"
                  id='workspaceURL'
                  value={workspaceURL}
                  readOnly
                  className='secondary border border-gray-500 w-full h-10 px-3 rounded-md text-color-secondary text-xs font-semibold outline-none bg-gray-100 cursor-not-allowed'
                />
              </div>

              <div className='flex flex-col items-start gap-2 w-full mt-4'>
                <p className='text-color-secondary text-center w-full text-sm font-semibold'>
                  By creating a workspace, you agree to our <span className='accent-text cursor-pointer'>Terms of Service</span>
                </p>
              </div>
            </form>
          </div>

          {/* Button */}
          <button
            onClick={handleCreateWorkspace}
            disabled={!workspaceName || isLoading}
            className='accent-bg text-white cursor-pointer w-full max-w-xs flex items-center justify-center gap-3 py-2.5 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors mt-4 disabled:opacity-60'
          >
            <span className='text-sm'>
              {isLoading ? 'Creating...' : 'Create Workspace'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;

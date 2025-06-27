import { onSnapshot, collection } from 'firebase/firestore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import { db } from './services/firebase.js';
import { useEffect } from 'react';

import Login from './features/auth/Login.jsx';
import SignUp from './features/auth/SignUp.jsx';
import Workspace from './features/workspaces/Workspace.jsx';
import CreateWorkspace from './features/workspaces/CreateWorkspace.jsx';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { LoaderProvider } from './contexts/LoaderContext.jsx';
import RouteChangeLoader from './routes/RouterChangeLoader.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';

import NotFound from './routes/NotFound.jsx';
import GeneralError from './routes/GeneralError.jsx';
import Projects from './features/projects/Projects.jsx';
import { WorkspaceProvider } from './contexts/WorkspaceContext.jsx';
import Container from './components/layout/Container.jsx';
import { SidebarProvider } from './contexts/SidebarContext.jsx';
import WorkspaceView from './features/workspaces/components/WorkspaceView.jsx';
import ProjectView from './features/projects/components/ProjectView.jsx';
import ProjectViewAll from './features/projects/components/ProjectViewAll.jsx';
import RouteInit from './routes/RouteInit.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <GeneralError />, // shows when a route fails
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "lucida-workspace",
        element: <ProtectedRoute><Container /></ProtectedRoute>,
      },
      {
        path: "lucida-workspace/",
        element: <ProtectedRoute><Container /></ProtectedRoute>,
        children: [
          {
            path: ":workspaceURL",
            element: <ProtectedRoute><Workspace /></ProtectedRoute>,
            children: [
              {
                path: ":mainTab",
                element: <ProtectedRoute><WorkspaceView /></ProtectedRoute>
              }
            ]
          },
        ],
      },
      {
        path: "lucida-workspace/:workspaceURL/",
        element: <ProtectedRoute><Container /></ProtectedRoute>,
        children: [
          {
            path: "projects",
            element: <ProtectedRoute><Projects /></ProtectedRoute>,
            children: [
              {
                path: "all",
                element: <ProtectedRoute><ProjectViewAll /></ProtectedRoute>
              },
              {
                path: ":projectID",
                element: <ProtectedRoute><ProjectView /></ProtectedRoute>
              }
            ]
          }
        ]
      },
      {
        path: "lucida-workspace/create",
        element: <ProtectedRoute><CreateWorkspace /></ProtectedRoute>,
      },
      {
        path: "*", // Catch-all route (404)
        element: <NotFound />,
      },
    ]
  }
]);

function App() {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      console.log(snapshot);
    });
    return () => unsubscribe();
  }, []);

  return (
    <LoaderProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <SidebarProvider>
            <div className='App primary'>
              <RouterProvider router={router} />
              {/* <RouteInit /> */}
              <RouteChangeLoader />
            </div>
          </SidebarProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;

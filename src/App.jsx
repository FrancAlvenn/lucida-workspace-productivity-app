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
import MainView from './features/workspaces/components/MainView.jsx';

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
        element: <ProtectedRoute><Workspace /></ProtectedRoute>,
      },
      {
        path: "lucida-workspace/:workspaceURL",
        element: <ProtectedRoute><Workspace /></ProtectedRoute>,
        children: [
          {
            path: ":mainTab",
            element: <ProtectedRoute><MainView /></ProtectedRoute>,
          },
        ],
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
        <div className='App primary'>
          <RouterProvider router={router} />
          <RouteChangeLoader />
        </div>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;

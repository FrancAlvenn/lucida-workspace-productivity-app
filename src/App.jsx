import { onSnapshot, collection } from 'firebase/firestore'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import {db} from './services/firebase.js'
import { useEffect } from 'react'

import Login from './features/auth/Login.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
import SignUp from './features/auth/SignUp.jsx'
import { LoaderProvider } from './contexts/LoaderContext.jsx'
import RouteChangeLoader from './routes/RouterChangeLoader.jsx'



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {

  useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
    console.log(snapshot)
  });

  return () => unsubscribe();
  }, []);

  return (
    <LoaderProvider>
      <AuthProvider>
        <div className='App primary'>
            <RouterProvider router={router}/>
            <RouteChangeLoader />
        </div>
      </AuthProvider>
    </LoaderProvider>
  )
}



export default App


import { onSnapshot, collection } from 'firebase/firestore'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import {db} from './services/firebase.js'
import { useEffect } from 'react'

import Login from './features/auth/Login.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Home from './features/auth/Home.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
import SignUp from './features/auth/SignUp.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute> <Home /> </ProtectedRoute>,
  },
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
    <AuthProvider>
      <div className='App primary'>
          <RouterProvider router={router}/>
      </div>
    </AuthProvider>
  )
}



export default App


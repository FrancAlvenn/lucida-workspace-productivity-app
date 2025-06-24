import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

function Workspace() {
  const {logout} = useAuth()


  return (
    <>
    <div>Workspace</div>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default Workspace
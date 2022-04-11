import React from 'react'
import { useAuth } from 'store/auth'
import Student from './Student'
import Teacher from './Teacher'

const Dashboard = () => {
  const [user] = useAuth()
  switch (user?.type) {
    case 'teacher': return (<Teacher />)
    case 'student':
    default:
      return (<Student />)
  }
}

export default Dashboard

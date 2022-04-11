import React from 'react'
import Pages from './pages'
import AppProvider from './AppProvider'

function App() {
  return (
    <AppProvider>
      <Pages />
    </AppProvider>
  )
}

export default App

import {Routes, Route, Navigate} from 'react-router-dom'
// import './App.css'
import Chat from './Pages/Chat'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </>
  )
}

export default App

import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Page from './components/Page'

function App() {

  useEffect(()=>{
  document.title = "Luna Comics"}, []);
  
  return (
    <>
      <BrowserRouter>
          <Page/>
      </BrowserRouter>
    </>
  )
}

export default App

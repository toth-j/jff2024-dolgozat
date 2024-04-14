import { useEffect, useState } from 'react'
import Kutya from './Kutya'
import loading from './loading.gif'
import './App.scss'

function App() {
  const [kutya, setKutya] = useState(null)

  function fetchDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(data => data.json())
      .then(json => setKutya(json.message))
      .catch(console.log)
  }

  useEffect(() => {
    fetchDog()
  }, [])

  if (!kutya)
    return <img src={loading} alt='Betöltés' />

  return <Kutya kutyaSrc={kutya} fetchDog={fetchDog} />
}

export default App

import { useEffect, useState } from 'react'
import { Trainer, renderTrainer } from './Trainer' 

import './App.css'

function App() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  
  const fetchTrainerData = () => {
    fetch("https://localhost:7125/trainer")
      .then(response => response.json())
      .then(data => setTrainers(data))
      .catch(error => console.error(error));
  }
  
    useEffect(() => {
      fetchTrainerData()
    }, [])
  
  return (
    <>
      {trainers.length > 0 && trainers.map(trainer => renderTrainer(trainer))}
    </>
  )
}

export default App

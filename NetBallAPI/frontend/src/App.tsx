import { useEffect, useState } from 'react'
import { Trainer, TrainerCard } from './Trainer' 

function App() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
    
  useEffect(() => {
    (async () => {
      await fetch("https://localhost:7125/trainer")
        .then(response => response.json())
        .then(data => setTrainers(data))
        .catch(error => console.error(error));
    })()
  }, []);
  
  return (
    <>
      <div className="flex flex-col">
        {trainers.map(trainer => 
          <TrainerCard
          key={trainer.id}
          trainer={trainer}
          />)}
      </div>
    </>
  );
}

export default App

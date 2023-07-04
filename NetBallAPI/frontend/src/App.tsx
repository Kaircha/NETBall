import { useEffect, useState } from 'react'
import { Trainer, renderTrainer } from './Trainer' 

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
        {renderTrainer(trainers[0])}
        {/*trainers.map(trainer => renderTrainer(trainer))*/}
      </div>
    </>
  );
}

export default App

import { useEffect, useState } from 'react'
import { Trainer, TrainerCard } from './components/Trainer' 
import Catching from "./components/Catching";
import { USER_ID } from './utils/constants';



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
  
  // List of all trainers with their pokemon
/*  return (
    <>
      <div className="flex flex-col divide-gray-300">
        {trainers.map(trainer => 
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
          />
        )}
      </div>
    </>
  );*/

  const trainer: Trainer = trainers[Math.max(USER_ID-1, 0)];

  if (trainer !== undefined) return (
    <>
      <div className="flex flex-col">
        <TrainerCard trainer={trainer} />
      </div>
      <Catching />
    </>
  );
}



export default App

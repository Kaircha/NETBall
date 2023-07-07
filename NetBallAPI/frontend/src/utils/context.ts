import { createContext } from "react";
import { Trainer } from "../components/Trainer";
export interface TrainerContextProps {
    trainers: Trainer[];
    setTrainers: React.Dispatch<React.SetStateAction<Trainer[]>>;
  }
  
export const TrainersContext = createContext<TrainerContextProps|undefined>(undefined);

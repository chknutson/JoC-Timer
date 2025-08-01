import { useLocalStorage } from './useLocalStorage';

export function usePlantPoints() {
  const [plantPoints, setPlantPoints] = useLocalStorage('plantGrowthPoints', 0);
  
  const addMultiplePoints = (amount: number) => {
    setPlantPoints(prev => prev + amount);
  };
  
  const addTimerPoints = () => {
    setPlantPoints(prev => prev + 1); // Timer awards 1 point
  };
  
  const addGoalPoints = () => {
    setPlantPoints(prev => prev + 5); // Goal awards 5 points
  };
  
  const resetPoints = () => {
    setPlantPoints(0);
  };
  
  const getPlantPoints = () => plantPoints;
  
  return { 
    plantPoints, 
    addMultiplePoints, 
    addTimerPoints, 
    addGoalPoints, 
    resetPoints,
    getPlantPoints 
  };
} 
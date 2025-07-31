import { useLocalStorage } from './useLocalStorage';

export function usePlantPoints() {
  const [plantPoints, setPlantPoints] = useLocalStorage('plantGrowthPoints', 0);
  
  const addPlantPoint = () => {
    setPlantPoints(prev => prev + 1);
  };
  
  const getPlantPoints = () => plantPoints;
  
  return { plantPoints, addPlantPoint, getPlantPoints };
} 
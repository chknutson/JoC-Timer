import { useState, useEffect } from "react";

// Create a custom event system for localStorage changes
const createStorageEvent = (key: string, value: any) => {
  window.dispatchEvent(new CustomEvent('localStorageChange', {
    detail: { key, value }
  }));
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      console.log('useLocalStorage setValue called:', { key, oldValue: storedValue, newValue: valueToStore });
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Dispatch custom event to notify other instances
      createStorageEvent(key, valueToStore);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Listen for changes to this key in localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          console.log('useLocalStorage detected change:', { key, oldValue: storedValue, newValue });
          setStoredValue(newValue);
        } catch (error) {
          console.error('Error parsing localStorage value:', error);
        }
      }
    };

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        console.log('useLocalStorage detected custom change:', { key, oldValue: storedValue, newValue: e.detail.value });
        setStoredValue(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange as EventListener);
    };
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

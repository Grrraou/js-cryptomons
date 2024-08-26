// src/areas.js

export const areas = [
    { id: 0, clicks: 0, level: 1, clickPower: 1, autoClickerLevel: 0, assignedHeroes: [] },
    { id: 1, clicks: 0, level: 1, clickPower: 1, autoClickerLevel: 0, assignedHeroes: [] },
    { id: 2, clicks: 0, level: 1, clickPower: 1, autoClickerLevel: 0, assignedHeroes: [] },
    { id: 3, clicks: 0, level: 1, clickPower: 1, autoClickerLevel: 0, assignedHeroes: [] },
    // Add more areas as needed
  ];
  
  // Optionally, you can add utility functions to manipulate the areas' data
  export function saveAreasToLocalStorage(areas) {
    localStorage.setItem('areas', JSON.stringify(areas));
  }
  
  export function loadAreasFromLocalStorage() {
    const storedAreas = localStorage.getItem('areas');
    return storedAreas ? JSON.parse(storedAreas) : areas;
  }
  
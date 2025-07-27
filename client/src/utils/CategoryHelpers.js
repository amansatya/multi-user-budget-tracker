// categoryHelpers.js

// Key used for storing colors in localStorage
const STORAGE_KEY = "categoryColors";

// Load saved colors from localStorage or initialize new map
const storedColors = localStorage.getItem(STORAGE_KEY);
const categoryColorMap = new Map(storedColors ? JSON.parse(storedColors) : []);

// Utility to generate a random hex color
const generateRandomHexColor = () => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, "0")}`;
};

// Save updated map to localStorage
const saveColorsToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(categoryColorMap.entries())));
};

// Get color for category
export const getCategoryColor = (categoryName) => {
    const key = categoryName.toLowerCase();

    if (categoryColorMap.has(key)) {
        return categoryColorMap.get(key);
    }

    const newColor = generateRandomHexColor();
    categoryColorMap.set(key, newColor);
    saveColorsToStorage(); // Persist new color
    return newColor;
};

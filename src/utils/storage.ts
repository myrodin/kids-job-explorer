import type { SavedResult, StoredData } from '../types';

const STORAGE_KEY = 'your-dream-results';
const CURRENT_VERSION = '1.0';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getStoredData(): StoredData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data) as StoredData;
      if (parsed.version === CURRENT_VERSION) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load stored data:', error);
  }

  return {
    version: CURRENT_VERSION,
    results: [],
    lastUpdated: new Date().toISOString(),
  };
}

export function saveResult(result: Omit<SavedResult, 'id' | 'timestamp'>): SavedResult {
  const storedData = getStoredData();

  const newResult: SavedResult = {
    ...result,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };

  storedData.results.unshift(newResult);
  storedData.lastUpdated = new Date().toISOString();

  // Keep only last 10 results
  if (storedData.results.length > 10) {
    storedData.results = storedData.results.slice(0, 10);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
  } catch (error) {
    console.error('Failed to save result:', error);
  }

  return newResult;
}

export function getResults(): SavedResult[] {
  return getStoredData().results;
}

export function getResultById(id: string): SavedResult | undefined {
  return getStoredData().results.find((r) => r.id === id);
}

export function deleteResult(id: string): void {
  const storedData = getStoredData();
  storedData.results = storedData.results.filter((r) => r.id !== id);
  storedData.lastUpdated = new Date().toISOString();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
  } catch (error) {
    console.error('Failed to delete result:', error);
  }
}

export function clearAllResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear results:', error);
  }
}

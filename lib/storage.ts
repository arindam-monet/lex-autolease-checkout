export const storage = {
    get: (key: string, defaultValue: string = '0'): string => {
      if (typeof window === 'undefined') return defaultValue
      try {
        return localStorage.getItem(key) || defaultValue
      } catch (error) {
        console.error('Failed to get from localStorage:', error)
        return defaultValue
      }
    },
  
    set: (key: string, value: string): void => {
      if (typeof window === 'undefined') return
      try {
        localStorage.setItem(key, value)
      } catch (error) {
        console.error('Failed to set localStorage:', error)
      }
    },
  
    remove: (key: string): void => {
      if (typeof window === 'undefined') return
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error('Failed to remove from localStorage:', error)
      }
    }
  }
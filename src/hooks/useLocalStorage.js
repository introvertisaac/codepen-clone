import { useEffect, useState } from 'react'

const PREFIX = 'codepen-clone-';
const SUFFIX = '-v-0.1.0';

export default function useLocalStorage(key, initialValue) {
  // setting a unique key with app name and version.
  const prefixedKey = PREFIX + key + SUFFIX;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

import { stringify } from 'querystring'

export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
    const getItem = () => {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : undefined
    }

    return {setItem, getItem}
}
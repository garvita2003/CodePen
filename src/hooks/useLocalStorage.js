/* In order to save the changes whenever we refresh the page */
import {useEffect, useState} from 'react'

/*in order to prefix the key with this prefix everytime you save or render */
const prefix = 'codepen-app-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = prefix + key

    /*set up the hook */
    /*GETTING THE VALUE */
    const [value, setValue] = useState( () => {
        const jsonValue = localStorage.getItem(prefixedKey) /*in order to get the current value from the local storage */
        if(jsonValue != null) return JSON.parse(jsonValue) /*return the value if we have one */
        if(typeof initialValue === 'function'){
            return initialValue() /*means using function version of the useState */
        }
        else{
            return initialValue /*just return the initial value itself */
        }
    })

    /*It runs every single time when we change our value*/
    /*SAVING THE VALUE */
    useEffect(() => {
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    },[prefixedKey,value])

    return [value,setValue]
}
  
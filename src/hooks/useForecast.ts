import { useState, useEffect, ChangeEvent } from "react"
import { optionType } from '../types'

const useForecast = () => {
    // declare our state type as string. try setting the default to 0 to test getting an error
    const [term, setTerm] = useState<string>('')
    const [city, setCity] = useState<optionType | null>(null)
    const [options, setOptions] = useState<[]>([])
    const [forecast, setForecast] = useState<null>(null)

    const getSearchOptions = (value: string) => {
        // using envs in vite
        // https://vitejs.dev/guide/env-and-mode.html
        // console.log(import.meta.env.VITE_APP_API_KEY);
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${import.meta.env.VITE_APP_API_KEY}`)
            .then((res) => res.json())
            // .then((data) => console.log(data)
            .then((data) => setOptions(data)
            )
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string. 
        const value = e.target.value.trim()
        setTerm(value);

        if (value === '') return

        getSearchOptions(value);
    }

    const getForecast = (city: optionType) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`)
            .then(res => res.json())
            .then((data) => setForecast(data))
    }

    const onSubmit = () => {
        if (!city) return
        getForecast(city)
    }

    const onOptionSelect = (option: optionType) => {
        setCity(option)
    }

    useEffect(() => {
        // only do something if city is not null
        if (city) {
            setTerm(city.name)
            setOptions([])
        }
    }, [city])

    return {
        term,
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit
    }

}

export default useForecast

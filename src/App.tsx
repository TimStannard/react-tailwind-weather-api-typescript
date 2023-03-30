import { useState } from "react"
// components
import Search from "./components/Search"
import Forecast from "./components/Forecast"
// hooks
import useForecast from "./hooks/useForecast"


const App = (): JSX.Element => {
  // grab all variables and functions from useForecast custom hook
  const {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    resetCity
  } = useForecast()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-[100vh] w-full">
      {forecast ? (
        <Forecast
          data={forecast}
          reset={resetCity}
        />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}

    </main>
  )
}

export default App

import Search from "./components/Search"
import useForecast from "./hooks/useForecast"

const App = (): JSX.Element => {
  // grab all variables and functions from useForecast custom hook
  const {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit
  } = useForecast()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-[100vh] w-full">
      {forecast ? (
        forecast.sunrise
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

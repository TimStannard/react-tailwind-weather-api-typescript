import { useState, ChangeEvent } from "react"
// using envs in vite
// https://vitejs.dev/guide/env-and-mode.html
// console.log(import.meta.env.VITE_APP_API_KEY);

const App = (): JSX.Element => {
  // declare our state type as string. try setting the default to 0 to test getting an error
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])

  const getSearchOptions = (value: string) => {

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


  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-[100vh] w-full">
      <section className="bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg rounded w-full md:max-w-[500px] p-4 md:px-10 lg:p-24 h-full lg:h-[500px] text-zinc-700 flex flex-col text-center items-center justify-center">
        <h1 className="text-4xl font-thin">Weather <span className="font-black">Forecast</span></h1>
        <p className="text-sm mt-2">Enter a city below where you want to know the weather.</p>
        <div className="flex mt-8 md:mt-4">
          <input type="text" value={term} className="px-2 py-1 rounded-l-md border-2 border-white"
            onChange={onInputChange}
          />

          {options.map((option: { name: string }) =>
            <p>{option.name}</p>
          )}

          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer">Search</button>
        </div>
      </section>
    </main>
  )
}

export default App

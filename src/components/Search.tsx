import { ChangeEvent } from "react"
import { optionType } from "../types"

type Props = {
    term: string
    options: []
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
}

const Search = ({
    term,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit
}: Props): JSX.Element => {

    return (

        <section className="bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg rounded w-full md:max-w-[500px] p-4 md:px-10 lg:p-24 h-full lg:h-[500px] text-zinc-700 flex flex-col text-center items-center justify-center">
            <h1 className="text-4xl font-thin">Weather <span className="font-black">Forecast</span></h1>
            <p className="text-sm mt-2">Enter a city below where you want to know the weather.</p>
            <div className="relative flex mt-8 md:mt-4">
                <input type="text" value={term} className="px-2 py-1 rounded-l-md border-2 border-white"
                    onChange={onInputChange}
                />
                <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
                    {options.map((option: optionType, index: number) =>
                        <li key={option.name + "-" + index}>
                            <button className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer" onClick={() => onOptionSelect(option)}>
                                {option.name}
                            </button>
                        </li>
                    )}
                </ul>
                <button className="rounded-r-md border-2 border-zinc-100 hover:bg-blue-700  text-white px-2 py-1 cursor-pointer" onClick={onSubmit}>Search</button>
            </div>
        </section>
    )
}

export default Search

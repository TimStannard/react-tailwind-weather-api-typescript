import { forecastType } from "../types"
// hooks
import useForecast from "../hooks/useForecast"
// we have to declare props with data as the forecast type explicitly
// you can't just match forecastType to data because it's named differently
type Props = {
    data: forecastType,
    reset: () => void
}

// components need to follow this TS syntax for their props
// this is the same as ({ data }: Props) except you write the type inline
const Degree = ({ temp }: { temp: number }): JSX.Element => (
    <span>
        {temp}<sup>o</sup>
    </span>
)

const Forecast = ({ data, reset }: Props): JSX.Element => {
    const today = data.list[0]

    return (
        <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
            <div className="mx-auto w-[300px]">
                <section className="text-center">
                    <h2 className="text-2x1 font-black">
                        {data.name}
                        <span className="font-thin"> {data.country}</span>
                    </h2>
                    <h1 className="text-4x1 font-extrabold">
                        <Degree temp={Math.round(today.main.temp)} />
                    </h1>
                    <p className="text-sm">
                        {today.weather[0].main} {today.weather[0].description}
                    </p>
                    <p className="text-sm">
                        H: <Degree temp={Math.ceil(today.main.temp_max)} /> L: <Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>
                <section className="flex overflow-x-scroll mt-2 pb-2 mb-5">
                    {data.list.map((item, i) => (
                        <div
                            className="inline-block text-center w-[50px] flex-shrink-0"
                            key={i}
                        >
                            <p> {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()
                            }
                            </p>
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`} />
                            <p><Degree temp={Math.round(item.main.temp)} /></p>
                        </div>
                    ))}
                </section>
            </div>
            <div className="text-center">
                <button className="rounded border-2 border-zinc-100 hover:bg-blue-700  text-white px-2 py-1 cursor-pointer" onClick={() => { reset(); }}>Close</button>
            </div>
        </div>
    )
}

export default Forecast
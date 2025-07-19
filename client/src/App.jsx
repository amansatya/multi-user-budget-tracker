import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-blue-600 mt-6">Vite + React + Tailwind</h1>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => setCount(count + 1)}
            >
                count is {count}
            </button>
        </div>
    )
}

export default App

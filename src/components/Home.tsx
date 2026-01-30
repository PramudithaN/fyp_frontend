import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center px-8">
      <h1 className="text-5xl font-bold mb-8">Welcome to FYP Frontend</h1>
      <div className="bg-[#161b22] p-8 rounded-lg shadow-lg border border-[#30363d]">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-3 rounded-md font-medium transition-all mb-4"
        >
          count is {count}
        </button>
        <p className="text-[#8b949e] mb-4">
          Edit <code className="bg-[#0d1117] px-2 py-1 rounded text-[#e6edf3]">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#8b949e] mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Home

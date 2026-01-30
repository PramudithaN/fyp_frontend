import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-[#0d1117]">
      <nav className="bg-[#161b22] px-8 py-4 shadow-md sticky top-0 z-50 w-full">
        <ul className="list-none p-0 m-0 flex gap-2 justify-center">
          <li className="inline">
            <Link 
              to="/" 
              className={`px-5 py-2.5 rounded-md font-medium text-[15px] inline-block no-underline transition-all ${
                location.pathname === '/' 
                  ? 'bg-[#238636] text-white' 
                  : 'text-[#e6edf3] hover:bg-[rgba(100,108,255,0.15)] hover:text-[#58a6ff]'
              }`}
            >
              Home
            </Link>
          </li>
          <li className="inline">
            <Link 
              to="/dashboard" 
              className={`px-5 py-2.5 rounded-md font-medium text-[15px] inline-block no-underline transition-all ${
                location.pathname === '/dashboard' 
                  ? 'bg-[#238636] text-white' 
                  : 'text-[#e6edf3] hover:bg-[rgba(100,108,255,0.15)] hover:text-[#58a6ff]'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li className="inline">
            <Link 
              to="/about" 
              className={`px-5 py-2.5 rounded-md font-medium text-[15px] inline-block no-underline transition-all ${
                location.pathname === '/about' 
                  ? 'bg-[#238636] text-white' 
                  : 'text-[#e6edf3] hover:bg-[rgba(100,108,255,0.15)] hover:text-[#58a6ff]'
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
      
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

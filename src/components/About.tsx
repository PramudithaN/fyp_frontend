function About() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center px-8">
      <div className="max-w-2xl bg-[#161b22] p-12 rounded-lg shadow-lg border border-[#30363d]">
        <h1 className="text-4xl font-bold mb-6">About Page</h1>
        <p className="text-lg mb-4">
          This is a React TypeScript project built with Vite.
        </p>
        <p className="text-lg mb-4 font-semibold">
          Features:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#8b949e]">
          <li>React 18+ with TypeScript</li>
          <li>Vite for fast development</li>
          <li>React Router for navigation</li>
          <li>Hot Module Replacement (HMR)</li>
          <li>Tailwind CSS for styling</li>
        </ul>
      </div>
    </div>
  )
}

export default About

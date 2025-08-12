import ScoreForm from "./components/ScoreForm"
import { H1 } from "./components/typography"

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-100 to-slate-300">
      <main className="p-2 max-w-xl m-auto ">
        <H1>Mah-Jong Score Calculator</H1>
        <ScoreForm />
      </main>
    </div>
  )
}

export default App

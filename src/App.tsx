import { useState } from "react";
import GamePage from "./pages/GamePage"
import MainMenu from "./pages/MainMenu";

function App() {
  const [page, setPage] = useState<"menu" | "game">("menu");

  return (
    <main className="sm:w-8/9 h-screen grid place-items-center font-indivisa mx-auto">
      {page === "game" ? <GamePage setPage={setPage} /> : page === "menu" ? <MainMenu setPage={setPage} /> : null}
    </main>
  )
}

export default App

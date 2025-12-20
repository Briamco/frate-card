import { useState } from "react"
import Card from "./components/Card"
import { useCard } from "./hooks/useCard"
import { CardCategory } from "./services/card"
import Confetti from "react-confetti-boom"

function App() {
  const { cards, getRandomCard, getCovert } = useCard()

  const [count, setCount] = useState<number>(0)

  const [card, setCard] = useState<string>("")
  const [covert, setCovert] = useState<string>("")
  const [revealed, setRevealed] = useState<boolean>(false)

  const handleNewCard = () => {
    const newCard = getRandomCard()
    console.log(`Carta número: ${count + 1}`)
    if (newCard) {
      setCard(newCard)
      const category = newCard.split('/').slice(-2, -1)[0].toUpperCase()
      const newCovert = getCovert(category as keyof typeof CardCategory)
      if (newCovert) {
        setCovert(newCovert)
      }
      setRevealed(false)
      setCount(count + 1)
    }
  }

  if (!card) {
    handleNewCard()
  }

  return (
    <main className="w-8/9 h-screen grid place-items-center mx-auto">
      {
        cards.length === 0 ? (
          <p>No tenemos cartas disponibles.</p>
        ) : (
          <>
            <button onClick={() => setRevealed(true)}>
              <Card imgUrl={revealed ? card : covert} covert={revealed} />
              {revealed ? <Confetti mode="boom" particleCount={50} /> : null}
            </button>

            <button
              className="absolute bottom-10 font-bold bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleNewCard}
            >
              Nueva Carta
            </button>
          </>
        )
      }
    </main>
  )
}

export default App

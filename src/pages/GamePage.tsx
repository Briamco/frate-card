import { useState } from "react"
import { useCard } from "../hooks/useCard"
import type { CardCategory } from "../services/card"
import Confetti from "react-confetti-boom"
import Card from "../components/Card"
import { MoveLeft } from "lucide-react"

interface GamePageProps {
  setPage: React.Dispatch<React.SetStateAction<"menu" | "game">>;
}

function GamePage({ setPage }: GamePageProps) {
  const { cards, getRandomCard, getCovert, resetCards } = useCard()

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

  const handdleEndGame = () => {
    setPage("menu")
    resetCards()
  }

  if (!card) {
    handleNewCard()
  }

  return (
    <>
      <button
        className="absolute top-5 left-5 font-bold bg-red text-white px-2 py-2 rounded hover:bg-red-600"
        onClick={handdleEndGame}
      >
        <MoveLeft />
      </button>
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
              className="absolute w-8/9 bottom-10 font-bold bg-blue text-white text-4xl px-4 py-8 rounded-2xl hover:bg-blue-600"
              onClick={handleNewCard}
            >
              Nueva Carta
            </button>
          </>
        )
      }
    </>
  );
}

export default GamePage;
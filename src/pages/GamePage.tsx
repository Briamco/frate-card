import { useEffect, useRef, useState } from "react";
import { useCard } from "../hooks/useCard";
import type { CardCategory } from "../services/card";
import Confetti from "react-confetti-boom";
import Card from "../components/Card";
import { MoveLeft } from "lucide-react";

interface GamePageProps {
  setPage: React.Dispatch<React.SetStateAction<"menu" | "game">>;
}

function GamePage({ setPage }: GamePageProps) {
  const { cards, coverts, getRandomCard, getCovert, resetCards } = useCard();

  const [count, setCount] = useState<number>(0);
  const [card, setCard] = useState<string>("");
  const [covert, setCovert] = useState<string>("");
  const [revealed, setRevealed] = useState<boolean>(false);
  const [showAllCoverts, setShowAllCoverts] = useState<boolean>(false);
  const [covertIndex, setCovertIndex] = useState<number>(0);
  const intervalIdRef = useRef<number | null>(null);

  const handleNewCard = () => {
    const newCard = getRandomCard();
    console.log(`Carta número: ${count + 1}`);
    if (newCard) {
      setCard(newCard);
      const category = newCard.split('/').slice(-2, -1)[0].toUpperCase();
      const newCovert = getCovert(category as keyof typeof CardCategory);
      if (newCovert) {
        setCovert(newCovert);
      }
      setRevealed(false);
      setCount(count + 1);
      setShowAllCoverts(true);
    }
  };

  const handleEndGame = () => {
    setPage("menu");
    resetCards();
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  useEffect(() => {
    if (showAllCoverts) {
      const timer = setTimeout(() => {
        setShowAllCoverts(false);
        setRevealed(true);
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      }, 2000);

      const id = setInterval(() => {
        setCovertIndex((prevIndex) => (prevIndex + 1) % coverts.length);
      }, 100); // Cambia cada 100 ms

      intervalIdRef.current = id;
      return () => {
        clearTimeout(timer);
        clearInterval(id);
      };
    }
  }, [showAllCoverts, coverts.length]);

  if (!card) {
    handleNewCard();
  }

  return (
    <>
      <button
        className="absolute top-5 left-5 font-bold bg-red text-white px-2 py-2 rounded hover:bg-red-600"
        onClick={handleEndGame}
      >
        <MoveLeft />
      </button>
      {
        cards.length === 0 ? (
          <>
            <p>No tenemos cartas disponibles.</p>
            <button
              className="action-btn absolute font-bold bg-blue text-white text-4xl px-4 py-8 rounded-2xl hover:bg-blue-600"
              onClick={() => resetCards()}
            >
              Reiniciar juego
            </button>
          </>
        ) : (
          <>
            {showAllCoverts ? (
              <div>
                <Card key={covertIndex} imgUrl={coverts[covertIndex].src} />
              </div>
            ) : (
              <Card imgUrl={revealed ? card : covert} covert={false} />
            )}
            {revealed ? <Confetti mode="boom" particleCount={50} /> : null}

            <button
              className="action-btn absolute font-bold bg-blue text-white text-4xl px-4 py-8 rounded-2xl hover:bg-blue-600"
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
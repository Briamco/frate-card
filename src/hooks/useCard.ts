import { useEffect, useState } from "react"
import type { Card } from "../services/card"

export const useCard = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [coverts, setCoverts] = useState<Card[]>([])
  const [usedCards, setUsedCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    import("../services/card").then(({ Cards, Coverts }) => {
      setCards(Cards)
      setCoverts(Coverts)
    })
  }, [])

  const getRandomCard = (): string | null => {
    if (cards.length === 0 || usedCards.size === cards.length) return null

    let randomIndex: number
    let card: Card

    do {
      randomIndex = Math.floor(Math.random() * cards.length)
      card = cards[randomIndex]
    } while (usedCards.has(card.src))

    usedCards.add(card.src)
    setUsedCards(new Set(usedCards))
    setCards(cards.filter(c => c.src !== card.src))

    return card.src
  }

  const getCovert = (category: string): string | null => {
    if (coverts.length === 0) return null
    const covert = coverts.find(covert => covert.category === category)
    return covert?.src || null
  }

  return { cards, getRandomCard, getCovert }
}
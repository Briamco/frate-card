interface CardProps {
  imgUrl: string;
  covert?: boolean;
}

function Card({ imgUrl, covert }: CardProps) {
  return (
    <>
      <img src={imgUrl} className={`rounded-2xl max-h-180 ${covert ? "" : "animate-little-bounce cursor-pointer"}`} />
    </>
  )
}

export default Card
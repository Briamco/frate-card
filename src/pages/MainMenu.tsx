interface MainMenuProps {
  setPage: React.Dispatch<React.SetStateAction<"menu" | "game">>;
}

function MainMenu({ setPage }: MainMenuProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-20">
        <img src="imgs/logo.webp" alt="Logo FML" />
        <h1 className="text-4xl text-gray-500">Bienveido a</h1>
        <h1 className="text-6xl">
          <span className="text-blue">Fra</span>
          <span className="text-red">ti C</span>
          <span className="text-green">ard</span>
        </h1>
      </div>
      <button
        className="absolute w-8/9 bottom-10 font-bold bg-blue cursor-pointer text-white text-4xl px-4 py-8 rounded-2xl hover:bg-blue-600"
        onClick={() => setPage("game")}
      >
        Iniciar Juego
      </button>
    </>
  );
}

export default MainMenu;
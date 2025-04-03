import { useState } from "react";

export default function Home() {
  const [gameState, setGameState] = useState("start");
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [revealCards, setRevealCards] = useState(false);
  const [winner, setWinner] = useState(null);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [playerTotal, setPlayerTotal] = useState(0);

  // Function to get the correct image path for a card
  const getCardImage = (card) => {
    return `/cards/${card.name}.svg`; // Assuming card images are in /public/cards/
  };

  const generateRandomCard = () => {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
    const suits = ["C", "S", "H", "D"]; // Clubs, Spades, Hearts, Diamonds

    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];

    return { name: `${value}${suit}`, value }; // Name follows your format
  };

  const startGame = () => {
    setGameState("playing");
    setPlayerHand([generateRandomCard(), generateRandomCard()]);
    setDealerHand([generateRandomCard(), generateRandomCard()]);
    setWinner(null);
    setDealerTotal(0);
    setPlayerTotal(0);
  };

  const hit = () => {
    setPlayerHand((prev) => [...prev, generateRandomCard()]);
  };

  const calculateTotal = (hand) => {
    return hand.reduce((total, card) => {
      if (card.value === "A") return total + 11;
      if (["T", "J", "Q", "K"].includes(card.value)) return total + 10;
      return total + parseInt(card.value, 10);
    }, 0);
  };

  const stay = () => {
    setRevealCards(true); 
    let dealerHandCopy = [...dealerHand];
    let dealerTotal = calculateTotal(dealerHandCopy);
    setDealerTotal(dealerTotal);

    const dealerDraw = () => {
      if (dealerTotal < 17) {
        const newCard = generateRandomCard();
        dealerHandCopy.push(newCard);
        dealerTotal = calculateTotal(dealerHandCopy);
        setDealerHand([...dealerHandCopy]);
        setDealerTotal(dealerTotal);
        setTimeout(dealerDraw, 1000); // Delay for dealer drawing card
      } else {
        determineWinner(dealerTotal);
      }
    };

    dealerDraw();
  };

  const determineWinner = (dealerTotal) => {
    const playerTotal = calculateTotal(playerHand);
    setPlayerTotal(playerTotal);

    if (playerTotal > 21) setWinner("Dealer");
    else if (dealerTotal > 21) setWinner("Player");
    else if (playerTotal > dealerTotal) setWinner("Player");
    else if (dealerTotal > playerTotal) setWinner("Dealer");
    else setWinner("Tie");

    setGameState("end");
  };

  const playAgain = () => {
    setGameState("start");
    setPlayerHand([]);
    setDealerHand([]);
    setRevealCards(false);
    setWinner(null);
    setDealerTotal(0);
    setPlayerTotal(0);
  };

  return (
    <main className="w-screen h-screen bg-[url('/casino.jpg')] bg-cover flex flex-col items-center justify-center">
      {gameState === "start" && (
        <div className="flex justify-center h-full items-center flex-col text-white">
          <h1 className="text-6xl font-bold">BLACKJACK</h1>
          <button
            className="bg-green-700 py-2 text-white font-bold w-32 mt-8 hover:text-green-700 hover:bg-white rounded-full"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="relative w-3/4 h-2/3 bg-green-700 border-8 border-black p-4 flex flex-col justify-between rounded-lg">
          <div className="absolute top-4 w-full text-center text-white">
            <h2 className="font-bold text-xl">Dealer</h2>
            <div className="flex justify-center gap-6">
              {dealerHand.map((card, index) => (
                <div key={index} className="w-24 h-36">
                  {index === 0 && !revealCards ? (
                    <img src="/cards/1B.svg" alt="Hidden card" className="w-full h-full" />
                  ) : (
                    <img src={getCardImage(card)} alt={card.name} className="w-full h-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 w-full text-center text-white">
            <h2 className="font-bold text-xl">Deg (Spiller)</h2>
            <div className="flex justify-center gap-6">
              {playerHand.map((card, index) => (
                <div key={index} className="w-24 h-36">
                  <img src={getCardImage(card)} alt={card.name} className="w-full h-full" />
                </div>      
              ))}
            </div>
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-700 py-2 text-white font-bold w-24 mr-4 rounded-full hover:text-green-700 hover:bg-white"
            onClick={hit}
          >
            HIT
          </button>
          <button
            className="bg-red-700 py-2 text-white font-bold w-24 ml-4 rounded-full hover:text-red-700 hover:bg-white"
            onClick={stay}
          >
            STAY
          </button>
        </div>
      )}

      {gameState === "end" && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-white flex-col">
          <h2 className="text-4xl font-bold mb-4">Winner: {winner}</h2>
          <p className="text-2xl">Player Score: {playerTotal}</p>
          <p className="text-2xl">Dealer Score: {dealerTotal}</p>
          <button
            className="bg-blue-700 py-2 text-white font-bold w-32 mt-8 hover:text-blue-700 hover:bg-white rounded-full"
            onClick={playAgain}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}

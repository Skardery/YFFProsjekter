import { useState, useEffect } from "react";

export default function Home() {
  const [gameState, setGameState] = useState("start");
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [revealCards, setRevealCards] = useState(false);
  const [winner, setWinner] = useState(null);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [playerTotal, setPlayerTotal] = useState(0);

  const getCardImage = (card) => `/cards/${card.name}.svg`;

  const generateRandomCard = () => {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
    const suits = ["C", "S", "H", "D"];
    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { name: `${value}${suit}`, value };
  };

  const calculateTotal = (hand) => {
    let total = 0;
    let aceCount = 0;

    hand.forEach((card) => {
      if (card.value === "A") {
        total += 11;
        aceCount += 1;
      } else if (["T", "J", "Q", "K"].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value, 10);
      }
    });

    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount -= 1;
    }

    return total;
  };

  useEffect(() => {
    const playerScore = calculateTotal(playerHand);
    setPlayerTotal(playerScore);

    if (revealCards) {
      const dealerScore = calculateTotal(dealerHand);
      setDealerTotal(dealerScore);
    }
  }, [playerHand, dealerHand, revealCards]);

  const startBetting = () => setGameState("betting");

  const placeBet = (amount) => {
    if (amount > balance) return;
    setBet(amount);
    setBalance((prev) => prev - amount);
    setTimeout(() => {
      startGame();
    }, 500);
  };

  const startGame = () => {
    setGameState("playing");
    setPlayerHand([generateRandomCard(), generateRandomCard()]);
    setDealerHand([generateRandomCard(), generateRandomCard()]);
    setWinner(null);
    setRevealCards(false);
    setDealerTotal(0);
    setPlayerTotal(0);
  };

  const hit = () => {
    setPlayerHand((prev) => [...prev, generateRandomCard()]);
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
        setTimeout(dealerDraw, 1000);
      } else {
        determineWinner(dealerTotal);
      }
    };

    dealerDraw();
  };

  const determineWinner = (dealerTotal) => {
    const playerTotal = calculateTotal(playerHand);
    setPlayerTotal(playerTotal);

    if (playerTotal > 21) {
      setWinner("Dealer");
    } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setWinner("Player");
      setBalance((prev) => prev + bet * 2);
    } else if (dealerTotal > playerTotal) {
      setWinner("Dealer");
    } else {
      setWinner("Tie");
      setBalance((prev) => prev + bet); // Refund bet
    }

    setGameState("end");
  };

  const playAgain = () => {
    setGameState("betting");
    setPlayerHand([]);
    setDealerHand([]);
    setRevealCards(false);
    setWinner(null);
    setDealerTotal(0);
    setPlayerTotal(0);
    setBet(0);
  };

  return (
    <main className="w-screen h-screen bg-[url('/casino.jpg')] bg-cover flex flex-col items-center justify-center text-white">
      {gameState === "start" && (
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold">BLACKJACK</h1>
          <p className="mt-4 text-2xl">Balance: ${balance}</p>
          <button
            className="bg-green-700 py-2 px-6 mt-8 rounded-full hover:bg-white hover:text-green-700 font-bold"
            onClick={startBetting}
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "betting" && (
        <div className="flex flex-col items-center bg-black bg-opacity-70 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Place Your Bet</h2>
          <p className="text-xl mb-2">Current Balance: ${balance}</p>
          <div className="flex gap-4 flex-wrap justify-center mt-4">
            {[1, 5, 10, 50, 100].map((amount) => (
              <button
                key={amount}
                disabled={amount > balance}
                className="bg-yellow-500 hover:bg-white hover:text-yellow-500 text-black font-bold py-2 px-4 rounded-full disabled:opacity-50"
                onClick={() => placeBet(amount)}
              >
                Bet ${amount}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <>
          <div className="relative w-3/4 h-2/3 bg-green-700 border-8 border-black p-4 flex flex-col justify-between rounded-lg">
            <div className="absolute top-4 w-full text-center text-white">
              <h2 className="font-bold text-xl">Dealer</h2>
              {revealCards && <p className="text-lg mt-1">Score: {dealerTotal}</p>}
              <div className="flex justify-center gap-6 mt-2">
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
              <h2 className="font-bold text-xl">You</h2>
              <p className="text-lg mt-1">Score: {playerTotal}</p>
              <div className="flex justify-center gap-6 mt-2">
                {playerHand.map((card, index) => (
                  <div key={index} className="w-24 h-36">
                    <img src={getCardImage(card)} alt={card.name} className="w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-green-700 py-2 px-6 mr-4 rounded-full hover:bg-white hover:text-green-700 font-bold"
              onClick={hit}
            >
              HIT
            </button>
            <button
              className="bg-red-700 py-2 px-6 ml-4 rounded-full hover:bg-white hover:text-red-700 font-bold"
              onClick={stay}
            >
              STAY
            </button>
          </div>
        </>
      )}

      {gameState === "end" && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-white flex-col">
          <h2 className="text-4xl font-bold mb-4">Winner: {winner}</h2>
          <p className="text-2xl">Player Score: {playerTotal}</p>
          <p className="text-2xl">Dealer Score: {dealerTotal}</p>
          <p className="text-2xl mt-4">Current Balance: ${balance}</p>
          <button
            className="bg-blue-700 py-2 px-6 mt-6 rounded-full hover:bg-white hover:text-blue-700 font-bold"
            onClick={playAgain}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}

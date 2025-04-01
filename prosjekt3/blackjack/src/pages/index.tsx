import { useState } from 'react';

const initialDeck = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
];

const getRandomCard = () => {
  return initialDeck[Math.floor(Math.random() * initialDeck.length)];
};

const calculateHandValue = (hand) => {
  let value = 0;
  let aceCount = 0;

  hand.forEach(card => {
    if (card === 'J' || card === 'Q' || card === 'K') {
      value += 10;
    } else if (card === 'A') {
      value += 11;
      aceCount++;
    } else {
      value += parseInt(card);
    }
  });

  while (value > 21 && aceCount) {
    value -= 10;
    aceCount--;
  }

  return value;
};

export default function Home() {
  const [gameState, setGameState] = useState('start');
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([getRandomCard(), getRandomCard()]);
    setPlayerScore(calculateHandValue(playerHand));
    setDealerScore(calculateHandValue(dealerHand));
  };

  const hit = () => {
    const newCard = getRandomCard();
    const newPlayerHand = [...playerHand, newCard];
    setPlayerHand(newPlayerHand);
    setPlayerScore(calculateHandValue(newPlayerHand));

    if (calculateHandValue(newPlayerHand) > 21) {
      setGameState('end');
    }
  };

  const stay = () => {
    let newDealerHand = [...dealerHand];
    let dealerValue = calculateHandValue(newDealerHand);

    while (dealerValue < 17) {
      newDealerHand.push(getRandomCard());
      dealerValue = calculateHandValue(newDealerHand);
    }

    setDealerHand(newDealerHand);
    setDealerScore(dealerValue);

    setGameState('end');
  };

  const playAgain = () => {
    setGameState('start');
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
  };

  const determineWinner = () => {
    if (playerScore > 21) return 'You busted! Dealer wins!';
    if (dealerScore > 21) return 'Dealer busted! You win!';
    if (playerScore > dealerScore) return 'You win!';
    if (playerScore < dealerScore) return 'Dealer wins!';
    return 'It\'s a tie!';
  };

  return (
    <main className="w-screen h-screen bg-[url('/casino.jpg')] bg-cover flex flex-col items-center justify-center">
      {gameState === 'start' && (
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

      {gameState === 'playing' && (
        <div className="relative w-3/4 h-2/3 bg-green-700 border-8 border-black rounded-full p-4 flex flex-col justify-between">
          <div className="absolute top-4 w-full text-center text-white">
            <h2 className="font-bold">Dealer</h2>
            <div className="flex justify-center gap-4">
              {dealerHand.map((card, index) => (
                <div
                  key={index}
                  className="card w-20 h-28 bg-white rounded-xl shadow-md flex justify-center items-center text-lg font-bold"
                >
                  {card}
                </div>
              ))}
            </div>
            <p className="mt-2">Score: {dealerScore}</p>
          </div>

          <div className="absolute bottom-4 w-full text-center text-white">
            <h2 className="font-bold">Player</h2>
            <div className="flex justify-center gap-4">
              {playerHand.map((card, index) => (
                <div
                  key={index}
                  className="card w-20 h-28 bg-white rounded-xl shadow-md flex justify-center items-center text-lg font-bold"
                >
                  {card}
                </div>
              ))}
            </div>
            <p className="mt-2">Score: {playerScore}</p>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
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

      {gameState === 'end' && (
        <div className="flex justify-center h-full items-center flex-col text-white">
          <h2 className="text-4xl font-bold mb-4">{determineWinner()}</h2>
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

export default function Home() {
  return (
    <>
      <main className="w-screen h-screen bg-[url('/casino.jpg')] bg-cover">
        <div className="flex justify-center h-[10%] items-center">
          <h1 className="text-6xl font-bold text-white">BLACKJACK</h1>
        </div>
        <div className="w-full h-[80%] flex justify-center items-center">
          <div className="w-3/4 h-3/4 bg-green-700  border-8 border-black rounded-full"></div>
        </div>
        <div className="flex justify-center h-[10%] items-center">
          <button className="bg-green-700 py-2 text-white font-bold w-24 mr-1 hover:text-green-700 hover:bg-white">HIT</button>
          <button className="bg-red-700 py-2 text-white font-bold w-24 ml-1 hover:text-red-700 hover:bg-white">STAY</button>
        </div>
      </main>
    </>
  )
} 
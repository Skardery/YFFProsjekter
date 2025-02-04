import Link from "next/link"

export default function Velkommen() {
  return (
    <>
      <main className="w-screen h-screen bg-gray-300 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <p className="font-bold text-6xl">Database interface</p>
          <p className="mt-4 mb-6">I dette prosjektet så skal jeg gjøre det lettere å få informasjon/data ut og inn i en database via en live interface direkte på nettsiden. </p>
          <Link href="/database"><button className="h-[4rem] bg-gray-600 text-white px-8 rounded-md border border-gray-600 hover:bg-gray-300 hover:text-gray-600">Gå til database</button></Link>
        </div>
      </main>
    </>
  )
}
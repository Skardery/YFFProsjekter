import Link from "next/link"

export default function Database() {
    return (
        <>
            <main className="w-screen h-screen bg-gray-300 flex">
                <div className="w-3/4 p-8">
                
                </div>
                <div className="w-1/4 bg-gray-400 p-4">
                    <div>
                        <p className="text-2xl font-bold">Data-filtrering   </p>
                        <div className="mt-8">
                            <p className="font-bold text-2xl">Søk:</p>
                            <input className="mt-2 px-4 py-2 outline-none w-2/3 rounded-md bg-gray-300" placeholder="Søk på..." type="text" />
                        </div>   
                        <div>
                            <p className="font-bold text-2xl mt-8">Kategorier:</p>   
                            <div className="flex items-center py-4">
                                <input type="radio" className="w-4 h-4 mr-4             " />
                                <p className="">Kategori 1 (Lokalt)</p>
                            </div>
                            <div className="flex items-center py-4">
                                <input type="radio" className="w-4 h-4 mr-4             " />
                                <p className="">Kategori 2 (Cloud-Hosting)</p>
                            </div>
                            <div className="flex items-center py-4">
                                <input type="radio" className="w-4 h-4 mr-4             " />
                                <p className="  ">Kategori 3 (DNS-Server)</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-2xl mt-8">Klasser:</p>   
                            <div className="flex items-center py-4">
                                <input type="checkbox" className="w-4 h-4 mr-4             " />
                                <p className="">Klasse 1</p>
                            </div>
                            <div className="flex items-center py-4">
                                <input type="checkbox" className="w-4 h-4 mr-4             " />
                                <p className="">Klasse 2</p>
                            </div>
                        </div>     
                    </div>
                    <div className="h-flex">
                        <Link href="/input"><button className="w-2/3 px-8 py-4 bg-gray-300 mt-[18rem] rounded-md outline-none hover:bg-gray-400 hover:bg-white">Legg til ny data</button></Link>    
                    </div>                
                </div>
            </main>
        </>
    )
}
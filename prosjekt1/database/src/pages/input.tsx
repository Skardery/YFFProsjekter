import React, { useState } from "react";

export default function Input() {

    return (
        <main className="w-screen h-screen bg-gray-300 flex ">
            <div className="w-3/4 bg-gray-300 p-8 flex">
                <div className="w-1/2 h-full">
                        <div>
                            <p className="text-gray-500">Navn</p>
                            <input className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg" type="text" />
                        </div>
                        <div>
                            <p className="text-gray-500 mt-8">Beskrivelse</p>
                            <input className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%]" type="text" />
                        </div>
                        <div className="flex justify-between w-1/2">
                            <div>
                            <p className="text-gray-500 mt-8">Kateogri</p>   
                                <div className="flex items-center py-4">
                                    <input type="radio" className="w-4 h-4 mr-4" />
                                    <p className="">Kategori 1</p>
                                </div>
                                <div className="flex items-center py-4">
                                    <input type="radio" className="w-4 h-4 mr-4" />
                                    <p className="">Kategori 2</p>
                                </div>
                                <div className="flex items-center py-4">
                                    <input type="radio" className="w-4 h-4 mr-4" />
                                    <p className="">Kategori 3</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-500 mt-8">Type</p>  
                                <div className="flex items-center py-4">
                                    <input type="checkbox" className="w-4 h-4 mr-4" />
                                    <p className="">Klasse 1</p>
                                </div>
                                <div className="flex items-center py-4">
                                    <input type="checkbox" className="w-4 h-4 mr-4" />
                                    <p className="">Klasse 2</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 mt-8">Informasjon</p>
                            <textarea className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%] h-[15rem] resize-none" />
                        </div>
                        <div className="">
                            <p className="text-gray-500 mt-8">Bilde-url 1</p>
                            <input className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%]" type="text" />
                        </div>
                        <div>
                            <p className="text-gray-500 mt-8">Bilde-url 2</p>
                            <input className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%]" type="text" />
                        </div>    
                    </div>
                <div className="w-1/2 h-flex">
                    <div className="w-full h-full">
                        <div className="h-[48%] bg-gray-200 rounded-md"></div>
                        <div className="h-[48%] mt-9 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>





            <div className="w-1/4 bg-gray-200 flex justify-center">
                <button className="bg-white h-[4rem] px-8 py-4 w-4/5 mt-12 rounded-md hover:bg-gray-500 hover:text-white border border-white">Legg til data</button>
            </div>
        </main>
    );
}

import React, { useState } from 'react';
import { database, ref, push, set } from '@/components/firebase';

export default function Input() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState([]); 
  const [information, setInformation] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');

  const handleSubmit = () => {
    const data = {
      name,
      description,
      category,
      type,
      information,
      imageUrl1,
      imageUrl2,
    };

    const newEntryRef = push(ref(database, 'entries'));
    set(newEntryRef, data)
      .then(() => {
        alert('Data added successfully!');
      })
      .catch((error) => {
        alert('Error adding data: ' + error.message);
      });
  };

  return (
    <main className="w-screen h-screen bg-gray-300 flex ">
      <div className="w-3/4 bg-gray-300 p-8 flex">
        <div className="w-1/2 h-full">
          <div>
            <p className="text-gray-500">Navn</p>
            <input
              className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p className="text-gray-500 mt-8">Beskrivelse</p>
            <input
              className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%]"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-1/2">
            <div>
              <p className="text-gray-500 mt-8">Kontinent</p>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Europa'}
                  onChange={() => setCategory('Europa')}
                />
                <p className="">Europa</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Nord Amerika'}
                  onChange={() => setCategory('Nord Amerika')}
                />
                <p className="">Nord Amerika</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Sør Amerika'}
                  onChange={() => setCategory('Sør Amerika')}
                />
                <p className="">Sør Amerika</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Afrika'}
                  onChange={() => setCategory('Afrika')}
                />
                <p className="">Afrika</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Asia'}
                  onChange={() => setCategory('Asia')}
                />
                <p className="">Asia</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Oceania'}
                  onChange={() => setCategory('Oceania')}
                />
                <p className="">Oceania</p>
              </div>  
            </div>

            <div>
              <p className="text-gray-500 mt-8">I/U land</p>
              <div className="flex items-center py-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-4"
                  checked={type.includes('I land')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setType([...type, 'I land']);
                    } else {
                      setType(type.filter((t) => t !== 'I land'));
                    }
                  }}
                />
                <p className="">I land</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-4"
                  checked={type.includes('U land')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setType([...type, 'U land']);
                    } else {
                      setType(type.filter((t) => t !== 'U land'));
                    }
                  }}
                />
                <p className="">U land</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-500 mt-8">Informasjon</p>
            <textarea
              className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%] h-[4rem] resize-none"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </div>
          <div>
            <p className="text-gray-500 mt-8">Bilde-url 1</p>
            <input
              className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%]"
              type="text"
              value={imageUrl1}
              onChange={(e) => setImageUrl1(e.target.value)}
            />
          </div>
          <div>
            <p className="text-gray-500 mt-8">Bilde-url 2</p>
            <input
              className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%]"
              type="text"
              value={imageUrl2}
              onChange={(e) => setImageUrl2(e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/2 h-flex">
          <div className="w-full h-full">
            <div className="h-[48%] bg-gray-200 rounded-md">
              {imageUrl1 ? (
                <img
                  src={imageUrl1}
                  alt="Image 1 Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <p className="text-center text-gray-500">Bilde kan ikke vises...</p>
              )}
            </div>
            <div className="h-[48%] mt-9 bg-gray-200 rounded-md">
              {imageUrl2 ? (
                <img
                  src={imageUrl2}
                  alt="Image 2 Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <p className="text-center text-gray-500">Bilde kan ikke vises...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/4 bg-gray-200 flex justify-center">
        <button
          className="bg-white h-[4rem] px-8 py-4 w-4/5 mt-12 rounded-md hover:bg-gray-500 hover:text-white border border-white"
          onClick={handleSubmit}
        >
          Legg til data
        </button>
      </div>
    </main>
  );
}

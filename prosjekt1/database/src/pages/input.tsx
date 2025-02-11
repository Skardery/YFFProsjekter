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
              <p className="text-gray-500 mt-8">Kategori</p>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Kategori 1'}
                  onChange={() => setCategory('Kategori 1')}
                />
                <p className="">Kategori 1</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Kategori 2'}
                  onChange={() => setCategory('Kategori 2')}
                />
                <p className="">Kategori 2</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="radio"
                  className="w-4 h-4 mr-4"
                  checked={category === 'Kategori 3'}
                  onChange={() => setCategory('Kategori 3')}
                />
                <p className="">Kategori 3</p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 mt-8">Type</p>
              <div className="flex items-center py-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-4"
                  checked={type.includes('Klasse 1')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setType([...type, 'Klasse 1']);
                    } else {
                      setType(type.filter((t) => t !== 'Klasse 1'));
                    }
                  }}
                />
                <p className="">Klasse 1</p>
              </div>
              <div className="flex items-center py-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-4"
                  checked={type.includes('Klasse 2')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setType([...type, 'Klasse 2']);
                    } else {
                      setType(type.filter((t) => t !== 'Klasse 2'));
                    }
                  }}
                />
                <p className="">Klasse 2</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-500 mt-8">Informasjon</p>
            <textarea
              className="outline-none border border-gray-400 px-4 py-2 rounded-r-lg w-[90%] h-[15rem] resize-none"
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

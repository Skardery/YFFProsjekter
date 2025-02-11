import React, { useEffect, useState } from "react";
import Link from "next/link";
import { get, ref } from "firebase/database";
import { database } from "@/components/firebase";

export default function Database() {
  const [entries, setEntries] = useState<any[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  useEffect(() => {
    const dbRef = ref(database, 'entries');
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const entryList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setEntries(entryList);
          setFilteredEntries(entryList); // Set initial entries as filtered entries
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterEntries(query, selectedCategory, selectedClasses);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterEntries(searchQuery, category, selectedClasses);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>, className: string) => {
    const newClasses = e.target.checked
      ? [...selectedClasses, className]
      : selectedClasses.filter((item) => item !== className);

    setSelectedClasses(newClasses);
    filterEntries(searchQuery, selectedCategory, newClasses);
  };

  const filterEntries = (query: string, category: string, classes: string[]) => {
    let filtered = entries;

    if (query) {
      filtered = filtered.filter((entry) =>
        entry.name.toLowerCase().includes(query.toLowerCase()) ||
        entry.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((entry) => entry.category === category);
    }

    if (classes.length > 0) {
      filtered = filtered.filter((entry) =>
        entry.type.some((item: string) => classes.includes(item))
      );
    }

    setFilteredEntries(filtered);
  };

  return (
    <main className="w-screen h-screen bg-gray-300 flex">
      <div className="w-3/4 p-8">
        <div className="grid grid-cols-5 gap-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-4 rounded-md shadow-md flex flex-col items-center">
                <img
                  src={entry.imageUrl1}
                  alt={entry.name}
                  className="w-full h-56 object-cover rounded-md mb-4"
                />
                <h3 className="font-bold">{entry.name}</h3>
                <p className="text-gray-500 text-sm">{entry.category}</p>
                <p className="mt-2">{entry.description}</p>
                <Link href={`/entry/${entry.id}`}>
                  <button className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700">
                    Se mer informasjon
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p>Ingen data funnet.......</p>
          )}
        </div>
      </div>

      <div className="w-1/4 bg-gray-200 p-4">
        <div>
          <p className="font-bold text-2xl">Søk:</p>
          <input
            className="mt-2 px-4 py-2 outline-none w-[90%] rounded-md bg-white"
            placeholder="Søk på..."
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <p className="font-bold text-2xl mt-8">Kategorier:</p>
          <div className="flex items-center py-4">
            <input
              type="radio"
              className="w-4 h-4 mr-4"
              checked={selectedCategory === "Kategori 1"}
              onChange={() => handleCategoryChange("Kategori 1")}
            />
            <p className="">Kategori 1</p>
          </div>
          <div className="flex items-center py-4">
            <input
              type="radio"
              className="w-4 h-4 mr-4"
              checked={selectedCategory === "Kategori 2"}
              onChange={() => handleCategoryChange("Kategori 2")}
            />
            <p className="">Kategori 2</p>
          </div>
          <div className="flex items-center py-4">
            <input
              type="radio"
              className="w-4 h-4 mr-4"
              checked={selectedCategory === "Kategori 3"}
              onChange={() => handleCategoryChange("Kategori 3")}
            />
            <p className="">Kategori 3</p>
          </div>
        </div>

        <div>
          <p className="font-bold text-2xl mt-8">Klasser:</p>
          <div className="flex items-center py-4">
            <input
              type="checkbox"
              className="w-4 h-4 mr-4"
              checked={selectedClasses.includes("Klasse 1")}
              onChange={(e) => handleClassChange(e, "Klasse 1")}
            />
            <p className="">Klasse 1</p>
          </div>
          <div className="flex items-center py-4">
            <input
              type="checkbox"
              className="w-4 h-4 mr-4"
              checked={selectedClasses.includes("Klasse 2")}
              onChange={(e) => handleClassChange(e, "Klasse 2")}
            />
            <p className="">Klasse 2</p>
          </div>
        </div>

        <div className="h-flex">
          <Link href="/input">
            <button className="w-2/3 px-8 py-4 bg-gray-300 mt-[21rem] rounded-md outline-none hover:bg-gray-400 hover:bg-white">
              Legg til ny data
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

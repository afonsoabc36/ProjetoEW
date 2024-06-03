import React from "react";
import { useEffect, useState } from "react";
import UCService from "../services/UCService";

const HomePage = () => {
  const [ucs, setUcs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UCService.getUCs();
        console.log(data);
        setUcs(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {ucs?.map((uc) => (
        <div
          key={uc._id}
          className="block bg-gray-600 m-4 border border-gray-500 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 cursor-pointer"
          onClick={() => window.location.replace(`/uc/${uc.sigla}`)}
        >
          <div className="text-center">
            <div className="p-6 bg-gray-700">
              <h2 className="text-bold text-2xl">{uc.sigla}</h2>
            </div>
            <hr className="border border-gray-500" />
            <div className="p-4">
              <h4>{uc.titulo}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

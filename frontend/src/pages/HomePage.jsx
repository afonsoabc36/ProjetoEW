import React from "react";
import { useEffect, useState } from "react";
import UCService from "../services/UCService";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";

const HomePage = () => {
  const [ucs, setUcs] = useState([]);
  const [filteredUCs, setFilteredUCs] = useState([]);
  const [searchUC, setSearchUC] = useState("");

  useEffect(() => {
    setFilteredUCs(
      ucs.filter(
        (uc) =>
          uc.titulo.toLowerCase().includes(searchUC.toLowerCase()) ||
          uc.sigla.toLowerCase().includes(searchUC.toLowerCase())
      )
    );
  }, [searchUC, ucs]);

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

  const onChangeSearch = (e) => {
    setSearchUC(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center mt-8">Unidades Curriculares</h1>
      <Input
        type="search"
        placeholder="Pesquisar UC"
        className="w-full mt-4"
        id="searchUC"
        value={searchUC}
        onChange={onChangeSearch}
      />

      {filteredUCs?.map((uc) => (
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
      <div className="p-4">
        <Link to="/uc/criar">
          <Button className="w-full">Adicionar UC</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

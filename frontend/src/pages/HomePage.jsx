import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UCService from "../services/UCService";
import Input from "../components/common/Input";
import { useAuth } from "../hooks/AuthProvider";
import Button from "../components/common/Button";
import userService from "../services/userService";

const HomePage = () => {
  const { user } = useAuth();
  const [ucs, setUcs] = useState([]);
  const [searchUC, setSearchUC] = useState("");
  const [favoriteUCs, setFavoriteUCs] = useState([]);
  const [filteredUCs, setFilteredUCs] = useState([]);
  const [searchPreference, setSearchPreference] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UCService.getUCs();
        setUcs(data);

        if (user) {
          const favoritesData = await userService.getUserFavoriteUCs(
            user.email
          );
          setFavoriteUCs(favoritesData);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = searchPreference
      ? ucs.filter(
          (uc) =>
            uc.titulo.toLowerCase().includes(searchUC.toLowerCase()) ||
            uc.sigla.toLowerCase().includes(searchUC.toLowerCase())
        )
      : ucs.filter((uc) =>
          uc.docentes.some(
            (docente) =>
              (docente.email &&
                docente.email.toLowerCase().includes(searchUC.toLowerCase())) ||
              (docente.nome &&
                docente.nome.toLowerCase().includes(searchUC.toLowerCase()))
          )
        );

    const favoriteUCSiglas = new Set(favoriteUCs);

    const favoriteUCsFiltered = favoriteUCs
      .map((sigla) => ucs.find((uc) => uc.sigla === sigla))
      .filter(
        (uc) =>
          uc &&
          (searchPreference
            ? uc.titulo.toLowerCase().includes(searchUC.toLowerCase()) ||
              uc.sigla.toLowerCase().includes(searchUC.toLowerCase())
            : uc.docentes.some(
                (docente) =>
                  (docente.email &&
                    docente.email
                      .toLowerCase()
                      .includes(searchUC.toLowerCase())) ||
                  (docente.nome &&
                    docente.nome.toLowerCase().includes(searchUC.toLowerCase()))
              ))
      )
      .sort((a, b) =>
        a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase())
      );

    const otherUCsFiltered = filtered
      .filter((uc) => !favoriteUCSiglas.has(uc.sigla))
      .sort((a, b) =>
        a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase())
      );

    const mergedUCs = [...favoriteUCsFiltered, ...otherUCsFiltered];

    setFilteredUCs(mergedUCs);
  }, [searchUC, ucs, favoriteUCs, searchPreference]);

  const onChangeSearch = (e) => {
    setSearchUC(e.target.value);
  };

  const toggleFavorite = async (sigla) => {
    try {
      let updatedFavorites = [...favoriteUCs];

      if (updatedFavorites.includes(sigla)) {
        updatedFavorites = updatedFavorites.filter((item) => item !== sigla);
      } else {
        updatedFavorites.push(sigla);
      }

      setFavoriteUCs(updatedFavorites);

      const response = await userService.updateUserFavorites(
        user.email,
        Array.from(updatedFavorites)
      );
      console.log(response);
    } catch (error) {
      console.error("Failed to update favorites", error);
      alert("Failed to update favorites");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center mt-8">Unidades Curriculares</h1>
      <div className="mt-4 min-w-full flex p-4">
        <div className="w-[80%] mx-6">
          <Input
            type="search"
            placeholder="Pesquisar UC"
            className="mt-4"
            id="searchUC"
            value={searchUC}
            onChange={onChangeSearch}
          />
        </div>
        <div className="w-[20%]">
          <select
            className="w-full p-2 bg-gray-700 text-white rounded mt-4"
            value={searchPreference}
            onChange={(e) => setSearchPreference(e.target.value === "true")}
          >
            <option value="true">UCs</option>
            <option value="false">Docente</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredUCs?.map((uc) => (
          <div
            key={uc._id}
            className="block bg-gray-600 m-4 border border-gray-500 rounded-lg shadow-xl transform transition duration-500 hover:scale-[101%] cursor-pointer  overflow-hidden"
            onClick={() => window.location.replace(`/uc/${uc.sigla}`)}
          >
            <div className="text-center">
              <div className="p-6 bg-gray-700">
                <h2 className="text-bold text-2xl">{uc.sigla}</h2>
                <button
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(uc.sigla);
                  }}
                >
                  {favoriteUCs.includes(uc.sigla) ? (
                    <img
                      src={process.env.PUBLIC_URL + "/filledStar.png"}
                      alt="Filled Star"
                      className="h-full w-full"
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/unfilledStar.png"}
                      alt="Unfilled Star"
                      className="h-full w-full"
                    />
                  )}
                </button>
              </div>
              <hr className="border border-gray-500" />
              <div className="p-4">
                <h4>{uc.titulo}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      {user.role !== "student" && (
        <div className="p-4">
          <Link to="/uc/criar">
            <Button className="w-full">Adicionar UC</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;

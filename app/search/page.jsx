"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchProfs } from "@/GlobalRedux/features/prof.reducers";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import NavBar from "@/components/Nav";
import { Spinner } from "@chakra-ui/react";

const Post = ({ post }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    }
    if (halfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          className="text-yellow-500"
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-3">
      <div className="mb-2">
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            width={40}
            height={30}
            style={{ borderRadius: "100%" }}
            src={post.sexe === "M" ? "/user-h.webp" : "/user-f.webp"}
            alt=""
          />
          <span className="text-sm font-semibold">{post.name}</span>
        </div>
        <div style={{ position: "relative" }} className="flex items-center">
          <div
            style={{ position: "absolute", right: "0", bottom: "20px" }}
            className="flex"
          >
            <span>{renderStars(post.averageRating)}</span>
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
          className={post.bio ? "bg-blue-300 h-32 uppercase" : ""}
        >
          <p className={post.bio ? "text-black " : "text-black"}>
            {post.bio ? post.bio : "Aucun bio"}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">Commentaires:</h4>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded mb-2">
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>Aucun avis</p>
        )}
      </div>
    </div>
  );
};

const SearchList = ({ user }) => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    etat: "",
    classe: "",
    serie: "",
    type: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchFilteredProfs = async (filtersToUse) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_PROF}/find`,
        filtersToUse
      );
      dispatch(fetchProfs(response.data));
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des profs filtrés:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    Cookies.set("searchFilters", JSON.stringify(filters), { expires: 7 });
    fetchFilteredProfs(filters);
  };

  const isSearchEnabled = Object.values(filters).every((val) => val !== "");
  useEffect(() => {
    const savedFilters = Cookies.get("searchFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      console.log("Filters from cookie:", parsedFilters); // Vérifier les valeurs récupérées
      setFilters(parsedFilters);
      fetchFilteredProfs(parsedFilters);
    }
  }, []);
  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <select
            name="etat"
            value={filters.etat}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          >
            <option value="">Sélectionner une établissement</option>
            {/* Remplacer par vos options */}
            <option value="CEG VEDOKO">CEG VEDOKO</option>
            <option value="CEG NOKOUE">CEG NOKOUE</option>
          </select>
          <select
            name="classe"
            value={filters.classe}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          >
            <option value="">Sélectionner une salle</option>
            {/* Remplacer par vos options */}
            <option value="Tle">Tle</option>
            <option value="Classe 2">Classe 2</option>
          </select>
          <select
            name="serie"
            value={filters.serie}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          >
            <option value="">Sélectionner une série ou filière</option>
            {/* Remplacer par vos options */}
            <option value="A">A</option>
            <option value="Série 2">Série 2</option>
          </select>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          >
            <option value="">Sélectionner le bâtiment</option>
            {/* Remplacer par vos options */}
            <option value="M2">M2</option>
            <option value="Type 2">Type 2</option>
          </select>
          {loading ? (
            <Spinner />
          ) : (
            <button
              onClick={handleSearch}
              disabled={!isSearchEnabled}
              className={`bg-blue-500 text-white py-2 px-4 rounded mt-2 ${
                !isSearchEnabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Rechercher
            </button>
          )}
        </div>
        {datas?.length >= 0
          ? datas?.map((post) => <Post key={post._id} post={post} />)
          : "Aucn Avis"}
      </div>
    </div>
  );
};

export default SearchList;

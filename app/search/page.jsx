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
import { ProgressSpinner } from "primereact/progressspinner";
import Modal from "react-modal";
import { customStyles } from "@/utils/customStyles";
import { School } from "@/utils/schoolTab";

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
            alt={`Représentation d'image png du ${post.name}`}
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
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [filters, setFilters] = useState({
    etat: "",
    classe: "",
    serie: "",
    type: "",
  });
  const [classesOptions, setClassesOptions] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [typesOptions, setTypesOptions] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (name === "etat") {
      const selectedSchool = School.find((school) => school.etat === value);
      if (selectedSchool) {
        setClassesOptions(selectedSchool.classe);
        setSeriesOptions(selectedSchool.serie);
        setTypesOptions(selectedSchool.type);
      } else {
        setClassesOptions([]);
        setSeriesOptions([]);
        setTypesOptions([]);
      }
    }
  };

  const fetchFilteredProfs = async (filtersToUse) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_PROF}/find`,
        filtersToUse
      );
      if (response.data.length <= 0)
        setError("Aucun commentaire pour cet établissement");
      // console.log(response);
      dispatch(fetchProfs(response.data));
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des profs filtrés:", error);
      setLoading(false);
      openModal(
        "Erreur lors de la récupération des données,veuillez  réessayez plus tard"
      );
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
            {School.map((school) => (
              <option key={school.etat} value={school.etat}>
                {school.etat}
              </option>
            ))}
          </select>
          <select
            name="classe"
            value={filters.classe}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          >
            <option value="">Sélectionner une salle</option>
            {classesOptions.map((classe) => (
              <option key={classe} value={classe}>
                {classe}
              </option>
            ))}
          </select>
          <select
            name="serie"
            value={filters.serie}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          >
            <option value="">Sélectionner une série ou filière</option>
            {seriesOptions.map((serie) => (
              <option key={serie} value={serie}>
                {serie}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          >
            <option value="">Sélectionner le bâtiment</option>
            {typesOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {loading ? (
            <div className="card flex justify-center">
              <ProgressSpinner
                style={{ width: "35px", height: "35px" }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            </div>
          ) : (
            <div className="card flex justify-center">
              <button
                onClick={handleSearch}
                disabled={!isSearchEnabled}
                className={`bg-blue-500 text-white py-2 px-4 rounded mt-2 ${
                  !isSearchEnabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Rechercher
              </button>
            </div>
          )}
        </div>
        {datas?.length >= 0
          ? datas?.map((post) => <Post key={post._id} post={post} />)
          : "Aucun Avis"}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Message Modal"
      >
        <div>{modalContent}</div>
        <button onClick={closeModal}>Fermer</button>
      </Modal>
    </div>
  );
};

export default SearchList;

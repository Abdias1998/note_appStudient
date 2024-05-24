"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfs, addComment } from "@/GlobalRedux/features/prof.reducers";
import Image from "next/image";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Post = ({
  post,
  handleCommentChange,
  handleCommentSubmit,
  handleCommentDelete,
  comments,
  userId,
}) => {
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
            <div
              key={index}
              className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center"
            >
              <p>{comment.text}</p>
              {comment.commentId === userId && (
                <button
                  onClick={() => handleCommentDelete(post._id, comment._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Supprimer
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour cette publication.</p>
        )}
        <textarea
          value={comments[post._id] || ""}
          onChange={(e) => handleCommentChange(post._id, e.target.value)}
          placeholder="Ajouter un commentaire"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          onClick={() => handleCommentSubmit(post._id)}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Commenter
        </button>
      </div>
    </div>
  );
};

const PostList = ({ user }) => {
  const dispatch = useDispatch();
  const profs = useSelector((state) => state.profs.profs);
  const [comments, setComments] = useState({});
  const [loadingState, setLoadingState] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchProfs(user));
    }
  }, [user, dispatch]);

  const handleCommentChange = (postId, value) => {
    setComments({ ...comments, [postId]: value });
  };

  const handleCommentSubmit = async (postId) => {
    if (!comments[postId]) {
      openModal("Le commentaire ne peut pas être vide.");
      return;
    }

    try {
      if (!navigator.onLine) {
        setLoading(false);
        setError("Vérifiez votre connexion internet et réessayez");
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 8000);
        return;
      }
      await axios
        .patch(`${process.env.NEXT_PUBLIC_APP_PROF}/commentPost/${postId}`, {
          commentId: user._id,
          text: comments[postId],
          anonyme: false,
        })
        .then((response) => {
          // Ajouter le nouveau commentaire à la liste des commentaires du post dans l'état Redux
          dispatch(addComment({ postId, comment: response.data }));
          // Réinitialiser l'état local des commentaires pour ce post
          setComments({ ...comments, [postId]: "" });
          openModal("Commentaire ajouté");
        })
        .then(() => {
          dispatch(fetchProfs(user));
        });
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      openModal("Erreur lors de l'ajout du commentaire.");
    }
  };

  const handleCommentDelete = async (postId, commentId) => {
    try {
      await axios
        .delete(
          `${process.env.NEXT_PUBLIC_APP_PROF}/deletePost/${postId}/${commentId}`
        )
        .then(() => {
          dispatch(fetchProfs(user));
          openModal("Commentaire supprimé");
        });
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error);
      openModal("Erreur lors de la suppression du commentaire.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {profs.map((post) => (
        <Post
          key={post._id}
          post={post}
          handleCommentChange={handleCommentChange}
          handleCommentSubmit={handleCommentSubmit}
          handleCommentDelete={handleCommentDelete}
          comments={comments}
          userId={user._id}
        />
      ))}
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

export default PostList;

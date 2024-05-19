"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfs, addComment } from "@/GlobalRedux/features/prof.reducers";
import Image from "next/image";

const Post = ({ post, handleCommentChange, handleCommentSubmit, comments }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-3">
      <div className="mb-2">
        <span className="text-sm font-semibold">
          <Image
            width={40}
            height={30}
            style={{ borderRadius: "100%" }}
            src={post.sexe === "M" ? "/user-h.webp" : "/user-f.webp"}
            alt=""
          />
          {post.name}
        </span>
        <div
          className={
            post.bio
              ? "bg-blue-300 h-32 uppercase flex justify-center m-auto"
              : ""
          }
        >
          <p className={post.bio ? "text-black text-center" : "text-black"}>
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
      alert("Le commentaire ne peut pas être vide.");
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_PROF}/commentPost/${postId}`,
        {
          commentId: user._id,
          text: comments[postId],
          anonyme: false,
        }
      );
      // Ajouter le nouveau commentaire à la liste des commentaires du post dans l'état Redux
      dispatch(addComment({ postId, comment: response.data }));
      // Réinitialiser l'état local des commentaires pour ce post
      setComments({ ...comments, [postId]: "" });
      alert("Commentaire ajouté");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      alert("Erreur lors de l'ajout du commentaire.");
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
          comments={comments}
        />
      ))}
    </div>
  );
};

export default PostList;

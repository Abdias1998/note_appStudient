"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfs } from "@/GlobalRedux/features/prof.reducers";

const Post = ({ post, handleCommentChange, handleCommentSubmit, comments }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-3">
      <div className="mb-2">
        <h3 className="text-xl font-semibold">{post.name}</h3>
        <div className={post.bio ? "bg-blue-300" : ""}>
          <p className={post.bio ? "text-white  " : "text-black  "}>
            {post.bio ? post.bio : "Aucun bio"}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Commentaires:</h4>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded mb-2">
              <p>{comment.text}</p>
              {/* <p className="text-sm text-gray-600">Par: {comment.user}</p> */}
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour cette publication.</p>
        )}
        <textarea
          value={comments[post._id] || ""}
          //   onChange={(e) => handleCommentChange(post._id, e.target.value)}
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
  const [newPostContent, setNewPostContent] = useState("");
  const [comments, setComments] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(fetchProfs(user));
    }
  }, [user, dispatch]);

  const handlePostChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    if (!newPostContent) {
      alert("Le contenu de la publication ne peut pas être vide.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/addPost`,
        {
          content: newPostContent,
          userName: user.name,
        }
      );
      dispatch(addPost(response.data));
      setNewPostContent("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la publication:", error);
      alert("Erreur lors de l'ajout de la publication.");
    }
  };

  const handleCommentChange = (postId, value) => {
    setComments({ ...comments, [postId]: value });
  };

  const handleCommentSubmit = async (postId) => {
    if (!comments[postId]) {
      alert("Le commentaire ne peut pas être vide.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/addCommentToPost/${postId}`,
        {
          text: comments[postId],
          user: user.name,
        }
      );
      dispatch(addComment({ postId, comment: response.data }));
      setComments({ ...comments, [postId]: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      alert("Erreur lors de l'ajout du commentaire.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-3">
        <h2 className="text-2xl font-semibold mb-4">Ajouter une publication</h2>
        <textarea
          value={newPostContent}
          onChange={handlePostChange}
          placeholder="Quoi de neuf?"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
        />
        <button
          onClick={handlePostSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Publier
        </button>
      </div>
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

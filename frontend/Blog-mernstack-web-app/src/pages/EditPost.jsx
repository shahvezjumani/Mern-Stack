import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {

  //   if (slug) {
  //     axios
  //       .patch(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/updatePost/${slug}`,
  //         {},
  //         {
  //           withCredentials: true, // Send cookies if using sessions
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         // dispatch(login(res.data.data));
  //         setPost(res.data);
  //       })
  //       .catch((err) => {
  //         const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
  //         const errorMessage = match[1].trim().replace("Error: ", "");
  //         console.log("err", errorMessage);
  //         // dispatch(logout());
  //       });
  //   } else {
  //     navigate("/");
  //   }
  // }, [slug, navigate]);
  useEffect(() => {
    if (slug) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/articles/getPost/${slug}`,
          {
            withCredentials: true, // Send cookies if using sessions
          }
        )
        .then((post) => {
          if (post) {
            setPost(post.data.data);
          }
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    <div className="py-8">
      {post ? (
        <Container>
          <PostForm post={post} />
        </Container>
      ) : null}
    </div>
  );
}

export default EditPost;

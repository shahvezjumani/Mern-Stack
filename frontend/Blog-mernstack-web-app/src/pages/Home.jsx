import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState(["Hello"]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/articles/getPosts`,
          {
            withCredentials: true, // Send cookies if using sessions
            // headers: {
            //   "Content-Type": "application/json",
            // },
          }
        );
        //   setResponse(res.data);
        // setError(null);
        // dispatch(authLogin(response.data.data));
        // navigate("/");
        //   setFormData({ email: "", password: "" });
        setPosts(response.data.data);
      } catch (err) {
        let errorMessage = "Something went wrong Shahvez";
        if (err.response?.data) {
          // console.log("error", err);
          // console.log("error response", err.response);

          // Try to extract the error message from the HTML response
          const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
          // console.log(match[1].replace("Error: ",""));

          if (match && match[1]) {
            errorMessage = match[1].trim().replace("Error: ", "");
          }
        }

        setError(errorMessage);
        //   setResponse(null);
      }
    };
    getPosts();
    console.log("after all");
  }, []);
  return (
    <div className="py-8">
      <h1>hello woeld</h1>
      {posts.length > 0 ? (
        <Container>
          <div className="flex gap-4">
            {posts.map(({ _id, title, featuredImage }) => (
              <PostCard
                _id={_id}
                title={title}
                featuredImage={featuredImage}
                key={_id}
              />
            ))}
          </div>
        </Container>
      ) : null}
    </div>
  );
}

export default Home;

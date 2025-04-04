import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("slug", data.slug);
    console.log(data.featuredImage);

    // Append the image field
    if (data.featuredImage[0]) {
      formData.append("featuredImage", data.featuredImage[0]);
    }
    try {
      if (post) {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/articles/updatePost/${
            post._id
          }`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        //   setResponse(res.data);
        setError(null);
        // dispatch(authLogin(response.data.data));
        navigate("/");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/articles/createPost`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setResponse(response.data.data);
        setError(null);
        // dispatch(authLogin(response.data.data));
        // navigate("/");
      }
    } catch (err) {
      let errorMessage = "Something went wrong";
      if (err.response?.data) {
        const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
        if (match && match[1]) {
          errorMessage = match[1].trim().replace("Error: ", "");
        }
      }

      setError(errorMessage);
      setResponse(null);
    }
  };

  const slugTranfrom = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with dashes
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTranfrom(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTranfrom, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTranfrom(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              // src={appwriteService.getFilePreview(post.featuredImage)}
              src=""
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;

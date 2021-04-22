import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { ErrorMessage, Field, Form, Formik } from "formik";

interface Values {
  message: string;
}

const TextPostForm = (props: { onSubmit: (message: string) => void }) => {
  return (
    <>
      <Formik<Values>
        initialValues={{ message: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          props.onSubmit(values.message);
          setSubmitting(false);
          resetForm();
        }}
      >
        {(form) => {
          return (
            <Form>
              <Field
                as="textarea"
                type="message"
                name="message"
                placeholder={"Enter your post message"}
              />
              <ErrorMessage name="email" component="div" />

              <div>
                <button type="submit" disabled={form.isSubmitting}>
                  Add Post
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
const MyPosts = (props: {
  posts: { message: string; likesCount: number }[];
  addPost: (message: string) => void;
}) => {
  let postElements = props.posts.map((post) => (
    <Post
      key={post.message}
      message={post.message}
      likesCount={post.likesCount}
    />
  ));

  return (
    <div className={s.postsBlock}>
      <h3>MY POSTS</h3>
      <TextPostForm onSubmit={props.addPost} />
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};
export default MyPosts;

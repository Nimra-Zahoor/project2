import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [NewUser, setNewUser] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  let allUsers;

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    if (currentUser) navigate("/posts");
  }, []);

  const getID = () => {
    const allUsers = JSON.parse(localStorage.getItem("User")) || [];
    let UserId = allUsers.length + 1;
    console.log("UserID", UserId);
    return UserId;
  };
  const handleSubmit = (values) => {
    const newUser = {
      id: getID(),
      name: values.name,
      email: values.email,
      password: values.password,
    };
    allUsers = JSON.parse(localStorage.getItem("User")) || [];
    let emailExists = allUsers.some(function (user) {
      return user.email === values.email;
    });
    if (emailExists) {
      alert("Email Exists");
    } else {
      allUsers.push(newUser);
      console.log("New user---", newUser);
      setNewUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser)); //on login
      localStorage.setItem("User", JSON.stringify(allUsers));
      navigate("/login");
    }

    console.log("New user", newUser);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{ id: getID(), email: "", password: "", name: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
          ) {
            errors.password = "Strong password 8 digit with a letter";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="form">
            <label>Name: </label>
            <Field type="text" name="name" />
            <br />
            <label>Email: </label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />
            <br />
            <label>Password: </label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" />
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FileUpload from './image';

function App() {
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username can be at most 20 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const register = (values) => {
    Axios.post("http://localhost:3001/register", values).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    });
  };

  // const login = (e) => {
  //   e.preventDefault();
  //   Axios.post("http://localhost:3001/login", {
  //     username: Yup.string()
  //     .min(3, "Username must be at least 3 characters")
  //     .max(20, "Username can be at most 20 characters")
  //     .required("Username is required"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   password: Yup.string()
  //     .min(8, "Password must be at least 8 characters")
  //     .required("Password is required"),
  //   }).then((response) => {
  //     if(response.data.message){
  //       setLoginStatus(response.data.message);
  //     }else{
  //       setLoginStatus(response.data[0].email);
  //     }
  //   })
  // }
  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
      email: email
    }).then((response) => {
      if(response.data.message){
        setLoginStatus(response.data.message);
      }else{
        setLoginStatus(response.data[0].email);
      }
    })
  }

  return (
    <div className="container">
      
      <div className="loginForm">
      <form>
          <h4>Login Here</h4>
          <label htmlFor="username">Username*</label>
          <input className="textInput" type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} placeholder="Enter your Username" required />
          <label htmlFor="password">Password*</label>
          <input className="textInput" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your Password" required />
          <input className="button" type="submit" onClick={login} value="Login" />
          <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{loginStatus}</h1>
        </form>
        {/* <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={login}
        >
          <Form>
            <h4>Login Here</h4>
            <label htmlFor="username">Username*</label>
            <Field
              className="textInput"
              type="text"
              name="username"
              placeholder="Enter your Username"
            />
            <ErrorMessage name="username" component="div" className="error" />
            <label htmlFor="password">Password*</label>
            <Field
              className="textInput"
              type="password"
              name="password"
              placeholder="Enter your Password"
            />
            <ErrorMessage name="password" component="div" className="error" />
            <button className="button" type="submit">
              Login
            </button>
            <div style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
              {loginStatus}
            </div>
          </Form>
        </Formik> */}
      </div>

      <div className="loginForm">
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={register}
        >
          <Form>
            <h4>Register Here</h4>
            <label htmlFor="email">Email Address*</label>
            <Field
              className="textInput"
              type="text"
              name="email"
              placeholder="Enter your Email Address"
            />
            <ErrorMessage name="email" component="div" className="error" />
            <label htmlFor="username">Username*</label>
            <Field
              className="textInput"
              type="text"
              name="username"
              placeholder="Enter your Username"
            />
            <ErrorMessage name="username" component="div" className="error" />
            <label htmlFor="password">Password*</label>
            <Field
              className="textInput"
              type="password"
              name="password"
              placeholder="Enter your Password"
            />
            <ErrorMessage name="password" component="div" className="error" />
            <button className="button" type="submit">
              Create an account
            </button>
            <div style={{ fontSize: "15px", textAlign: "center" }}>
              {registerStatus}
            </div>
          </Form>
        </Formik>
      </div>
      <div className="loginForm">
      <FileUpload />
      </div>
      
    </div>
    
  );
}





export default App;



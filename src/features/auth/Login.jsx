import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setEmail("");
      setPwd("");
      navigate("/welcome");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Login</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <TextField
          label="Почта"
          variant="outlined"
          type="text"
          id="username"
          ref={userRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
        <Button
          sx={{
            bgcolor: "#a435f0",
            color: "white",
            "&:hover": { backgroundColor: "#a435f0" },
          }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        {/* <button onClick={handleSubmit}>Sign In</button> */}
      </form>
    </section>
  );

  return content;
};

export default Login;

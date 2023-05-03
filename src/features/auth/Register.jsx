import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLast] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPwd] = useState("");
  const [password2, setPwd2] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await register({
        first_name,
        last_name,
        email,
        password,
        password2,
      }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/login");
    } catch (err) {
      // handle error
    }
  };

  const handleUserInput = (e) => setFirstName(e.target.value);
  const handleLastInput = (e) => setLast(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);
  const handlePwd2Input = (e) => setPwd2(e.target.value);

  const content = isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h2>Register</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          variant="outlined"
          type="text"
          id="username"
          ref={userRef}
          value={first_name}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />
        <TextField
          label="Фамилия"
          variant="outlined"
          type="text"
          id="last"
          ref={userRef}
          value={last_name}
          onChange={handleLastInput}
          autoComplete="off"
          required
        />
        <TextField
          label="Почта"
          variant="outlined"
          type="email"
          id="email"
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
        <TextField
          label="Повторите Пароль"
          variant="outlined"
          type="password"
          id="password2"
          onChange={handlePwd2Input}
          value={password2}
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
          Sign Up
        </Button>
        {/* <button onClick={handleSubmit}></button> */}
      </form>
    </section>
  );

  return content;
};

export default Register;

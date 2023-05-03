import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

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

      <h2>Employee register</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={first_name}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />
        <label htmlFor="lastname">lastname:</label>
        <input
          type="text"
          id="last"
          ref={userRef}
          value={last_name}
          onChange={handleLastInput}
          autoComplete="off"
          required
        />
        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          ref={userRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
        <label htmlFor="password2">Password2:</label>
        <input
          type="password"
          id="password2"
          onChange={handlePwd2Input}
          value={password2}
          required
        />
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </section>
  );

  return content;
};

export default Register;

import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useMentorRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const mentorRef = useRef();
  const errRef = useRef();
  const [mentor, setMentor] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLast] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPwd] = useState("");
  const [password2, setPwd2] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [audience, setAudience] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useMentorRegisterMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    mentorRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [mentor, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mentorData = await register({
        first_name,
        last_name,
        email,
        password,
        password2,
        type,
        experience,
        audience,
      }).unwrap();
      dispatch(setCredentials({ ...mentorData, mentor }));
      setMentor("");
      setPwd("");
      navigate("/login");
    } catch (err) {
      // handle error
    }
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleChange2 = (event) => {
    setExperience(event.target.value);
  };
  const handleChange3 = (event) => {
    setAudience(event.target.value);
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

      <h2>Mentor register</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          variant="outlined"
          type="text"
          id="username"
          ref={mentorRef}
          value={first_name}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />
        <TextField
          type="text"
          id="last"
          ref={mentorRef}
          value={last_name}
          onChange={handleLastInput}
          autoComplete="off"
          required
          label="Фамилия"
          variant="outlined"
        />
        <TextField
          type="email"
          id="email"
          ref={mentorRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
          label="Почта"
          variant="outlined"
        />
        <TextField
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
          label="Пароль"
          variant="outlined"
        />
        <TextField
          type="password"
          id="password2"
          onChange={handlePwd2Input}
          value={password2}
          required
          label="Повторите Пароль"
          variant="outlined"
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"individual not oficial"}>
              individual not oficial
            </MenuItem>
            <MenuItem value={"individual prof"}>individual prof</MenuItem>
            <MenuItem value={"online"}>online</MenuItem>
            <MenuItem value={"other"}>other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">experience</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={experience}
            label="Age"
            onChange={handleChange2}
          >
            <MenuItem value={"beginning"}>beginning</MenuItem>
            <MenuItem value={"medium"}>medium</MenuItem>
            <MenuItem value={"prof"}>prof</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">audience</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={audience}
            label="Age"
            onChange={handleChange3}
          >
            <MenuItem value={"no"}>no</MenuItem>
            <MenuItem value={"a few"}>individual prof</MenuItem>
            <MenuItem value={"a lot"}>a lot</MenuItem>
          </Select>
        </FormControl>
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
        {/* <button onClick={handleSubmit}>Sign Up</button> */}
      </form>
    </section>
  );

  return content;
};

export default Register;

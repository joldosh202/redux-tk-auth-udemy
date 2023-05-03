import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";

import React from "react";
import { selectCurrentMentor } from "./mentorAuthSlice";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const mentor = useSelector(selectCurrentMentor);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome";
  const welcomeMentor = mentor ? `Welcome ${mentor}!` : "Welcome";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{user ? welcome : welcomeMentor}</h1>
      <p>Token:{tokenAbbr}</p>
      <p></p>
    </section>
  );
  return content;
};

export default Welcome;

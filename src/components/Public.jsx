import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to Udemy</h1>
      </header>
      <main>
        <p>
          Расширяйте горизонты с помощью глобального опыта обучения. Выполните
          вход, чтобы воспользоваться предложением. Акция заканчивается 4 мая.
        </p>
        <p>&nbsp;</p>
      </main>
      <div className="auth">
        <div>
          <Button sx={{ m: 2 }} variant="outlined">
            <Link style={{ color: "black" }} to="/login">
              Войти{" "}
            </Link>
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "black", "&:hover": { backgroundColor: "black" } }}
          >
            <Link style={{ color: "white" }} to="/register">
              Регистрация{" "}
            </Link>
          </Button>
        </div>
        <Button
          variant="contained"
          sx={{ bgcolor: "pink", "&:hover": { backgroundColor: "pink" } }}
        >
          <Link style={{ color: "white" }} to="/mentor-reg">
            Стать ментором
          </Link>
        </Button>
      </div>
    </section>
  );
  return content;
};

export default Public;

import React from "react";
import HeaderLogo from "../../assets/images/header/header__logo.svg";
import classes from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={classes.Header}>
      <div className="_container">
        <div className={classes.HeaderBlock}>
          <Link className={classes.HeaderLogo}>
            <img src={HeaderLogo} alt="" />
          </Link>
          <ul className={classes.HeaderList}>
            <li>Главная</li>
            <li>Категории</li>
            <li>Статьи</li>
            <li>Контакты</li>
          </ul>
          <button className={classes.HeaderLogin}>Войти</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

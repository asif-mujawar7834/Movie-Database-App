import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import font from "../../fonts.module.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { Container } from "../Container/Container";
export const Header = () => {
  const [open, setOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${open ? styles.open : ""} ${
        styles.roboto__black
      }`}
      style={{
        background: `${
          open || showSearchBar
            ? "rgba(0, 0, 0, 0.7)"
            : isScrolled
            ? "rgba(0,0,0,0.7)"
            : "transparent"
        }`,
        backdropFilter: `${
          isScrolled || open || showSearchBar ? "blur(7px)" : "none"
        }`,
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
        <h1 className={`${styles.logo}`}>Movie Shop</h1>
      </Link>
      <nav
        className={`${styles.navlinks} ${open ? styles.open : ""} ${
          font.roboto__black
        }`}
      >
        <Link to={"/explore/movie"} className={`${styles.link}`}>
          <span>Movies</span>
        </Link>
        <Link to={"/explore/tv"} className={`${styles.link}`}>
          <span>TV & Shows</span>
        </Link>
        <span
          className={`${styles.searchIcon}`}
          onClick={() => setShowSearchBar(!showSearchBar)}
        >
          <FaSearch />
        </span>
      </nav>
      <div className={`${styles.menuIcon}`}>
        <span
          className={`${styles.searchIcon}`}
          onClick={() => setShowSearchBar(!showSearchBar)}
        >
          <FaSearch />
        </span>
        <span
          onClick={() => {
            setOpen((open) => !open);
          }}
        >
          {open ? <FaTimes /> : <FaBars />}
        </span>
      </div>
      {showSearchBar && <Searchbar setShowSearchBar={setShowSearchBar} />}
    </header>
  );
};

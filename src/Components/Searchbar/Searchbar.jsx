import { useEffect, useRef } from "react";
import styles from "./Searchbar.module.css";
import { useNavigate } from "react-router-dom";
export const Searchbar = ({ setShowSearchBar }) => {
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearchBar(false);
    navigate(`/search/${inputRef.current.value}`);
  };
  return (
    <div className={styles.searchbar}>
      <form onSubmit={handleSubmit}>
        <input placeholder="Search Here..." ref={inputRef} />
      </form>
    </div>
  );
};

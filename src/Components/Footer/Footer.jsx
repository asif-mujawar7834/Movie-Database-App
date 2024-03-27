import { Link } from "react-router-dom";
import { Container } from "../Container/Container";
import styles from "./Footer.module.css";
import fonts from "../../fonts.module.css";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__content}>
          <nav className={fonts.roboto__light}>
            <Link to={"/"} className={`${styles.link}`}>
              <span>Terms of use</span>
            </Link>
            <Link to={"/"} className={`${styles.link}`}>
              <span>Privacy Policy</span>
            </Link>
            <Link to={"/"} className={`${styles.link}`}>
              <span>About</span>
            </Link>
            <Link to={"/"} className={`${styles.link}`}>
              <span>Blog</span>
            </Link>
            <Link to={"/"} className={`${styles.link}`}>
              <span>FAQ</span>
            </Link>
          </nav>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repellendus quisquam placeat, nostrum deserunt maiores dolorum ipsam
            aspernatur porro totam sit veritatis voluptates obcaecati voluptas
            quibusdam ut, suscipit harum neque corporis.
          </p>
          <div className={styles.socials}>
            <span>
              <FaInstagram />
            </span>
            <span>
              <FaFacebook />
            </span>
            <span>
              <FaTwitter />
            </span>
            <span>
              <FaLinkedin />
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

import { useEffect, useState } from "react";
import styles from "Components/NavBar/navBar.module.css";

const NavBar = () => {
  const [pageTitle, setPageTitle] = useState("Notes");
  const id = window.location.pathname.split("/").pop();

  const removeActive = () => {
    const navLinks = document.getElementsByClassName(".active");
    if (navLinks.length > 0) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/notes") {
      setPageTitle("Notes");
      removeActive();
      document.getElementById("first").classList.add("active");
    } else if (window.location.pathname === "/archived") {
      setPageTitle("Archived");
      removeActive();
      document.getElementById("second").classList.add("active");
    } else if (
      window.location.pathname === "/notesForm" ||
      isNaN(id) === false
    ) {
      if (isNaN(id) === false) {
        setPageTitle("Edit Note");
      } else {
        setPageTitle("Create Note");
      }
      removeActive();
      document.getElementById("third").classList.add("active");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" id="first" href="/notes">
            My Notes
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="second" href="/archived">
            Archived
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="third" href="/notesForm">
            Create
          </a>
        </li>
      </ul>
      <div>
        <h2 className={styles.text}>{pageTitle}</h2>
      </div>
    </div>
  );
};

export default NavBar;

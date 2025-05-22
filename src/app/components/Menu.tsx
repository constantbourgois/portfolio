"use client";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"
import '../horizburgermenu.scss'

const Menu = () => {
 
  return (
    <div>
      <header id="headermove">
          <nav>
            <ul >
              <li className="p-7"><Link href={"/"}>HOME</Link></li>
              <li className="p-7"><Link href={"/projets"}>PROJETS</Link></li>
              <li className="p-7"><Link href={"/contact"}>CONTACT</Link></li>
            </ul>
          </nav>
        </header>
        <div id="horizburgermenu">
          <div className="mobilehead">
            <button
              className="handle"
              type="button"
              aria-label="Open mobile menu"
              onClick={() => {
                const nav = document.getElementById("hideTarget");
                if (nav) {
                  nav.classList.toggle("show");
                }
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="mobilenav">
            <ul id="hideTarget" className="">
              <li className="p-7"><Link href={"/"}>HOME</Link></li>
              <li className="p-7"><Link href={"/projets"}>PROJETS</Link></li>
              <li className="p-7"><Link href={"/contact"}>CONTACT</Link></li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default Menu;
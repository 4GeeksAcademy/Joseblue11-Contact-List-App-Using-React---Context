import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <img
          className="logo"
          src="https://yt3.googleusercontent.com/73Msdb-1LmWbH2LPOkyFw9nQFqTyh2LoY5A7EE7fjS96gig33N4ud0wQpVnZizA-vK1AQxlz=s160-c-k-c0x00ffffff-no-rj"
        />
      </div>
      <Link to="/create-user">
        <button className="btn btn-success">Add new Users</button>
      </Link>
    </nav>
  );
};

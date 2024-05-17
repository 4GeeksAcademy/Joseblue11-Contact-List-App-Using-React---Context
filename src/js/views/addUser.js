import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons"; // Import the correct icon
import "../../styles/addUser.css";

export const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate(); // Declara useNavigate

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/Joseblue11/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el contacto");
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      // Redirecciona a la ruta "/" después de agregar un usuario
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="AddUser container ">
      <form className="Forms container" onSubmit={handleSubmit}>
        <div className="text-start mt-2 title-form">
          <br />
          <h2 className="text-center "> Crear un nuevo Usuario</h2>
        </div>
        <div className="form-group input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4 btn-save">
          Save
        </button>
        <Link to="/">
          <button className="btn anchor">
            <FontAwesomeIcon
              icon={faReply}
              size="3x"
              style={{
                color: " rgb(0, 46, 99)",
                textShadow: "0 0 5px rgb(255, 255, 255)",
              }}
            />
          </button>
        </Link>
      </form>
      <br />
    </div>
  );
};

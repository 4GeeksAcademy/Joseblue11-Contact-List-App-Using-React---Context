import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import "../../styles/editUser.css";

export const editUser= () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [dataLoading, setDataLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate(); // Declara useNavigate

  useEffect(() => {
    fetch(`https://playground.4geeks.com/contact/agendas/Joseblue11`)
      .then((response) => response.json())
      .then((data) => {
        const User = data.contacts.find(
          (User) => User.id === parseInt(id)
        );
        if (User) {
          setForm(User);
          setDataLoading(false);
        } else {
          throw new Error("User not found");
        }
      })
      .catch((error) => console.error("Error fetching User data:", error));
  }, [id]);

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
        `https://playground.4geeks.com/contact/agendas/Joseblue11/contacts/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al editar el contacto");
      }

      // Redirecciona a la ruta "/" después de editar
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (dataLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="AddUsers container ">
      <div className="Forms container" onSubmit={handleSubmit}>
        <div className="text-start mt-2 title-form">
          <br />
          <h2 className="text-center "> Editar Contacto</h2>
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
      </div>
      <br />
    </div>
  );
};

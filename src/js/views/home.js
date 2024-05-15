import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Context } from "./../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getData();
    setDataLoading(false);
  }, []);

  const handleDelete = async (UserId) => {
    try {
      const verifyDelete = window.confirm(
        "¿Estás seguro que deseas eliminar este contacto?"
      );
      if (!verifyDelete) return;

      await actions.deleteUser(UserId);
      actions.getData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="home1">
      <h1 className="title1 text-center">
        <strong>Contact List of Jose Antonio Tovar</strong>
      </h1>
      <div className="ContactList1">
        <div className="img text-center w-30 p-3">
          <h3 className="rigo1">Bienvenido!</h3>
          <p>
            <img className="rigo" src={rigoImage} />
          </p>
        </div>
        <br />
        <div className="row justify-content-center w-70">
          {dataLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "40vh" }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : store.Users && store.Users.length > 0 ? (
            store.Users.map((User) => (
              <div key={User.id} className="card1">
                <Card style={{ backgroundColor: "transparent" }}>
                  <div className="Card-body m-2">
                    <div className="container-grid-custom">
                      <div className="container-int">
                        <div>
                          <img
                            className="img-fluid imagen"
                            src="https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes-thumbnail.png"
                            alt="Descripción de la imagen"
                          />
                        </div>
                        <div>
                          <div className="Text1 fs-2">{User.name}</div>
                          <div className="Text1 text-card">
                            <FontAwesomeIcon
                              className="text-secondary me-1"
                              icon={faMapMarkerAlt}
                            />{" "}
                            Address: {User.address}
                          </div>
                          <div className="Text1 text-card">
                            <FontAwesomeIcon
                              className="text-secondary me-1"
                              icon={faPhone}
                            />{" "}
                            Phone: {User.phone}
                          </div>
                          <div className="Text1 text-card">
                            <FontAwesomeIcon
                              className="text-secondary me-1"
                              icon={faEnvelope}
                            />{" "}
                            Email: {User.email}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Link
                          to={`/edit-user/${User.id}`}
                          className="button-style"
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ fontSize: "1.2em", color: "#108bf8" }}
                          />
                        </Link>
                        <Button
                          variant="link"
                          className="button-style"
                          onClick={() => handleDelete(User.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            style={{ fontSize: "1.2em", color: "#ff5767" }}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="anuncio1">
              ¡Tu agenda está vacía! ¿Qué tal agregar un nuevo contacto?
            </div>
          )}
        </div>
      </div>
      <div className="Info mt-4">
        <span className="margin-bottom-custom">
          ¡Tu agenda está vacía! ¡No te preocupes! Crear un nuevo contacto es
          sencillo. Sigue estos pasos: Visita:
          https://playground.4geeks.com/apis/fake/todos/ Accede a la sección
          "Contacto". (https://playground.4geeks.com/contact/docs) Utiliza el
          método POST para crear un nuevo contacto. Pasa el parámetro
          "Joseblue11" para crear la agenda. Introduce los detalles del contacto
          en el cuerpo de la solicitud. ¡Listo! Ya tienes tu primer contacto. ¿A
          qué esperas? Comienza a construir tu red de contactos.
        </span>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { FaStar, FaPlus } from "react-icons/fa";
import Swal from 'sweetalert2';
import { postReview } from "../service";

import withReactContent from 'sweetalert2-react-content';

const ReviewModal = ({ show, onClose }) => {
  const MySwal = withReactContent(Swal);
  const [selectedOptions, setSelectedOptions] = useState({
    servicio: true,
    calidad: true,
    pagina: false,
    envio: false,
    precio: false,
  });
  const [selectedStars, setSelectedStars] = useState(4);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [comments, setComments] = useState("");

  const toggleOption = (option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  const handleStarClick = (index) => {
    setSelectedStars(index + 1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (rating) => {
    setSatisfactionRating(rating);
  };

  const handleSubmit = async () => {
    const formData = {
      selectedOptions,
      selectedStars,
      satisfactionRating,
      comments,
    };
    console.log('Enviando');
    console.log(formData);

    try {
      const response = await postReview(formData);
      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Formulario enviado correctamente',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          onClose(false); // Cerrar modal después de confirmar
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al enviar el formulario',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <span
              role="img"
              aria-label="Cara preocupada"
              title="Cara preocupada"
              style={{ fontSize: "32px", margin: "0 10px" }}
            >
              😟
            </span>
            <span
              role="img"
              aria-label="Cara neutral"
              title="Cara neutral"
              style={{ fontSize: "32px", margin: "0 10px" }}
            >
              😐
            </span>
            <span
              role="img"
              aria-label="Cara sonriente"
              title="Cara sonriente"
              style={{ fontSize: "32px", margin: "0 10px" }}
            >
              😊
            </span>
          </div>


          <div className="d-flex justify-content-around mb-3">
            {Object.keys(selectedOptions).map((option) => (
              <Button
                key={option}
                variant={selectedOptions[option] ? "primary" : "outline-secondary"}
                onClick={() => toggleOption(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
                {selectedOptions[option] && "✓"}
              </Button>
            ))}
          </div>

          {/* Campo de comentarios */}
          <Form.Group controlId="comments" className="mb-3">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tus comentarios"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </Form.Group>

          {/* Carga de imágenes */}
          <Form.Group controlId="imageUpload" className="mb-3">
            <Form.Label>Carga de imágenes</Form.Label>
            <div className="d-flex align-items-center">
              <label
                htmlFor="imageInput"
                style={{
                  width: "80px",
                  height: "80px",
                  border: "1px dashed #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                <FaPlus />
              </label>
              <input
                id="imageInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              ) : (
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt="Placeholder"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              )}
              {uploadedImage && (
                <Badge
                  bg="danger"
                  pill
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => setUploadedImage(null)}
                >
                  &times;
                </Badge>
              )}
            </div>
          </Form.Group>

          {/* Calificación general */}
          <div className="mb-3">
            <Form.Label>Calificación General</Form.Label>
            <div className="d-flex">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  size="24"
                  color={index < selectedStars ? "#FFD700" : "#CCC"}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewModal;

import React, { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { FaStar, FaPlus } from "react-icons/fa";

const ReviewModal = () => {
  const [show, setShow] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    servicio: true,
    calidad: true,
    pagina: false,
    envio: false,
    precio: false,
  });
  const [selectedStars, setSelectedStars] = useState(4);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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

  return (
    <>
      

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Caras */}
          <div className="d-flex justify-content-center mb-3">
            <span role="img" style={{ fontSize: "32px", margin: "0 10px" }}>
              😟
            </span>
            <span role="img" style={{ fontSize: "32px", margin: "0 10px" }}>
              😐
            </span>
            <span role="img" style={{ fontSize: "32px", margin: "0 10px" }}>
              😊
            </span>
          </div>

          {/* Botones de selección */}
          <div className="d-flex justify-content-around mb-3">
            <Button
              variant={selectedOptions.servicio ? "primary" : "outline-secondary"}
              onClick={() => toggleOption("servicio")}
            >
              Servicio {selectedOptions.servicio && "✓"}
            </Button>
            <Button
              variant={selectedOptions.calidad ? "primary" : "outline-secondary"}
              onClick={() => toggleOption("calidad")}
            >
              Calidad {selectedOptions.calidad && "✓"}
            </Button>
            <Button
              variant={selectedOptions.pagina ? "primary" : "outline-secondary"}
              onClick={() => toggleOption("pagina")}
            >
              Página {selectedOptions.pagina && "✓"}
            </Button>
            <Button
              variant={selectedOptions.envio ? "primary" : "outline-secondary"}
              onClick={() => toggleOption("envio")}
            >
              Envío {selectedOptions.envio && "✓"}
            </Button>
            <Button
              variant={selectedOptions.precio ? "primary" : "outline-secondary"}
              onClick={() => toggleOption("precio")}
            >
              Precio {selectedOptions.precio && "✓"}
            </Button>
          </div>

          {/* Campo de comentarios */}
          <Form.Group controlId="comments" className="mb-3">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Escribe tus comentarios" />
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
                  src= "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
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
          <Button variant="primary" onClick={handleClose}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewModal;

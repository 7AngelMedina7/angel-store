import React, { useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import ReviewModal from './ReviewModal';

const CartPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const pastPurchases = [
        {
            title: "Brown Leather Wallet",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            date: "7/11/2024",
        },
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container
            style={{
                padding: '20px',
                borderRadius: '8px',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px',
                }}
            >
                <button
                    onClick={handleBack}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                >
                    <FaArrowLeft size={24} />
                </button>
            </header>

            <section style={{ textAlign: 'center', marginBottom: '32px', flex: 1 }}>
                <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Tu carrito esta vacio</p>
                <div style={{ fontSize: '80px', marginBottom: '16px', color: '#ccc' }}>💔</div>
                <Button
                    variant="success"
                    onClick={() => navigate(`/`)}
                >
                    Inicio
                </Button>
            </section>

            {/* Compras pasadas */}
            <section >
                <h4>Tus compras pasadas</h4>
                <Row >
                    {pastPurchases.map((purchase, index) => (
                        <Col key={index}>
                            <Card
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '16px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={purchase.image}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        marginRight: '16px',
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '16px', marginBottom: '8px' }}>
                                        {purchase.title}
                                    </Card.Title>
                                    <Card.Text style={{ color: '#555', fontSize: '15px' }}>
                                        Comprado el: {purchase.date}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        style={{
                                            backgroundColor: '#6f42c1',
                                            border: 'none',
                                            width: '100%',
                                        }}
                                        onClick={handleOpenModal} // Abre el modal al hacer clic
                                    >
                                        Déjanos tu opinión 💜
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            {showModal && <ReviewModal onClose={handleCloseModal} />}

            {/* Footer */}
            <footer
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '32px',
                    paddingTop: '16px',
                    borderTop: '1px solid #ddd',
                }}
            >
                <p>Sobre Nosotros</p>
                <p>Politica de Privacidad</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <FaFacebook style={{ color: '#1877F2', fontSize: '24px', cursor: 'pointer' }} />
                    <FaTwitter style={{ color: '#1DA1F2', fontSize: '24px', cursor: 'pointer' }} />
                    <FaInstagram style={{ color: '#E1306C', fontSize: '24px', cursor: 'pointer' }} />
                </div>
            </footer>
        </Container>
    );
};

export default CartPage;

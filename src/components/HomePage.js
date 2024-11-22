import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoGif from '../assets/logo.gif';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para la navegación
import { getProducts } from '../service';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const HomePage = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fecthProducts();
    }, []);

    const fecthProducts = async () => {
        const response = await getProducts();
        setProducts(response);
        setLoading(false);
        console.log('response', response);
    };

    if (loading) {
        return <p>Cargando productos...</p>;
    }
    const handleDetails = (id) => {
        navigate(`/details/${id}`);
    };
    return (
        <Container>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Angel Store</div>
                <Button
                    variant="outline-primary"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8',
                        borderRadius: '50%',
                    }}
                    onClick={() => navigate('/cart')} // Redirige a la página del carrito
                >
                    <AiOutlineShoppingCart size={24} /> {/* Tamaño del ícono */}
                </Button>
            </header>

            <div style={{ marginBottom: '16px' }}>
                <input type="text" placeholder="Buscar productos..." className="form-control" />
            </div>

            <div style={{ textAlign: 'center', margin: '32px 0' }}>
                <img src={logoGif} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />

            </div>

            <section>
                <h2 style={{ marginBottom: '24px' }}>Productos Populares</h2>
                <Row xs={2} md={2} lg={4} className="g-4">
                    {products.map(product => (
                        <Col key={product.id}>
                            <div style={{ padding: '16px', textAlign: 'center' }}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{ width: '50%', maxWidth: '90px', objectFit: 'cover', marginBottom: '16px' }}
                                />
                                <h3 style={{ fontSize: '1.32px' }}>{product.title?.length > 20 ? product.title.slice(0, 20) + '...' : product.title}</h3>
                                <p style={{ color: '#555' }}>
                                    {product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase()}
                                </p>
                                <p style={{ fontWeight: 'bold' }}>${product.price}</p>
                                <Button
                                    variant="primary"
                                    style={{
                                        width: '100%',
                                        marginBottom: '8px',
                                        backgroundColor: '#6f42c1',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Añadir a tu carrito
                                </Button>

                                <Button
                                    variant="outline-primary"
                                    style={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        color: '#6f42c1',
                                        border: '2px solid #6f42c1',
                                    }}
                                    onClick={() => handleDetails(product.id)}

                                >
                                    Detalles
                                </Button>

                            </div>
                        </Col>
                    ))}
                </Row>
            </section>

            <footer style={{ display: 'flex', justifyContent: 'space-around', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ddd' }}>
                <p>Sobre Nosotros</p>
                <p>Política de Privacidad</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    <FaFacebook style={{ color: '#1877F2', fontSize: '24px', cursor: 'pointer' }} />
                    <FaTwitter style={{ color: '#1DA1F2', fontSize: '24px', cursor: 'pointer' }} />
                    <FaInstagram style={{ color: '#E1306C', fontSize: '24px', cursor: 'pointer' }} />
                </div>
            </footer>
        </Container>
    );



}

export default HomePage;

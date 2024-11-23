import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getProductById, getSameCategory } from '../service';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa'; // Importar el ícono de 'back' (flecha izquierda)
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Importa el ícono de carrito desde React-Icons
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);


    const handleBack = () => {
        navigate(-1);
    };
    useEffect(() => {

        fetchProductDetails();
    }, []);
    const fetchProductDetails = async () => {
        try {
            const product = await getProductById(id)
            console.log('product', product)
            setProduct(product);
            const sameCategory = await getSameCategory(product.category)
            console.log('sameCategory', sameCategory)
            setSimilarProducts(sameCategory);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    if (!product) {
        return <div style={{ textAlign: 'center', padding: '32px' }}>Cargando detalles del producto...</div>;
    }
    const handleDetails = (id) => {
        navigate(`/details/${id}`);
    };
    return (
        <Container>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={handleBack}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                        aria-label="Volver"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                </div>

                <Button
                    variant="outline-primary"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                    }}
                    onClick={() => navigate('/cart')}
                    aria-label="Abrir carrito"
                >
                    <AiOutlineShoppingCart size={24} />
                </Button>

            </header>
            {/* Detalles del producto */}
            <section style={{ margin: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={{
                        alignItems: 'center',
                        width: '300px',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        marginBottom: '16px',
                    }}
                />
                <h2 style={{ marginBottom: '16px' }}>{product.title}</h2>

                <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>${product.price.toFixed(2)}</p>
                <p style={{ color: '#555', marginBottom: '32px' }}>{product.description}</p>

                <div style={{ marginBottom: '24px' }}>

                    <h5>Selecciona una talla:</h5>
                    <Button variant="outline-primary" style={{ margin: '8px' }}>CH</Button>
                    <Button variant="outline-primary" style={{ margin: '8px' }}>M</Button>
                    <Button variant="outline-primary" style={{ margin: '8px' }}>G</Button>
                </div>
                <Button
                    variant="primary"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#6f42c1',
                        border: 'none',
                    }}
                >
                    Añade a tu carrito
                </Button>
            </section>

            {/* Productos similares */}
            <section style={{ marginBottom: '32px' }}>
                <h4 style={{ marginBottom: '16px' }}>Productos similares</h4>
                <Row xs={2} md={3} className="g-4">
                    {similarProducts.map(product => (
                        <Col key={product.id}>
                            <div style={{ padding: '16px', textAlign: 'center' }}>
                                <img
                                    src={product.image}
                                    alt={`Imagen de ${product.title}`}
                                    aria-label={`Imagen de ${product.title}`}
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

            <section style={{ margin: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <h4 style={{ margin: '16px' }}>Reseñas del producto</h4>
                {[...Array(3)].map((_, index) => (
                    <div key={index} style={{ marginBottom: '16px', border: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={`https://i.pravatar.cc/50?img=${index + 5}`}
                                alt="Usuario"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginRight: '16px',
                                }}
                            />
                            <div>
                                <strong>Nombre Usuario</strong>
                                <p style={{ margin: '0', fontSize: '15px', color: '#777' }}>Hace {index + 1} días</p>
                            </div>
                        </div>
                        <p style={{ marginTop: '8px', color: '#555' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                        <div>
                            {'⭐'.repeat(5)}
                        </div>
                    </div>
                ))}
            </section>

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
                <p>Política de Privacidad</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    <FaFacebook style={{ color: '#1877F2', fontSize: '24px', cursor: 'pointer' }} />
                    <FaTwitter style={{ color: '#1DA1F2', fontSize: '24px', cursor: 'pointer' }} />
                    <FaInstagram style={{ color: '#E1306C', fontSize: '24px', cursor: 'pointer' }} />
                </div>
            </footer>
        </Container>
    );

};
export default DetailsPage;

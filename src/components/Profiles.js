import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Profiles = () => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 6;
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/profile/?limit=${limit}&offset=${offset}`);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setData(response.data);
            setCount(response.data.count);
        };
        fetchData();
    }, [offset]);

    function handlePaginationClick(newOffset) {
        setOffset(newOffset);
    }

    const pages = Math.ceil(count / limit);
    const currentPage = Math.ceil(offset / limit) + 1;

    return (
        <Container className="py-5">
            <Row xs={1} md={2} lg={3} xl={3} className="g-4">
                {data.results?.map(item => (
                    <Col key={item.pk}>
                        <Card className="h-100 shadow border-3 rounded-3 bg-dark text-light"> {/* Увеличиваем толщину и скругляем углы, добавляем темный фон и светлый текст */}
                            <Card.Img variant="top" src={item.image} alt="Character Portrait" className="img-fluid rounded-top" /> {/* Добавляем скругление углов сверху */}
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <ul className="list-unstyled">
                                    <li>Возраст: {item.age}</li>
                                    <li>Раса: {item.race}</li>
                                    <li>Класс: {item.class_name}</li>
                                    <li>Уровень: {item.level}</li>
                                </ul>
                                <Link to={`/profiles/${item.pk}`}>
                                    <Button variant="primary" className="rounded-pill">Больше информации</Button> {/* Добавляем скругление углов кнопки */}
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className='pagination mt-3'>
                {previous && (
                    <Button variant="light" onClick={() => handlePaginationClick(offset - limit)}>Предыдущая</Button>
                )}
                {Array.from(Array(pages).keys()).map((page) => (
                    <Button
                        key={page}
                        onClick={() => handlePaginationClick(page * limit)}
                        className={currentPage === page + 1 ? 'active' : ''}
                        variant="light" // Изменяем стиль кнопки
                    >
                        {page + 1}
                    </Button>
                ))}
                {next && (
                    <Button variant="light" onClick={() => handlePaginationClick(offset + limit)}>Следующая</Button>
                )}
            </div>
        </Container>
    );
}

export default Profiles;

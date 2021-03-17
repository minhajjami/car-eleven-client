import React from 'react';
import { Card, Button, Col, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import { useState } from 'react';

const Cars = ({ car }) => {
    const { carName, image, price, _id, rating } = car
    const [review, setReview] = useState({ comment: '', rating: '' });
    const [modalShow, setModalShow] = useState(false);

    const history = useHistory()
    const redirect = () => {
        history.push(`/details/${_id}`)
    }

    const handleReview = () => {
        fetch(`https://thawing-dawn-65817.herokuapp.com/review/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify({ review }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.location.reload();
                }
            })
    }
    return (
        <div className="col-md-4">
            <Card className="car-card">
                <Card.Img 
                onClick={() => { redirect() }} 
                variant="top" src={`data:image/png;base64,${image.img}`} 
                className="p-5 w-100"
                style={{cursor:'pointer'}}
                />
                <Card.Body>
                    <Card.Title>{carName}</Card.Title>
                    <Card.Text>
                        Price: ${price}
                    </Card.Text>
                    <div className="d-block mb-2">
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            readOnly
                        />
                    </div>
                    <Link to={`/details/${_id}`}><Button variant="info mr-3">Car Details</Button></Link>
                    <Button variant="info" onClick={() => setModalShow(true)}>Add review</Button>
                </Card.Body>
            </Card>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Rate the car !!
                 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row className='dashboard-admin-form'>
                            <Form.Group as={Col} md='6' controlId="formGridName">
                                <Form.Control
                                    type="text"
                                    placeholder="Add your comment"
                                    onChange={(e) => {
                                        setReview({ ...review, comment: e.target.value });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md='6' controlId="formGridPrice">
                                <Rating
                                    name="simple-controlled"
                                    onChange={(event, newValue) => {
                                        setReview({ ...review, rating: newValue });
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button onClick={handleReview} className="Button-add-car-form mb-5">Send Review</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Cars;
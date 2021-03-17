import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import './CarDetails.css'
import { Rating } from '@material-ui/lab';

const CarDetails = () => {
    const [carDetails, setCarDetails] = useState([])
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        fetch(`https://thawing-dawn-65817.herokuapp.com/details/${id}`)
            .then(res => res.json())
            .then(data => setCarDetails(data[0]))
    }, [])

    const deleteHandler = (id) => {
        fetch(`https://thawing-dawn-65817.herokuapp.com/carDelete/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Car Deleted Successfully')
                    history.push('/')
                }
            })
    }
    const [modalShow, setModalShow] = useState(false);
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (data, e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('carName', data.carName)
        formData.append('price', data.price)
        formData.append('description', data.description)
        fetch(`https://thawing-dawn-65817.herokuapp.com/editDetails/${id}`, {
            method: 'PATCH',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Successfully Updated cars')
                    setModalShow(false)
                    window.location.reload()
                }
            })
    }
    return (
        <section id='car-details-section' className='pt-5'>
            <div className="container">
                {
                    <Row >
                        <Col md={8}>
                            {carDetails.image && <img className="w-100" src={`data:image/png;base64,${carDetails.image.img}`} alt="car image" />}
                        </Col>
                        <Col className=" carDetails-content" md={4}>
                            <div className="ml-md-5">
                                <h1 className="text-danger">{carDetails.carName}</h1>
                                <p> Description : {carDetails.description}</p>
                                <p> Price : ${carDetails.price}</p>
                                <p className="text-secondary"> Review: {carDetails.comment}</p>
                                <div>
                                    {carDetails.rating && <Rating
                                        name="simple-controlled"
                                        value={carDetails.rating}
                                        readOnly
                                    />
                                    }
                                </div>
                                <Button onClick={() => setModalShow(true)} variant="outline-info" className="mr-2">Edit </Button>
                                <Button onClick={() => deleteHandler(id)} variant="outline-danger">Delete</Button>
                            </div>
                        </Col>
                    </Row>
                }
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Car
                       </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            carDetails !== undefined && <div>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Row>
                                        <Form.Group as={Col} md='6' controlId="formGridName">
                                            <Form.Label>Car name</Form.Label>
                                            <Form.Control type="text" defaultValue={carDetails.carName} name='carName' placeholder="Car Name" ref={register({ required: true })} />
                                        </Form.Group>
                                        <Form.Group as={Col} md='6' controlId="formGridPrice">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" name='price' defaultValue={carDetails.price} placeholder="Price" ref={register({ required: true })} />
                                        </Form.Group>
                                        <Form.Group as={Col} md='12' controlId="formGridDetails">
                                            <Form.Label>Car Details</Form.Label>
                                            <Form.Control name='description' defaultValue={carDetails.description} placeholder="Enter Car Details" as="textarea" rows="3" ref={register({ required: true })} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button className="mb-5" type="submit">Update</Button>
                                </Form>
                            </div>
                        }
                    </Modal.Body>

                </Modal>

            </div>
        </section>
    );
};

export default CarDetails;
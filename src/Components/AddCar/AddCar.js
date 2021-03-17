import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './AddCar.css'

const AddCar = () => {
    const history = useHistory()
    const { register, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        var uniqId = 'car-' + (new Date()).getTime();
        const formData = new FormData()
        formData.append('file', data.image[0])
        formData.append('carName', data.carName)
        formData.append('id', uniqId)
        formData.append('price', data.price)
        formData.append('description', data.description)
        formData.append('brandName', data.brandName)
        fetch('https://thawing-dawn-65817.herokuapp.com/addCar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
             if (data) {
                 history.push(`/details/${uniqId}`)
            }
         })
    }
    return (
        <section id="add-car-section">
            <div className='container mt-5 add-card'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formGridName">
                        <Form.Label className="carAdd-form-label">Car name</Form.Label>
                        <Form.Control type="text" name='carName' placeholder="Car Name" ref={register({ required: true })} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} md='6' controlId="formGridBrand">
                            <Form.Label className="carAdd-form-label">Brand Name</Form.Label>
                            <Form.Control type="text" name='brandName' placeholder="Brand Name" ref={register({ required: true })} />
                        </Form.Group>
                        <Form.Group as={Col} md='6' controlId="formGridPrice">
                            <Form.Label className="carAdd-form-label">Price</Form.Label>
                            <Form.Control type="number" name='price' placeholder="Price" ref={register({ required: true })} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md='7' controlId="formGridDetails">
                            <Form.Label className="carAdd-form-label">Car Details</Form.Label>
                            <Form.Control name='description' placeholder="Enter Car Details" as="textarea" rows="5" ref={register({ required: true })} />
                        </Form.Group>
                        <Form.Group as={Col} md='4' controlId="formGridImage" className="pl-4">
                            <Form.File
                                label="Select a car image"
                                data-browse="Upload Image"
                                name='image'
                                className="carAdd-form-label"
                                ref={register({ required: true })}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button className="full-width-button mt-5" type="submit">Save</Button>
                </Form>
            </div>
        </section>
    );
};

export default AddCar;
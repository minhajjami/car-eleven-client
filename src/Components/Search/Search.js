import React, { useEffect, useState } from 'react';
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Row } from 'react-bootstrap';
import Cars from '../Cars/Cars';
import Pagination from './Pagination';

const Search = () => {
    const [cars, setAllCars] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(6)
    useEffect(() => {
        fetch('https://thawing-dawn-65817.herokuapp.com/allCars')
            .then(response => response.json())
            .then(data => setAllCars(data))
    }, [])

    let carFilter = cars.length > 0 && cars.filter(cd => {
        return cd.brandName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    // get current cars
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = carFilter !== false && carFilter.slice(indexOfFirstCar, indexOfLastCar)

    //change page
    const paginate = (num) => { setCurrentPage(num) }
    const searchHandler = (e) => {
        setSearch(e.target.value)
    }
    return (
        <section id="search-section" className="mt-5">
            <div className="container">
                <form className="search-form mb-3">
                    <div className="input-group">
                        <button class="btn btn-default">
                            <FontAwesomeIcon icon={faSearch} size="xs" className="search-icon" />
                        </button>
                        <input type="text" className="form-control search" placeholder="Find Your Dream Car ..." onChange={searchHandler} />
                    </div>
                </form>
                <Row>
                    {
                        carFilter === false ? <p className="text-center">Loading...</p> : carFilter.length === 0 ? <p className="text-center">NO CAR FOUND </p> : currentCars.map((ac, index) => <Cars car={ac} key={index}></Cars>)
                    }
                </Row>
                <Pagination carsPerPage={carsPerPage} totalCars={carFilter.length} paginate={paginate} />

            </div>
        </section>
    );
};

export default Search;
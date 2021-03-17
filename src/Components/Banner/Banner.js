import React from 'react';
import banner from '../../images/5561275.jpg'
import './Banner.css'

const Banner = () => {
    return (
        <section id="banner-section">
            <img src={banner}className="w-100 banner-image" alt="Banner Image"></img>
            <div className="container banner-content">
            <h1 className="pb-5">Find Your <span className="text-danger">Perfect</span> Car</h1>
                <h5>Welcome To</h5>
                <h2 className="logo">Car <span className="text-danger">Eleven</span></h2>             
                <p className="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ex odio hic modi, numquam ad neque atque facere natus vitae dolore est harum minima rem expedita veniam asperiores. Odit, ducimus.
               .</p>

            </div>
        </section>
    );
};

export default Banner;
import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h2>We deliver outstanding service</h2>
      <div className="columns">
        <div className="column">
          <span>01</span>
          <h3>Best-in-class analytics.</h3>
          <p>We employ a team of climate experts, data scientists, and analysts to develop, and vet cutting-edge data models. If you're looking for carbon data that meets the highest bar for regulatory scrutiny, go with us.</p>
          <Link to="/shop">Shop now</Link>
        </div>
        <div className="column">
          <span>02</span>
          <h3>Faster, easier reporting.</h3>
          <p>Watershed was built to help companies get to real carbon reduction, fast. We make it easy to ingest and structure your data - so you can spend less time managing data, and more time on what matters.</p>
          <Link to="/contact">Get in touch</Link>
        </div>
        <div className="column">
          <span>03</span>
          <h3>Custom solutions.</h3>
          <p>Every standard is different, and every company has different needs. With our flexible software platform, you can build data categories, methologies, and reports that adapt as your needs change.</p>
          <Link to="/about">Our mission</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

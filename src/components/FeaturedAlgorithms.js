import React from 'react';
import './FeaturedAlgorithms.css';
import AlgorithmList from './AlgorithmList';

const FeaturedAlgorithms = ({ id }) => {
    return (
        <section id={id} className="featured-algorithms">
            <h2>Featured Algorithms</h2>
            <AlgorithmList />
        </section>
    );
};

export default FeaturedAlgorithms;


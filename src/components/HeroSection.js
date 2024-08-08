import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Welcome to Algorithm Visualizer</h1>
                <p className="hero-description">Explore and visualize various algorithms with interactive demos.</p>
                <a href="#featured-algorithms" className="cta-button">Get Started</a>
            </div>
        </section>
    );
};

export default HeroSection;

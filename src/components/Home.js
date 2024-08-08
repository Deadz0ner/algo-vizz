import React from 'react';
import HeroSection from './HeroSection';
import FeaturedAlgorithms from './FeaturedAlgorithms';
import Footer from './Footer';
import './Home.css';


function App() {
    return (
        <div className="App">
            <HeroSection />
            <main>
                <FeaturedAlgorithms id="featured-algorithms" />
                {/* You can include other visualization components here if needed */}
            </main>
            <Footer />
        </div>
    );
}

export default App;
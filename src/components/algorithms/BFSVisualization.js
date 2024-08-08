import React, { useState, useEffect } from 'react';
import './visualization.css';

const BFSVisualization = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [traversalOrder, setTraversalOrder] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (traversalOrder.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    if (prevIndex < traversalOrder.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        return prevIndex;
                    }
                });
            }, 1000); // Change to adjust speed of traversal
            return () => clearInterval(interval);
        }
    }, [traversalOrder]);

    const startBFS = () => {
        // Sample graph data
        const nodes = ['A', 'B', 'C', 'D'];
        const edges = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D']];
        const traversalOrder = ['A', 'B', 'C', 'D']; // Example traversal order

        setNodes(nodes);
        setEdges(edges);
        setTraversalOrder(traversalOrder);
        setCurrentIndex(0);
    };

    return (
        <div className="visualization">
            <h1>BFS Visualization</h1>
            <button onClick={startBFS}>Start BFS</button>
            <div className="graph">
                <div className="edges">
                    {edges.map((edge, index) => (
                        <div key={index} className="edge">
                            <span className="arrow"></span>
                            {edge[0]} &rarr; {edge[1]}
                        </div>
                    ))}
                </div>
                <div className="nodes">
                    {nodes.map((node, index) => (
                        <div
                            key={index}
                            className={`node ${traversalOrder[currentIndex] === node ? 'active' : ''}`}
                        >
                            {node}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BFSVisualization;

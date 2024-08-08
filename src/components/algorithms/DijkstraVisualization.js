import React, { useState, useEffect } from 'react';
import './visualization.css';

const DijkstraVisualization = () => {
    const [graph, setGraph] = useState({
        A: { B: 1, C: 4 },
        B: { A: 1, D: 2, E: 5 },
        C: { A: 4, F: 3 },
        D: { B: 2, E: 1 },
        E: { B: 5, D: 1, F: 2 },
        F: { C: 3, E: 2 }
    });
    const [distances, setDistances] = useState({});
    const [previousNodes, setPreviousNodes] = useState({});
    const [shortestPath, setShortestPath] = useState([]);
    const [currentNode, setCurrentNode] = useState('');
    const [startNode, setStartNode] = useState('A');
    const [targetNode, setTargetNode] = useState('F');
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [sorting, setSorting] = useState(false);

    const dijkstra = (start, target) => {
        let distances = {};
        let previousNodes = {};
        let nodes = new Set(Object.keys(graph));

        nodes.forEach(node => {
            distances[node] = Infinity;
            previousNodes[node] = null;
        });
        distances[start] = 0;

        while (nodes.size) {
            let nearestNode = Array.from(nodes).reduce((nearest, node) => 
                distances[node] < distances[nearest] ? node : nearest
            );

            nodes.delete(nearestNode);

            if (nearestNode === target) break;

            Object.keys(graph[nearestNode]).forEach(neighbor => {
                let alt = distances[nearestNode] + graph[nearestNode][neighbor];
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previousNodes[neighbor] = nearestNode;
                }
            });

            setSteps(prevSteps => [...prevSteps, { ...distances, currentNode: nearestNode }]);
        }

        let path = [];
        for (let at = target; at; at = previousNodes[at]) {
            path.push(at);
        }
        path.reverse();
        setShortestPath(path);
        setDistances(distances);
        setPreviousNodes(previousNodes);
    };

    const handleSort = () => {
        setSorting(true);
        setSteps([]);
        dijkstra(startNode, targetNode);
        setSorting(false);
    };

    useEffect(() => {
        if (steps.length === 0) return;

        const interval = setInterval(() => {
            setStepIndex(prevIndex => {
                if (prevIndex >= steps.length - 1) {
                    clearInterval(interval);
                    return prevIndex;
                }
                return prevIndex + 1;
            });
        }, 1000); // Adjust delay as needed

        return () => clearInterval(interval);
    }, [steps]);

    return (
        <div className="visualization">
            <h1 className="heading">Dijkstra's Algorithm Visualization</h1>
            <div className="visualization-box">
                <button onClick={handleSort} disabled={sorting} className="start-button">
                    {sorting ? 'Processing...' : 'Start Dijkstra'}
                </button>
                <div className="adjacency-list">
                    <h2>Adjacency List</h2>
                    <ul>
                        {Object.keys(graph).map(node => (
                            <li key={node}>
                                <strong>{node}:</strong> {Object.entries(graph[node]).map(([neighbor, weight]) => `${neighbor} (${weight})`).join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="graph-container">
                    {/* Add SVG or other graph representation here */}
                </div>
                <div className="edges">
                    {steps[stepIndex] && Object.keys(steps[stepIndex]).filter(node => node !== 'currentNode').map((node, index) => (
                        <div key={index} className="node-info">
                            <strong>{node}:</strong> {steps[stepIndex][node]}
                        </div>
                    ))}
                </div>
                <div className="traversal-path">
                    <h3>Shortest Path:</h3>
                    <p>{shortestPath.join(' → ')}</p>
                </div>
            </div>
            <div className="algorithm-description">
                <h2>Dijkstra's Algorithm</h2>
                <p>Dijkstra's Algorithm is a graph search algorithm that finds the shortest path between nodes in a graph. It works by iteratively selecting the node with the smallest known distance, updating its neighbors, and repeating until the target node is reached. The time complexity of Dijkstra's Algorithm is O((V + E) log V), where V is the number of vertices and E is the number of edges.</p>
            </div>
        </div>
    );
};

export default DijkstraVisualization;

import React, { useState, useEffect } from 'react';
import './visualization.css';

const DFSVisualization = () => {
    const [graph, setGraph] = useState({
        A: ['B', 'C'],
        B: ['A', 'D', 'E'],
        C: ['A', 'F'],
        D: ['B'],
        E: ['B', 'F'],
        F: ['C', 'E']
    });
    const [visited, setVisited] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [sorting, setSorting] = useState(false);

    const dfs = (node, visitedNodes) => {
        if (!node || visitedNodes.includes(node)) return;
        visitedNodes.push(node);
        let newSteps = [...visitedNodes];
        setSteps(prevSteps => [...prevSteps, newSteps]);
        graph[node].forEach(neighbor => {
            if (!visitedNodes.includes(neighbor)) {
                dfs(neighbor, visitedNodes);
            }
        });
    };

    const handleSort = () => {
        setSorting(true);
        let startNode = 'A'; // Starting node for DFS
        let visitedNodes = [];
        setVisited([]);
        setSteps([]);
        dfs(startNode, visitedNodes);
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
            <h1 className="heading">Depth-First Search (DFS) Visualization</h1>
            <div className="visualization-box">
                <button onClick={handleSort} disabled={sorting} className="start-button">
                    {sorting ? 'Processing...' : 'Start DFS'}
                </button>
                <div className="adjacency-list">
                    <h2>Adjacency List</h2>
                    <ul>
                        {Object.keys(graph).map(node => (
                            <li key={node}>
                                <strong>{node}:</strong> {graph[node].join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="edges">
                    {steps[stepIndex] && steps[stepIndex].map((node, index) => (
                        index < steps[stepIndex].length - 1 ? (
                            <div key={index} className="arrow-container">
                                <div className="arrow">
                                    <span>{steps[stepIndex][index]}</span> → <span>{steps[stepIndex][index + 1]}</span>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
                <div className="traversal-path">
                    <h3>Traversal Path:</h3>
                    <p>{steps[stepIndex]?.join(' → ')}</p>
                </div>
            </div>
            <div className="algorithm-description">
                <h2>Depth-First Search (DFS) Algorithm</h2>
                <p>Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the root node and explores as far as possible along each branch before backtracking. It uses a stack to remember the next vertex to visit. DFS can be implemented using recursion or an explicit stack. The time complexity of DFS is O(V + E), where V is the number of vertices and E is the number of edges.</p>
            </div>
        </div>
    );
};

export default DFSVisualization;

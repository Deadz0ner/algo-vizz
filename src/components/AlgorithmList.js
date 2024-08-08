import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AlgorithmList.css';

const algorithms = [
    { name: 'Insertion Sort', img: 'insertion_sort.jpeg', description: 'Simple sorting algorithm', path: 'insertion-sort' },
    { name: 'Selection Sort', img: 'selection_sort.png', description: 'In-place comparison sort', path: 'selection-sort' },
    { name: 'Bubble Sort', img: 'bubble_sort.webp', description: 'Simple comparison-based sort', path: 'bubble-sort' },
    { name: 'Merge Sort', img: 'merge_sort.png', description: 'Divide and conquer sorting algorithm', path: 'merge-sort' },
    { name: 'Quick Sort', img: 'quick_sort.png', description: 'Efficient sorting algorithm', path: 'quick-sort' },
    { name: 'DFS', img: 'dfs.png', description: 'Depth-first search', path: 'dfs' },
    { name: 'BFS', img: 'bfs.png', description: 'Breadth-first search', path: 'bfs' },
    { name: 'Dijkstra\'s Algorithm', img: 'dijkstra.png', description: 'Shortest path algorithm', path: 'dijkstra' },
];

const AlgorithmList = () => {
    return (
        <div className="algorithm-list">
            {algorithms.map((algo, index) => (
                <Link to={`/${algo.path}`} key={index} className="card-link">
                    <div className="card">
                        <img src={`/images/${algo.img}`} alt={`${algo.name}`} className="card-image" />
                        <h3 className="card-title">{algo.name}</h3>
                        <p className="card-description">{algo.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AlgorithmList;

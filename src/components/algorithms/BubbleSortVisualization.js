import React, { useState, useEffect } from 'react';
import './visualization.css';

const BubbleSortVisualization = () => {
    const [array, setArray] = useState([5, 3, 8, 4, 2]);
    const [sortedArray, setSortedArray] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [sorting, setSorting] = useState(false);

    const bubbleSort = () => {
        setSorting(true);
        let arr = [...array];
        let newSteps = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
                newSteps.push([...arr]);
            }
        }
        setSteps(newSteps);
        setSortedArray(arr);
        setSorting(false);
    };

    useEffect(() => {
        if (steps.length === 0) return;

        const interval = setInterval(() => {
            setStepIndex((prevIndex) => {
                if (prevIndex >= steps.length - 1) {
                    clearInterval(interval);
                    return prevIndex;
                }
                return prevIndex + 1;
            });
        }, 500); // Adjust delay as needed

        return () => clearInterval(interval);
    }, [steps]);

    return (
        <div className="visualization">
            <h1 className="heading">Bubble Sort Visualization</h1>
            <div className="visualization-box">
                <button onClick={bubbleSort} disabled={sorting} className="start-button">
                    {sorting ? 'Sorting...' : 'Start Bubble Sort'}
                </button>
                <div className="array-container">
                    {steps[stepIndex]?.map((num, index) => (
                        <div
                            key={index}
                            className={`bar ${num === sortedArray[index] ? 'sorted' : ''}`}
                            style={{ height: `${num * 20}px` }}
                        >
                            {num}
                        </div>
                    ))}
                </div>
            </div>
            <div className="algorithm-description">
                <h2>Bubble Sort Algorithm</h2>
                <p>Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process continues until the list is sorted. The worst-case time complexity is O(n^2).</p>
            </div>
        </div>
    );
};

export default BubbleSortVisualization;

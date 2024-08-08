import React, { useState, useEffect } from 'react';
import './visualization.css';

const SelectionSortVisualization = () => {
    const [array, setArray] = useState([5, 3, 8, 4, 2]);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [sorting, setSorting] = useState(false);

    const selectionSort = () => {
        setSorting(true);
        let arr = [...array];
        let newSteps = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            }
            newSteps.push([...arr]);
        }
        setSteps(newSteps);
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
            <h1 className="heading">Selection Sort Visualization</h1>
            <div className="visualization-box">
                <button onClick={selectionSort} disabled={sorting} className="start-button">
                    {sorting ? 'Sorting...' : 'Start Selection Sort'}
                </button>
                <div className="array-container">
                    {steps[stepIndex]?.map((num, index) => (
                        <div
                            key={index}
                            className={`bar ${num === Math.min(...steps[stepIndex]) ? 'sorted' : ''}`}
                            style={{ height: `${num * 20}px` }}
                        >
                            {num}
                        </div>
                    ))}
                </div>
            </div>
            <div className="algorithm-description">
                <h2>Selection Sort Algorithm</h2>
                <p>Selection Sort is a simple comparison-based sorting algorithm. It divides the list into two parts: a sorted part and an unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the end of the sorted part. The worst-case time complexity is O(n^2).</p>
            </div>
        </div>
    );
};

export default SelectionSortVisualization;

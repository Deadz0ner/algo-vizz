import React, { useState, useEffect } from 'react';
import './visualization.css';

const InsertionSortVisualization = () => {
    const [array, setArray] = useState([5, 3, 8, 4, 2]);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [sorting, setSorting] = useState(false);

    const insertionSort = () => {
        setSorting(true);
        let arr = [...array];
        let newSteps = [];
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
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
            <h1 className="heading">Insertion Sort Visualization</h1>
            <div className="visualization-box">
                <button onClick={insertionSort} disabled={sorting} className="start-button">
                    {sorting ? 'Sorting...' : 'Start Insertion Sort'}
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
                <h2>Insertion Sort Algorithm</h2>
                <p>Insertion Sort is a simple comparison-based sorting algorithm. It builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. The worst-case time complexity is O(n^2).</p>
            </div>
        </div>
    );
};

export default InsertionSortVisualization;

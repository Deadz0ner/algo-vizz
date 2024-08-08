import React, { useState, useEffect } from 'react';
import './visualization.css';

const QuickSortVisualization = () => {
    const [array, setArray] = useState([5, 3, 8, 4, 2]);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [sorting, setSorting] = useState(false);

    // Quick sort function
    const quickSort = async (arr) => {
        if (arr.length <= 1) return arr;

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);

        return [...await quickSort(left), ...middle, ...await quickSort(right)];
    };

    // Handle the sorting process and steps recording
    const handleSort = async () => {
        setSorting(true);
        let arr = [...array];
        let newSteps = [];

        const sortAndRecordSteps = async (arr) => {
            if (arr.length <= 1) return arr;

            const pivot = arr[Math.floor(arr.length / 2)];
            const left = arr.filter(x => x < pivot);
            const middle = arr.filter(x => x === pivot);
            const right = arr.filter(x => x > pivot);

            const sortedLeft = await sortAndRecordSteps(left);
            const sortedRight = await sortAndRecordSteps(right);

            const merged = [...sortedLeft, ...middle, ...sortedRight];
            newSteps.push([...merged]); // Record each step

            return merged;
        };

        await sortAndRecordSteps(arr);
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
            <h1 className="heading">Quick Sort Visualization</h1>
            <div className="visualization-box">
                <button onClick={handleSort} disabled={sorting} className="start-button">
                    {sorting ? 'Sorting...' : 'Start Quick Sort'}
                </button>
                <div className="array-container">
                    {steps[stepIndex]?.map((num, index) => (
                        <div
                            key={index}
                            className={`bar ${num === array[index] ? 'sorted' : ''}`}
                            style={{ height: `${num * 20}px` }}
                        >
                            {num}
                        </div>
                    ))}
                </div>
            </div>
            <div className="algorithm-description">
                <h2>Quick Sort Algorithm</h2>
                <p>Quick Sort is an efficient, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. The worst-case time complexity is O(n^2), but it performs well on average with a time complexity of O(n log n).</p>
            </div>
        </div>
    );
};

export default QuickSortVisualization;

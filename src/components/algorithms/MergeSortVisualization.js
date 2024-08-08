import React, { useState, useEffect } from 'react';
import './visualization.css';

const MergeSortVisualization = () => {
    const [array, setArray] = useState([5, 3, 8, 4, 2]);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [sorting, setSorting] = useState(false);

    // Merge sort function
    const mergeSort = async (arr) => {
        if (arr.length <= 1) return arr;

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        return merge(await mergeSort(left), await mergeSort(right));
    };

    // Merge function to combine two sorted arrays
    const merge = (left, right) => {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };

    // Handle the sorting process and steps recording
    const handleSort = async () => {
        setSorting(true);
        let arr = [...array];
        let newSteps = [];

        const sortAndRecordSteps = async (arr) => {
            if (arr.length <= 1) return arr;

            const middle = Math.floor(arr.length / 2);
            const left = arr.slice(0, middle);
            const right = arr.slice(middle);

            const sortedLeft = await sortAndRecordSteps(left);
            const sortedRight = await sortAndRecordSteps(right);
            const merged = merge(sortedLeft, sortedRight);

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
            <h1 className="heading">Merge Sort Visualization</h1>
            <div className="visualization-box">
                <button onClick={handleSort} disabled={sorting} className="start-button">
                    {sorting ? 'Sorting...' : 'Start Merge Sort'}
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
                <h2>Merge Sort Algorithm</h2>
                <p>Merge Sort is a divide-and-conquer sorting algorithm that divides the unsorted list into n sublists, each containing one element, and then repeatedly merges the sublists to produce new sorted sublists until there are no more sublists. The worst-case time complexity is O(n log n).</p>
            </div>
        </div>
    );
};

export default MergeSortVisualization;

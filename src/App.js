import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import InsertionSortVisualization from './components/algorithms/InsertionSortVisualization';
import SelectionSortVisualization from './components/algorithms/SelectionSortVisualization';
import BubbleSortVisualization from './components/algorithms/BubbleSortVisualization';
import MergeSortVisualization from './components/algorithms/MergeSortVisualization';
import QuickSortVisualization from './components/algorithms/QuickSortVisualization';
import DFSVisualization from './components/algorithms/DFSVisualization';
import BFSVisualization from './components/algorithms/BFSVisualization';
import DijkstraVisualization from './components/algorithms/DijkstraVisualization';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/insertion-sort" element={<InsertionSortVisualization />} />
                    <Route path="/selection-sort" element={<SelectionSortVisualization />} />
                    <Route path="/bubble-sort" element={<BubbleSortVisualization />} />
                    <Route path="/merge-sort" element={<MergeSortVisualization />} />
                    <Route path="/quick-sort" element={<QuickSortVisualization />} />
                    <Route path="/dfs" element={<DFSVisualization />} />
                    <Route path="/bfs" element={<BFSVisualization />} />
                    <Route path="/dijkstra" element={<DijkstraVisualization />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

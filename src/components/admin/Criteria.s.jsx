import React, { useState, useEffect } from 'react';
import { GrPlug } from 'react-icons/gr';


    
const Criteria = ({ onSelect, department, searchTerm, sortByUsage }) => {
    const [criteriaData, setCriteriaData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [plugMessage, setPlugMessage] = useState('');
    const [sortedCriteria, setSortedCriteria] = useState([]);
    const [showAllCriteria, setShowAllCriteria] = useState(true);

    // useEffect(() => {
    //     console.log("Selected Department in EmployeeCriteria:", department);
    //     console.log("Search Value in EmployeeCriteria:", searchTerm);
    //     console.log("Most Used Clicked in EmployeeCriteria:", sortByUsage);
    // }, [department, searchTerm, sortByUsage])

    useEffect(() => {
        fetchData();
    }, [department, showAllCriteria]);

    useEffect(() => {
        if (sortByUsage) {
            const criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

            const sorted = Object.values(criteriaUsage)
                .sort((a, b) => b.count - a.count)
                .map(entry => entry.criteria);

            setSortedCriteria(sorted);
        } else {
            fetchData();
        }
    }, [department, sortByUsage, showAllCriteria]);

    const fetchData = async () => {
        try {
            const url = department && department !== 'All'
                ? `http://localhost:8000/criteriafilter?department=${department}`
                : 'http://localhost:8000/criteriafilter';
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data)) {
                setCriteriaData(data);
            } else {
                console.error('Expected an array but got:', data);
                setCriteriaData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setCriteriaData([]);
        }
    };

    const handleItemClick = (criteria) => {
        setSelectedId(criteria.id);
        onSelect(criteria);
    };

    const handlePlugClick = (event, criteria) => {
        event.stopPropagation();
        setPlugMessage(`Plug in for criteria ID: ${criteria.id}`);

        let criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

        if (criteriaUsage[criteria.id]) {
            criteriaUsage[criteria.id].count += 1;
        } else {
            criteriaUsage[criteria.id] = { count: 1, criteria };
        }

        sessionStorage.setItem('criteriaUsage', JSON.stringify(criteriaUsage));
        sessionStorage.setItem('recentCriteria', JSON.stringify(criteria));

        setTimeout(() => setPlugMessage(''), 2000);
    };

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setShowAllCriteria(true);
        } else {
            try {
                const regex = new RegExp(searchTerm.trim(), 'i');
                const filteredCriteria = criteriaData.filter(criteria => regex.test(criteria.id.trim()));
                setCriteriaData(filteredCriteria);
                setShowAllCriteria(false);
            } catch (e) {
                console.error("Invalid regex pattern", e);
                setCriteriaData([]); 
                setShowAllCriteria(false);
            }
        }
    }, [searchTerm]);
    
    const handleShowAllCriteria = () => {
        setShowAllCriteria(true);
        fetchData();
    };

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            {plugMessage && <p>{plugMessage}</p>}

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                        <tr style={{ borderBottom: '2px solid #ddd' }}>
                            <th style={{ textAlign: 'left', padding: '10px', width: '10%' }}>Id</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '50%' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '25%' }}>Department</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).length > 0 ? (
                            (showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).map((criteria, index) => (
                                <tr
                                    key={index}
                                    style={criteria.id === selectedId ? { backgroundColor: 'rgb(37, 150, 190)', color: 'white' } : { borderBottom: '1px solid #ddd', backgroundColor: 'rgba(37, 150, 190, 0.1)' }}
                                    onClick={() => handleItemClick(criteria)}
                                >
                                    <td style={{ textAlign: 'left', padding: '20px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                                        {criteria.id}
                                    </td>
                                    <td style={{ textAlign: 'left', padding: '20px' }}>{criteria.name}</td>
                                    <td style={{ textAlign: 'left', padding: '20px' }}>{criteria.department}</td>
                                    <td style={{ textAlign: 'left', padding: '20px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', cursor: 'pointer' }}>
                                        {!sortByUsage && (
                                            <span onClick={(event) => handlePlugClick(event, criteria)}><GrPlug /></span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '8px', textAlign: 'center' }}>No criteria available for the selected department</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!showAllCriteria && (
                <button onClick={handleShowAllCriteria}>Show All Criteria</button>
            )}
        </div>
    );
};

export default Criteria;

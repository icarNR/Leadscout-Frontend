import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { GrPlug } from 'react-icons/gr';

const Criteria = ({ onSelect, department, searchTerm = '', sortByUsage }) => {
    const [criteriaData, setCriteriaData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [plugMessage, setPlugMessage] = useState('');
    const [sortedCriteria, setSortedCriteria] = useState([]);
    const [showAllCriteria, setShowAllCriteria] = useState(true);
    const [showPlugOptions, setShowPlugOptions] = useState(false); // State to manage showing plug options

    const navigate = useNavigate();  // Initialize useNavigate

    // Retrieve access token from local storage
    const accessToken = localStorage.getItem('access_token');

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
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 401 || response.status === 403) {
                console.error('Authorization error:', response.status, response.statusText);
                // Navigate to login form if unauthorized or forbidden
                navigate('/LoginForm');
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setCriteriaData(data);
            } else {
                console.error('Expected an array but got:', data);
                setCriteriaData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/LoginForm');  // Redirect to login form on error
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
        setShowPlugOptions(true); // Show plug options

        let criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

        if (criteriaUsage[criteria.id]) {
            criteriaUsage[criteria.id].count += 1;
        } else {
            criteriaUsage[criteria.id] = { count: 1, criteria };
        }

        sessionStorage.setItem('criteriaUsage', JSON.stringify(criteriaUsage));
        sessionStorage.setItem('recentCriteria', JSON.stringify(criteria));
    };

    const handlePlugIn = () => {
        // Perform plug-in action
        setShowPlugOptions(false); // Hide plug options after plugging in
        setTimeout(() => setPlugMessage(''), 2000); // Clear plug message after 2 seconds
    };

    const handleCancelPlug = () => {
        setShowPlugOptions(false); // Hide plug options
        setPlugMessage(''); // Clear plug message

        // Preserve the previous recent criteria in session storage
        const recentCriteria = JSON.parse(sessionStorage.getItem('recentCriteria')) || {};
        if (recentCriteria.id) {
            sessionStorage.setItem('recentCriteria', JSON.stringify(recentCriteria));
        }
    };

    useEffect(() => {
        if (searchTerm && searchTerm.trim() === '') {
            setShowAllCriteria(true);
        } else if (searchTerm) {
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

    // Prevent user interaction when plug options are shown
    if (showPlugOptions) {
        return (
            <div style={{ width: '100%', padding: '20px' }}>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '20px', maxWidth: '400px', textAlign: 'center' }}>
                        <p style={{ marginBottom: '10px', fontSize: '16px', color: '#333' }}>{plugMessage}</p>
                        <button onClick={handlePlugIn} style={{ marginRight: '10px', backgroundColor: '#00818A', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>OK</button>
                        <button onClick={handleCancelPlug} style={{ backgroundColor: '#ccc', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    // Render the main content when plug options are not shown
    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <div className="table-header-box" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <thead style={{ color: 'black', position: 'sticky', top: 0, zIndex: 2 }}>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '20px', width: '20%', fontSize: 18 }}>Criteria Id</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '50%', fontSize: 18 }}>Job Position</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '25%', fontSize: 18 }}>Department</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '10%' }}></th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <tbody>
                        {(showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).length > 0 ? (
                            (showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).map((criteria, index) => (
                                <tr
                                    key={index}
                                    style={{ backgroundColor: criteria.id === selectedId ? '#00818A' : 'rgba(37, 150, 190, 0.1)', color: criteria.id === selectedId ? 'white' : 'black' }}
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
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button onClick={handleShowAllCriteria} style={{ padding: '10px 20px', backgroundColor: '#00818A', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Show All Criteria</button>
                </div>
            )}
        </div>
    );
};

export default Criteria;

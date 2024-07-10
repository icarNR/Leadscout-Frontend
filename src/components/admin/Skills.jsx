import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Skills = ({ criteriaId, accessToken }) => {
    const [skillsData, setSkillsData] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        if (criteriaId !== null) {
            fetchData(criteriaId);
        }
    }, [criteriaId]);

    const fetchData = async (criteriaId) => {
        try {
            const response = await fetch(`http://localhost:8000/skills/${criteriaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                navigate('/LoginForm');  // Redirect to login form on error
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const data = await response.json();
            setSkillsData(data);
        } catch (error) {
            setError(error.message);
            setSkillsData([]);
        }
    };

    const tableStyle = {
        width: '250px',
        maxWidth: '600px', // Set a max width for the table
        borderCollapse: 'collapse',
        marginTop: '10px',
        borderRadius: '10px',
        overflow: 'hidden',
    };

    const thStyle = {
        backgroundColor: '#00818A', // Updated to green shade
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        paddingLeft: '20px',
        width: '250px', // Set the width of each column
    };

    const tdStyle = {
        padding: '10px',
        paddingLeft: '20px', // Add 10px space from the left side
        textAlign: 'left',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#00818A', // Updated to green shade
        color: 'white', // Ensuring text color is readable
        width: '250px', // Set the width of each column
    };

    return (
        <div>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>EvalScore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skillsData.map((skill, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{skill.name}</td>
                                <td style={tdStyle}>{skill.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Skills;



import React, { useState, useEffect } from 'react';

const Skills = ({ criteriaId }) => {
    const [skillsData, setSkillsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (criteriaId !== null) {
            fetchData(criteriaId);
        }
    }, [criteriaId]);

    const fetchData = async (criteriaId) => {
        try {
            const response = await fetch(`http://localhost:8000/skills/${criteriaId}`);
            if (!response.ok) {
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
        width: '300px',
        borderCollapse: 'collapse',
        marginTop: '10px',
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const thStyle = {
        backgroundColor: 'rgb(37, 150, 190)',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        paddingLeft: '20px'
    };

    const tdStyle = {
        padding: '10px',
        paddingLeft: '20px', // Add 10px space from the left side
        textAlign: 'left',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        backgroundColor: 'rgb(37, 150, 190)',
        color: 'white', // Ensuring text color is readable
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


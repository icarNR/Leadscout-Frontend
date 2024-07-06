import React, { useState, useEffect } from 'react';
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrPlug } from "react-icons/gr";

const Recent = () => {
    const [recentCriteria, setRecentCriteria] = useState(null);

    useEffect(() => {
        const recent = JSON.parse(sessionStorage.getItem('recentCriteria'));
        setRecentCriteria(recent);
    }, []);

    const saveToRecentCriteria = () => {
        if (recentCriteria) {
            let criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

            if (criteriaUsage[recentCriteria.id]) {
                criteriaUsage[recentCriteria.id].count += 1;
            } else {
                criteriaUsage[recentCriteria.id] = { count: 1, criteria: recentCriteria };
            }

            sessionStorage.setItem('criteriaUsage', JSON.stringify(criteriaUsage));
            sessionStorage.setItem('recentCriteria', JSON.stringify(recentCriteria));

            alert(`Plugged in for criteria ID: ${recentCriteria.id}`);
        }
    };

    const pStyle = {
        border: '1px solid #ddd',
        padding: '15px',
        margin: '1px',
        backgroundColor: 'rgb(233, 244, 248)',
        //width: '300px',
        width: '400px',
        marginRight: '10px',
        paddingLeft: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px' // Add this line for rounded corners
    };

    const h1Style = {
        textAlign: 'left',
        marginLeft: '15px'
    };

    return (
        <div>
            <h1 style={h1Style}>Recent</h1>
            <FaClockRotateLeft />
            <pre>
                {recentCriteria ? (
                    <div style={pStyle}>
                        {recentCriteria.name}
                        <span onClick={saveToRecentCriteria} style={{ cursor: 'pointer' }}><GrPlug /></span>
                    </div>
                ) : (
                    <div style={pStyle}>
                        No recent criteria
                    </div>
                )}
            </pre>
        </div>
    );
}

export default Recent;

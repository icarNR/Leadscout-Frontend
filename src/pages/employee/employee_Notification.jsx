
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';
import PageLayout from '../../layouts/ELayout';

const columns = [
  { field: 'ntype', headerName: 'Notification Type', width: 160 },
  { field: 'sender_name', headerName: 'Sender Name', width: 200 },
  { field: 'datetime', headerName: 'Date & Time', width: 200 },
];

const NotificationTable = ({ rows }) => (
  <div style={{ height: 550, width: '100%' }}>
    <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} pagination />
  </div>
);

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://127.0.0.1:800/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const rows = notifications.map((notification) => ({
    id: notification.sender_id,
    ntype: notification.ntype,
    sender_name: notification.sender_name,
    datetime: new Date(notification.datetime).toLocaleString(),
  }));

  const handlePrev = () => {
    // Implement handlePrev logic if needed
  };

  const handleNext = () => {
    // Implement handleNext logic if needed
  };

  const pageContent = (
    <div className="flex flex-col h-full p-10">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="px-4 py-2" style={{ backgroundColor: '#00818A', color: 'white', borderRadius: '0.375rem' }}>
          Prev
          <VscArrowLeft />
        </button>
        <button onClick={handleNext} className="px-4 py-2"style={{backgroundColor: '#00818A', color: 'white', borderRadius: '0.375rem' }}>
          Next
          <VscArrowRight />
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <NotificationTable rows={rows} />
      )}
    </div>
  );

  return <PageLayout content={pageContent} pagename={'Notification'} />;
};

export default Notification;




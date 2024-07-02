
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PageLayout from '../../layouts/ELayout';

const columns = [
  { field: 'ntype', headerName: 'Notification Type', width: 160 },
  { field: 'sender_name', headerName: 'Sender Name', width: 200 },
  { field: 'datetime', headerName: 'Date & Time', width: 200 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleAccept(params.row.id)}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          Accept
        </button>
        <button
          onClick={() => handleDecline(params.row.id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Decline
        </button>
      </div>
    ),
  },
];

const handleAccept = (id) => {
  console.log(`Accepted notification with ID: ${id}`);
  // Implement your accept logic here
};

const handleDecline = (id) => {
  console.log(`Declined notification with ID: ${id}`);
  // Implement your decline logic here
};

const NotificationTable = ({ rows }) => (
  <div style={{ height: 600, width: '100%' }}>
    <DataGrid 
      rows={rows} 
      columns={columns}
      pageSiz={rows.length}
      hideFooterPagination
      autoPageSize
     
      
    />
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

  const pageContent = (
    <div className="flex flex-col h-full p-10 overflow-auto">
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




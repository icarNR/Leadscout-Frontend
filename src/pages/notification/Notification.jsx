
// import React, { useEffect, useState } from 'react';
// import PageLayout from '../../layouts/ELayout';
// import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
// import { DataGrid } from "@mui/x-data-grid";
// import Button from "@mui/material/Button";
// import axios from 'axios';
// import "../../style/Notification.css";

// const columns = [
//   { field: "picture", headerName: "", width: 60, renderCell: (params) => <img src={params.row.picture} alt="profile" /> },
//   { field: "notification", headerName: "Status", width: 160 },
//   { field: "date", headerName: "Date", width: 100 },
//   { field: "name", headerName: "Name", width: 200 },
//   {
//     field: "accept",
//     headerName: "",
//     width: 90,
//     renderCell: (params) => (
//       <Button
//         variant="contained"
//         size="small"
//         disabled={!params.row.accept}
//         onClick={() => {
//           console.log("Accept button clicked for row:", params.row);
//         }}
//         className="button accept-button"
//       >
//         Accept
//       </Button>
//     ),
//   },
//   {
//     field: "decline",
//     headerName: "",
//     width: 90,
//     renderCell: (params) => (
//       <Button
//         variant="contained"
//         size="small"
//         disabled={!params.row.decline}
//         onClick={() => {
//           console.log("Decline button clicked for row:", params.row);
//         }}
//         className="button decline-button"
//       >
//         Decline
//       </Button>
//     ),
//   },
// ];

// const LeadershipTable = ({ rows }) => (
//   <div style={{ height: 550, width: "100%" }}>
//     <DataGrid
//       rows={rows}
//       columns={columns}
//       pageSizeOptions={[5, 10, 20]}
//       pagination
//     />
//   </div>
// );

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         console.log("Fetching notifications...");
//         const response = await axios.get('http://127.0.0.1:8000/notifications', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         });
//         console.log("Response data:", response.data);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   const handlePrev = () => {
//     // Implement handlePrev logic if needed
//   };

//   const handleNext = () => {
//     // Implement handleNext logic if needed
//   };

//   const rows = notifications.map((notification, index) => ({
//     id: index,
//     picture: "/mg.jpg", // Replace with actual picture field if available
//     notification: notification.ntype,
//     date: new Date(notification.datetime).toLocaleDateString(),
//     name: notification.sender_name,
//     accept: true, // Adjust logic based on your requirements
//     decline: true, // Adjust logic based on your requirements
//   }));

//   console.log("Rows data:", rows);

//   const pageContent = (
//     <div className="flex flex-col h-full p-10">
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowLeft /></button>
//         {/* Add the Div1 component here */}
//         <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowRight /></button>
//       </div>
//       {loading ? <p>Loading...</p> : <LeadershipTable rows={rows} />}
//     </div>
//   );

//   return (<PageLayout content={pageContent} pagename={"Notification"} />);
// };

// export default Notification;



// import { useParams } from 'react-router-dom';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRequest } from './projectslice';


// export default () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const loading = useSelector(state => state.data.loading);
//     const responseData = useSelector(state => state.data.responseData);
//     const error = useSelector(state => state.data.error);


//     // useEffect(() => {
//         // Dispatch getRequest action when the component mounts
//         dispatch(getRequest('https://example.com/api'));
//       }, [dispatch]);
    
//   return (
// <>
//     <div>
//     <h1>Project Details for ID: {id}</h1>
//     {/* Render project details here */}
//     </div>
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {responseData && (
//         <div>
//           <h2>Response Data:</h2>
//           <pre>{JSON.stringify(responseData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }


//     // Use the id parameter to fetch and render project details

// import { useParams } from 'react-router-dom';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRequest } from './projectslice'; // Adjust the import

// export default () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const loading = useSelector(state => state.http.loading); // Adjusted to state.http.loading
//     const responseData = useSelector(state => state.http.responseData); // Adjusted to state.http.responseData
//     const error = useSelector(state => state.http.error); // Adjusted to state.http.error

//     useEffect(() => {
//         // Dispatch getRequest action when the component mounts
//         dispatch(getRequest('https://ewvac7689b.execute-api.ap-south-1.amazonaws.com/production/user'));
//       }, [dispatch]);
    
//   return (
//     <>
//       <div>
//         <h1>Project Details for ID: {id}</h1>
//         {/* Render project details here */}
//       </div>
//       <div>
//         {/* {loading && <p>Loading...</p>} */}
//         {error && <p>Error: {error}</p>}
//         {responseData && (
//           <div>
//             <h2>Response Data:</h2>
//             <pre>{JSON.stringify(responseData, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// YourComponent.js

// YourComponent.js sbdkjabsfkhbasjhdvah

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncData } from '../../features/userslice'
import AddTaskHistory from "../components/AddTaskHistory";
import ViewTaskHistory from '../components/ViewTaskHistory';

const YourComponent = () => {
  // const dispatch = useDispatch();
  // const { data, loading, error } = useSelector((state) => {
  //   ////////console.log(state);
  //   return state.data});

  // useEffect(() => {
  //   dispatch(fetchAsyncData());
  //   ////////console.log(data);
  // }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <h1>Data from API</h1>
      <AddTaskHistory/>
      <ViewTaskHistory/>
      {/* <ul>
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default YourComponent;



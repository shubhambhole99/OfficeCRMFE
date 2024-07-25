// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab , Nav} from '@themesberg/react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
// import 'react-toastify/dist/ReactToastify.css';
// import baseurl from "../api";
// import {triggerFunction,getPredefinedUrl} from '../../components/SignedUrl';
// import { useHistory } from 'react-router-dom';
// import {check} from '../../checkloggedin'
// import Multiselect from "../../components/Multiselect";


// export default () => {


//   const [pname,setpname]=useState('')
//   const [subject,setSubject]=useState('ab')
//   const [corres,setCorres]=useState('')
//   const [prev,setPrev]=useState('')
//   const [next,setNext]=useState('')


//   const [name,setName]=useState('ab')
//   const [phone, setPhone] = useState('123');
//   const [email, setEmail] = useState('ab@gmail.com');
//   const [message, setMessage] = useState('dasdas');
//   const [projects,setprojects]=useState([])
//   const [type,setType]=useState('')

//   const [imageUrl, setImageUrl] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [clickedImage, setClickedImage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [data, setData] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("form");
//   const itemsPerPage = 5; // Define itemsPerPage

//   // State variables for edit modal



//   ////mine
//   const [key,setKey]=useState("");
   
//    const [folderName, setFolderName] = useState(''); // State for folder name
//    const [folders, setFolders] = useState([]); // State for storing folder names
//    const [url, setUrl] = useState('');
//    const filepath='../../index.js'

//    let history = useHistory();
//    // for this file only
//   const [users,setUsers]=useState([])
//   const [pnamearr,setPnamearr]=useState([])
//   const [taskdescription,setTaskdescription]=useState('')
//   const selectedusers=()=>{

//   }
//   const token = localStorage.getItem('token');
//   // project filtering
//   let [isActive, setIsActive] = useState(null);
//   let [companyname,setCompanyName]=useState('')
  


//   const handleUpload = (e) => {
//     e.preventDefault();
    
   
//   // api call
//   (async () => {
//     try {
      
//       const body = {
//         pname: pname||undefined,
//         subject: subject||undefined,
//         previous: prev||undefined,
//         next:next||undefined,
//         description: message||undefined,
//       };
//       ////////////////console.log(body)
//     axios.post(`${baseurl}/correspondence`,body).then(res=>{
//         ////////////////console.log(res)
//     }
//     ).catch(error=>{

//     })

    
//     //  const response = await axios.post(`${baseurl}/contact/create`, body);
//     //  ////////////////console.log(response.data)
//       toast.success('Contact added successfully'); 
//     } catch (error) {
//       console.error(error);
//     }
//   })();
  
//   };


//   ////////////////////////////////////////////

//   const handleprojectFetch=async()=>{
//     //////////////////console.log(companyname)
//     let body={
//       company:companyname?companyname:null,
//       status:isActive?isActive:null
//     }
//     //////////////////console.log(body)
//     await axios.put(`${baseurl}/project/`,body)
//     .then(response => {
//       setPnamearr(response.data);
//       // ////////////////console.log(response.data)
//     })
//     .catch(error => {
//       //console.error(error);
//     });

//   }


//   //For Fetching Users and Projects
//   useEffect(() => {
//    //////////////////console.log(check())
//    axios.get(`${baseurl}/user`)
//    .then(response => {
//      setUsers(response.data);
//    })
//    .catch(error => {
//      //console.error(error);
//    });
//       handleprojectFetch()
// //   Fetching all the correspondence
    

//     //   ////////////////console.log(pnamearr)
//   }, []);

  
//  // Calculate the index of the first item to display based on the current page and items per page

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setClickedImage(null);
//   }

//   // redirect to projects page
 
//   let startIndex = currentPage * itemsPerPage;
//   let endIndex = (currentPage + 1) * itemsPerPage;
//   let currentItems = data.slice(startIndex, endIndex);


//   return (
//     <>
//       <ToastContainer />
//       <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
//         <div className="d-block mb-4 mb-xl-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item active>Service</Breadcrumb.Item>
//           </Breadcrumb>
//         </div>
//       </div>
//       <Tab.Container defaultActiveKey="home">
//         <Nav fill variant="pills" className="flex-column flex-sm-row">
//           <Nav.Item>
//             <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
//               Create Correspondence
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//         <Tab.Content>
//           <Tab.Pane eventKey="home" className="py-4">
//             <section className="d-flex align-items-center my-2 mt-lg-3 mb-lg-5">
//               <Container>
//                 <form onSubmit={(e)=>handleUpload(e)}>
//                   <Row >
//                   <Col xs={12} md={6}>
//                       <Form.Group id="tasksubject" className="mb-4">
//                         <Form.Label>Project Name</Form.Label>
//                         <InputGroup>
//                           <InputGroup.Text>
//                           </InputGroup.Text>
//                           <Form.Select  value={pname} onChange={(e) => setpname(e.target.value)}>
//                     <option value="">Select Option</option>
//                       {pnamearr.map((option, index) => (
//                         <option key={index} value={option._id}>{option.name}</option>
//                       ))}
//                     </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
                    
//             <Col xs={12} md={6}>
//                 <Form.Group id="pname" className="mb-4">
//                   <Form.Label>Subject</Form.Label>
//                   <InputGroup>
//                     <InputGroup.Text>
//                     </InputGroup.Text>
//                     <Form.Control autoFocus type="text" placeholder="Email" value={subject} onChange={(e) => setSubject(e.target.value)} />

//                   </InputGroup>
//                 </Form.Group>
//               </Col>
                             
                    
//                     {/* previous */}
//                     <Col xs={12} md={6}>
//                       <Form.Group id="tasksubject" className="mb-4">
//                         <Form.Label>Previous</Form.Label>
//                         <InputGroup>
//                           <InputGroup.Text>
//                           </InputGroup.Text>
//                           <Form.Select  value={corres} onChange={(e) => setCorres(e.target.value)}>
//                     <option value="">Select Option</option>
//                       {pnamearr.map((option, index) => (
//                         <option key={index} value={option._id}>{option.name}</option>
//                       ))}
//                     </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
//                     {/* next */}
//                     <Col xs={12} md={6}>
//                       <Form.Group id="tasksubject" className="mb-4">
//                         <Form.Label>Next</Form.Label>
//                         <InputGroup>
//                           <InputGroup.Text>
//                           </InputGroup.Text>
//                           <Form.Select  isSearchable={true} value={type} onChange={(e) => setType(e.target.value)}>
//                     <option value="">Select Option</option>
//                       {pnamearr.map((option, index) => (
//                         <option key={index} value={option._id}>{option.name}</option>
//                       ))}
//                     </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>

//                     <Col xs={12} md={6}>
//                       <Form.Group id="tasksubject" className="mb-4">
//                         <Form.Label>Description</Form.Label>
//                         <InputGroup>
//                           <textarea rows={4} cols={60} placeholder="Task Subject" value={message} onChange={(e) => setMessage(e.target.value)} />
//                         </InputGroup>
//                       </Form.Group>
//                     </Col> 
//                     <Col className="d-flex justify-content-center"> {/* Centering the submit button */}
//                       <Button variant="primary" type="submit" className="w-100 mt-3">
//                         Submit
//                       </Button>
//                     </Col>
                    
//                   </Row>
//                 </form>
//               </Container>
//             </section>
//           </Tab.Pane>
//         </Tab.Content>
//       </Tab.Container>
//       <Modal show={showModal && !editMode} onHide={handleCloseModal}>
//         <Modal.Header>
//           <Modal.Title>{data.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <img src={clickedImage} alt="Zoomed Image" style={{ maxWidth: "100%" }} onClick={() => setEditMode(true)} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };





import React, { useState } from 'react';
import { triggerFunction, getPredefinedUrl } from '../../components/SignedUrl';

export default () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allfilextensions, setAllFileExtensions] = useState([]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    setSelectedFiles(files);

    for (let i = 0; i < files.length; i++) {
      const fileExtension = files[i].name;
      const [url, key] = await triggerFunction(fileExtension, "test");
      setAllFileExtensions(prevState => [...prevState, [url, key]]);
    }
  };


  const handleUpload=()=>{
for(let i=0;i<selectedFiles.length;i++){
    ////////////////console.log(allfilextensions[i])
    const selectedFile=selectedFiles[i]
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const fileContent = event.target.result;
          // Perform your upload logic here
          // For demonstration, let's just log the file extension and content
          //////////////////console.log('Selected File Extension:', fileExtension);
          //////////////////console.log('File Content:', fileContent);
      
          try {
            // Example: Uploading file content using Fetch
            const responseFile = await fetch(allfilextensions[i][0], {
              method: 'PUT',
              body: fileContent,
              headers: {
                'Content-Type': 'application/octet-stream', // Set appropriate content type
              },
              mode: 'cors', // Enable CORS
            });
            if (!responseFile.ok) {
              throw new Error('Network response was not ok');
            }
    
            ////////////////console.log('File uploaded successfully:', responseFile);
          }catch (error) {
              //console.error('Error:', error);
            //   toast.error('Failed to add image'); // Display error toast if addition fails
            }
          }
           
        reader.readAsArrayBuffer(selectedFile);
            }
        }
    ////////////////console.log("HI")
  }

//   create new functionality
//   new matter or existing matter
//   const upload

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <div>
        {/* Display the selected file names */}
        {selectedFiles.length > 0 && (
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
                <> <li key={index} ><p style={{width:"40%",whiteSpace:"pre-wrap"}}>{file.name}</p><button>Cancel</button></li>
                </>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleUpload}>upload</button>
    </div>
  );
}




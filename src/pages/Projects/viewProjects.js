import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
import 'react-toastify/dist/ReactToastify.css';
import { baseurl, ProjectStatus } from "../../api";
import { useSelector, useDispatch } from 'react-redux';
import { triggerFunction, getPredefinedUrl } from '../../components/SignedUrl';
import { useHistory } from 'react-router-dom';
import { fetchProjects, importquestions } from "../../features/projectslice";
import Multiselect from "../../components/Multiselect";
import { check,checkloginvailidity } from '../../checkloggedin.js';
import { useParams } from 'react-router-dom';
import { getquestions } from '../../features/questionslice.js'

export default () => {

  // common for all
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState('');

  const [developer, setDeveloper] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [area, setArea] = useState(0)
  const [company, setCompany] = useState('')
  const [pstage, setpstage] = useState('')

  const [imageUrl, setImageUrl] = useState(null);
  const [isActive, setIsActive] = useState('false');
  let [companyname, setCompanyName] = useState("")
  let [feactive, setfeactive] = useState("")
  const [users, setUsers] = useState([])
  const [selectedusers, setSelectedusers] = useState([])

  const [currentPage, setCurrentPage] = useState(0);
  const [clickedImage, setClickedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  const itemsPerPage = 5; //Define itemsPerPage

  // State variables for edit modal
  const [editProjectId, setEditProjectId] = useState('');
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectType, setEditProjectType] = useState('');
  const [editProjectStage, setEditProjectStage] = useState('');
  const [editProjectStatus, setEditProjectStatus] = useState('')
  const [editDeveloper, setEditDeveloper] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editProjectDescription, setEditProjectDescription] = useState('');
  const [editArea, setEditArea] = useState(null);
  const [editimageUrl, setEditImageUrl] = useState(null);
  const [editselectedusers, setEditSelectedusers] = useState([])
  const [addimage, setAddImage] = useState(false)


  const [ptype, setPtype] = useState('');
  const [arr, setArr] = useState([]);
  const [pstatus, setPstatus] = useState('')

  ////mine
  const [key, setKey] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtension, setFileExtension] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  const [folderName, setFolderName] = useState(''); // State for folder name
  const [folders, setFolders] = useState([]); // State for storing folder names
  const [url, setUrl] = useState('');


  // For table
  let [regu, setregu] = useState(null)
  let { id } = useParams();


  //For FAQS
  let [question, setquestions] = useState([])
  let [editmode, seteditmode] = useState(false)
  let [selectedquestion, setselectedquestion] = useState([])
  let [selectedquestions, setselectedquestions] = useState([])
  let [existingquestion, setexistingquestion] = useState([])
  let [thisproject, setthisproject] = useState(null)

  ///for disabled

  let [isDisabled, setIsDisabled] = useState(false)

  let history = useHistory();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read file extension
      const fileExtension = file.name;
      setSelectedFile(file);
      setFileExtension(fileExtension);
      let arr1 = await triggerFunction(fileExtension, folderName)
      ////////////////////console.log(arr1)
      setUrl(arr1[0]); // Update URL with folderName
      setKey(arr1[1])
      setIsFileSelected(true); // Enable upload button
    } else {
      setSelectedFile(null);
      setFileExtension('');
      setIsFileSelected(false); // Disable upload button
    }
  };



  const handleUpload = () => {

    // s3
    const token = localStorage.getItem('token');
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = event.target.result;
        // Perform your upload logic here
        // For demonstration, let's just log the file extension and content
        ////////////////////console.log('Selected File Extension:', fileExtension);
        ////////////////////console.log('File Content:', fileContent);

        try {
          // Example: Uploading file content using Fetch
          const responseFile = await fetch(url, {
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

          ////////////////////console.log('File uploaded successfully:', responseFile);
        } catch (error) {
          //console.error('Error:', error);
          toast.error('Failed to add image'); // Display error toast if addition fails
        }
      }

      reader.readAsArrayBuffer(selectedFile);
    }
    // backend
    (async () => {
      try {
        let objid = [];
        for (let i = 0; i < selectedusers.length; i++) {
          ////////////////////console.log(selectedusers[i]);
          objid.push(selectedusers[i].id);
        }
        ////////////////////console.log(objid);

        let body = {
          name: projectName,
          type: ptype,
          status: pstatus,
          stage: pstage,
          developer: developer,
          description: projectDescription,
          area: area,
          // imageUrl: getPredefinedUrl(key),
          users: objid,
          company: company,
        };

        const responseFormData = await axios.post(`${baseurl}/project/create`, body);
        ////////////////////console.log(responseFormData);
        toast.success('Image added successfully'); // Call toast.success after successful addition


        // Clear form data after submission
      } catch (error) {
        //console.error('mongo db error', error);
        toast.error('Failed to add image'); // Display error toast if addition fails
      }
    })();

  };


  ////////////////////////////////////////////



  //For Type
  useEffect(() => {
    ////console.log(check())
    //console.log(id)

    // Set the value of arr using some asynchronous operation or any other logic
    dispatch(getquestions()).then((res) => {
      // let temp=[]
      // temp=res.map((val)=>val.question)
      setquestions(res)
    })
    const fetchOptions = async () => {
      try {
        // Example asynchronous operation fetching data
        // const response = await fetch('your/api/endpoint');
        // const data = await response.json();
        // // Assuming the data received is an array of options
        const arr = ["Reg 30B", "33(1)", ...Array.from({ length: 31 }, (_, i) => `33(${i + 1})`)];
        setArr(arr);


      } catch (error) {
        //console.error('Error fetching options:', error);
      }
    };

    // Call the fetchOptions function to set the value of arr
    fetchOptions();
  }, [question.length]);






  const handleDelete = (id) => {
    ////////////////////console.log(id)
    const token = localStorage.getItem('token');

    axios.delete(`${baseurl}/project/${id}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        ////////////////////console.log('Record deleted successfully:', response.data);
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.success('Record deleted successfully'); // Display success toast
        window.location.reload()
      })
      .catch(error => {
        //console.error('Error deleting record:', error);
        toast.error('Failed to delete record'); // Display error toast
      });
  }
  // Calculate the index of the first item to display based on the current page and items per page


  const handleprojectFetch = async (e) => {
    //////////////////////console.log(companyname)
    ////console.log(typeof (isDisabled))

    dispatch(fetchProjects({
      company: companyname ? companyname : null,
      status: feactive ? feactive : null,
      isDisabled: isDisabled == 'true' ? true : false,
      type: regu ? regu : null,
    })).then((resp) => {
      setData(resp)
      ////console.log(resp)
    }).catch(error => {

    })
  }


  useEffect(() => {
    //get Projects
    ////console.log(isDisabled)
    dispatch(fetchProjects({
      company: companyname ? companyname : null,
      status: feactive ? feactive : null,
      isDisabled: isDisabled == 'true' ? true : false,
      id: id
    })).then((resp) => {
      // setData(resp)
      // let currproject = resp.find((value) => value._id == id)
      // //console.log(resp.find((value) => value._id == id))
      //console.log(resp[0])
      setthisproject(resp[0])
      thisproject = resp[0]
      //console.log(thisproject)
      setexistingquestion(resp[0].questions)


    }).catch(error => {

    })
    // get Users
    axios.get(`${baseurl}/user/`)
      .then(response => {
        ////////////////////console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        ////////////////////console.log(error);
      });

  }, []);



  const handleimport = (e) => {
    dispatch(importquestions(id)).then((res) => {
      dispatch(fetchProjects({
        id
      })).then((resp) => {
        setthisproject(resp[0])
        thisproject = resp[0]
        //console.log(thisproject)
        setexistingquestion(resp[0].questions)
      })
    })
  }








  const handleEditSubmit = async (e) => {
    // s3
    e.preventDefault()
    // //console.log("here")
    // //console.log(selectedquestions)
    //console.log(existingquestion)
    // let newquestions = []
    // for (let i = 0; i < existingquestion.length; i++) {
    //   newquestions.push(existingquestion[i])
    // }


    // for (let i = 0; i < selectedquestions.length; i++) {
    //   let flag = true
    //   for (let j = 0; j < existingquestion.length; j++) {
    //     if (existingquestion[i].question == selectedquestions[i]) {
    //       flag = false
    //       break
    //     }
    //   }
    //   //console.log(flag)
    //   if (flag == true) {
    //     newquestions.push({ question: selectedquestions[i], answer: "" })
    //     //console.log("pushing")
    //   }
    // }
    // //console.log(newquestions)

    const token = localStorage.getItem('token');

    const editData = {
      questions: existingquestion
    };
    ////////////////////console.log(clickedImage)


    try {
      ////////////////////console.log(editselectedusers)
      const response = await axios.put(`${baseurl}/project/addquestions/${id}`, editData, {
        headers: {
          Authorization: `${token}`
        }
      });
      // ////////////////////console.log('Updated data:', response.data);
      toast.success('Data updated successfully');

      // Refresh
      dispatch(importquestions(id)).then((res) => {
        dispatch(fetchProjects({
          id
        })).then((resp) => {
          setthisproject(resp[0])
          thisproject = resp[0]
          //console.log(thisproject)
          setexistingquestion(resp[0].questions)
        })
      })

      setShowModal(false);
      // window.location.reload()
      // setData(prevData => prevData.map(item => item._id === editItemId ? { ...item, ...editData } : item));
    } catch (error) {
      //console.error('Error updating record:', error);
      toast.error('Failed to update record');
    }
  }

  // redirect to projects page
  const handleRedirect = (id) => {
    history.push(`/projects/${id}`)
  }


  let startIndex = currentPage * itemsPerPage;
  let endIndex = (currentPage + 1) * itemsPerPage;
  // let currentItems = data.slice(startIndex, endIndex);
  const findprojectname = (project) => {
    ////////////////console.log(project,"Find project name")
    // ////////////////////console.log(pnamearr)
    let str = ""
    for (let i = 0; i < data.length; i++) {
      // ////////////////console.log(pnamearr[i])
      if (data[i]._id == project) {
        str = data[i].name
        break
      }

    }
    return str
  }

  const handleeditmode = async (e) => {
    try {
      const isValid = await checkloginvailidity();
      //console.log(isValid)
      if (isValid) {
        seteditmode(!editmode);
      } else {
        toast.error("Not Verified Account");
      }
    } catch (error) {
      console.error("Error checking validity:", error);
      toast.error("An error occurred while checking validity");
    }
  };


  const findquestion = (id) => {

    // for(let i=0;i<question.length;i++){
    //   //console.log(question[i]._id)
    //   if(question[i]._id==id){
    //     //console.log(question[i]._id)
    //   }
    // }
    if (id != "" && question.length!=0) {
      let que = (question.find((value) => (value._id) == id)).question
      // //console.log(que, id)
      return que
    }
  }
  const handlesubmit = (e) => {
    e.preventDefault()
    //console.log("hello")

  }
  const handleAnswerChange = (index, newValue) => {
    // Create a copy of existingquestion array
    const updatedQuestions = [...existingquestion];
    // Update the answer property for the specified index
    updatedQuestions[index] = { ...updatedQuestions[index], answer: newValue };
    // Update the state with the new array
    setexistingquestion(updatedQuestions);
  };
  return (
    <>
      <ToastContainer />
      <Card border="light" className="shadow-sm">

      </Card>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
            <Breadcrumb.Item active>Create Projects</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <h1>Project:{thisproject ? (<h1>{thisproject.name}</h1>) : (<p>Loading</p>)}</h1>
      <Tab.Container defaultActiveKey="home">
        <Nav fill variant="pills" className="flex-column flex-sm-row">
          <Nav.Item>
            <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
              FAQS
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {/* <Nav.Link eventKey="profile" className="mb-sm-3 mb-md-0">
              Create Project
            </Nav.Link> */}
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="home" className="py-4">
            <section>
              <Container>
                <Row>

                </Row>



                <Row>
                  {/* Searching */}

                  <Col className="mx-auto">
                    <Card border="light" className="shadow-sm">
                      {/* If logged in only then visible */}
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col className="text-start">
                            <Button variant="secondary" size="sm" onClick={(e) => handleeditmode(e)}>Edit</Button>
                            {editmode ? (<>
                              <Button variant="secondary" size="sm" onClick={(e) => handleimport(e)}>Import</Button></>) : (null)}
                          </Col>

                          <Col>
                            {/* {editmode ? (<>  <Form.Group className="mb-3" controlId="editDescription">
                              <Form.Label>Add Questions</Form.Label>


                              <Form.Select required value={selectedquestion} onChange={(e) => {
                                setselectedquestion(e.target.value)
                                handlechange(e.target.value)
                              }}>
                                <option value="">Select Option</option>
                                {question.map((option, index) => (
                                  <option key={index} value={option._id}>{option.question}</option>
                                ))}

                              </Form.Select>
                            </Form.Group>

                            </>) : (null)} */}

                          </Col>

                        </Row>
                      </Card.Header>
                      <Card.Header>
                        <Row className="align-items-center">
                          {existingquestion.map((option, index) => {
                            return (<>
                              <h3>{index + 1}.{findquestion(option.question)}</h3>
                              {editmode ? (
                                  <>
                              <Form.Control type="textarea" value={option.answer} onChange={(e) => handleAnswerChange(index, e.target.value)} />
                                <Form.Select required value={""} onChange={(e) => handleAnswerChange(index, e.target.value)}>
                                  {/* Mapping through the arr array to generate options */}
                                  {(option.prevanswer).map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                  ))}
                              </Form.Select>
                              </>
                               
                              ) : (<p>{option.answer}</p>)}

                            </>

                            )
                          })}
                          <Col className="text-end">
                            <Button variant="secondary" size="sm" onClick={(e) => handleEditSubmit(e)}>Submit</Button>
                          </Col>
                        </Row>
                      </Card.Header>


                      <Modal show={showModal && editMode} onHide={() => setEditMode(false)}>
                        <Modal.Header>
                          <Modal.Title>Edit Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="editHeading">
                              <Form.Label>ProjectName</Form.Label>
                              <Form.Control type="text" value={editProjectName} onChange={(e) => setEditProjectName(e.target.value)} />

                              <Form.Group className="mb-3" controlId="editDescription">
                                <Form.Label>Project Type</Form.Label>
                                <Form.Select required value={editProjectType} onChange={(e) => setEditProjectType(e.target.value)}>
                                  <option value="">Select Option</option>
                                  {/* Mapping through the arr array to generate options */}
                                  {arr.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="editDescription">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Select required value={editCompany} onChange={(e) => setEditCompany(e.target.value)}>
                                  <option value="">Select Option</option>
                                  <option value="Neo">Neo Modern</option>
                                  <option value="BZ">BZ Consultants</option>
                                  <option value="PMC">PMC</option>
                                </Form.Select>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="editHeading">
                                <Form.Label>Project Stage</Form.Label>
                                <Form.Control type="text" value={editProjectStage} onChange={(e) => setEditProjectStage(e.target.value)} />
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="editDescription">
                                <Form.Label>Project Status</Form.Label>
                                <Form.Select required value={editProjectStatus} onChange={(e) => setEditProjectStatus(e.target.value)}>
                                  <option value="">Select Option</option>
                                  {/* Mapping through the arr array to generate options */}
                                  {ProjectStatus.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="editHeading">
                                <Form.Label>Developer</Form.Label>
                                <Form.Control type="text" value={editDeveloper} onChange={(e) => setEditDeveloper(e.target.value)} />
                              </Form.Group>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editHeading">
                              <Form.Label>Project Description</Form.Label>
                              <textarea rows="4" cols="60" type="text" value={editProjectDescription} onChange={(e) => setEditProjectDescription(e.target.value)} />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="editHeading">
                              <Form.Label>Area</Form.Label>
                              <Form.Control type="text" value={editArea} onChange={(e) => setEditArea(e.target.value)} />
                            </Form.Group>


                            {/* Select File */}
                            {check()[1] == 'john_doe' ? (

                              <Form.Group className="mb-3" controlId="editIsActive">
                                <Form.Label>Change Image</Form.Label>
                                <Form.Label><a style={{ textDecoration: "underline", color: "blue" }}>{clickedImage}</a></Form.Label>
                                <InputGroup>
                                  <InputGroup.Text>
                                  </InputGroup.Text>
                                  <Button
                                    variant="light"
                                    onClick={() => setAddImage(!addimage)}
                                    className="ms-2"
                                  >Upload New Image</Button>
                                  {addimage ? (
                                    <Form.Control
                                      type="file"
                                      accept="/*"
                                      onChange={handleFileChange}
                                      placeholder="Upload Image"
                                    />) : (null)
                                  }
                                </InputGroup>
                              </Form.Group>
                            ) : null}

                            {/* People */}
                            <Form.Group className="mb-3" controlId="editIsActive">
                              {users ? (<Multiselect
                                selectedValues={editselectedusers}
                                setSelectedValues={setEditSelectedusers}
                                options={users} />) : (
                                <p>loading</p>
                              )}
                            </Form.Group>
                          </Form>

                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => setEditMode(false)}>
                            Cancel
                          </Button>
                          <Button variant="primary" onClick={handleEditSubmit}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </Tab.Pane>
          <Tab.Pane eventKey="profile" className="py-4">
            <section className="d-flex align-items-center my-2 mt-lg-3 mb-lg-5">
              <Container>
                <form onSubmit={handleUpload}>
                  <Row >
                    <Col xs={12} md={6}>
                      <Form.Group id="pName" className="mb-4">
                        <Form.Label>Project Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group id="ptype" className="mb-4">
                        <Form.Label>Project type</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Select required value={ptype} onChange={(e) => setPtype(e.target.value)}>
                            <option value="">Select Option</option>
                            {/* Mapping through the arr array to generate options */}
                            {arr.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="ptype" className="mb-4">
                        <Form.Label>Project Status</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Select required value={pstatus} onChange={(e) => setPstatus(e.target.value)}>
                            <option value="">Select Option</option>
                            {/* Mapping through the arr array to generate options */}
                            {ProjectStatus.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="pname" className="mb-4">
                        <Form.Label>Company Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text></InputGroup.Text>
                          <Form.Select required value={company} onChange={(e) => setCompany(e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="Neo">Neo Modern</option>
                            <option value="BZ">BZ Consultants</option>
                            <option value="PMC">PMC</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="developer" className="mb-4">
                        <Form.Label>Developer</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="text" placeholder="Developer" value={developer} onChange={(e) => setDeveloper(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="ProjectDescription" className="mb-4">
                        <Form.Label>Project Stage</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="text" placeholder="Stage" value={pstage} onChange={(e) => setpstage(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="ProjectDescription" className="mb-4">
                        <Form.Label>Project Description</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <textarea rows="4" cols="40" autoFocus required type="text" placeholder="Project Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group id="ProjectName" className="mb-4">
                        <Form.Label>Area in Sqm</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="number" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    {/* 
                    <Col xs={12} md={6}>
                      <Form.Group id="Project Image" className="mb-2">
                        <Form.Label>Project Image</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            placeholder="Upload Image"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col> */}
                    <Col xs={12} md={6}>
                      <Form.Group id="ProjectName" className="mb-4">
                        {users ? (<Multiselect
                          selectedValues={selectedusers}
                          setSelectedValues={setSelectedusers}
                          options={users} />) : (
                          <p>loading</p>
                        )}
                      </Form.Group>
                    </Col>

                    <Col className="d-flex justify-content-center"> {/* Centering the submit button */}
                      <Button variant="primary" type="submit" className="w-100 mt-3">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Container>
            </section>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      {/* <Modal show={showModal && !editMode} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={clickedImage} alt="Zoomed Image" style={{ maxWidth: "100%" }} onClick={() => setEditMode(true)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};





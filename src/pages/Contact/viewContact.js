

import React, { useState, useEffect } from "react";
import axios from "axios";
import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {baseurl,ProjectStatus} from "../../api";
import { triggerFunction, getPredefinedUrl } from '../../components/SignedUrl';
import { useHistory } from 'react-router-dom';
import { check } from '../../checkloggedin';
import Multiselect from "../../components/Multiselect";
import { fetchAsyncData,deleteContact } from '../../features/contactslice'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from "../../features/projectslice";

export default () => {
  const [pname, setPname] = useState('');
  const [people, setPeople] = useState('');
  let [pnamearr, setPnamearr] = useState([]);
  const [taskstatus, setTaskStatus] = useState('');
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [type,setType]=useState("")
  const [search,setSearch]=useState("")

  let dispatch=useDispatch()

  // for edit
  const [taskid,seteditTaskid]=useState("")
  const [editassignTaskTo,setEditassignTaskTo]=useState([])
  const [editprojectname,setEditprojectname]=useState("")
  const [edittaskDescription,setEdittaskDescription]=useState("")
  const [edittaskSubject,setEdittaskSubject]=useState("")
  const [editMode,setEditMode]=useState(false);
  const [showModal,setShowModal]=useState(false);

  // Name
  const [editconid,setEditconid]=useState("")
  const [editName,setEditname]=useState("")
  const [editphone,setEditphone]=useState("")
  const [editemail,setEditemail]=useState("")
  const [edittype,setEdittype]=useState("")
  const [editDescription,setEditdescription]=useState("")
  let [editprojects,setEditProjects]=useState([])
  
  // project filtering
  let [companyname,setCompanyName]=useState('')
  let [isActive,setIsActive]=useState(null)

  // view task History
  const [history,setHistory]=useState([])
  const [taskthis,settaskthis]=useState(false);
  const [showModal1,setShowModal1]=useState(false);

  //view add History
  const [texthistory,setaddtexthistory]=useState("")
  const [showModal2,setShowModal2]=useState(false);
 
// common for all
 

  // for users
  const {contacts,loading,error}=useSelector((state) => state.contact);
 
//   useEffect(() => {
//     // //////////////////console.log(contacts)
//     // (async () =>{
//     // const response = await axios.put(`${baseurl}/task/filter`, {
//     //   project:pname||undefined,
//     //   type:types||undefined
//     // });
//     // setData(response.data);
//     // dispatch(fetchAsyncData()).then(result=>{
//     //   setUsers(result);
//     // }).catch(err=>{
//     //   // //////////////////console.log(err)
//     // })
// //   })()
//   // dispatch(fetchAsyncData())
//   if(contacts.length!=0){
//     // //////////////////console.log("once")
//     // setUsers(user1)
//   }
//   // setUsers(user1)
//   // //////////////////console.log(loading)
//   handleprojectFetch()
//     // handleFetch()
//   }, [contacts.length]);

useEffect(()=>{
  handleprojectFetch()
  handleFetch()
},[])

  const handleprojectFetch=async()=>{
    ////////////////////console.log(companyname)
    dispatch(fetchProjects({
      company:companyname?companyname:null,
      status:isActive?isActive:null
    })).then((resp)=>{
      setPnamearr(resp)
      // ////////console.log(resp)
    }).catch(error=>{
    })

  }
  const findprojectname=(projects)=>{
    // //////////////////console.log(projects,"Find project name")
    // //////////////////console.log(pnamearr)
    let str=""
    for(let i=0;i<projects.length;i++){
      //////////////////console.log(projects[i])
    for(let j=0;j<pnamearr.length;j++){
      if(pnamearr[j]._id==projects[i]){
        str=str+"{"+pnamearr[j].name+"}"
        break
      }
    }
  }
    return str
  }

  const handleFetch = async (e) => {
    if(e){
    e.preventDefault()
    }
    //////////////////console.log("hello")
    const body={
        project:pname,
        type:type
    }
    //////////////////console.log(body)
    try {
      const response = await axios.put(`${baseurl}/contact/all`,body);
      setData(response.data);
      //////////////////console.log(response.data)

    } catch (error) {
      //console.error(error);
    }
  };


  const handleEditModal = (item) => {
    //////////////////console.log(pnamearr)
    let temp=[]
    let temppro=item.projects
    //////////////////console.log(temppro,pnamearr)
    for(let j=0;j<pnamearr.length;j++){
      if((temppro).includes(pnamearr[j]._id)){
        temp.push({
          id:pnamearr[j]._id,
          name:pnamearr[j].name,
        })
      }
    }
    //////////////////console.log(temp,"hi")
  setEditconid(item._id)
  setEditProjects(temp)
  setEditname(item.name)
  setEditemail(item.email)
  setEditphone(item.phone)
  setEdittype(item.type)
  setEditdescription(item.description)
  setShowModal(true);
  setEditMode(true); // Set editMode to true when opening the edit modal
  }

  const handleEditSubmit=async()=>{
    ////////////////////console.log(taskid,"chekcing task id")
    const token = localStorage.getItem('token');
    let temp=[]
    for(let i=0;i<editprojects.length;i++){
      temp.push(editprojects[i].id)
    }
    const editData = {
      name:editName,
      phone: editphone,
      email: editemail,
      type: edittype,
      description: editDescription,
      projects:temp
    };
    ////////////////console.log(editData)

    try {
      const response = await axios.put(`${baseurl}/contact/${editconid}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      ////////////////console.log(response.data);
      toast.success("Task updated successfully");
      setShowModal(false);
      setEditMode(false);
      setEditProjects([])
      setEditname("")
      setEditemail("")
      setEditphone("")
      setEdittype("")
      setEditdescription("")
    } catch (error) {
      //console.error(error);
      toast.error("Failed to update task");
    }
  }

  const handletaskhistory=async (row)=>{
    ////////////////////console.log("hi")
    try{
      // fetching all Histories of one task
      let response=await axios.get(`${baseurl}/history/${row._id}`)
      let temp=[]
      
      for(let i=0;i<response.data.length;i++){
      let res=await axios.get(`${baseurl}/history/single/${(response.data)[i]._id}`)
      temp.push(res.data)
      ////////////////////console.log(temp)
      }
      setHistory(temp)
      
   
    }catch(error){
      ////////////////////console.log(error)
    }
   
    
    setShowModal1(true)
    settaskthis(true)
  }



  const handleDelete =(data)=>{
    if(dispatch(deleteContact(data))){
      toast.success("Deleted Succesfully")
      setTimeout(()=>{
        handleFetch()
      },1000)

    }
    else{
      toast.error("Not Deleted")
    }
  }
  
  
  
  
  const types=["Developer","Financer","MEP","Structural","Architect","Land Owner","Agent","Miscellaneous Consultant","Society Member"]

  
  return (
    <>
    <ToastContainer/>
      <form onSubmit={(e)=>handleFetch(e)}>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group id="pname" className="mb-4">
              <Form.Label>Company Name</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={companyname} onChange={(e) => {
                  companyname=e.target.value
                  setCompanyName(e.target.value)
                  handleprojectFetch()}}>
                  <option value="">Select Option</option>       
                  <option value="Neo">Neo Modern</option>
                  <option value="BZ">BZ Consultants</option>
                  <option value="PMC">PMC</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
             <Col xs={12} md={4}>
            <Form.Group id="taskstatus" className="mb-4">
              <Form.Label>Project Status</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={isActive} onChange={(e) =>{
                isActive=e.target.value
                setIsActive(e.target.value)
                handleprojectFetch()
                }}>
           <option value="">Select Option</option>
                            {/* Mapping through the arr array to generate options */}
                            {ProjectStatus.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                            ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group id="pname" className="mb-4">
              <Form.Label>Project name</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={pname} onChange={(e) => setPname(e.target.value)}>
                  <option value="">Select Option</option>
                  {pnamearr.map((option, index) => (
                    <option key={index} value={option._id}>{option.name}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group id="people" className="mb-4">
              <Form.Label>Consultants</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Select Option</option>
                  {types.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
                      <Form.Group id="tasksubject" className="mb-4">
                        <Form.Label>Search By to Name, Contact, Email or Description</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus type="text" placeholder="Name" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                </Col>
          <Col xs={12} md={2} className="d-flex justify-content-center">
            <Button style={{ height: "70%" }} variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
<section>
  <Container>
    <Row>
      <Col className="mx-auto">
        <Card style={{ width: "130%", marginLeft: "-12%", paddingLeft:"5%"}} border="light" className="shadow-sm">
          <Card.Header>
            <Row style={{ width: "100%" }} className="align-items-center">
              <Col>
                <h5>Service List</h5>
              </Col>
              <Col style={{ width: "100%" }} className="text-end">
                <Button variant="secondary" size="sm">See all</Button>
              </Col>
            </Row>
          </Card.Header>
          <Table responsive className="align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th  scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Projects</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
            {data.length == 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">loading...</td>
                  </tr>
                ) : (
                  data.map((row, index) => {
                    // if((row.projects).length!=0){
                    return  (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ cursor: "pointer", whiteSpace: "pre-wrap" }} onClick={() => handletaskhistory(row)}>{row.name}</td>
                        <td style={{ whiteSpace: "pre-wrap" }}>{row.phone}</td>
                        <td style={{ whiteSpace: "pre-wrap" }}><pre style={{ whiteSpace: "pre-wrap" }}>{row.email}</pre></td>
                        <td style={{ whiteSpace: "pre-wrap" }}>{row.type}</td>
                        <td ><pre style={{ whiteSpace: "pre-wrap" }}>{row.description}</pre></td>
                        <td style={{ width:"60%" }}><pre style={{ whiteSpace: "pre-wrap" }}>{findprojectname(row.projects)}</pre></td>

                        {/* <td>{getUsernameById(row.assignTaskTo)}</td> */}
                        <td>
                          <Button style={{ backgroundColor: "aqua", color: "black" }} variant="info" size="sm" onClick={() => handleEditModal(row)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button style={{ borderColor:"black",backgroundColor: "aqua", color: "black",marginLeft: "2%" }} onClick={() => handleDelete(row._id)} variant="danger" size="sm">
                                  <FontAwesomeIcon icon={faTrash} />
                              </Button> 
                        </td>
                      </tr>
                    )
                  // }else{return null}
                  })
                )}

            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  </Container>
</section>
{/* edit modal */}
<Modal show={showModal && editMode} onHide={() => setEditMode(false)}>
                        <Modal.Header>
                          <Modal.Title>Edit Contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       
                          <Form.Group className="mb-3" controlId="editDescription">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" value={editName} onChange={(e) => setEditname(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="editDescription">
                              <Form.Label>Contact No</Form.Label>
                              <Form.Control type="text" value={editphone} onChange={(e) => setEditphone(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="editDescription">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="text" value={editemail} onChange={(e) => setEditemail(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="editDescription">
                              <Form.Label>Types</Form.Label>
                    <Form.Select required value={edittype} onChange={(e) => setEdittype(e.target.value)}>
                          <option value="">Select Option</option>
                            {types.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                            ))}
                          </Form.Select>
                          </Form.Group>
                          
                          
                          <Form.Group className="mb-3" controlId="editHeading">
                              <Form.Label>Task Description</Form.Label>
                          </Form.Group>
                          <textarea rows="4" cols="50" type="text" value={editDescription} onChange={(e) => setEditdescription(e.target.value)} />
                          <Multiselect tag="Projects" options={pnamearr} selectedValues={editprojects} setSelectedValues={setEditProjects}/>

                          
                          
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


  {/* <ViewTaskHistory history={history} showModal1={showModal1} setShowModal1={setShowModal1}/>
add history */}

  {/* <AddTaskHistory taskid={taskid} showModal2={showModal2} setShowModal2={setShowModal2}/> */}
  

    </>
  );
}



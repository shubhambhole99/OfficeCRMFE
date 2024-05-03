import React,{useState} from 'react'
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {baseurl} from "../../api";
import axios from "axios";

const ViewTaskHistory = ({history,showModal1,setShowModal1}) => {

    const [showModal2,setShowModal2]=useState(false)
    const [texthistory,setTextHistory]=useState('')
    const [taskhistoryid,setTaskhistoryId]=useState('')

    const handledeletetaskhistory=async(row)=>{

        try{
          const token = localStorage.getItem('token');
          const response = await axios.delete(`${baseurl}/history/${row.taskHistory._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          toast.success("History deleted successfully");
          setShowModal1(false)
        }catch(error){
          toast.error(error.message)
        }
        
        }
    const handleedittaskHistory=async(row)=>{
        
        setShowModal2(true)
        setTaskhistoryId(row.taskHistory._id)
        setTextHistory(row.taskHistory.taskDescription)

    }
    const handleedithistorysubmit=async()=>{
        try{
            const editData = {
                taskDescription: texthistory,
              };
            const token = localStorage.getItem('token');
            const response = await axios.put(`${baseurl}/history/${taskhistoryid}`,editData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            toast.success("History updated successfully");
            setShowModal1(false)
            setShowModal2(false)
          }catch(error){
            toast.error(error.message)
          }
          
    }

  return (
    <>
    {/* View Task History */}
    <ToastContainer/>
    <Modal className="#modal-content" style={{ width: "100%" }} show={showModal1} onHide={() => setShowModal1(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task History</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table responsive className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Created At</th>
                      <th scope="col">History Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row) => (
                      <tr key={row.taskHistory._id}>
                        <td>{row.taskHistory.CreatedAt}
                        <Button variant="danger" size="sm" onClick={() => handledeletetaskhistory(row)}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                          <Button variant="info" size="sm" onClick={()=> handleedittaskHistory(row)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </td>
                        <td><pre>{row.taskHistory.taskDescription}</pre></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="secondary" onClick={() => setShowModal1(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
    {/* Edit Task History */}
    <Modal className="#modal-content" style={{ width: "100%" }} show={showModal2} onHide={() => setShowModal2(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task History
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form.Group className="mb-3" controlId="editHeading">
                <textarea rows="8" style={{width:"100%"}} value={texthistory} onChange={(e) => setTextHistory(e.target.value)} /> 
                </Form.Group>
                    
                
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="secondary" onClick={() => setShowModal2(false)}>
                  Cancel
                </Button>
                <Button style={{backgroundColor:"greenyellow"}} variant="secondary" onClick={handleedithistorysubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default ViewTaskHistory

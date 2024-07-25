import React, { useState, useEffect } from "react";
import axios from "axios";
import {baseurl} from "../../api";
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export default ({taskid,showModal2,setShowModal2}) => {

    const [texthistory,setaddtexthistory]=useState("")

    const handleaddhistorysubmit=async(e)=>{
      e.preventDefault()
        //////////////////console.log(texthistory)
        const token = localStorage.getItem('token');
        const editData = {
          taskDescription: texthistory,
        };
        //////////////////console.log(editData)
    
        try {
          const response = await axios.post(`${baseurl}/history/create/${taskid}`, editData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          //////////////////console.log(response.data);
          
          toast.success("History Added Succesfully");
          setShowModal2(false);
          setaddtexthistory("")
        } catch (error) {
          //console.error(error);
          toast.error("Failed to add history");
        }
      }

  return (
    <>
    <ToastContainer />
      <Modal className="#modal-content" style={{ width: "100%" }} show={showModal2} onHide={() => setShowModal2(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task History
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form.Group className="mb-3" controlId="editHeading">
                <textarea rows="8" style={{width:"100%"}} value={texthistory} onChange={(e) => setaddtexthistory(e.target.value)} /> 
                </Form.Group>
                    
                
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="secondary" onClick={() => setShowModal2(false)}>
                  Cancel
                </Button>
                <Button style={{backgroundColor:"greenyellow"}} variant="secondary" onClick={(e)=>handleaddhistorysubmit(e)}>
                  Save Changes
                </Button>
              </Modal.Footer>
      </Modal>
      </>
   
  )
}



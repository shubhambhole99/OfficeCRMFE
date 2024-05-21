import React, { useState, useEffect } from "react";
import {  Col, Row, Form, InputGroup, Modal, Tab , Nav} from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
import 'react-toastify/dist/ReactToastify.css';
export default ({options,selectedValues,setSelectedValues,tag}) => {
  const [selectedValue, setSelectedValue] = useState(null);

tag=tag?tag:'People'
////////console.log(tag,selectedValues)


  const handleChange = (e) => {
    const selectedOption = {
      id: e.target.value,
      name: e.target.selectedOptions[0].text,
    };
    
    setSelectedValue(selectedOption);
    for(let i=0;i<selectedValues.length;i++){
      if(selectedValues[i].id === selectedOption.id){
        toast.error("Already Added")
        return;
      }
    }
    setSelectedValues((prevSelected) => [...prevSelected, selectedOption]);
    // toast.success("Added Successfully");
  };

  const handleRemove = (id) => {
    setSelectedValues((prevSelected) => prevSelected.filter((item) => item.id !== id));
  };

  return (
    <div>
      <ToastContainer/>
       
        <Col xs={12} md={6}>
                      <Form.Group id="ProjectName" className="mb-4">
                        <InputGroup>
                          <Form.Select required value={selectedValue ? selectedValue.id : ''} onChange={handleChange}>
                             <>
                                <option value="">Select Option</option>
                                {options.map((option) => (
                                <option key={option._id} value={option._id}>
                                    {tag=='People'?option.username:option.name}
                                    {/* {option.name} */}
                                    {/* {option.username} */}
                                </option>
                                ))}
                            </>
                          </Form.Select>   
                          </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="ProjectName" className="mb-4">
                        <Form.Label>{tag}</Form.Label>
                        {selectedValues.length > 0 && (
                          <div>
                            {selectedValues.map((value) => (
                              <span key={value.id} style={{ margin: '0 5px' }}>
                                {value.name}
                                <button onClick={() => handleRemove(value.id)} style={{ marginLeft: '5px' }}>
                                  x
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
    </div>
   
  );
};
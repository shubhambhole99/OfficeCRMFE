
import React,{useState,useEffect} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister,faTrash, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import Navbar from "../../components/Navbar";
import {check} from "../../checkloggedin"
import {baseurl} from "../../../api";


// dasdas

export default () => {

  const [customers, setCustomers] = React.useState([]);
  const [completedtasks,setcompletedTasks]=useState([]);
  const [incompletedtasks,setincompletedTasks]=useState([]);
  const [contacts, setContacts] = React.useState([]);
 
  useEffect(() => {    
    //Fetching incomplete tasks
    console.log(check()[0]);

    axios.get(`${baseurl}/task/incomplete/${check()[0]}`)
    .then(response => {
      console.log(response.data,"from dashboard overview");
      setincompletedTasks(response.data);
    })
    .catch(error => {
      //console.log(error);
    }); 
   //Fetching complete tasks
   axios.get(`${baseurl}/task/complete/${check()[0]}`)
   .then(response => {
     console.log(response.data,"from dashboard overview");
     setcompletedTasks(response.data);
   })
   .catch(error => {
     //console.log(error);
   }); 

   }, []);

   //  Mark incomeplete-->Complete or complete-->incomeplete
   const handleComplete=(id,taskCompleted)=>{
    axios.put(`${baseurl}/task/complete/${id}`).then(response => {
      //console.log(response.data,completedtasks,taskCompleted,response.data.task);
      if(taskCompleted){
        setincompletedTasks([...incompletedtasks,response.data.task]);
        setcompletedTasks(completedtasks.filter(task => task._id !== id));
        //console.log(completedtasks,incompletedtasks,"previously completed",taskCompleted);
      }
      else{
        setcompletedTasks([...completedtasks, response.data.task]);
        setincompletedTasks(incompletedtasks.filter(task => task._id !== id));
        //console.log(completedtasks,incompletedtasks,"previously incomplet",taskCompleted);
      }
      //console.log(response.data);
    })
    .catch(error => {
      //console.log(error);
    }); 
   }
  

  
 


// hsajdhasjh
// dadas

  return (
    <>
      <Row className="justify-content-md-center">
        {/* <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col> */}
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category=" Tasks Completed"
            title={completedtasks.length.toString()}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tasks Incompleted"
            title={incompletedtasks.length.toString()}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        {/* <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} />
        </Col> */}
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col className="mb-4">
              <Row>
                <Col 
                 xs={12} className="mb-4">
                  <h1>Task Incomplete</h1>
                  <PageVisitsTable
                  data={incompletedtasks}
                  call={handleComplete}
                  />
                </Col>
              </Row>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <Row>
                <Col xs={12} className="mb-4">
                  <h1>Task Completed</h1>
                  <PageVisitsTable
                  data={completedtasks}
                  call={handleComplete}
                  />
                  
                </Col>
              </Row>
            </Col>
            

            {/* <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                    <TeamMembersWidget/>
                    <ProgressTrackWidget/>
                    <RankingWidget/>
                    <SalesValueWidget/>
                    <CircleChartWidget/>
                    <SalesValueWidgetPhone/>
                    <AcquisitionWidget/>
                </Col>
              </Row>
            </Col> */}

          </Row>
        </Col>
      </Row>


      
    </>
  );
};

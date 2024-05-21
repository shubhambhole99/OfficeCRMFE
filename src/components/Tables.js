
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faTrash, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card,Modal,Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {baseurl} from "../api";

// 


const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const PageVisitsTable = (props) => {

  //mine
  const {data,call}=props
  
   //For Fetching Projects
   
// const [showModal, setShowModal] = useState(false);
// const [showModal1, setShowModal1] = useState(false);



const [history,setHistory]=useState([])
const [taskthis,settaskthis]=useState(false);
const [showModal1,setShowModal1]=useState(false);


  // view task History
 //view add History
 const [taskid,seteditTaskid]=useState("")
 const [texthistory,setaddtexthistory]=useState("")
 const [showModal2,setShowModal2]=useState(false);
 const [pnamearr,setPnamearr]=useState([]);

  useEffect(() => {
    // Fetch users and projects
   axios.put(`${baseurl}/project/`)
    .then(response => {
      setPnamearr(response.data);
      // //////////console.log(response.data)
    })
    .catch(error => {
      //console.error(error);
    });
    },[])

    const findprojectname=(id)=>{
      //////////console.log(id,pnamearr)
      for(let i=0;i<pnamearr.length;i++){
        if(pnamearr[i]._id===id){
          return pnamearr[i].name
        }
      }
    }


 const handletaskhistory=async (row)=>{
    //////////console.log("hi")
    try{
      // fetching all Histories of one task
      let response=await axios.get(`${baseurl}/history/${row._id}`)
      let temp=[]
      
      for(let i=0;i<response.data.length;i++){
      let res=await axios.get(`${baseurl}/history/single/${(response.data)[i]._id}`)
      temp.push(res.data)
      //////////console.log(temp)
      }
      setHistory(temp)
      
   
    }catch(error){
      //////////console.log(error)
    }
   
    
    setShowModal1(true)
    settaskthis(true)
  }

  const handleaddtaskhistory=async (row)=>{
    //////////console.log(row._id)
    seteditTaskid(row._id)
    setShowModal2(true)
    
  }

  const handleaddhistorysubmit=async(row)=>{
    //////////console.log(texthistory)
    const token = localStorage.getItem('token');
    const editData = {
      taskDescription: texthistory,
    };
    //////////console.log(editData)

    try {
      const response = await axios.post(`${baseurl}/history/create/${taskid}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      //////////console.log(response.data);
      // toast.success("History added successfully");
      setShowModal2(false);
      setaddtexthistory("")
    } catch (error) {
      //console.error(error);
      toast.error("Failed to add history");
    }
  }

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
    
  
  
  //
  const pageVisits = [
    { id: 1, views: 4.525, returnValue: 255, bounceRate: 42.55, pageName: "/demo/admin/index.html" },
    { id: 2, views: 2.987, returnValue: 139, bounceRate: -43.52, pageName: "/demo/admin/forms.html" },
    { id: 3, views: 2.844, returnValue: 124, bounceRate: -32.35, pageName: "/demo/admin/util.html" },
    { id: 4, views: 1.220, returnValue: 55, bounceRate: 15.78, pageName: "/demo/admin/validation.html" },
    { id: 5, views: 505, returnValue: 3, bounceRate: -75.12, pageName: "/demo/admin/modals.html" }
];
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  const TableRow1 = ({ data,hello }) => {
    // Format the CreatedAt date
    const formattedDate = new Date(data.CreatedAt).toLocaleDateString('en-GB');
    // //////////console.log(data)
    return (
      
      <tr style={{ maxWidth: "100px", cursor: "pointer",whiteSpace:"pre-wrap" }}>
        <td onClick={() => handletaskhistory(data)} scope="row">{findprojectname(data.projectid)}</td>
        <td onClick={() => handletaskhistory(data)}>{data.taskSubject}</td>
         <td style={{ maxWidth: "100px", cursor: "pointer",whiteSpace:"pre-wrap" }}
         onClick={() => handletaskhistory(data)}><pre style={{whiteSpace:"pre-wrap" }}>{data.taskDescription}</pre></td>
        <td onClick={() => handletaskhistory(data)}>{formattedDate}</td> 
        <Button onClick={() => handleaddtaskhistory(data)} style={{color:"grey"}}>Add</Button>
        <Button  style={{color:"grey"}} onClick={()=>call(data._id,data.taskCompleted)}>{data.taskCompleted?(<>Mark incomplete</>):(<>Mark complete</>)}</Button>
      </tr>
    );
  };
  return (
    
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Tasks</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr >
            <th scope="col">Project Name</th>
            <th scope="col">Task subject</th>
            <th scope="col">Task Description</th>
            <th scope="col">Created At</th>
            
            {/* <th scope="col">Add Task Event Mark Task Complete</th> */}
            {/* <th scope="col"></th> */}
            <th></th>
            
          </tr>
        </thead>
        <tbody>
        {data.map((data) => (
          <>
            <TableRow1 
              key={data._id} // Assuming _id is unique for each task
              data={data}
            />
          </>
          ))}
        </tbody>

            {/* view history */}
        <Modal className="#modal-content" style={{ width: "100%" }} show={showModal1 && taskthis} onHide={() => settaskthis(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task History</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table responsive className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Created At
                      
                                </th>
                      <th scope="col">History Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row) => (
                      <tr key={row.taskHistory._id}>
                        <td>{row.taskHistory.CreatedAt}
                        <Button variant="danger" size="sm" onClick={() => handledeletetaskhistory(row)}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button></td>
                        <td><pre>{row.taskHistory.taskDescription}</pre></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="secondary" onClick={() => settaskthis(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>

        {/* add history */}
        <Modal className="#modal-content" style={{ width: "100%" }} show={showModal2} onHide={() => setShowModal2(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task History</Modal.Title>
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
                <Button style={{backgroundColor:"greenyellow"}} variant="secondary" onClick={handleaddhistorysubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
      </Modal>
      
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
    const statusVariant = status === "Paid" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {subscription}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {issueDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {dueDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            ${parseFloat(price).toFixed(2)}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Bill For</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">Due Date</th>
              <th className="border-bottom">Total</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
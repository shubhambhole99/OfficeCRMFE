

import React, { useState, useEffect } from "react";
import axios from "axios";
import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseurl } from "../../api";
import { triggerFunction, getPredefinedUrl } from '../../components/SignedUrl';
import { useHistory } from 'react-router-dom';
import { check } from '../../checkloggedin';
import Multiselect from "../../components/Multiselect";
import { useSelector, useDispatch } from 'react-redux';
import { getcontacts, deleteContact } from '../../features/contactslice'
import { getbill, disableBill } from '../../features/billslice'
import { getinvoice,disableinvoice } from '../../features/invoiceSlice'
import '../../style.css'; // Import the CSS file where your styles are defined


export default () => {
  // if(true){
  //   return <p>Unauthorized</p>
  // }
  const [pname, setPname] = useState('');
  const [people, setPeople] = useState('');
  let [pnamearr, setPnamearr] = useState([]);
  const [taskstatus, setTaskStatus] = useState('');
  let [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("")
  const [search, setSearch] = useState("")




  const [editMode, setEditMode] = useState(false);
  let [showModal, setShowModal] = useState(false);

  // Name
  const [editconid, setEditconid] = useState("")
  const [editName, setEditname] = useState("")
  const [editphone, setEditphone] = useState("")
  const [editemail, setEditemail] = useState("")
  const [edittype, setEdittype] = useState("")
  let [editprojects, setEditProjects] = useState([])


  // edit Bills
  const [currentRow, setCurrentRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editbillid, setbillid] = useState('')
  const [editinvoiceid, setinvoiceid] = useState('')
  const [editcreatedAt, seteditcreatedAt] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editBank, setEditBank] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editPerson, setEditPerson] = useState('');
  const [editProject, setEditProject] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editInvoice, setEditInvoice] = useState('');
  let [editUrls, setEditUrls] = useState('');
  const [editcredittype, seteditcredittype] = useState('')




  // project filtering
  let [companyname, setCompanyName] = useState('')
  let [isActive, setIsActive] = useState(null)


  // view task History
  const [history, setHistory] = useState([])
  const [taskthis, settaskthis] = useState(false);
  const [showModal1, setShowModal1] = useState(false);


  // sort by created date
  let [createdoption, setCreatedoption] = useState(0)



  // Invoice or Bills
  let [typebill, setTypebill] = useState('bills')

  // common for all
  const dispatch = useDispatch();

  // for users
  const { contacts, loading, error } = useSelector((state) => state.contact);
  // for invoices
  // const {invoices,loading1,error1}=useSelector((state)=>state.invoice)
  // for bills
  let { bills } = useSelector((state) => state.bill);


  let [invoice, setInvoice] = useState([])
  const [bill, setBill] = useState([])
  //for bills
  const [payment, setpayment] = useState(false)
  const [invoi, setinvoi] = useState(false)



  // filtering from Invoice,Bills

  useEffect(() => {
    handleprojectFetch()
    handleinvoiceFetch()
    changeData(typebill)
    dispatch(getbill())
    dispatch(getcontacts())
    // dispatch(getinvoice())
    // //console.log(contacts)
    // //console.log(bills)
    // //console.log(invoices)
  }, [contacts.length, invoice.length, bills.length])

  const changeData = (type) => {
    ////console.log(type)
    if (type == "invoice") {
      setData(invoice)
    }
    if (type == "bills") {
      setData(bills)
    }
  }
  const findperson = (id) => {
    // //console.log(id)
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i]._id == id) {
        // //console.log(id,contacts[i]._id)
        return contacts[i].name
      }
    }

    // return "hi"

  }

  const handleAllfetch = (e) => {
    e.preventDefault()
    ////console.log("here")

  }


  const handleFilter = async () => {

    // .then((bill) => {
    //   //console.log(bill,"from then")
    if (typebill === "bills") {

      setData(bills.filter(item =>
        (companyname === "" || item.company === companyname) &&
        (pname === "" || item.project === pname) &&
        (people === "" || item.person === people)
      ));

      // let temp=dispatch(getbill())


    }
    if (typebill == "invoice") {

      setData(invoice.filter(item =>
        (companyname === "" || item.company === companyname) &&
        (pname === "" || item.project === pname) &&
        (people === "" || item.person === people)
      ));

      // let temp=dispatch(getbill())


    }
  }
  const sortbycreatedby = () => {
    let temp = createdoption + 1
    setCreatedoption(temp)
    //console.log(temp)
    if (temp == 3) {
      if (typebill == "bills") {
        setData(bills)
      }
      if (typebill == "invoice") {

      }
      setCreatedoption(0)
    }

    let sortedData = []
    for (let i = 0; i < data.length; i++) {
      sortedData[i] = data[i]
    }
    //console.log(sortedData)
    if (temp == 1) {
      sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setData(sortedData)
    }
    if (temp == 2) {
      sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sortedData)
    }
  }



  const handleprojectFetch = async () => {
    ////////////console.log(companyname)
    let body = {
      company: companyname ? companyname : null,
      status: isActive ? isActive : null
    }
    ////////////console.log(body)
    await axios.put(`${baseurl}/project/`, body)
      .then(response => {
        setPnamearr(response.data);
        //   ////////console.log(response.data)
      })
      .catch(error => {
        ////console.error(error);
      });

  }
  const findprojectname = (project) => {
    //////console.log(project,"Find project name")
    // //////////console.log(pnamearr)
    let str = ""
    for (let i = 0; i < pnamearr.length; i++) {
      // //////console.log(pnamearr[i])
      if (pnamearr[i]._id == project) {
        str = str + "{" + pnamearr[i].name + "}"
        break
      }

    }
    // for(let i=0;i<projects.length;i++){
    //////////console.log(projects[i])
    //     for(let j=0;j<pnamearr.length;j++){
    //   if(pnamearr[j]._id==projects[i]){
    //     str=str+"{"+pnamearr[j].name+"}"
    //     break
    //   }
    //     }
    //   }
    return str
  }

  const handleinvoiceFetch = async (e) => {
    if (e) {
      e.preventDefault()
    }
    //////////console.log("hello")
    const body = {
      project: pname,
      type: type
    }
    //////////console.log(body)
    try {
      const response = await axios.put(`${baseurl}/invoice/`, body);
      // console.log(response.data, "invoices")
      setInvoice(response.data);
      return response.data


    } catch (error) {
      ////console.error(error);
    }
  };

  const handleEditModal = (item) => {
    //////////console.log(pnamearr)
    console.log(item)
    let temp = []
    let temppro = item.projects
    if (typebill == 'bills') {
      console.log("hi from bills")
      setbillid(item._id)
      seteditcreatedAt(item.createdAt);
      setEditAmount(item.amount);
      setEditBank(item.bank);
      setEditCompany(item.company);
      setEditPerson(item.person);
      setEditProject(item.project);
      setEditSubject(item.subject);
      setEditDescription(item.description);
      setEditInvoice(item.invoice);
      setEditUrls(item.urls);
      seteditcredittype(item.type)
    }
    if (typebill == 'invoice') {
      console.log("hi from invoice")
      setinvoiceid(item._id)
      seteditcreatedAt(item.createdAt);
      setEditAmount(item.amount);
      setEditCompany(item.company);
      setEditPerson(item.person);
      setEditProject(item.project);
      setEditSubject(item.subject);
      setEditDescription(item.description);
      setEditUrls(item.urls);
      seteditcredittype(item.type)

    }
    //////////console.log(temppro,pnamearr)
    // for(let j=0;j<pnamearr.length;j++){
    //   if((temppro).includes(pnamearr[j]._id)){
    //     temp.push({
    //       id:pnamearr[j]._id,
    //       name:pnamearr[j].name,
    //     })
    //   }
    // }
    //////////console.log(temp,"hi")
    //////console.log(item,"hi")

    setShowModal(true);

  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    // console.log(selectedFiles[0],"hi")
    // console.log(typebill)
    const uniqueUrlsSet = new Set(); // Create a Set to store unique URLs

    //console.log(selectedFiles,selectedFiles.length,'selectedFiles.length')
    let urls = []
    for (let i = 0; i < selectedFiles.length; i++) {
      // //////////console.log("hi")
      if (selectedFiles[i] != null) {

        let selectedFile = selectedFiles[i][2]
        let url = getPredefinedUrl(selectedFiles[i][1]);


        if (!uniqueUrlsSet.has(url)) {
          uniqueUrlsSet.add(url); // Add the URL to the Set
        }

        if (selectedFile != null) {
          // ////console.log("hi",selectedFile)
          const reader = new FileReader();
          reader.onload = async (event) => {
            const fileContent = event.target.result;
            // urls.push(getPredefinedUrl(selectedFiles[i][1]))
            // Perform your upload logic here
            // For demonstration, let's just log the file extension and content
            //////////console.log('Selected File Extension:', fileExtension);
            //////////console.log('File Content:', fileContent);

            try {
              // Example: Uploading file content using Fetch

              if (selectedFile) {
                const responseFile = await fetch(selectedFiles[i][0], {
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

                toast.success(`${selectedFiles[i][1]} uploaded succesfully`); // Call toast.success after successful addition

                // Reload page after successful submission
                // window.location.reload();

                // Clear form data after submission

              }
            } catch (error) {
              //console.error('Error:', error);
              toast.error('Failed to add image'); // Display error toast if addition fails
            }
          };
          reader.readAsArrayBuffer(selectedFile);
        }
      }
    }


    // api call

    try {
      const uniqueUrls = Array.from(uniqueUrlsSet);
      let temp = []
      if (typebill == 'bills') {

        for (let i = 0; i < editUrls.length; i++) {
          temp[i] = editUrls[i]
        }
        if (payment) {
          temp[0] = { file: uniqueUrls[0], name: "Payment Proof" }
          console.log(editUrls)
        }
        if (invoi) {
          if (uniqueUrls.length == 2) {
            temp[1] = { file: uniqueUrls[1], name: "Tax Invoice" }
          }
          else {
            temp[1] = { file: uniqueUrls[0], name: "Tax Invoice" }
          }
        }

        // if(selectedFiles[0]!=undefined){
        //   editUrls[0]={file:uniqueUrls[0],name:"Payment Proof"}
        //   console.log(editUrls)
        // }
        // if(selectedFiles[1]!=undefined){
        //   if(uniqueUrls.length==2){
        //     editUrls[1]={file:uniqueUrls[1],name:"Tax Invoice"}
        //   }
        //   else{
        //     editUrls[1]={file:uniqueUrls[0],name:"Tax Invoice"}
        //   }
        //   console.log(editUrls)
        // }
        // console.log(editUrls)


        //console.log(uniqueUrlsObjects.length)
        const body = {
          amount: editAmount,
          person: editPerson == '' ? undefined : editPerson,
          createdAt: editcreatedAt,
          company: editCompany,
          project: editProject == '' ? undefined : editProject,
          description: editDescription,
          subject: editSubject,
          invoice: editInvoice == '' ? undefined : editInvoice,
          urls: temp,//new
          type: editcredittype,
          bank: editBank

        };

        console.log(body)

        const responseFormData = await axios.put(`${baseurl}/income/${editbillid}`, body);
        setSelectedFiles([])
        dispatch(getbill()).then(data => {
          bills = data
        })
        // dispatch(getbill())
        setTimeout(() => handleFilter(), 1000)
      }
      if (typebill == "invoice") {
        const uniqueUrls = Array.from(uniqueUrlsSet);
        ////console.log(uniqueUrls);
        const uniqueUrlsObjects = uniqueUrls.map(url => ({ file: url, name: "Proforma Invoice" }));

        //console.log(uniqueUrlsObjects.length)
        const body = {
          amount: editAmount,
          person: editPerson == '' ? undefined : editPerson,
          createdAt: editcreatedAt,
          company: editCompany,
          project: editProject == '' ? undefined : editProject,
          description: editDescription,
          subject: editSubject,
          invoice: editInvoice == '' ? undefined : editInvoice,
          urls: uniqueUrlsObjects.length != 0 ? uniqueUrlsObjects : editUrls,//new
          type: editcredittype,


        };



        const responseFormData = await axios.put(`${baseurl}/invoice/${editinvoiceid}`, body);
        setSelectedFiles([])
        handleinvoiceFetch().then(data => {
          console.log(data)
          invoice = data
        })
        // dispatch(getbill())
        setTimeout(() => handleFilter(), 1000)
        // setShowModal(false)


      }


      // handleFetchBills()
      // handleFetchBills()
    } catch (error) {
      //console.error(error);
      // Assuming res is not defined, use //console.error instead
      //console.error({ message: "backend error", data: error });
    }

    setShowModal(false)
  };

  const handletaskhistory = async (row) => {
    ////////////console.log("hi")
    try {
      // fetching all Histories of one task
      let response = await axios.get(`${baseurl}/history/${row._id}`)
      let temp = []

      for (let i = 0; i < response.data.length; i++) {
        let res = await axios.get(`${baseurl}/history/single/${(response.data)[i]._id}`)
        temp.push(res.data)
        ////////////console.log(temp)
      }
      setHistory(temp)


    } catch (error) {
      ////////////console.log(error)
    }


    setShowModal1(true)
    settaskthis(true)
  }



  const handleDelete = (e,id) => {
    e.preventDefault()
    dispatch(disableBill(id))
    setTimeout(() => {dispatch(getbill()).then(data => {
      bills = data
    })}, 1000)
    setTimeout(() => handleFilter(), 1000)
    
  }
  

  const [selectedFile, setSelectedFile] = useState(null);
  let [selectedFiles, setSelectedFiles] = useState([]);
  const [person, setPerson] = useState(null)
  const desiredContact = contacts.find(contact => contact._id == editPerson);
  const handleFileChange = (event, tp) => {
    const files = event.target.files;
    const newSelectedFiles = [];
    console.log(tp)
    for (let i = 0; i < files.length; i++) {

      const file = files[i];

      if (file) {
        // Read file extension
        const fileExtension = file.name;
        const desiredContact = contacts.find(contact => contact._id == editPerson);
        const arr1 = triggerFunction(fileExtension, desiredContact.name);

        // Add arr1[0] and arr1[1] to the newSelectedFiles array
        newSelectedFiles.push([arr1[0], arr1[1], file]);
      }
    }
    if (tp == "Payment") {
      selectedFiles[0] = newSelectedFiles[0]
    }
    if (tp == "Invoice") {
      selectedFiles[1] = newSelectedFiles[0]
    }
    // else{
    // setSelectedFiles([...selectedFiles, ...newSelectedFiles]);
    // selectedFiles=[...selectedFiles, ...newSelectedFiles]
    // }
    // After the loop, update selectedFiles with the accumulated data


    // Check the result
    console.log(selectedFiles);
  };


  const timeinIndia = (date) => {
    const utcTime = new Date(date);
    const istTime = utcTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    return (istTime);
  }

  const types = ["Developer", "Financer", "MEP", "Structural", "Architect", "Land Owner", "Agent", "Miscellaneous Consultant"]
  const banknames = ['Misc', 'Bandhan-20100018657972', 'Bharat-612100014610', 'Bharat-610100084505', 'DNS-29010100001263', 'HDFC-1451050122678', 'HDFC-501000174801181']



  return (
    <>
      <ToastContainer />
      <form onSubmit={(e) => {
        handleAllfetch(e)
        handleFilter()
      }
      }>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group id="pname" className="mb-4">
              <Form.Label>Type</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={typebill} onChange={(e) => {
                  setTypebill(e.target.value);
                  changeData(e.target.value);

                }}>
                  <option value="">Select Option</option>
                  <option value="invoice">Invoice</option>
                  <option value="bills">Bills</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group id="cname" className="mb-4">
              <Form.Label>Company Name</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={companyname} onChange={(e) => {
                  companyname = e.target.value
                  setCompanyName(e.target.value);
                  handleprojectFetch();
                }}>
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
                <Form.Select value={isActive} onChange={(e) => {
                  setIsActive(e.target.value);
                  handleprojectFetch();
                }}>
                  <option value="">Select Option</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
              <Form.Label>People</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={people} onChange={(e) => setPeople(e.target.value)}>
                  <option value="">Select Option</option>
                  {contacts.map((option, index) => (
                    <option key={index} value={option._id}>{option.name}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          {/* <Col xs={12} md={4}>
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
          <Form.Label>Search By Name, Contact, Email, or Description</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control autoFocus type="text" placeholder="Name" value={search} onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
        </Form.Group>
      </Col> */}
          <Col xs={12} md={2} className="d-flex justify-content-center">
            <Button style={{ height: "70%" }} variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Col>
        </Row>
      </form>

      <section>
        {typebill == "invoice" && (
          <Row>
            <Col className="mx-auto">
              <Card style={{ width: "max-content" }} border="light" className="shadow-sm">
                <Card.Header>
                  <Row style={{ width: "max-content" }} className="align-items-center">
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
                      <th scope="col">createdAt</th>
                      <th scope="col">InvoiceId</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Amount Paid</th>
                      <th scope="col">Person</th>
                      <th scope="col">Company</th>
                      <th scope="col">Project</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Description</th>
                      <th scope="col">Link to Files</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">loading...</td>
                      </tr>
                    ) : (
                      data.map((row, index) => (
                        <tr key={index}>
                          <td>{row.createdAt}</td>
                          <td>{row._id}</td>
                          <td>{row.amount}</td>
                          <td>{row.amount_paid}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{findperson(row.person)}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{row.company}</td>
                          <td colSpan="1" style={{ cursor: "pointer", whiteSpace: "pre-wrap" }} onClick={() => handletaskhistory(row)}>{findprojectname(row.project)}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{row.subject}</td>
                          <td colSpan="1"  ><pre style={{ whiteSpace: "pre-wrap" }}>{row.description}</pre></td>
                          {/* <td colSpan="1"  ><pre style={{ whiteSpace: "pre-wrap" }}>hi</pre></td> */}
                          <td colSpan="1"  ><pre style={{ whiteSpace: "pre-wrap" }}><a href={(row.urls[0])?.file} download style={{ textDecoration: "underline", color: "blue" }}>-{(row.urls[0])?.name}</a></pre></td>

                          <td>
                            <Button style={{ backgroundColor: "aqua", color: "black" }} variant="info" size="sm" onClick={() => handleEditModal(row)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button style={{ borderColor: "black", backgroundColor: "aqua", color: "black", marginLeft: "2%" }} onClick={() => {
                              dispatch(disableinvoice(row._id))
                              setTimeout(() => {
                                handleinvoiceFetch().then(data => {
                                  invoice = data
                                })
                              }, 2000)
                              setTimeout(() => {handleFilter()
                                toast.success("Succesfully Deleted") 
                              }, 2000)
                            }} variant="danger" size="sm">
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        )}
        {typebill == "bills" && (
          <Row>
            <Col className="mx-auto">
              <Card style={{ width: "max-content" }} border="light" className="shadow-sm">
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
                      <th scope="col" className="unselectable" style={{ cursor: "pointer" }} onClick={sortbycreatedby}>Created At</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Bank</th>
                      <th scope="col">Company</th>
                      <th scope="col">Person</th>
                      <th scope="col">Project</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Description</th>
                      <th scope="col">Invoice</th>
                      <th scope="col">Link to Files</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">loading...</td>
                      </tr>
                    ) : (
                      data.map((row, index) => (
                        <tr key={index}>
                          <td>{timeinIndia(row.createdAt)}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{row.amount}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{row.bank}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{row.company}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{findperson(row.person)}</td>
                          <td colSpan="1" style={{ cursor: "pointer", whiteSpace: "pre-wrap" }}>{findprojectname(row.project)}</td>
                          <td colSpan="1" style={{ whiteSpace: "pre-wrap" }}>{row.subject}</td>
                          <td colSpan="1"  ><pre style={{ whiteSpace: "pre-wrap" }}>{row.description}</pre></td>
                          <td colSpan="1"  ><pre style={{ whiteSpace: "pre-wrap" }}>{row.invoice}</pre></td>
                          <td colSpan="1"  ><pre style={{ whiteSpace: "pre-wrap" }}><a href={(row.urls[0])?.file} download style={{ textDecoration: "underline", color: "blue" }}>-{(row.urls[0])?.name}</a>
                            <br />
                            <a href={(row.urls[1])?.file} download style={{ textDecoration: "underline", color: "blue" }}>-{(row.urls[1])?.name}</a></pre></td>
                          <td>
                            <Button style={{ backgroundColor: "aqua", color: "black" }} variant="info" size="sm" onClick={() => handleEditModal(row)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button style={{ borderColor: "black", backgroundColor: "aqua", color: "black", marginLeft: "2%" }} onClick={(e) => {
                               dispatch(disableBill(row._id))
                               setTimeout(() => {dispatch(getbill()).then(data => {
                                 bills = data
                               })}, 1000)
                               setTimeout(() => handleFilter(), 1000)

                            }}


                              variant="danger" size="sm">
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        )}

        {/* Edit modal */}
        <Modal show={showModal} onHide={() => {
          setShowModal(false)
          setSelectedFiles([])
        }}>
          <Modal.Header>
            <Modal.Title>Edit Bills</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="pname" className="mb-4">
              <Form.Label>Creation Date</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Control autoFocus required type="date" placeholder="Amount" value={editcreatedAt} onChange={(e) => seteditcreatedAt(e.target.value)} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editDescription">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
            </Form.Group>
            {typebill == "bills" ? (<Form.Group className="mb-3" controlId="editDescription">
              <Form.Label>Bank</Form.Label>
              <Form.Select value={editBank} onChange={(e) => setEditBank(e.target.value)}>
                <option value="">Select Option</option>
                {banknames.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>) : (null)}

            <Form.Group id="pname" className="mb-4">
              <Form.Label>Company Name</Form.Label>
              <InputGroup>
                <Form.Select value={editCompany} onChange={(e) => {
                  setEditCompany(e.target.value)
                }}>
                  <option value="">Select Option</option>
                  <option value="Neo">Neo Modern</option>
                  <option value="BZ">BZ Consultants</option>
                  <option value="PMC">PMC</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
            <Form.Group id="pname" className="mb-4">
              <Form.Label>Contact</Form.Label>
              <InputGroup>

                <Form.Select required value={editPerson} onChange={(e) => setEditPerson(e.target.value)}>
                  <option value="">Select Option</option>
                  {/* Mapping through the arr array to generate options */}
                  {contacts.map((option, index) => (
                    <option key={index} value={option._id}>{option.name}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editHeading">
              <Form.Label>Project</Form.Label>
              <Form.Select value={editProject} onChange={(e) => setEditProject(e.target.value)}>
                <option value="">Select Option</option>
                {/* Mapping through the arr array to generate options */}
                {pnamearr.map((option, index) => (
                  <option key={index} value={option._id}>{option.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editHeading">
              <Form.Label>Subject</Form.Label>
            </Form.Group>
            <textarea rows="4" cols="50" type="text" value={editSubject} onChange={(e) => setEditSubject(e.target.value)} />
            <Form.Group className="mb-3" controlId="editHeading">
              <Form.Label>Description</Form.Label>
            </Form.Group>
            <textarea rows="4" cols="50" type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
            {typebill == "bills" ? (<Form.Group className="mb-3" controlId="editHeading">
              <Form.Label>Invoice</Form.Label>
              <Form.Select value={editInvoice} onChange={(e) => setEditInvoice(e.target.value)}>
                <option value="">Select Option</option>
                {/* Mapping through the arr array to generate options */}
                {invoice.map((option, index) => (
                  <option key={index} value={option._id}>{option.subject}</option>
                ))}
              </Form.Select>
            </Form.Group>) : (null)}
            <Form.Group id="pname" className="mb-4">
              <Form.Label>Type of Credit</Form.Label>
              <InputGroup>
                <InputGroup.Text></InputGroup.Text>
                <Form.Select value={editcredittype} onChange={(e) => {
                  seteditcredittype(e.target.value)
                }}>
                  <option value="">Select Option</option>
                  <option value="Fees">Fees</option>
                  <option value="Services">Services</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editHeading">
              
              <Form.Label>Payment Proof</Form.Label>
              <p>Current File:<a style={{textDecoration:"underline"}}>{editUrls[0]?.file}</a></p>
              <InputGroup>

                <Form.Control
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, "Payment")
                    setpayment(true)
                  }}
                  placeholder="Upload Image"
                />
              </InputGroup>
              
            </Form.Group>
            {typebill=='bills'?(
              <Form.Group className="mb-3" controlId="editHeading">
            <Form.Label>Tax Invoice</Form.Label>
              <p>Current File:<a style={{textDecoration:"underline"}}>{editUrls[1]?.file}</a></p>

              
            <InputGroup>
              <Form.Control
                type="file"
                onChange={(e) => {
                  handleFileChange(e, "Invoice")
                  setinvoi(true)
                }}
                placeholder="Upload Image"
              />
            </InputGroup>
            </Form.Group>
            ):(null)}
            


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowModal(false)
              setSelectedFiles([])
            }}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e) => {
              handleEditSubmit(e)
              setSelectedFiles([])
            }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </section>
    </>

  );
}



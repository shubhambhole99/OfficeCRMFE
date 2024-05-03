
import React, { useState,useEffect } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket, faDesktop, faSignInAlt, faSign, faSignLanguage, faSortNumericDownAlt, faHome, faInfo, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Routes } from "../routes.js";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import { faPhoenixFramework } from "@fortawesome/free-brands-svg-icons";
import {check} from '../checkloggedin.js';

export default (props = {}) => {
  
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";
  let history = useHistory();
  const permission=check()[3]
  //console.log(permission,"object")

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>{check()[1]}</h6>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Bhole Consultants" link={Routes.DashboardOverview.path} image={ReactHero} />

             
              {/* <NavItem title="Sign In" link={Routes.Signin.path}  icon={faSignInAlt}/>
               <NavItem title="Sign Up" link={Routes.Signup.path} icon={faSignLanguage} /> */}
              {/* <NavItem external title="Messages" link="https://demo.themesberg.com/volt-pro-react/#/messages" target="_blank" badgeText="Pro" icon={faInbox} />
              <NavItem title="Transactions" icon={faHandHoldingUsd} link={Routes.Transactions.path} />
              <NavItem title="Settings" icon={faCog} link={Routes.Settings.path} />
              <NavItem external title="Calendar" link="https://demo.themesberg.com/volt-pro-react/#/calendar" target="_blank" badgeText="Pro" icon={faCalendarAlt} />
              <NavItem external title="Map" link="https://demo.themesberg.com/volt-pro-react/#/map" target="_blank" badgeText="Pro" icon={faMapPin} /> */}
                  {permission.canViewProjects?(<CollapsableNavItem eventKey="Home/" title="Projects" icon={faHome}>
               <NavItem title=" Create Projects" link={Routes.CreateProjects.path} />
                {/* <NavItem title=" View Projects" link={Routes.Motivation.path} /> */}
                {/* <NavItem title=" Service" link={Routes.Service.path} /> */}
              </CollapsableNavItem>):(null)}
              

              <CollapsableNavItem eventKey="examples/" title="Tasks" icon={faInfo}>


                <NavItem title="Create Tasks" link={Routes.CreateTasks.path} />
                <NavItem title="View Tasks" link={Routes.ViewTasks.path} />
                {/* <NavItem title="Testimonial" link={Routes.Testimonial.path} /> */}
              </CollapsableNavItem>

            


              <CollapsableNavItem eventKey="examples/" title="Contacts" icon={faPhone}>


              <NavItem title="Add Contact" link={Routes.Contact.path} icon={faInfo}/>
              <NavItem title="View Contact" link={Routes.ViewContacts.path} icon={faInfo}/>
              {/* <NavItem title="Testimonial" link={Routes.Testimonial.path} /> */}
              </CollapsableNavItem>



              <CollapsableNavItem eventKey="examples/" title="Correspondence" icon={faBook}>


              <NavItem title="Add" link={Routes.CreateNode.path} icon={faBoxOpen}/>
              <NavItem title="View Contact" link={Routes.ViewContacts.path} icon={faChartPie}/>
              {/* <NavItem title="Testimonial" link={Routes.Testimonial.path} /> */}
              </CollapsableNavItem>

              {/* <NavItem external title="Plugins" link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable" target="_blank" badgeText="Pro" icon={faChartPie} /> */}

              {/* <Dropdown.Divider className="my-3 border-indigo" /> */}

              {/* <NavItem title="Blog" link={Routes.Uploadblog.path} icon={faDesktop} /> */}

              {/* <CollapsableNavItem eventKey="examples/" title="Service" icon={faPhoenixFramework}>
                <NavItem title="Our Service" link={Routes.Services.path} />
              </CollapsableNavItem> */}
  
              {/* <NavItem external title="Themesberg" link="https://themesberg.com" target="_blank" image={ThemesbergLogo} /> */}
              <Button onClick={() => {
                localStorage.removeItem('token');
                history.push("/sign-in");
              }} variant="secondary" className="upgrade-to-pro"><FontAwesomeIcon icon={faSignOutAlt} className="me-1" />Logout</Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

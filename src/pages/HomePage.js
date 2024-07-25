import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";

// Projects
import createProject from "./Projects/createProjects";
import viewProjects from './Projects/viewProjects';
import Service from './Projects/editProjects';


import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import createTasks from './Tasks/createTasks';
import viewTasks from './Tasks/viewTasks';
import Testimonial from './Tasks/Testimonial';
import Contact from './Contact/Contact';
import viewContact from './Contact/viewContact';
import Uploadblog from './Blog/Uploadblog';
import Servises from './Services/Servises';
// Invoices
import CreateInvoice from './Billing/createBills'
import viewBills from './Billing/viewBills'
import CreateCredit from './Billing/createCredit'
import CreateConsolidated from './Billing/createConsolidated'
// Format
import CreateFormat from './format/CreateFormat';
import Questions from './format/questions'




import {hot} from 'react-hot-loader/root';


// Create Correspondence
import CreateCorrespondence from './correspondence/CreateCorrespondence'

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

const Homepage= () => (
  <Switch>
   

    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
   {/* Projects */}
    <RouteWithSidebar exact path={Routes.CreateProjects.path} component={createProject} />
    <RouteWithSidebar exact path={Routes.Motivation.path} component={viewProjects} />
    <RouteWithSidebar exact path={Routes.Service.path} component={Service} />
    


    <RouteWithSidebar exact path={Routes.CreateTasks.path} component={createTasks} />
    <RouteWithSidebar exact path={Routes.ViewTasks.path} component={viewTasks} />
    <RouteWithSidebar exact path={Routes.Testimonial.path} component={Testimonial} />
    <RouteWithSidebar exact path={Routes.Contact.path} component={Contact} />
    <RouteWithSidebar exact path={Routes.ViewContacts.path} component={viewContact} />
    <RouteWithSidebar exact path={Routes.Uploadblog.path} component={Uploadblog} />
    <RouteWithSidebar exact path={Routes.Services.path} component={Servises} />

    
    

    



    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />
    <RouteWithSidebar exact path={Routes.Contact.path} component={Contact} />


    {/* Correspondence */}
    <RouteWithSidebar exact path={Routes.CreateNode.path} component={CreateCorrespondence} />

    {/* Invoices */}
    <RouteWithSidebar exact path={Routes.CreateInvoice.path} component={CreateInvoice} />
    <RouteWithSidebar exact path={Routes.CreateCredit.path} component={CreateCredit}/>
    <RouteWithSidebar exact path={Routes.viewBills.path} component={viewBills} />
    <RouteWithSidebar exact path={Routes.createConsolidated.path} component={CreateConsolidated}/>


    {/* Format */}
    <RouteWithSidebar exact path={Routes.CreateFormat.path} component={CreateFormat} />
    <RouteWithSidebar exact path={Routes.Questions.path} component={Questions} />

    <Redirect to={Routes.Signin.path} />
    {/* <Redirect to={Routes.DashboardOverview.path} /> */}
  </Switch>
);

export default hot(Homepage);
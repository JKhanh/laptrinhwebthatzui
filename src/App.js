import SideBar from "./component/sidebar/sidebar";
import CompanyList from "./component/crud/company";
import ServiceList from "./component/crud/service";
import EmployeeList from "./component/crud/employee";
import CompanyServiceList from "./component/crud/companyService";
import "antd/dist/antd.css";
import "./App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/home";
import StaffList from "./component/crud/staffList";

function App() {

  return (
    <Router>
      <div className="App">
        <header></header>
        <body className="container">
          <div className="sider">
            <SideBar />
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/companies">
                <CompanyList />
              </Route>
              <Route exact path="/staffs">
                <StaffList />
              </Route>
              <Route exact path="/services">
                <ServiceList />
              </Route>
              <Route exact path="/companies/service">
                <CompanyServiceList />
              </Route>
              <Route exact path="/companies/employee">
                <EmployeeList />
              </Route>
            </Switch>
          </div>
        </body>
      </div>
    </Router>
  );
}

export default App;

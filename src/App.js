import SideBar from './component/sidebar/sidebar'
import EmployeeList from './component/crud/staffList'
import CompanyList from './component/crud/company'
import ServiceList from './component/crud/service'
import 'antd/dist/antd.css';
import './App.css'
import { Layout, Menu } from 'antd'
import {BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom"
import Home from './component/home';

function App() {

  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Router>
      <div className="App">
      <header >
      </header>
      <body className = 'container'>
        <div className = 'sider'>
          <SideBar />
        </div>
        <div className = 'content'>
          <Switch>
            <Route exact path = '/'>
              <Home />
            </Route>
            <Route exact path = '/companies'>
              <CompanyList />
            </Route>
            <Route exact path = '/staffs'>
              <EmployeeList />
            </Route>
            <Route exact path = '/services'>
              <ServiceList />
            </Route>
          </Switch>
        </div>
      </body>
    </div>
    </Router>
  );
}

export default App;

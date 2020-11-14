import SideBar from './component/sidebar/sidebar'
import TableForm from './component/table'
import 'antd/dist/antd.css';
import './App.css'
import { Layout, Menu } from 'antd';

function App() {

  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <div className="App">
      <header >
      </header>
      <body className = 'container'>
        <div className = 'sider'>
          <SideBar />
        </div>
        <div className = 'content' >
          <TableForm />
        </div>
        
      </body>
    </div>
  );
}

export default App;

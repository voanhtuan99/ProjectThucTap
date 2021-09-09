
import './App.css';
import { Component } from 'react'
import AppRouter from './AppRouter';
import AdminUI from './admin/adminui'
import HomapageAdmin from './admin/homepageadmin';
import AddProduct from './admin/addproduct';
class App extends Component {



  render() {
    return (
      <div>
        {/* <AdminUI /> */}
        <AppRouter></AppRouter>
      </div>

    );
  }
}

export default App;

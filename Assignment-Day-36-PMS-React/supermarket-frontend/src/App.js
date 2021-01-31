import './App.css';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import SingleProduct from './components/SingleProduct';
import { Route, BrowserRouter as Routing, Switch, Link } from 'react-router-dom';
import ManageProducts from './components/ManageProducts';


function App() {
  return (
    <div className="App">
      <Routing>
      {/*  Navigation JSX (HTML)  */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">SuperMarket</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
              <Link to="/add" className="nav-link">Add Product</Link>
              </li>
              <li className="nav-item">
              <Link to="/manage" className="nav-link">Manage Products</Link>
              </li>
            </ul>
          </div>
        </nav>
      {/* /////Navigation Ends */}
    
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/view/:id" exact component={SingleProduct} />
        <Route path="/add" component={AddProduct} />
        <Route path="/manage" component={ManageProducts} />
        </Switch>
      </Routing>
    </div>
  );
}

export default App;

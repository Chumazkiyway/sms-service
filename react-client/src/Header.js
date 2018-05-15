import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(e){
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('pass');
  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg  navbar-dark navbar-success">
        <Link className="navbar-brand" to="/">{this.props.headerName}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {this.props.listMenu.map((element, index) =>
            <li key={index} className="nav-item">
              <Link  className="nav-link" to={element.toLowerCase()}>{element}</Link>
            </li>
            
          )}        
        </ul>
    
          <Link to="/login">
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit" onClick={this.handleLogOut} >Log in</button>
          </Link>   
      </div>
    </nav>
    );
  }
}
Header.defaultProps = {
    listMenu: ['123']
  };
export default Header

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }   
    handleLogOut(e){
        //если пользователь авторезирован
        if(this.props.logButton.editButtonOutOrIn) {
            
            this.props.changeLogButton();

            sessionStorage.removeItem('login');
            sessionStorage.removeItem('pass'); 
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('pattern'); 
            sessionStorage.removeItem('alphaname'); 
            sessionStorage.removeItem('balance'); 
        }
        this.props.history.push('/login');
    }

    render() {
        let logButtonText = this.props.logButton.buttonText;
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
                    <div className="btn-group mr-2" role="group" aria-label="First group">
                        {
                            this.props.logButton.editButtonOutOrIn?
                            <button  type="button" className="btn btn-outline-light my-2 my-sm-0" onClick={this.props.editSettings}>Settings</button>: <div/>
                        }           
                        <button className="btn btn-outline-light my-2 my-sm-0" type="button" onClick={this.handleLogOut} >{logButtonText}</button>                       
                    </div>
                </div>
            </nav>
        );
    }
}
Header.defaultProps = {
    listMenu: ['123']
  };
export default withRouter(Header);

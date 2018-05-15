import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as queries  from './queries';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
class Login extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state={
      login:'',
      pass:'',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e) {
    switch (e.target.name) {
      case 'loginLog':
          this.setState({login:e.target.value});
        break;
      case 'passLog':
        this.setState({pass:e.target.value});
        break;
      default:
        break;

    }
  }
  async handleSubmit(e){
    e.preventDefault();
    console.log(this.state.login);
    console.log(this.state.pass);
    let user = await queries.postQuerieValidateLogin(this.state.login,this.state.pass);
    
    if(user){
      alert('Вы вошли!');
      sessionStorage.setItem('login',this.state.login);
      sessionStorage.setItem('pass',this.state.pass);
      this.props.history.push('/send');
    }
    else {
      alert('Ошибка входа');

    }
  }
  render() {
    return (
      <form className="needs-validation" onSubmit={this.handleSubmit} noValidate> 
        <div className="pos-center-block">
              <div className="form-group">
                <label className="control-label">Email</label>
                <input type="email" onChange={this.onChange} name="loginLog" className="form-control" id="email1" placeholder="Введите логин" required/>            
              </div>
              <div className="form-group">
                <label htmlFor="password" className="control-label">Password</label>
                <input type="password" onChange={this.onChange} name="passLog" className="form-control" id="password1" placeholder="Введите пароль" required/>
                
              </div>
              <div className="form-group">
                <Link to="/register"><button type="button" className="btn btn-link">Регистрация</button></Link>                         
                <Link to="/send"><button type="submit" onClick={this.handleSubmit}  className="btn btn-success btn-block ">Войти</button></Link>          
              </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);

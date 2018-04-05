import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Login extends Component {
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
      case 'login':
          this.setState({login:e.target.value});
        break;
      case 'pass':
        this.setState({pass:e.target.value});
        break;

    }
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="pos-center-block">
              <div className="form-group">
                <label className="control-label">Email</label>
                <input type="email" onChange={this.onChange} name="loginLog" className="form-control" id="email1" placeholder="Введите email"/>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="control-label">Password</label>
                <input type="password" onChange={this.onChange} name="passLog" className="form-control" id="password1" placeholder="Введите пароль"/>
              </div>
              <div className="form-group">
                <Link to="/register"><button type="button" className="btn btn-link">Регистрация</button></Link>                         
                <Link to="/send"><button type="button"  className="btn btn-success  btn-block">Войти</button></Link>          
              </div>
        </div>
      </form>
    );
  }
}

export default Login;

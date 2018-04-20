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
  handleSubmit(e){
    
    console.log(this.state.login);
    console.log(this.state.pass);
    
    if(this.validatePass()) {
      console.log('submit');
      fetch('/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: this.state.login,
          pass: this.state.pass
        }),
      });
    }
    else alert('Ошибка входа');
  }
  validatePass(){
    return true;
  }
  componentDidMount()
  {
    
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
                <Link to="/send"><button type="button" onClick={this.handleSubmit}  className="btn btn-success  btn-block">Войти</button></Link>          
              </div>
        </div>
      </form>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      login:'',
      loginIsValid:false,
      pass1:'',
      pass2:'',
      passIsValid:false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    switch (e.target.name) {
      case 'loginReg':
          this.setState({login:e.target.value});
        break;
      case 'passReg1':
          this.setState({pass1:e.target.value, passIsValid: this.validatePass(e.target.value,this.state.pass2)});
        break;
      case 'passReg2':
          this.setState({pass2:e.target.value,passIsValid: this.validatePass(e.target.value,this.state.pass1)});    
        break;
      default:
        break;

    }
  }
  handleSubmit(e) {
    console.log(this.state.login);
    console.log(this.state.pass1);
    console.log(this.state.pass2);
    
    if(this.validatePass(this.state.pass1,this.state.pass2)) {
      console.log('submit');
    
      fetch('/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: this.state.login,
          pass: this.state.pass2
        }),
      });
    }
    else alert('пароли не одинаковы');
  }
  validatePass(pass1,pass2) {
    return pass1 === pass2;
  }
  validateLogin(login) {
      return true;
  }
  render() {
    let loginColor = this.state.loginIsValid===true?".success":".has-error";
    let passColor = this.state.passIsValid===true?".success":".has-error";
    return (
      <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
        <div className="pos-center-block">
          <div className="form-group">
            <label htmlFor="email" >Email</label>
            <input type="email" onChange={this.onChange} name="loginReg" className={"form-control"} id="email2" placeholder="Введите email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={this.onChange} name="passReg1" className={"form-control "} id="password2" placeholder="Введите пароль"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password again</label>
            <input type="password"onChange={this.onChange} name="passReg2" className={"form-control "} id="password3" placeholder="Введите пароль"/>
          </div>
          <div className="form-group">
            <Link to="/"><button type="button" onClick={this.handleSubmit} className="btn btn-success btn-block">Зарегистрироваться</button></Link>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;

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
    switch (e.target.name) {
      case 'loginReg':
          this.setState({login:e.target.value});
        break;
      case 'passReg1':
          this.setState({pass1:e.target.value,passIsValid:this.validatePass(e.target.value,this.state.pass2)});   
          break;
      case 'passReg2':
          this.setState({pass2:e.target.value, passIsValid:this.validatePass(e.target.value,this.state.pass1)});            
        break;
      default:
        break;

    }
  }
  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.login);
    console.log(this.state.pass1);
    console.log(this.state.pass2);

    let valLog = await this.validateLogin();
    let valPass = this.validatePass(this.state.pass2,this.state.pass1);

    //this.setState({loginIsValid: valLog});
    //this.setState({passIsValid: valPass});

    if(valLog && valPass) {
      alert('Вы зарегистрировались!');
    }
    else if(!valPass) {
      alert('пароли не одинаковы');
      
    }
    else if(!valLog) {
      alert('логин занят!');
      
    }
  }
  validatePass(pass1,pass2) {
    let passIsValid = (pass1 === pass2) ? true : false;
    return passIsValid;

  }
  async validateLogin() {
    let IsValid;
    await fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.login,
        pass: this.state.pass1
      }),
    })
    .then(res => res.json())
    .then(loginIsValid => {
        console.log("login is valid: " + loginIsValid);
        IsValid = loginIsValid;

    })
    .catch (function (error) {
        console.log('Request failed', error);
    });
    return IsValid;
  }

  render() {
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

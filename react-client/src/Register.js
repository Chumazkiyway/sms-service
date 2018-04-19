import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      login:'',
      pass1:'',
      pass2:''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e) {
    console.log(e.target.value);
    switch (e.target.name) {
      case 'login':
          this.setState({login:e.target.value});
        break;
      case 'pass1':
        this.setState({pass1:e.target.value});
        break;
      case 'pass2':
        this.setState({pass2:e.target.value});
        break;

    }
  }
  handleSubmit(e) {
    console.log("form submited");
    e.preventDefault();
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: '${this.state.login}',
        pass: '${this.state.pass2}'
      }),
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="pos-center-block">
          <div className="form-group">
            <label for="email" >Email</label>
            <input type="email" onChange={this.onChange} name="loginReg" className="form-control" id="email2" placeholder="Введите email"/>
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" onChange={this.onChange} name="passReg1" className="form-control" id="password2" placeholder="Введите пароль"/>
          </div>
          <div className="form-group">
            <label for="password">Password again</label>
            <input type="password"onChange={this.onChange} name="passReg2" className="form-control" id="password3" placeholder="Введите пароль"/>
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

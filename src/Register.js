import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      login:'',
      pass1:'',
      pass2:'',
      allow:0
    };
    this.onMyChange = this.onMyChange.bind(this);
    this.onMyClick = this.onMyClick.bind(this);
  }
  onMyChange(e) {
    console.log(e.target.value);
    switch (e.target.name) {
      case 'login':
          this.setState({login:e.target.value});
        break;
      case 'pass1':
        this.setState({pass:e.target.value});
        break;
      case 'pass2':
        this.setState({pass:e.target.value});
        break;
      default:

    }

  }
  onMyClick(){

    console.log(1);
  }
  render() {
    return (
      <div className="pos-center-block">

          <div className="form-group">
            <label for="email" >Email</label>
            <input type="email" onChange={this.onMyChange} name="login1" className="form-control" id="email2" placeholder="Введите email"/>

          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" onChange={this.onMyChange} name="pass1" className="form-control" id="password2" placeholder="Введите пароль"/>

          </div>
          <div className="form-group">
            <label for="password">Password again</label>
            <input type="password"onChange={this.onMyChange} name="pass2" className="form-control" id="password3" placeholder="Введите пароль"/>
          </div>
          <div className="form-group">
            <Link to="/"><button type="button" onClick={this.onMyClick} className="btn btn-success btn-block">Зарегистрироваться</button></Link>
          </div>
      </div>
    );
  }
}

export default Register;

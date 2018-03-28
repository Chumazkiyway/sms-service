import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      login:'',
      pass:'',
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
      case 'pass':
        this.setState({pass:e.target.value});
        break;
      default:

    }
    if(this.state.login!=='' && this.state.pass!=='')
      this.setState({allow:1});
    else this.setState({allow:0});
  }
  onMyClick(){
    console.log(1);
  }

  render() {
    return (
      <div className="pos-center-block">
            <div className="form-group">
              <label className="control-label">Email</label>
              <input type="email" onChange={this.onMyChange} name="login" className="form-control" id="email1" placeholder="Введите email"/>
            </div>
            <div className="form-group">
              <label for="password" className="control-label">Password</label>
              <input type="password" onChange={this.onMyChange} name="pass" className="form-control" id="password1" placeholder="Введите пароль"/>
            </div>
            <div className="form-group">
              <Link to="/register"><button type="button" className="btn btn-link">Регистрация</button></Link>
              {
                this.state.allow===1 ?
                 <Link to="/send"><button type="button" onClick={this.onMyClick} className="btn btn-success  btn-block">Войти</button></Link>
                :
                <Link to="/send"><button type="button" onClick={this.onMyClick} disabled className="btn btn-success btn-block">Войти</button></Link>
              }
            </div>


        
      </div>
    );
  }
}

export default Login;

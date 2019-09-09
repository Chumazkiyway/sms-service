import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Accept from './Accept';
import Send from './Send';
import Undefined from './Undefined';
import ModalSettings  from './modal/ModalSettings';
import * as queries from '../js/queries';
var menu = ['Send','Accept'];
class App extends Component {

	constructor(props){
		super(props);
		
		this.state={
			logButton:{
				editButtonOutOrIn: false,
				buttonText: 'Log in'
			},
			ModalIsOpen: false,
			listMenu: [],
			token: '',
			alpha: '',
			pattern: ''
		};

		this.changeLogButton = this.changeLogButton.bind(this);
		this.openSettings = this.openSettings.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
		this.closeSettings = this.closeSettings.bind(this);
		this.setUserInfo = this.setUserInfo.bind(this);
		
	}
	changeLogButton()
	{
		if(!this.state.logButton.editButtonOutOrIn) {
			this.setState({logButton:{editButtonOutOrIn: true,
			buttonText: 'Log out'},listMenu:menu});
		}
		else{
			this.setState({logButton:{editButtonOutOrIn: false,
			buttonText: 'Log in'},listMenu:[]});
		}

	}
	setUserInfo(token,alphaname,pattern){
		this.setState({
			token: token,
			alpha: alphaname,
			pattern: pattern,
		});
	}

	componentWillMount() {
		let token = sessionStorage.getItem('token');
		let alphaname = sessionStorage.getItem('alphaname');
		let pattern = sessionStorage.getItem('pattern');

		if(sessionStorage.getItem('login') != null) {
			this.setState({
				logButton:{
					editButtonOutOrIn: true,
					buttonText: 'Log out'},
				listMenu:menu,
				token: token,
				alpha: alphaname,
				pattern: pattern,	
			});

		}
	}
	openSettings(){
		this.setState({ModalIsOpen: true});
	}
	closeSettings(){
		this.setState({ModalIsOpen: false});
	}
	async saveSettings(token,alpha,pattern){

		sessionStorage.setItem('token',token);
		sessionStorage.setItem('alphaname',alpha);
		sessionStorage.setItem('pattern',pattern);

		let login = sessionStorage.getItem('login');
		let pass = sessionStorage.getItem('pass');

		this.setState({
				ModalIsOpen: false,
				token: token,
				alpha: alpha,
				pattern: pattern,
			}
		);
		
		let result = await queries.postQuerieSettings(login,pass,token,alpha,pattern);

		if(!result)
			alert('save err');

	}
	
	render() {	
		let ModalIsOpen = this.state.ModalIsOpen;
		return (
			<div>
				<Header headerName="SMS Gateway" listMenu={this.state.listMenu} changeLogButton={this.changeLogButton}
				 logButton={this.state.logButton} editSettings={this.openSettings}/>
				{	
					ModalIsOpen?
					<ModalSettings isOpen={this.state.ModalIsOpen} closeSettings={this.closeSettings} saveSettings={this.saveSettings}
					token={this.state.token} pattern={this.state.pattern} alpha={this.state.alpha} />
					:
					<div></div>
				}		 
				<Switch>
					<Route exact path='/' render={(props) => <Home/>} />
					<Route path='/login' render={(props) => <Login changeLogButton={this.changeLogButton} setUserInfo={this.setUserInfo}/>}/>
					<Route path='/register' render={(props) => <Register/>}/>
					<Route path='/accept' render={(props) => <Accept />}/>
					<Route path='/send' render={(props) => <Send pattern={this.state.pattern}/>} />
					<Route component={Undefined}/>
				</Switch>
	    	</div>
		);
	}
}

export default App;


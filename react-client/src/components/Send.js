import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DynamicTable from '../utils/DynamicTable';
import * as queries  from '../js/queries';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import XLSX from 'xlsx';

const TABLE_COLUMNS = [
    'Lastname',
    'Firstname',
    'Phone',
];

class Send extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}
	constructor(props){
		super(props);
		this.state={
			text:'',
			textCounter:0,
			displayedTable:[],
			template:'',
			editTemplate: false,
		};
		this.onMyClickAddRow = this.onMyClickAddRow.bind(this);
		this.onMyClickDeleteRow = this.onMyClickDeleteRow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);	
		this.onChangeTextSMS = this.onChangeTextSMS.bind(this);	
		this.handleFile = this.handleFile.bind(this);
	}	
	componentWillMount() {
		/*let login = sessionStorage.getItem('login',this.state.login);
		let pass = sessionStorage.getItem('pass',this.state.login);
		let isValid = queries.getQueriepostQuerieValidateLogin(login,pass,'/send');
		console.log(isValid);
		if(!isValid)
			this.history.push('/login');
		else alert('вы не авторезированы!');
		*/	
			
	}

	onChangeTextSMS(e) {
		this.setState({text:e.target.value});  
	}
	onMyClickAddRow() {
	
	    let table = this.state.displayedTable;
	    table.splice(table.length,0,['','','']);
	    this.setState({displayedTable: table});
	    console.log(this.state.displayedTable);
	}
	onChangeTextTemplate(e) {
		console.log(e.target.value);
    	this.setState({text:e.target.value});  
    }
    onChangeTextSMS(e) {
    	let textLength =  e.target.value.length;
    	this.setState({text:e.target.value,textCounter:textLength});

    }
	onMyClickAddRow() {
	    let table = this.state.displayedTable;
	    table.splice(table.length,0,['','','']);
	    this.setState({displayedTable: table});
	    console.log(this.state.displayedTable);
	}
	onMyClickDeleteRow() {
	    let table = this.state.displayedTable;
	    table.splice(table.length-1,1);
	    this.setState({displayedTable: table});
	    console.log(this.state.displayedTable);    
	}
	async handleSubmit(e){
    e.preventDefault();
    console.log(this.state.displayedTable);
    let subscribers = [];
    let table = this.state.displayedTable;

    for (let i = 0; i < table.length; i++) {
		  subscribers.push({
		  	lastname: table[i][0],
		  	firstname: table[i][1],
		  	phone: table[i][2]
		  });
		}
	let user = await queries.postQuerieSend(subscribers,this.state.text);
	if(user){
    	this.props.history.push('/accept');
	}
     else{
      alert('You are not autorized');
     }
	}
	
	handleFile(e) {

	  let rABS = false; // true: readAsBinaryString ; false: readAsArrayBuffer
	  let files = e.target.files, f = files[0];
	  let reader = new FileReader();
	  var table = [];
	 
	  reader.onload = function(e) {
	  
	    let data = e.target.result;
	    if(!rABS) data = new Uint8Array(data);

	    let workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
	    let sheetName = workbook.SheetNames[0];
	    let sheet = workbook.Sheets[sheetName];
	    //adding values to table
	    
	    console.log(sheet);
	    let z, a,b,c, A,B,C;
	    	for (z in sheet) {
			    if(z[0] === 'A') {
			    	a = JSON.stringify(sheet[z].v);
			    	A = z[0];
			    }
			    if(z[0] === 'B') {
			    	b = JSON.stringify(sheet[z].v);
			    	B = z[0];
			    }
			    if(z[0] === 'C') {
			    	c = JSON.stringify(sheet[z].v);
			    	C = z[0];
			    }
			    if(A === 'A' && B === 'B' && C === 'C'){
			 		table.splice(table.length,0,[a,b,c]);	   
			    	A = '';
			    	B = '';
			    	C = '';
			    }
		  	}
		console.log(table);
		
	  };
		

		this.setState({displayedTable:table});
		
		  if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
	}

	render() {
		let balance = sessionStorage.getItem('balance');
		let textLength = this.state.textCounter;
		return (
			<div>
			
			<form className="needs-validation" onSubmit={this.handleSubmit} noValidate> 

				<div className="pos-center-block">
				<h6>Balance: {balance} uah</h6>
					<div className="custom-file">			
						<label className="custom-file-label" htmlFor="customFile">Set file</label>
						<input type="file" className="custom-file-input" id="customFile" onChange={this.handleFile} accept=".xlsx"/>	
					</div>
					<DynamicTable data={this.state.displayedTable} columns={TABLE_COLUMNS} isReadOnly={false} id="sendTable"/>
					<div className="btnAdd">
						<input type="button" className="btn btn-info" onClick={this.onMyClickAddRow} value="Add" name="submit"/>
					</div>
					<div className="btnDelete">
						<input type="button" className="btn btn-danger" onClick={this.onMyClickDeleteRow} value="Delete" name="submit"/>
					</div>
					<br/><br/>
														  
					<div>												
						<label htmlFor="ts">Input message</label>					
							
						<textarea onChange={this.onChangeTextSMS} name="textSMS" id="ts"  className="form-control" rows="5"></textarea><br/>
						<h6>simbol counter: { textLength }</h6>
						<input type="button" className="btn btn-success btn-block" onClick={this.handleSubmit} value="Submit" name="submit"/>
					</div>
					
				</div>
			</form>
			</div>

		);
	}
}

export default withRouter(Send);
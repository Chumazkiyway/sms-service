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
			fileName: 'Select a file with filled columns A B C'
		};
		this.onMyClickAddRow = this.onMyClickAddRow.bind(this);
		this.onMyClickDeleteRow = this.onMyClickDeleteRow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);	
		this.onChangeTextSMS = this.onChangeTextSMS.bind(this);	
		this.handleFile = this.handleFile.bind(this);
	}	
	componentWillMount() {
		var text = sessionStorage.getItem('pattern');
		this.setState({text:text,textCounter:text.length});  
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
		let login = sessionStorage.getItem('login');
		let pass = sessionStorage.getItem('pass');
		console.log(this.state.text);
		sessionStorage.setItem('text',this.state.text);
		let user = await queries.postQuerieSend(subscribers,this.state.text,login,pass);
		if(user){
	    	this.props.history.push('/accept');
		}
	     else{
	      alert('You are not autorized');
	     }
	}
	
	async handleFile(e) {

	  var rABS = false; // true: readAsBinaryString ; false: readAsArrayBuffer
	  var files = e.target.files, f = files[0];
	  var reader = new FileReader();
	  var table = this.state.displayedTable;
	  var currentName = this.state.fileName;
	  	if(currentName != f.name){
	  	this.setState({fileName: f.name});
	  	}	
	  

	  reader.onload = await function(e) {

	  
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
			    	a = JSON.stringify(sheet[z].v).replace(/\"/g,'');
			    	A = z[0];
			    }
			    if(z[0] === 'B') {
			    	b = JSON.stringify(sheet[z].v).replace(/\"/g,'');
			    	B = z[0];
			    }
			    if(z[0] === 'C') {
			    	c = JSON.stringify(sheet[z].v).replace(/\"/g,'');
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
		  if(rABS) reader.readAsBinaryString(f);
		  else reader.readAsArrayBuffer(f);
			

		  this.setState({displayedTable: table});

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
							<label className="custom-file-label" htmlFor="customFile">{this.state.fileName}</label>
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
							<textarea onChange={this.onChangeTextSMS} defaultValue={this.props.pattern} name="textSMS" id="ts"  className="form-control" rows="5"></textarea><br/>
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

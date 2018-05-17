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
			displayedTable:[
				['','','']
			],
			template:'',
			editTemplate: false,
		};
		this.onMyClickAddRow = this.onMyClickAddRow.bind(this);
		this.onMyClickDeleteRow = this.onMyClickDeleteRow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.onChangeTextSMS = this.onChangeTextSMS.bind(this);	
		this.onReadFileXLSX = this.onReadFileXLSX.bind(this);	
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
	componentDidMount(){

	}
	onChangeTextSMS(e) {
		this.setState({text:e.target.value});  
	}
	onReadFileXLSX(e){
		console.log(e.target.files[0]);
		let workbook = XLSX.readFile(e.target.files[0]);
		let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
		let data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
		console.log(data);
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
    await queries.postQuerieSend(subscribers,this.state.text);
    this.props.history.push('/accept');
	}
	render() {
		return (
			<div>
			
			<form className="needs-validation" onSubmit={this.handleSubmit} noValidate> 
				
				<div className="pos-center-block">
					<div className="custom-file">
						<input type="file" className="custom-file-input" id="customFile" onChange={this.onReadFileXLSX} accept=".xlsx, .xls" ref="readFile"/>
						<label className="custom-file-label" htmlFor="customFile">Set file</label>
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
					  <input type="button" className="btn btn-success btn-block" onClick={this.handleSubmit} value="Submit" name="submit"/>
					  </div>
					
				</div>
			</form>
			</div>

		);
	}
}

export default withRouter(Send);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DynamicTable from './DynamicTable';
import * as queries  from './queries';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const TABLE_COLUMNS = [
    'Фамилия',
    'Имя',
    'Номер телефона',
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
		this.onMyClickEditTemplate = this.onMyClickEditTemplate.bind(this);
		this.onMyClickEditTemplateOk = this.onMyClickEditTemplateOk.bind(this);
		this.onMyClickEditTemplateCancel = this.onMyClickEditTemplateCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangeTextTemplate = this.onChangeTextTemplate.bind(this);
		this.onChangeTextSMS = this.onChangeTextSMS.bind(this);	
	}	
	componentWillMount()
	{
		/*let login = sessionStorage.getItem('login',this.state.login);
		let pass = sessionStorage.getItem('pass',this.state.login);
		let isValid = queries.getQueriepostQuerieValidateLogin(login,pass,'/send');
		console.log(isValid);
		if(!isValid)
			this.history.push('/login');
		else alert('вы не авторезированы!');
		*/
	}
	onChangeTextTemplate(e) {
		console.log(e.target.value);
    this.setState({text:e.target.value});  
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
	onMyClickDeleteRow() {
    let table = this.state.displayedTable;
    table.splice(table.length-1,1);
    this.setState({displayedTable: table});
    console.log(this.state.displayedTable);
	    
	}
	onMyClickEditTemplate(){
		this.setState({editTemplate:true});
	}
	onMyClickEditTemplateOk(){
		this.setState({text: '\n\n' + this.state.template,editTemplate:false});
	}
	onMyClickEditTemplateCancel(){
		this.setState({editTemplate:false,template:''});
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
		let editTemplate = this.state.editTemplate;
		let template = this.state.template;
		return (
			<form className="needs-validation" onSubmit={this.handleSubmit} noValidate> 
				<div className="pos-center-block">
					<div className="custom-file">
						<input type="file" className="custom-file-input" id="customFile" accept=".xls, .xls"/>
						<label className="custom-file-label" htmlFor="customFile">Выбирите файл</label>
					</div>
					<DynamicTable data={this.state.displayedTable} columns={TABLE_COLUMNS} isReadOnly={false} id="sendTable"/>
					<div className="btnAdd">
						<input type="button" className="btn btn-info" onClick={this.onMyClickAddRow} value="Добавить" name="submit"/>
					</div>
					<div className="btnDelete">
						<input type="button" className="btn btn-danger" onClick={this.onMyClickDeleteRow} value="Удалить" name="submit"/>
					</div>
					<br/><br/>
					{
						editTemplate ?
						<div>
						<label htmlFor="et">Введите новый шаблон</label>
					  <textarea onChange={this.onChangeTextTemplate} name="textTemplate" defaultValue={template} className="form-control" id="et" rows="5"></textarea><br/>

					  <div className="btnAdd">					
					  	<input type="button" className="btn btn-info" onClick={this.onMyClickEditTemplateCancel} value="Отменить"/>
						</div>
						<div className="btnDelete">
							<input type="button" className="btn btn-danger" onClick={this.onMyClickEditTemplateOk} value="Изменить"/>
						</div>
						</div>
					  :
					  <div>
						<button type="button" onClick={this.onMyClickEditTemplate} className="btn btn btn-light">Редактировать шаблон</button>
						
						<br/>
						
					  <label htmlFor="ts">Введите сообщение</label>
					  <textarea onChange={this.onChangeTextSMS} name="textSMS" id="ts" defaultValue={template} className="form-control" rows="5"></textarea><br/>
					  <input type="button" className="btn btn-success btn-block" onClick={this.handleSubmit} value="Отправить" name="submit"/>
					  </div>
					}
				</div>
			</form>

		);
	}
}

export default withRouter(Send);

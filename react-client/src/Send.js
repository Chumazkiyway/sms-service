import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DynamicTable from './DynamicTable';
const TABLE_COLUMNS = [
    'Фамилия',
    'Имя',
    'Номер телефона',
];

class Send extends Component {
	constructor(props){
		super(props);
		this.state={
			displayedTable:[
				["","",""]
			]
		};
		this.onMyClickAddRow = this.onMyClickAddRow.bind(this);
		this.onMyClickDeleteRow = this.onMyClickDeleteRow.bind(this);
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
	
	render() {
		return (
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

				<div className="form-group">
				    <label htmlFor="qqqq">Введите сообщение</label>
				    <textarea className="form-control" id="qqqq" rows="5"></textarea>
				    <Link to="/accept"><input type="button" className="btn btn-success btn-block" value="Отправить" name="submit"/></Link>
				</div>
			</div>

		);
	}
}

export default Send;

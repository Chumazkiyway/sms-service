import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
import DynamicTable from './DynamicTable'
const TABLE_COLUMNS = [
    'Фамилия',
    'Имя',
    'Номер телефона',
];
const data = [
  ['Alexander', 345345, 887423],
  ['Paul', 2347, 76323],
  ['Larisa', 745, 54234],
];

function editRow(e) {
      //ловим элемент, по которому кликнули
      let t = e.target || e.srcElement;
      //получаем название тега
      let elm_name = t.tagName.toLowerCase();
      //если это инпут - ничего не делаем
      if(elm_name == 'input') {return false;}
      let val = $(this).html();
      let code = '<input type="text" id="edit" value="'+val+'" />';
      $(this).empty().append(code);
      $('#edit').focus();
      $('#edit').blur(function()  {
        let val = $(this).val();
        $(this).parent().empty().html(val);
      });
  }


$(window).keydown(function(event){
  //ловим событие нажатия клавиши
  if(event.keyCode == 13) { //если это Enter
    $('#edit').blur();  //снимаем фокус с поля ввода
  }
});


class Send extends Component {
	constructor(props){
		super(props);
		this.state={
		  displayedTable:data
		};
		this.onMyClickAddRow = this.onMyClickAddRow.bind(this);
	}
	onMyClickAddRow() {

	    document.getElementById("dyntab").insertRow(-1).innerHTML = '<td>QQ</td><td>qq</td><td>Qq</td>';

	    let t =  document.getElementById("dyntab");
	    let tds = t.getElementsByTagName("td");
	    for (var i=0; i<tds.length; i++){

	        tds[i].addEventListener('click',editRow);
	    }
	}
	render() {
		return (
			<div className="pos-center-block">
				<div className="custom-file">
					<input type="file" className="custom-file-input" id="customFile" accept=".xls, .xls"/>
					<label className="custom-file-label" for="customFile">Выбирите файл</label>
				</div>
				<DynamicTable data={this.state.displayedTable} columns={TABLE_COLUMNS}/>
				<div className="btnAdd">
					<input type="button" className="btn btn-info" onClick={this.onMyClickAddRow} value="Добавить" name="submit"/>
				</div>
				<div className="form-group">
				    <label for="qqqq">Введите сообщение</label>
				    <textarea className="form-control" id="qqqq" rows="5"></textarea>
				    <Link to="/accept"><input type="button" className="btn btn-success" value="Отправить" name="submit"/></Link>
				</div>
			</div>

		);
	}
}

export default Send;

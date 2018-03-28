import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Send extends Component {
  render() {
    return (
      <div class="pos-center-block">

		<div class="custom-file">
			<input type="file" class="custom-file-input" id="customFile" accept=".xls, .xls"/>
			<label class="custom-file-label" for="customFile">Выбирите файл</label>
		</div>

		<table class="table table-bordered table-hover" id="dyntab">
			<thead>
				<tr>
					<th>Фамилия</th>
					<th>Имя</th>
					<th>Номер телефона</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Фамилия</td>
					<td>Имя</td>
					<td>Номер телефона</td>
				</tr>
			</tbody>
		</table>
		<div class="btnAdd">
			<input type="button" class="btn btn-info" onClick="addRow()" value="Добавить" name="submit"/>
		</div>

		<div class="form-group">
		    <label for="qqqq">Введите сообщение</label>
		    <textarea class="form-control" id="qqqq" rows="5"></textarea>
		    <Link to="/accept"><input type="button" class="btn btn-success" value="Отправить" name="submit"/></Link>
		</div>

		
	</div>
	
    );
  }
}

export default Send;

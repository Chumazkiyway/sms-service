import React  from 'react';
import { Link } from 'react-router-dom';
import DynamicTable from './DynamicTable';
const TABLE_COLUMNS = [
    'Фамилия',
    'Имя',
    'Номер телефона',
    'Тим сообщения'
];
class Accept extends React.Component {
            
  constructor(props){
    super(props);
    this.state={
      displayedTable: []
    };
  }

  componentDidMount() {
    /*fetch('/accept')
      .then(res => res.json())
      .then(accept => this.setState({ accept }));
*/
      fetch('/accept')
      .then(res => res.json())
      .then(displayedTable => {        
        this.setState({ displayedTable });
        console.log(this.state.displayedTable);
      });
  }

  send() {
    alert("hi");
  };
  cancel() {
    alert("cancel");
  };
  render() {

    return (
      <div className="pos-center-block">
        <div className="table-responsive">
          <DynamicTable data={this.state.displayedTable} columns={TABLE_COLUMNS} isReadOnly={true} id="acceptTable"/>
        </div>
          <span>Количество смс сообщений: </span><br/>
          <span>Количество viber сообщений: </span><br/>
          <span> Цена отправки одного смс сообщения:  грн</span><br/>
          <span> Цена отправки смс сообщений: грн</span><br/>
          <Link to="/send"><button onClick={this.cancel} className="btn btn-danger my-btn-pos-1">Отменить</button></Link>
          <Link to="/send"><button onClick={this.send} className="btn btn-success my-btn-pos-2">Отправить</button></Link>     
      </div>
    );
  }
}

export default Accept;

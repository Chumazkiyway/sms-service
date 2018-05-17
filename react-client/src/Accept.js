import React  from 'react';
import { Link } from 'react-router-dom';
import DynamicTable from './DynamicTable';
import XLSX from 'xlsx';
import * as queries  from './queries';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const TABLE_COLUMNS = [
    'Фамилия',
    'Имя',
    'Номер телефона',
    'Тим сообщения'
];
class Accept extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }         
  constructor(props){
    super(props);
    this.state={
      displayedTable: []
    };
    this.cancel = this.cancel.bind(this);
    this.send = this.send.bind(this);
  }
  componentWillMount()
  {
    /*let login = sessionStorage.getItem('login',this.state.login);
    let pass = sessionStorage.getItem('pass',this.state.login);
    let isValid = queries.getQueriepostQuerieValidateLogin(login,pass,'/accept');
    console.log(isValid);
    if(!isValid)
      this.history.push('/login');
    else alert('вы не авторезированы!');
    */
  }
  componentDidMount() {

      let subscribers = JSON.parse(sessionStorage.getItem('subscribers'));
      let table = [];
      
      if(subscribers != null) {
        for (let i = 0; i < subscribers.length; i++) {
        table.push([subscribers[i].firstname,subscribers[i].lastname,subscribers[i].phone,subscribers[i].smsType]);
        }
      }
      console.log(table);
      this.setState({displayedTable: table});

      //let workbook = XLSX.readFile('../../data/clients.xlsx');
      //let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      //let data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
      //console.log(data);
  }

  async send(e) {
    e.preventDefault();
    let login = sessionStorage.getItem('login');
    let pass = sessionStorage.getItem('pass');
    let alphaname = 'club_bulk';
    let text = sessionStorage.getItem('text');
    console.log(this.state.displayedTable);
     let user = await queries.postQuerieAccept(this.state.displayedTable,text, login, pass, alphaname);
     if(user){
        this.props.history.push('/send'); 
     }
     else{
      alert('You are not autorized');
     }
  };
  cancel() {
    sessionStorage.removeItem('subscribers');
  };
  render() {
    let cost = sessionStorage.getItem('smsConst');
    let tab = this.state.displayedTable, 
        totalPrice = 0;
    if(tab != null){
      totalPrice =  tab.length* cost;
    }

    return (
      <div className="pos-center-block">
        <div className="table-responsive">
          <DynamicTable data={tab} columns={TABLE_COLUMNS} isReadOnly={true} id="acceptTable"/>
        </div>
          <span>Количество смс сообщений: </span><br/>
          <span>Количество viber сообщений: </span><br/>
          <span> Цена отправки одного смс сообщения: {cost}грн</span><br/>
          <span> Цена отправки смс сообщений: {totalPrice}грн</span><br/>
          <Link to="/send"><button onClick={this.cancel} className="btn btn-danger my-btn-pos-1">Отменить</button></Link>
          <Link to="/send"><button onClick={this.send} className="btn btn-success my-btn-pos-2">Отправить</button></Link>     
      </div>
    );
  }
}

export default withRouter(Accept);

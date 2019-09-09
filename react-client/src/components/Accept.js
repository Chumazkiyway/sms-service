import React  from 'react';
import { Link } from 'react-router-dom';
import DynamicTable from '../utils/DynamicTable';
import XLSX from 'xlsx';
import * as queries  from '../js/queries';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const TABLE_COLUMNS = [
    'Lastname',
    'Firstname',
    'Phone'
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
    componentDidMount() {

        let subscribers = JSON.parse(sessionStorage.getItem('subscribers'));
        let table = [];
        
        if(subscribers != null) {
        for (let i = 0; i < subscribers.length; i++) {
        table.push([subscribers[i].firstname,subscribers[i].lastname,subscribers[i].phone]);
        }
        }
        this.setState({displayedTable: table});
    }

    async send(e) {
        e.preventDefault();

        let login = sessionStorage.getItem('login');
        let pass = sessionStorage.getItem('pass');
        let alphaname = sessionStorage.getItem('alphaname');;
        let text = sessionStorage.getItem('text');
        let token = sessionStorage.getItem('token');
        console.log(text);

        let user = await queries.postQuerieAccept(this.state.displayedTable,text, login, pass, alphaname,token);
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
        let balance = sessionStorage.getItem('balance');
        return (
            <div>
            <div className="pos-center-block">
            <h6>Balance: {balance} uah</h6>
                <div className="table-responsive">
                <DynamicTable data={tab} columns={TABLE_COLUMNS} isReadOnly={true} id="acceptTable"/>
                </div>
                <span> Цена отправки одного смс сообщения: {cost}грн</span><br/>
                <span> Цена отправки смс сообщений: {totalPrice}грн</span><br/>
                <Link to="/send"><button onClick={this.cancel} className="btn btn-danger my-btn-pos-1">Cancel</button></Link>
                <Link to="/send"><button onClick={this.send} className="btn btn-success my-btn-pos-2">Submit</button></Link>
            </div>
            </div>
        );
    }
}

export default withRouter(Accept);

import React from 'react';
const DynamicTableHeader = ({columns}) => {
  return(
    <thead>
      <tr>
        {columns.map((element, index) =>
          <th key={index}>{element}</th>
        )}
      </tr>
    </thead>
  )
}
class DynamicTableBody extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data: this.props.data,
      isReadOnly: this.props.isReadOnly
    };   
  }
  onChangeTableElement(i, j, e) {
    let table = this.props.data;
    table[i][j] = e.target.value;
    
    this.setState({data: table});
  }
  render(){
    let isReadOnly = this.state.isReadOnly;
    return(
      <tbody>
        {this.props.data.map((element, i) =>
          isReadOnly ?
          <tr key={i}>
            {element.map((item, j) =>
              <td key={j}>{item}</td>
            )}
          </tr>
          :
          <tr key={i}>

            {element.map((item, j) =>
              <td key={j}><input className="form-control" type="text" id={i.toString()+' '+j.toString()} 
              defaultValue={item} onChange={this.onChangeTableElement.bind(this, i, j)} ></input></td>
            )}
          </tr>
        )}
      </tbody>
    );
  }
}

export default class DynamicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [],
      isReadOnly: this.props.isReadOnly
    }
  }

  componentWillMount() {
    const { data, columns, id } = this.props;
    this.setState({ data, columns, id })
  }

  componentWillReceiveProps(nextProps) {
    const { data, columns } = nextProps;
    this.setState({ data, columns })
  }

  render() {
	  return (
	    <table className="table table-bordered table-hover table-light" id={this.state.id}>
	      <DynamicTableHeader columns={this.state.columns} />
	      <DynamicTableBody isReadOnly={this.state.isReadOnly} data={this.state.data} />
	    </table>
	  );
	}
}
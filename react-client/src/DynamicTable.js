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
const DynamicTableBody = ({data}) => {
  return(
    <tbody>
      {data.map((element, index) =>
        <tr key={index}>
          {element.map((item, i) =>
            <td key={i}>{item}</td>
          )}
        </tr>
      )}
    </tbody>
  )
}

export default class DynamicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [],
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
	    <table className="table table-bordered table-hover" id={this.state.id}>
	      <DynamicTableHeader columns={this.state.columns} />
	      <DynamicTableBody data={this.state.data} />
	    </table>
	  );
	}
}
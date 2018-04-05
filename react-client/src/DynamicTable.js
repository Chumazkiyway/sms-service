import React from 'react';
const SortableHeader = ({columns}) => {
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
{/*this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )*/}
const SortableBody = ({data}) => {
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

export default class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [],
    }
  }

  componentWillMount() {
    const { data, columns } = this.props;
    this.setState({ data, columns })
  }

  componentWillReceiveProps(nextProps) {
    const { data, columns } = nextProps;
    this.setState({ data, columns })
  }

  render() {
	  return (
	    <table className="table table-bordered table-hover" id="dyntab">
	      <SortableHeader columns={this.state.columns} />
	      <SortableBody data={this.state.data} />
	    </table>
	  );
	}
}
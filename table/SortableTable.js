import React from 'react';
const SortableHeader = (props) => {
  return(
    <thead>
      <tr>
        {TABLE_COLUMNS.map((element, index) =>
          <th key={index}>{element.label}</th>
        )}
      </tr>
    </thead>
  )
}

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


class SortableTable extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  };

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
    this.setState({ data,columns })
  }

  render() {
	  return (
	    <table className="table table-bordered table-hover">
	      <SortableHeader columns={this.state.columns} />
	      <SortableBody data={this.state.data} />
	    </table>
	  );
	}
}
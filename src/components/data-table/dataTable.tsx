import * as React from 'react';

import './dataTable.scss'

interface myProps{
	rowData:any,
	columnInfo: any,
}

class DataTable extends React.Component<myProps, any>{
	constructor(props){
		super(props);

		this.state = {
			columnInfo: this.props.columnInfo,
			rowData: this.props.rowData,
		};

		this.createHeaders = this.createHeaders.bind(this);
		this.createRows = this.createRows.bind(this);
		this.createRowData = this.createRowData.bind(this);
	}

	createHeaders(){
		return this.state.columnInfo.map(column => <th key={column.header}>{column.header}</th>)
	}

	createRowData(rowObj){
		return this.state.columnInfo.map((column , value) =>{
			return <td key={`${rowObj._id}${value}`}>{rowObj[column.property]}</td>
		})
	}

	createRows(){
		return this.state.rowData.map(rowObj =>
			<tr key={rowObj._id}>
				{this.createRowData(rowObj)}
			</tr>
		)
	}

	render(){

		return(
			<div>I'm the DataTable Component
				<table className="data-table">
					<tbody>
						<tr key="headers">
							{this.createHeaders()}
						</tr>
						{this.createRows()}
					</tbody>
				</table>
			</div>
		)
	}
}

export default DataTable;
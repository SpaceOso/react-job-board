import * as React from 'react';

import './dataTable.scss'

interface myProps{
	rowData:any,
	columnInfo: any,
	handleClick: any
	totalRows?: number

}

class DataTable extends React.Component<myProps, any>{
	constructor(props){
		super(props);

		this.state = {
			columnInfo: this.props.columnInfo,
			rowData: this.props.rowData,
			totalRows: 5
		};

		this.createHeaders = this.createHeaders.bind(this);
		this.createRows = this.createRows.bind(this);
		this.createRowData = this.createRowData.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	createHeaders(){
		return this.state.columnInfo.map(column => <th key={column.header}>{column.header}</th>)
	}

	createRowData(rowObj){
		return this.state.columnInfo.map((column , value) =>{
			return <td key={`${rowObj._id}${value}`}>{rowObj[column.property]}</td>
		})
	}

	onClick(dataObj){
		this.props.handleClick(dataObj);
	}

	createRows(){
		return this.state.rowData.map((rowObj, index) => {
			//TODO need to paginate this component by creating a prop that handles how many pages there should be per data table
			//TODO learn why passing a blank function worked instead of passing rowOBJ in the first parameter
			if(index > this.state.totalRows){
				console.log("we should have created another page!!!");
			}

			return (
				<tr key={rowObj._id} onClick={() => this.onClick(rowObj)}>
					{this.createRowData(rowObj)}
				</tr>
			)
		})
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
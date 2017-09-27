import * as React from 'react';

import './dataTable.scss'
import DataTableNavigation from "./navigation/dataTableNavigation";

interface myProps{
	rowData:any,
	columnInfo: any,
	handleClick: any
	totalRows: number,
	pages?: any[],


}

class DataTable extends React.Component<myProps, any>{
	constructor(props){
		super(props);

		this.state = {
			pages:[],
			currentPage: 0,
			activeDataRow: ''
		};

		console.log("DataTable initilized");
		this.createHeaders = this.createHeaders.bind(this);
		this.createRows = this.createRows.bind(this);
		this.createRowData = this.createRowData.bind(this);
		this.onClick = this.onClick.bind(this);
		this.changeCurrentPage = this.changeCurrentPage.bind(this);
	}

	componentDidMount(){
		//set to the total rows displayed per page
		let innerCount = this.props.totalRows;
		let totalPages = 0;
		let pageList:any[] = [];
		//pageList will contain an array of dataObjs to be displayed per page
		pageList[totalPages] = [];
		this.props.rowData.map((dataObj, index) => {
			pageList[totalPages].push(dataObj);
			if(index === innerCount - 1){
				innerCount += this.props.totalRows;
				if(this.props.rowData.length - 1 > index){
					totalPages += 1;
					pageList[totalPages] = [];
				}
			}
		});

		this.setState({pages: pageList});
	}

	createHeaders(){
		return this.props.columnInfo.map(column => <th key={column.header}>{column.header}</th>)
	}

	createRowData(rowObj){
		return this.props.columnInfo.map((column , value) =>{
			return <td  key={`${rowObj.id}${value}`}>{rowObj[column.property]}</td>
		})
	}

	changeCurrentPage(newPage: number | string){
		let currentPage = this.state.currentPage;

		if(typeof newPage === 'string'){
			if(newPage === 'next'){
				currentPage += 1;
			} else if(newPage === 'prev'){
				currentPage -= 1;
			}
			if(currentPage >= 0 && currentPage < this.state.pages.length){
				this.setState({currentPage})
			} else {
				console.log("we blocked from loading a page outside of scope");
			}
		} else {
			this.setState({currentPage: newPage});
		}


	}

	onClick(dataObj, event){
		this.props.handleClick(dataObj);
		this.setState({activeDataRow: dataObj});
	}

	createRows(){

		if(this.state.pages.length <= 0){
			return;
		}

		return this.state.pages[this.state.currentPage].map((rowObj, index) => {
			//TODO need to paginate this component by creating a prop that handles how many pages there should be per data table
			//TODO learn why passing a blank function worked instead of passing rowOBJ in the first parameter
			if(index > this.state.totalRows){
				console.log("we should have created another page!!!");
			}

			return (
				<tr className={rowObj.id  === this.state.activeDataRow.id  ? 'selected' : 'data-row'} key={rowObj._id} onClick={(event) => this.onClick(rowObj, event)}>
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
				<DataTableNavigation
					currentPage={this.state.currentPage}
					totalPages={this.state.pages.length}
					updatePage={this.changeCurrentPage}
				/>
			</div>
		)
	}
}

export default DataTable;
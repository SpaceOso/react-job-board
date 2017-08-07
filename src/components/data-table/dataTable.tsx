import * as React from 'react';

import './dataTable.scss'

// const myState = {
// 	headers: [],
// 	columnData
// };

class DataTable extends React.Component<any, any>{
	constructor(props){
		super(props);

		this.state = {
			headers: ['Job Name', 'Job Description', 'Post Date', 'Applicants'],
			columnData: [
				{
					name: "first job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the content inside"
				},
				{
					name: "second job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the second content"
				},
				{
					name: "third job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the third content"
				},
				{
					name: "fourth job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the fourth content"
				},
				{
					name: "fifth job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the second rown content inside"
				},
				{
					name: "sixth job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the second row second content"
				},
				{
					name: "7th job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the second row third content"
				},
				{
					name: "8th job",
					postDate: 'monday',
					applicants: 0,
					jobDescription: "I'm the second row fourth content"
				}
			]
		};

		this.createHeaders = this.createHeaders.bind(this);
		this.createRows = this.createRows.bind(this);
	}

	createHeaders(){
		return this.state.headers.map(header => <th key={header}>{header}</th>)
	}

	createRows(){
		return this.state.columnData.map(job =>
			<tr key={job.name}>
				<td >{job.name}</td>
				<td >{job.jobDescription}</td>
				<td >{job.applicants}</td>
				<td >{job.postDate}</td>
			</tr>
		)
	}

	render(){

		// this.createRows();
		return(
			<div>I'm the DataTable Component
				<table className="data-table">
					<tbody>
						<tr>
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
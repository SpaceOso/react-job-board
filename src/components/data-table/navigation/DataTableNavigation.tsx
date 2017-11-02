import * as React from 'react';

import "./DataNavigation.scss";

interface myProps{
	currentPage: number,
	totalPages: number
	updatePage: (newPage) => void,
}

interface myState{
	thisSection?: number,
	totalSections?: number,
	activePage?: number
}


class DataTableNavigation extends React.Component<myProps, myState>{
	constructor(props) {
		super(props);

		this.state = {
			thisSection: 0,
			totalSections: 0,
			// activePage: 0
		};

		this.createButtons = this.createButtons.bind(this);
	}

	handleClick(event){
		console.log("button has been clicked", event);
		// this.setState({activePage: event});
		this.props.updatePage(event);
	}

	createPrevButton(){
		return (
			<div key={'prev-btn'}
			     className="data-nav-button"
				onClick={ () => this.handleClick('prev')}>
				{"<"}
			</div>)
	}

	createNextButton(){
		return (
			<div
				className="data-nav-button"
				key={'next-btn'}
				onClick={() => this.handleClick('next')}>
				{">"}
			</div>
		)
	}

	createButtons(){
		let pageButtons:any = [];

		//TODO need to check if wee need to add '...' buttons to skip more than a page at a time
		if(this.props.totalPages > 4 ){
			//then we should add '...' buttons to skip to the 5th page
		}

		pageButtons.push(this.createPrevButton());


		for(let i = 0; i < this.props.totalPages; i++){
			pageButtons.push(<div
				key={`page-${i}`}
				onClick={() => this.handleClick(i)}
				className={this.props.currentPage === i ? "data-nav-button active" : "data-nav-button"}>
				{i + 1}
				</div>)
		}

		pageButtons.push(this.createNextButton());

		return pageButtons;
	}

	render(){
		return(
			<div>
				I'm the data table navigation
				totalPages: {this.props.totalPages}
				on page right now: {this.props.currentPage}
				<div className="data-nav-container">
					{this.createButtons()}
				</div>
			</div>
		)
	}
}

export default DataTableNavigation;
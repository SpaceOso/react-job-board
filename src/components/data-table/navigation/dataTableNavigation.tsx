import * as React from 'react';

interface myProps{
	currentPage: number,
	totalPages: number
}

interface myState{
	thisSection?: number,
	totalSections?: number
}


class DataTableNavigation extends React.Component<myProps, myState>{
	constructor(props) {
		super(props);

		this.state = {
			thisSection: 0,
			totalSections: 0
		};

		this.createButtons = this.createButtons.bind(this);
	}

	createButtons(){
		let pageButtons:any = [];

		//TODO need to check if wee need to add '...' buttons to skip more than a page at a time
		if(this.props.totalPages > 4 ){
			//then we should add '...' buttons to skip to the 5th page
		}

		for(let i = 0; i < this.props.totalPages; i++){
			pageButtons.push(<div key={`page-${i}`} className="data-nav-button">{i}</div>)
		}

		return pageButtons;
	}

	render(){
		return(
			<div>
				I'm the data table navigation
				totalPages: {this.props.totalPages}
				on page right now: {this.props.currentPage}
				<div className="data-nav-container">
					{this.createButtons()};
				</div>
			</div>
		)
	}
}

export default DataTableNavigation;
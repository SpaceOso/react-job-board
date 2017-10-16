import * as React from 'react';

interface MyProps{
	list: any[],
	totalLists: number,
}

class DropDownComponent extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				I'm the drop down component;
				<select name="select">
					<option value="value1">Value 1</option>
					<option value="value2" selected>Value 2</option>
					<option value="value3">Value 3</option>
				</select>
			</div>
		)
	}
};

export default DropDownComponent
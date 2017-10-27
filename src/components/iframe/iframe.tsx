import * as React from 'react';

interface MyProps{
	src: string,
	height: string,
	width: string
}

class Iframe extends React.Component<MyProps>{
	render(){
		return(
			<div>
				<object data={this.props.src} height={this.props.height} width={this.props.width}/>
			</div>
		)
	}
}

export default Iframe;
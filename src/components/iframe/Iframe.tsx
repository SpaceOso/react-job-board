import * as React from 'react';

interface MyProps {
  src: string;
  height: string | undefined;
  width: string;
}

class Iframe extends React.Component<MyProps> {
  render() {
    return (
      <div>
        I should be display the resume with: {this.props.src}
        <object
          data={this.props.src}
          height={this.props.height}
          width={this.props.width}
          style={{ height: this.props.height }}
        />
      </div>
    );
  }
}

export default Iframe;
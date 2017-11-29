import * as React from 'react';

import './DataTable.scss';
import DataTableNavigation from './navigation/DataTableNavigation';

interface MyProps {
  rowData: any;
  columnInfo: any;
  handleClick: any;
  totalRows: number;
  specialClasses: any | null;
  itemId: string;
}

interface MyState {
  pages: any[];
  currentPage: number;
  activeDataRow: any;
}

class DataTable extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      currentPage: 0,
      activeDataRow: '',
    };

    console.log('DataTable initilized');
    this.createHeaders = this.createHeaders.bind(this);
    this.createRows = this.createRows.bind(this);
    this.createRowData = this.createRowData.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  componentDidMount() {
    this.setPages();
  }

  setPages() {
    // set to the total rows displayed per page
    let innerCount = this.props.totalRows;
    let totalPages = 0;
    const pageList: any[] = [];
    // pageList will contain an array of dataObjs to be displayed per page
    pageList[ totalPages ] = [];
    this.props.rowData.map((dataObj, index) => {

      pageList[ totalPages ].push(dataObj);

      if (index === innerCount - 1) {
        innerCount += this.props.totalRows;
        if (this.props.rowData.length - 1 > index) {
          totalPages += 1;
          pageList[ totalPages ] = [];
        }
      }
    });
    // console.log('total pages:', pageList.length);
    this.setState({ pages: pageList.slice(0) });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('data table got new props:', nextProps);
    if (nextProps.itemId !== this.props.itemId) {
      this.setPages();
    }
  }

  createHeaders() {
    // console.log('data table create Headers is updating');
    return this.props.columnInfo.map(column => <th key={column.header}>{column.header}</th>);
  }

  createRowData(rowObj) {
    // console.log(this.props.columnInfo);
    return this.props.columnInfo.map((column, value) => {
      if (column.join !== undefined && column.join === true) {

        const combinedDataArr: string[] = [];
        for (let i = 0; i < column.properties.length; i += 1) {

          // TODO need to implement this, this checks to see if the property is nested 'location.city'
          /*	if(column.properties[i].includes('.')){
              let dividedString = column.properties[i].split('.');
              let key = dividedString[0];
              let value = dividedString[1];
              combinedDataArr.push(rowObj[key]);
            }*/
          combinedDataArr.push(rowObj[ column.properties[ i ] ]);
        }
        return <td key={`${rowObj.id}${value}`}>{combinedDataArr.join(' ')}</td>;

      }

      return <td key={`${rowObj.id}${value}`}>{rowObj[ column.property ]}</td>;
    });
  }

  changeCurrentPage(newPage: number | string) {
    // console.log('dataTable changeCurrentPage:', newPage);
    let currentPage = this.state.currentPage;

    if (typeof newPage === 'string') {
      if (newPage === 'next') {
        currentPage += 1;
      } else if (newPage === 'prev') {
        currentPage -= 1;
      }
      if (currentPage >= 0 && currentPage < this.state.pages.length) {
        this.setState({ currentPage });
      } else {
        console.log('we blocked from loading a page outside of scope');
      }
    } else {
      console.log('dataTable setting state: currentPage:', newPage);
      this.setState({ currentPage: newPage });
    }
  }

  onClick(dataObj, event) {
    this.props.handleClick(dataObj);
    this.setState({ activeDataRow: dataObj });
  }

  createRows() {
    if (this.state.pages.length <= 0) {
      console.log('pages was less than 0');
      return;
    }

    return this.state.pages[ this.state.currentPage ].map((rowObj, index) => {
      // TODO need to paginate this component by creating a prop that handles how many pages there should be per data table
      if (index > this.props.totalRows) {
        console.log('we should have created another page!!!');
      }

      let specialClassName = '';

      // if there is a special class it will add it to every row whos
      // property matches the specialClass key
      if (this.props.specialClasses !== null) {
        specialClassName = this.props.specialClasses[ rowObj.interest ];
      }

      return (
        <tr
          className={rowObj.id === this.state.activeDataRow.id ? `selected ${specialClassName}` : `data-row ${specialClassName}`}
          key={rowObj.id}
          onClick={(event) => this.onClick(rowObj, event)}
        >
          {this.createRowData(rowObj)}
        </tr>
      );
    });
  }

  render() {

    return (
      <div>
        <table className="data-table">
          <tbody>
          <tr key="headers">
            {this.createHeaders()}
          </tr>
          {this.createRows()}
          </tbody>
        </table>
        {this.state.pages.length > 1 ? <DataTableNavigation currentPage={this.state.currentPage} totalPages={this.state.pages.length} updatePage={this.changeCurrentPage}/> : null}
      </div>
    );
  }
}

export default DataTable;

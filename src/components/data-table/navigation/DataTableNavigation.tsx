import * as React from 'react';

import './DataNavigation.scss';

interface MyProps {
  currentPage: number;
  totalPages: number;
  updatePage: (newPage) => void;
}

interface MyState {
  thisSection?: number;
  currentSection: number;
  totalSections: number;
  activePage?: number;
  totalPageButtons: any[] | null;
}

class DataTableNavigation extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      thisSection: 0,
      currentSection: 0,
      totalPageButtons: null,
      totalSections: 0,
      activePage: this.props.currentPage,
    };

    this.createButtons = this.createButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createPageButtonSections = this.createPageButtonSections.bind(this);
    this.updateSection = this.updateSection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('will recieve:', nextProps);
    if (nextProps.totalPages !== this.props.totalPages) {
      this.setState({ totalSections: this.props.totalPages / 4 });
    }
    if (nextProps.currentPage !== this.props.currentPage) {
      console.log('setting a new currentPage');
      this.createPageButtonSections();
      // this.setState({ activePage: nextProps.currentPage });
    }
  }

  updateSection() {
    console.log('section updating()');
    const newSection = this.state.currentSection + 1;
    this.setState({ currentSection: newSection });
  }

  componentDidMount() {
    this.createPageButtonSections();
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('button has been clicked', event.currentTarget.id);
    const id = parseInt(event.currentTarget.id, 0);

    if (Number.isNaN(id)) {
      this.props.updatePage(event.currentTarget.id);
    } else {
      this.props.updatePage(id);
    }
    // this.createPageButtonSections();
  }

  createPrevButton() {
    return (
      <div
        key={'prev-btn'}
        id={'prev'}
        className="data-nav-button"
        onClick={this.handleClick}
      >
        <i className="fa fa-arrow-left" aria-hidden="true"/>
        Prev
      </div>);
  }

  createNextButton() {
    return (
      <div
        className="data-nav-button"
        key={'next-btn'}
        id={'next'}
        onClick={this.handleClick}
      >
        Next
        <i className="fa fa-arrow-right" aria-hidden="true"/>
      </div>
    );
  }

  createNextSectionButton() {
    return (
      <div
        className={'data-nav-button'}
        key={'section-btn'}
        id={'section-next'}
        onClick={this.updateSection}
      >
        ...
      </div>
    );
  }

  createPageButtonSections() {
    if (this.props.totalPages <= 1) {
      return null;
    }
    const pageButtons: any[][] = [];
    console.log('sections:', this.state.totalSections);
    console.log('this section', this.state.thisSection);
    console.log('activePage', this.props.currentPage);

    let sectionCount = 0;
    let pageCount = 0;
    pageButtons[sectionCount] = [];
    for (let i = 0; i < this.props.totalPages; i++) {
      console.log('does activePage match i', this.state.activePage === i, i);
      pageButtons[sectionCount].push(
        <div
          key={`page-${i}`}
          id={`${i}`}
          onClick={this.handleClick}
          className={this.props.currentPage === i ? 'data-nav-button active' : 'data-nav-button'}
        >
          {this.props.currentPage === i ? 'T' : i + 1}
        </div>,
      );
      pageCount = pageCount + 1;
      if (pageCount >= 4) {
        pageCount = 0;
        sectionCount = sectionCount + 1;
        pageButtons[sectionCount] = [];
      }
    }
    console.log('adding to state:', pageButtons);
    // this.setState({ totalPageButtons: pageButtons.slice() });
    return pageButtons;
  }

  createButtons() {
    if (this.props.totalPages <= 1) {
      return null;
    }
    const prevButtonSet: any = [];
    const nextButtonSet: any = [];
    const pageButtons = this.createPageButtonSections();
    prevButtonSet.push(this.createPrevButton());

    // TODO need to check if we need to add '...' buttons to skip more than a page at a time
    if (this.props.totalPages > 4) {
      // then we should add '...' buttons to skip to the 5th page
      nextButtonSet.push(this.createNextSectionButton());
    }

    /**
     * This creates the next page button
     */
    nextButtonSet.push(this.createNextButton());

    if (pageButtons !== null) {
      return prevButtonSet.concat(pageButtons[this.state.currentSection], nextButtonSet);
    }

    // return null;
  }

  render() {
    return (
      <div className="data-nav-container">
        {this.createButtons()}
      </div>
    );
  }
}

export default DataTableNavigation;

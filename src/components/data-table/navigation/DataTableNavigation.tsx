import * as React from 'react';

import './DataNavigation.scss';
import HTML = Mocha.reporters.HTML

interface MyProps {
  currentPage: number;
  totalPages: number;
  updatePage: (newPage) => void;
}

interface MyState {
  currentSection: number;
  totalSections: number;
  activePage?: number;
  totalPageButtons: any[] | null;
}

class DataTableNavigation extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      currentSection: 0,
      totalPageButtons: null,
      totalSections: 0,
      activePage: this.props.currentPage,
    };

    this.createButtons = this.createButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createPageButtonSections = this.createPageButtonSections.bind(this);
    this.updateSection = this.updateSection.bind(this);
    this.cratePrevSectionButton = this.cratePrevSectionButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('will recieve:', nextProps);
    if (nextProps.totalPages !== this.props.totalPages && nextProps.totalPages !== 0) {
      this.setState({ totalSections: this.props.totalPages / 4 });
    }

    if (nextProps.currentPage !== this.state.activePage) {
      console.log("the current page is changing");
    }
  }

  updateSection = (event: React.MouseEvent<HTMLElement>) => {
    const eventId: string = event.currentTarget.id;
    const currentSection: number = this.state.currentSection;
    if (eventId === 'section-next') {
      this.setState({ currentSection: currentSection + 1 });
    }
    if (eventId === 'section-prev') {
      this.setState({ currentSection: currentSection - 1 });
    }
  }

  componentDidMount() {
    // this.createPageButtonSections();
    this.setState({ totalSections: this.props.totalPages / 4 });
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = parseInt(event.currentTarget.id, 0);

    if (Number.isNaN(id)) {
      this.props.updatePage(event.currentTarget.id);
    } else {
      this.props.updatePage(id);
    }
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

  // TODO tie this up
  cratePrevSectionButton() {
    return (
      <div
        className={'data-nav-button'}
        key={'section-prev-btn'}
        id={'section-prev'}
        onClick={this.updateSection}
      >
        ...
      </div>
    );
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
    let sectionCount = 0;
    let pageCount = 0;
    pageButtons[sectionCount] = [];

    for (let i = 0; i < this.props.totalPages; i++) {
      pageButtons[sectionCount].push(
        <div
          key={`page-${i}`}
          id={`${i}`}
          onClick={this.handleClick}
          className={this.props.currentPage === i ? 'data-nav-button active' : 'data-nav-button'}
        >
          {i + 1}
        </div>,
      );

      pageCount = pageCount + 1;
      if (pageCount >= 4) {
        pageCount = 0;
        sectionCount = sectionCount + 1;
        pageButtons[sectionCount] = [];
      }
    }
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

    /**
     * This checks if we need a previous section and if we should display it
     */
    if (this.state.totalSections > 1 && this.state.currentSection !== 0) {
      prevButtonSet.push(this.cratePrevSectionButton());
    }

    /**
     * This will add the next ... button
     */
    if (this.props.totalPages > 4) {
      nextButtonSet.push(this.createNextSectionButton());
    }

    /**
     * This creates the next page button
     */
    nextButtonSet.push(this.createNextButton());

    if (pageButtons !== null) {
      return prevButtonSet.concat(pageButtons[this.state.currentSection], nextButtonSet);
    }

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

/**
 * Copyright © 2018 Elastic Path Software Inc. All rights reserved.
 *
 * This is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this license. If not, see
 *
 *     https://www.gnu.org/licenses/
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import { login } from '../utils/AuthService';
import ProductListMain from './productlist.main';
import ProductListPaginationTop from './productlistpaginationtop.main';
import ProductListPaginationBottom from './productlistpaginationbottom.main';
import cortexFetch from '../utils/Cortex';

const Config = require('Config');

// Array of zoom parameters to pass to Cortex
const zoomArray = [
  'element',
  'element:availability',
  'element:definition',
  'element:definition:assets:element',
  'element:price',
  'element:rate',
  'element:code',
];

let searchForm;

class SearchResultsItemsMain extends React.Component {
  static propTypes = {
    searchKeywordsProps: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { searchKeywordsProps } = this.props;
    this.state = {
      searchResultsModel: { links: [] },
      searchKeywords: searchKeywordsProps,
    };
  }

  componentDidMount() {
    const { searchKeywordsProps } = this.props;
    this.getSearchData(searchKeywordsProps);
  }

  componentWillReceiveProps(nextProps) {
    const { searchKeywords } = this.state;
    if (searchKeywords !== nextProps.searchKeywordsProps) {
      this.getSearchData(nextProps.searchKeywordsProps);
    }
  }

  getSearchData(searchKeywordsProps) {
    login().then(() => {
      cortexFetch('/?zoom=searches:keywordsearchform',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(`${Config.cortexApi.scope}_oAuthToken`),
          },
        })
        .then(res => res.json())
        .then((res) => {
          searchForm = res._searches[0]._keywordsearchform[0].links.find(link => link.rel === 'itemkeywordsearchaction').uri;
        }).then(() => {
          cortexFetch(`${searchForm}?zoom=${zoomArray.join()}&followlocation`,
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem(`${Config.cortexApi.scope}_oAuthToken`),
              },
              body: JSON.stringify({
                keywords: searchKeywordsProps,
              }),
            })
            .then(res => res.json())
            .then((res) => {
              this.setState({
                searchResultsModel: res,
                searchKeywords: searchKeywordsProps,
              });
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error(error.message);
            });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error.message);
        });
    });
  }

  render() {
    const { searchKeywordsProps } = this.props;
    const { searchResultsModel, searchKeywords } = this.state;
    if (searchResultsModel.links.length > 0 && searchKeywords === searchKeywordsProps) {
      return (
        <div className="category-items-container container">
          <div data-region="categoryTitleRegion" style={{ display: 'block' }}>
            <div>
              <h1 className="view-title">
                {intl.get('search-results')}
              </h1>
            </div>
          </div>
          <ProductListPaginationTop paginationDataProps={searchResultsModel._items ? searchResultsModel._items[0] : searchResultsModel} />
          <ProductListMain productData={searchResultsModel._items ? searchResultsModel._items[0] : searchResultsModel} />
          <ProductListPaginationBottom paginationDataProps={searchResultsModel._items ? searchResultsModel._items[0] : searchResultsModel} />
        </div>
      );
    }
    if (searchResultsModel.links.length === 0 && searchResultsModel.pagination && searchKeywords === searchKeywordsProps) {
      return (
        <div className="category-items-container container">
          <div data-region="categoryTitleRegion" style={{ display: 'block' }}>
            <div>
              <h1 className="view-title">
                {intl.get('search-results')}
              </h1>
            </div>
          </div>
          <br />
          <div data-region="categoryTitleRegion" style={{ display: 'block' }}>
            <div>
              <h3>
                {intl.get('no-results-found')}
              </h3>
            </div>
          </div>
        </div>
      );
    }

    return (<div className="loader" />);
  }
}

export default SearchResultsItemsMain;

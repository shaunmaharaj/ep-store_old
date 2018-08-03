/**
 * Copyright © 2018 Elastic Path Software Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */

import React from 'react';
import intl from 'react-intl-universal';
import AppHeaderMain from '../components/appheader.main';
import AppFooterMain from '../components/appfooter.main';

function ContactUsPage() {
  return (
    <div className="viewport ui-container static-ui-container" data-region="viewPortRegion" style={{ display: 'block' }}>
      <div>
        <AppHeaderMain />
        <div className="app-main static-contant-container" data-region="appMain" style={{ display: 'block' }}>
          <div>
            <div className="static-container container">
              <div className="static-container-inner">
                <div className="static-title-container" style={{ display: 'block' }}>
                  <div>
                    <h1 className="view-title">
                      {intl.get('contact-us')}
                    </h1>
                  </div>
                </div>
                <div className="static-main-container" style={{ display: 'block' }}>
                  <div className="static-container">
                    <span className="static-message">
                      {/* eslint-disable-next-line max-len */}
                      {intl.get('contact-us-content')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppFooterMain />
      </div>
    </div>
  );
}

export default ContactUsPage;

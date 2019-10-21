/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { I18nContext } from 'ui/i18n';
import { EuiErrorBoundary } from '@elastic/eui';

import { MonitoringRouter } from './router/router';


const ScrollToTop = () => {
  React.useEffect(() => void window.scrollTo(0, 0));
  return null;
};

export const App: React.FC = () => {
  return (
    <EuiErrorBoundary>
      <I18nContext>
        <MonitoringRouter />
      </I18nContext>
    </EuiErrorBoundary>
  );
};
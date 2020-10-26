import * as React from 'react';
import isNil from '../../../utils/isNil';

export const renderFooter = (footer: React.ReactNode) =>
  isNil(footer) ? null : <div className="zent-drawer-footer">{footer}</div>;

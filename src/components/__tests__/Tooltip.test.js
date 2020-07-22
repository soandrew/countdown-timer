import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Tooltip from '../Tooltip';

const insertStyle = (node, css) => {
  const document = node.ownerDocument;
  const style = document.head.appendChild(document.createElement('style'));
  style.textContent = css;
};

const toggleStyle = (node, css) => {
  const document = node.ownerDocument;
  const style = document.createElement('style');
  style.textContent = css;
  return [
    document.head.appendChild.bind(document.head, style),
    document.head.removeChild.bind(document.head, style)
  ];
};

describe('<Tooltip />', () => {
  it('should render a focusable element with correct description and content', () => {
    const props = {
      title: 'UTC-05:00',
      id: 'zone-info',
    };
    const tooltipToggle = render(<Tooltip {...props}>Toronto, Canada</Tooltip>)
      .getByText('Toronto, Canada');

    expect(tooltipToggle)
      .toHaveDescription(props.title)
      .not.toHaveFocus();

    userEvent.tab();

    expect(tooltipToggle).toHaveFocus();
  });

  describe('when hover-unhover or focus-unfocus', () => {
    it('should toggle a popup with the correct content', () => {
      const props = {
        title: 'UTC-05:00',
        id: 'zone-info',
      };
      const view = render(<Tooltip {...props}>Toronto, Canada</Tooltip>);
      // Insert styles from ../Tooltip.module.scss and emulate toggling of pseudo-states
      insertStyle(view.container, '.Tooltip > [role="tooltip"] { display: none; }');
      const [hover, unhover] = toggleStyle(view.container, '.Tooltip > [role="tooltip"] { display: block; }');

      expect(view.queryByText(props.title)).not.toBeVisible();

      hover();

      expect(view.getByText(props.title)).toBeVisible();
      
      unhover();

      expect(view.queryByText(props.title)).not.toBeVisible();
    });
  });
});

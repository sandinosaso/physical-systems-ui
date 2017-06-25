import React from 'react';
import { shallow } from 'enzyme';

import MapOverlay from '../index';

describe('<MapOverlay />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = shallow(<MapOverlay />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<MapOverlay />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should have a hidden attribute', () => {
    const renderedComponent = shallow(<MapOverlay hidden={false} />);
    expect(renderedComponent.prop('hidden')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<MapOverlay id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<MapOverlay attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});

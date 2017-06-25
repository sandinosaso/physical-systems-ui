import React from 'react';
import { shallow } from 'enzyme';

import GoogleMap from '../index';

describe('<GoogleMap />', () => {
  it('should render a Map', () => {
    const children = (<div className="mapContainer" />);
    const renderedComponent = shallow(
      <GoogleMap googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key='} loadingElement={<div />}>
        {children}
      </GoogleMap>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should have a googleMapURL and a loadingElement attributes', () => {
    const renderedComponent = shallow(<GoogleMap googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key='} loadingElement={<div />} />);
    expect(renderedComponent.prop('googleMapURL')).toBeDefined();
    expect(renderedComponent.prop('loadingElement')).toBeDefined();
  });
});

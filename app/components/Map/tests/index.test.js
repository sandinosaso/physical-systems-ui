import React from 'react';
import { shallow } from 'enzyme';

import Map from '../index';

describe('<Map />', () => {
  it('should render a Map', () => {
    const children = (<div className="mapContainer" />);
    const renderedComponent = shallow(
      <Map googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key='} loadingElement={<div />}>
        {children}
      </Map>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should have a googleMapURL and a loadingElement attributes', () => {
    const renderedComponent = shallow(<Map googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key='} loadingElement={<div />} />);
    expect(renderedComponent.prop('googleMapURL')).toBeDefined();
    expect(renderedComponent.prop('loadingElement')).toBeDefined();
  });
});

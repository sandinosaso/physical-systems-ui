import React from 'react';
import OverlayBg from './OverlayBg';

const MapContainer = (props) =>
(
  <OverlayBg hidden={props.hidden} />
);

MapContainer.propTypes = {
  hidden: React.PropTypes.bool,
};

export default MapContainer;

import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/addons/InfoBox';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GooleMap
const AsyncGoogleMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={11}
      defaultCenter={{ lat: 40.7834300, lng: -73.96625002 }}
      onClick={props.onMapClick}
    >
      {props.markers.map((marker) => (
        <Marker
          {...marker}
          zIndex={10000}
          key={marker.key}
          onClick={() => props.onMarkerClick(marker.key)}
          onRightClick={() => props.onMarkerRightClick(marker.key)}
        >
          {marker.showInfo && marker.infoContent && props.enableInfoBox && (
            <InfoWindow
              onCloseClick={() => props.onMarkerClose(marker.key)}
            >
              <div style={{ opacity: 0.75, padding: '10px' }}>
                <h2>
                  {marker.infoContent.name}
                </h2>
                <h3>
                  {marker.infoContent.address}
                </h3>
              </div>
            </InfoWindow>
          )}

          {marker.showInfo && marker.infoContent && props.enableInfoContent && (
            <InfoBox
              defaultPosition={marker.position}
              options={{
                zIndex: 1000000,
                boxStyle: {
                  position: 'absolute',
                  background: 'white',
                  padding: '5px',
                  opacity: 0.75,
                  'z-index': 100000,
                },
                maxWidth: 100,
                closeBoxURL: '',
                isHidden: false,
                enableEventPropagation: true,
                disableAutoPan: false,
              }}
            >
              <div
                style={{ width: '100%', height: '100%' }}
              >
                <button
                  style={{ float: 'right' }}
                  onClick={() => props.onMarkerClose(marker.key)}
                >Close me
                </button>
                <div style={{ padding: '20px' }}>
                  <h2>
                    {marker.infoContent.name}
                  </h2>
                  <h3>
                    {marker.infoContent.address}
                  </h3>
                </div>
              </div>
            </InfoBox>
          )}

        </Marker>
      ))}
    </GoogleMap>
  ))
);

export default AsyncGoogleMap;

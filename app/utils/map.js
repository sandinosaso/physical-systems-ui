const pinSymbol = (color) => (
  {
    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 2,
    scale: 1,
  }
);

const getMapMarkers = (properties, openPropertyKey = false) => {
  console.log('Properties:', properties);
  if (!properties) return [];
  const markers = properties.map((property) => (
    {
      position: {
        lat: parseFloat(property.latitude),
        lng: parseFloat(property.longitude),
      },
      icon: pinSymbol('#F7685C'),
      infoContent: {
        name: property.name,
        address: property.address1,
        market: property.marketId,
      },
      showInfo: openPropertyKey === property.id,
      key: property.id,
      defaultAnimation: 2,
    }
  ));
  return markers;
};

export {
  getMapMarkers,
  pinSymbol,
};

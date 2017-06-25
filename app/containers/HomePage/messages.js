/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.HomePage.header',
    defaultMessage: 'Physical Systems Managment',
  },
  loadingMap: {
    id: 'app.components.HomePage.loadingMap',
    defaultMessage: 'Loading Map...',
  },
  addProperty: {
    id: 'app.components.HomePage.addText',
    defaultMessage: 'Add Property',
  },
  propertiesListHeaderName: {
    id: 'app.components.Property.List.header.name',
    defaultMessage: 'Name',
  },
  propertiesListHeaderMarket: {
    id: 'app.components.Property.List.header.market',
    defaultMessage: 'Market',
  },
  propertiesListHeaderCountry: {
    id: 'app.components.Property.List.header.country',
    defaultMessage: 'Country',
  },
  propertiesListHeaderCity: {
    id: 'app.components.Property.List.header.city',
    defaultMessage: 'City',
  },
});

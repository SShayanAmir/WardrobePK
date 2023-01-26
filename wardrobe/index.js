import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Auth0Provider} from 'react-native-auth0';

import App from './App';
import {name as appName} from './app.json'; 

import { DOMAIN, CLIENT_ID } from '@env';

export default function Main() {
  return (
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}>
      <PaperProvider>
        <App/>
      </PaperProvider>
    </Auth0Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
  initialWindowMetrics
} from 'react-native-safe-area-context';
import { ErrorBoundary } from 'react-error-boundary';

import { ChatServiceClient } from './chat_grpc_web_pb';
import Chat from './containers/Chat';

export const client = new ChatServiceClient(
  'http://localhost:8080',
  null,
  null
);

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const App = () => {
  const insets = useSafeAreaInsets();

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right
        }}
      >
        <Layout style={{ flex: 1, alignItems: 'center' }}>
          <Text category="h3" style={{ display: 'flex', textAlign: 'center' }}>
            Welcome to a grpc + expo chat app!
          </Text>
          <StatusBar style="auto" />
          <Chat client={client} />
        </Layout>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

export const AppProvider = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <App />
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default AppProvider;

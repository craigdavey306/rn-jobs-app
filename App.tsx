import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store, selectIsAuthenticated, logout } from './store';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import IconButton from './components/ui/IconButton';
// import SettingsScreen from './screens/SettingsScreen';
// import ReviewScreen from './screens/ReviewScreen';
import { Colors } from './constants/styles';
import { useAppSelector, useAppDispatch } from './shared/hooks';
import { authenticate } from './store';

// import {
//   ReviewJobStackParamList,
//   RootTabParamList,
// } from './shared/param-types';

// const Stack = createNativeStackNavigator<ReviewJobStackParamList>();

// function ReviewJobsStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="ReviewJobs" component={ReviewScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//     </Stack.Navigator>
//   );
// }

// const WorkflowTab = createBottomTabNavigator();

// function WorkflowTabs() {
//   return (
//     <Provider store={store}>
//       <WorkflowTab.Navigator>
//         <WorkflowTab.Screen name="Map" component={MapScreen} />
//         <WorkflowTab.Screen name="Deck" component={DeckScreen} />
//         <WorkflowTab.Screen
//           name="ReviewJobsNav"
//           component={ReviewJobsStack}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </WorkflowTab.Navigator>
//     </Provider>
//   );
// }

// const Tab = createBottomTabNavigator<RootTabParamList>();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NeedsAuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Log In',
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.black,
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: 'Sign Up',
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.black,
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      />
    </Stack.Navigator>
  );
}

function HeaderLogOutButton(tintColor: string | undefined) {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      icon="logout"
      ariaLabel="Log Out"
      color={tintColor}
      size={24}
      onPress={() => dispatch(logout())}
    />
  );
}

function AuthenticatedTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.black,
        headerRight: ({ tintColor }) => {
          return HeaderLogOutButton(tintColor);
        },
      }}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Deck" component={DeckScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {
  const isAuthenticated = useAppSelector((state) =>
    selectIsAuthenticated(state),
  );

  return (
    <NavigationContainer>
      {!isAuthenticated && <NeedsAuthStack />}
      {isAuthenticated && <AuthenticatedTabs />}
    </NavigationContainer>
  );
}

function Root(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchToken() {
      // await AsyncStorage.removeItem('token');
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        // refresh token
        const token = storedToken;
        dispatch(authenticate({ token }));
      }
    }

    fetchToken();
  }, [dispatch]);

  return <Navigation />;
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;

import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import ProductDetailScreen from "./screens/ProductPageScreen";
import MainPageScreen from "./screens/MainPageScreen";
import CategoryPageScreen from "./screens/CategoryPageScreen";
import ProductOverviewScreen from "./screens/ProductOverview";
import ContactPageScreen from "./screens/ContactPageScreen";
import FavoritesScreen from "./screens/FavoriteScreen";
import { GlobalStyles } from "./constants/style";
import { store } from "./store/store";
import BasketScreen from "./screens/BasketPageScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Promise.all([
          Font.loadAsync({
            "shinko-font": require("./assets/fonts/shinkosansregular-8oo50.otf"),
            "open-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
          }),
        ]);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: GlobalStyles.colors.textWhite,
        drawerContentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        drawerInactiveTintColor: GlobalStyles.colors.textWhite,
        drawerActiveTintColor: GlobalStyles.colors.primary900,
        drawerActiveBackgroundColor: GlobalStyles.colors.primary50,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={MainPageScreen}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoryPageScreen}
        options={{
          title: "Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bag" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactPageScreen}
        options={{
          title: "Contact",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mail" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
              headerTintColor: GlobalStyles.colors.textWhite,
            }}
          >
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Product Overview"
              component={ProductOverviewScreen}
            />
            <Stack.Screen
              name="Product Detail"
              component={ProductDetailScreen}
              options={{ title: "Product Screen" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

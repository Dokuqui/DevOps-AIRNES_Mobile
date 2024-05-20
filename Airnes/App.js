import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import CheckoutPageScreen from "./screens/CheckoutPageScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/RegisterScreen";
import AboutScreen from "./screens/AboutPageScreen";
import UserScreen from "./screens/UserPageScreen";
import UpdateUserScreen from "./screens/UserUpdateScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const [appIsReady, setAppIsReady] = useState(false);
  const authCtx = useContext(AuthContext);

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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
      {authCtx.isAuthenticated ? (
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            title: "My Cabinet",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      ) : (
        <Drawer.Screen
          name="Auth"
          component={AuthStack}
          options={{
            title: "Authentication",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        headerTintColor: GlobalStyles.colors.textWhite,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  // const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "About Us" }}
        />
        <Stack.Screen
          name="User Update"
          component={UpdateUserScreen}
          options={{ title: "Update User Details" }}
        />
        <Stack.Screen 
          name="Checkout Payment" 
          component={CheckoutPageScreen} 
        />
        {/* {authCtx.isAuthenticated && (
          <Stack.Screen name="UserPage" component={UserPageScreen} />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </AuthContextProvider>
    </>
  );
}

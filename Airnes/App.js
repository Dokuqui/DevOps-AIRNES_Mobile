import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ProductPageScreen from "./screens/ProductPageScreen";
import MainPageScreen from "./screens/MainPageScreen";
import CategoryPageScreen from "./screens/CategoryPageScreen";
import { GlobalStyles } from "./constants/style";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
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
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Product Page" component={ProductPageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

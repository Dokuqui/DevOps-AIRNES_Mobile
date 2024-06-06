import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductDetailScreen from "../screens/ProductPageScreen";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("../components/util/helper.js", () => ({
  APIRequest: jest.fn((method, url) => {
    if (url.includes("Products")) {
      return Promise.resolve({
        success: true,
        return: {
          ProductId: 1,
          Name: "Product 1",
          Description: "Lorem ipsum",
          Price: "22.00",
          Stock: 10,
          Pictures: [
            {
              Link: "https://example.com/product1.jpg",
            },
          ],
        },
      });
    } else if (url.includes("ProductMaterial")) {
      return Promise.resolve({
        success: true,
        return: [
          { MaterialId: 1, Label: "Material 1" },
          { MaterialId: 2, Label: "Material 2" },
        ],
      });
    }
  }),
}));

jest.mock("../components/MainPage/Footer", () => () => <></>);

const mockStore = configureStore([]);

jest.mock("../store/basket", () => ({
  addBasketItem: jest.fn((item) => async (dispatch) => {
    return dispatch({
      type: "basket/addBasketItem/fulfilled",
      payload: item,
    });
  }),
}));

describe("ProductDetailScreen", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        items: [],
        status: "idle",
        error: null,
      },
    });
  });

  it("renders correctly with fetched product data", async () => {
    const { getByText, toJSON } = render(
      <Provider store={store}>
        <ProductDetailScreen
          navigation={{}}
          route={{ params: { productId: 1 } }}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("Product 1")).toBeTruthy();
      expect(getByText("Lorem ipsum")).toBeTruthy();
    });

    expect(toJSON()).toMatchSnapshot();
  });
});
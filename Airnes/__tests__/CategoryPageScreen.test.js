import { render, waitFor, fireEvent } from "@testing-library/react-native";
import CategoryPageScreen from "../screens/CategoryPageScreen";

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock("../components/util/helper.js", () => ({
  APIRequest: jest.fn().mockResolvedValue({
    return: [
      {
        Categories: [
          { CategoryId: 1, Name: "Category 1" },
          { CategoryId: 2, Name: "Category 2" },
        ],
      },
    ],
  }),
}));

describe("CategoryPageScreen", () => {
  it("renders subcategories", async () => {
    const { findByText } = render(
      <CategoryPageScreen navigation={mockNavigation} />
    );
    const category1 = await findByText("Category 1");
    const category2 = await findByText("Category 2");
    expect(category1).toBeTruthy();
    expect(category2).toBeTruthy();
  });

  it("navigates to Product Overview on subcategory press", async () => {
    const { getByText } = render(
      <CategoryPageScreen navigation={mockNavigation} />
    );
    const category1 = await waitFor(() => getByText("Category 1"));
    fireEvent.press(category1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Product Overview", {
      categoryId: 1,
    });
  });
});

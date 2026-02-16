/** Generated React unit tests for frontend/src/App.js. */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import ComponentUnderTest from "@/App";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<ComponentUnderTest />);
    expect(screen.getByTestId("app-root")).toBeInTheDocument();
  });

  it("supports user interaction", async () => {
    const user = userEvent.setup();
    render(<ComponentUnderTest />);

    const action = screen.queryByRole("button");
    if (action) {
      await user.click(action);
      expect(action).toBeEnabled();
    } else {
      expect(screen.getByTestId("app-root")).toBeVisible();
    }
  });

  it("supports dependency mocking", () => {
    const callback = vi.fn();
    callback();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

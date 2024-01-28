import Button from "..";
import { fn } from "@vitest/spy";
import { People } from "@mui/icons-material";
import { TestContext } from "@/types/tests.interface";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { ButtonProps, ButtonRolesEnum } from "../Button.types";

type LocalTestContext = TestContext<Partial<ButtonProps>>;

const title = "Text";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<Button children={title} {...props} />);
});

describe("Button", () => {
  test<LocalTestContext>("should show text", ({ wrapper }) => {
    const button = wrapper();
    expect(button.getByText(title)).toBeDefined();
  });

  test<LocalTestContext>("should be a link", ({ wrapper }) => {
    const button = wrapper({
      href: "https://www.google.com",
    });
    expect(button.getByRole(ButtonRolesEnum.LINK)).toBeDefined();
  });

  test<LocalTestContext>("should handle click", ({ wrapper }) => {
    const handleClick = fn();
    const button = wrapper({ onClick: handleClick });

    fireEvent.click(button.getByRole(ButtonRolesEnum.BUTTON));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test<LocalTestContext>("should display icon", ({ wrapper }) => {
    const button = wrapper({ iconButton: true, children: <People /> });

    expect(button.queryByText(title)).toBeNull();
    expect(button.getByRole(ButtonRolesEnum.ICON)).toBeDefined();
  });

  test<LocalTestContext>("should display start and end icon", ({ wrapper }) => {
    const button = wrapper({ startIcon: <People />, endIcon: <People /> });

    expect(button.getByText(title)).toBeDefined();
    expect(button.getByRole(ButtonRolesEnum.START_ICON)).toBeDefined();
    expect(button.getByRole(ButtonRolesEnum.END_ICON)).toBeDefined();
  });
});

describe("Button disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({ wrapper }) => {
    const button = wrapper({ disabled: true });

    expect(button.getByText(title)).toBeDefined();
    expect(button.getByRole(ButtonRolesEnum.BUTTON).className).toContain(
      "disabled"
    );
  });

  test<LocalTestContext>("should prevent click", async ({ wrapper }) => {
    const handleClick = fn();
    const button = wrapper({ onClick: handleClick, disabled: true });

    fireEvent.click(button.getByRole(ButtonRolesEnum.BUTTON));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});

describe("Button loading", () => {
  test<LocalTestContext>("should show loading state", async ({ wrapper }) => {
    const button = wrapper({ loading: true });

    expect(button.queryByText(title)).toBeNull();
    expect(button.getByRole(ButtonRolesEnum.BUTTON).className).toContain(
      "loading"
    );
  });

  test<LocalTestContext>("should prevent click", async ({ wrapper }) => {
    const handleClick = fn();
    const button = wrapper({ onClick: handleClick, loading: true });

    fireEvent.click(button.getByRole(ButtonRolesEnum.BUTTON));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});

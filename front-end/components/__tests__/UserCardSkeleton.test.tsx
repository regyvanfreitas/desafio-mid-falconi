import { render } from "@testing-library/react";
import { UserCardSkeleton } from "../UserCardSkeleton";

describe("UserCardSkeleton Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<UserCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders skeleton elements", () => {
    const { container } = render(<UserCardSkeleton />);

    // Should have skeleton classes for loading animation
    const skeletonElements = container.querySelectorAll(
      '[data-slot="skeleton"]'
    );
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("has card structure", () => {
    const { container } = render(<UserCardSkeleton />);

    // Should have a card-like structure
    expect(container.firstChild).toHaveClass("rounded-xl");
  });
});

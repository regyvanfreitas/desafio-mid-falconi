import { render } from "@testing-library/react";
import { StatsCardSkeleton } from "../StatsCardSkeleton";

describe("StatsCardSkeleton Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<StatsCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders skeleton elements", () => {
    const { container } = render(<StatsCardSkeleton />);

    // Should have skeleton classes for loading animation
    const skeletonElements = container.querySelectorAll(
      '[data-slot="skeleton"]'
    );
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("has card structure for stats", () => {
    const { container } = render(<StatsCardSkeleton />);

    // Should have a card-like structure
    expect(container.firstChild).toHaveClass("rounded-xl");
  });
});

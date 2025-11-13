import { usersApi, profilesApi } from "../api";

describe("API Functions", () => {
  it("should have usersApi methods", () => {
    // Simple test to ensure the API module exports the expected functions
    expect(typeof usersApi).toBe("object");
    expect(typeof usersApi.getAll).toBe("function");
    expect(typeof usersApi.create).toBe("function");
  });

  it("should have profilesApi methods", () => {
    // Simple test to ensure the API module exports the expected functions
    expect(typeof profilesApi).toBe("object");
    expect(typeof profilesApi.getAll).toBe("function");
  });
});

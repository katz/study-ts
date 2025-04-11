import { describe, it, expect } from "vitest";

import { api } from "../api-client";

describe("check msw working", () => {
  it("should return a successful healthcheck", async () => {
    const response = await api.get("/healthcheck");
    const data = response.data;

    expect(data.ok).toBe(true);
    expect(response.status).toBe(200);
  });
});

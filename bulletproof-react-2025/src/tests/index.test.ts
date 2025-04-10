import { describe, it, expect } from "vitest";

import { env } from "@/config/env";

describe("Sample Test Suite", () => {
  it("should pass a basic test", () => {
    expect(true).toBe(true);
  });
});

describe("check msw working", () => {
  it("should return a successful healthcheck", async () => {
    const response = await fetch(`${env.API_URL}/healthcheck`);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(response.status).toBe(200);
  });
});

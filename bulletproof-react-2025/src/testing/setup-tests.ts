import { beforeAll, afterAll, beforeEach, afterEach, vi } from "vitest";

import { server } from "@/testing/mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal("ResizeObserver", ResizeObserverMock);

  window.btoa = (str: string) => Buffer.from(str, "binary").toString("base64");
  window.atob = (str: string) => Buffer.from(str, "base64").toString("binary");
});
afterEach(() => {
  server.resetHandlers();
});

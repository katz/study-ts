import { HttpResponse, http } from "msw";

import { env } from "@/config/env";

import { networkDelay } from "../utils.ts";

export const handlers = [
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];

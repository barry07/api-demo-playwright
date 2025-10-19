// tests/getAemetStation.spec.js
import { test, expect } from "@playwright/test";
import stations from "../data/stations.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_PREFIX = "/v1.0/getAemetStation/";

test.describe("ODWeather API - getAemetStation - endpoint", () => {
  for (const stationId of stations.invalidStations) {
    test(`should return an error object for invalid station "${stationId}"`, async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}${stationId}/lastdata/`);

      // Status check
      expect([200, 404]).toContain(response.status());

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text; // fallback if HTML or non-JSON
      }

      if (typeof data === "object") {
        if (response.status() === 200) {
          expect(data).toHaveProperty("error");
        }
      } else {
        console.warn(`Non-JSON response for ${stationId}:`, text.slice(0, 100));
      }
    });
  }
});

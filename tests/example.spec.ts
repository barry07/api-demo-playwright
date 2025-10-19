import { test, expect } from '@playwright/test';

test('GET request', async ({ request }) => {
  await request.get('https://api.oceandrivers.com/v1.0/getWeatherDisplay/cncoloniasp/?period=latestdata/')
});



import { test, expect } from '@playwright/test';

test('GET request', async ({ request }) => {
  const response = await request.get(
    'https://api.oceandrivers.com:443/v1.0/getAemetStation/aeropuertopalma/lastdata/'
  );

  console.log('Status:', response.status());

  const responseObject = await response.json();

  // Print keys to inspect
  console.log('Keys:', Object.keys(responseObject));

  // Get the first property and its value
  const firstKey = Object.keys(responseObject)[1];
  const firstValue = responseObject[firstKey];

  console.log(`First property: ${firstKey}`);
  console.log('Value:', firstValue);

  // Example assertion
  expect(response.status()).toBe(200);
});

import { test, expect } from '@playwright/test';

test('GET request', async ({ request }) => {
  const response = await request.get(
    'https://api.oceandrivers.com:443/v1.0/getAemetStation/aeropuertopalma/lastdata/'
  );

  console.log('Status:', response.status());

  let responseObject;
  try {
    responseObject = await response.json();
  } catch (err) {
    console.error('❌ Failed to parse JSON:', err);
    return; // stop test if parsing fails
  }

  // Log first element if array
  if (Array.isArray(responseObject)) {
    console.log('✅ First element:', responseObject[0]);
  } else {
    console.log('ℹ️ Response is not an array:', responseObject);
  }

  // Example assertion
  expect(response.status()).toBe(200);
});

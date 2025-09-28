import { test, expect } from '@playwright/test';

test('landing page shows CTA flow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Comenzar gratis' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Crear cuenta' })).toBeVisible();
});

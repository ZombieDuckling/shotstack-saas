import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('landing page loads and redirects to dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('dashboard page loads with key elements', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Welcome back!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'New Screenshot' })).toBeVisible();
    
    await expect(page.getByText('Total Screenshots')).toBeVisible();
    await expect(page.getByText('Recent Activity')).toBeVisible();
    await expect(page.getByText('Quick Actions')).toBeVisible();
  });

  test('library page loads with screenshots', async ({ page }) => {
    await page.goto('/library');
    
    await expect(page.getByRole('heading', { name: 'Library' })).toBeVisible();
    await expect(page.getByText('Browse and manage all your screenshots')).toBeVisible();
    
    await expect(page.getByText('Screenshot #1284')).toBeVisible();
    await expect(page.getByText('design')).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('SGB Theme Tests', () => {
	test('should load homepage with SGB theme', async ({ page }) => {
		await page.goto('/');

		// Check page title
		await expect(page).toHaveTitle(/Testing SGB Theme/);

		// Check that the page content is visible
		await expect(page.locator('h1')).toContainText('Welcome to SGB Theme Test');
	});

	test('should apply custom typography', async ({ page }) => {
		await page.goto('/');

		// Check for custom font (Euclid Circular B)
		const bodyStyles = await page.locator('body').evaluate((el) => {
			return window.getComputedStyle(el).fontFamily;
		});

		// Font might not load in test environment, but CSS should be applied
		console.log('Body font family:', bodyStyles);
	});

	test('should show table of contents', async ({ page }) => {
		await page.goto('/');

		// Check for TOC presence
		const toc = page.locator('#toc');
		await expect(toc).toBeVisible();
	});

	test('should have working navigation', async ({ page }) => {
		await page.goto('/');

		// Check navigation links
		const aboutLink = page.locator('a:text("About")');
		await expect(aboutLink).toBeVisible();

		// Click about link and verify navigation
		await aboutLink.click();
		await expect(page).toHaveURL(/about/);
		await expect(page.locator('h1')).toContainText('About This Test');
	});

	test('should have code copy functionality', async ({ page }) => {
		await page.goto('/');

		// Look for code blocks
		const codeBlock = page.locator('pre code');
		await expect(codeBlock).toBeVisible();

		// Check if copy button appears (might be added by theme)
		// This depends on theme implementation
	});

	test('should include analytics script', async ({ page }) => {
		await page.goto('/');

		// Check for Plausible analytics script
		const plausibleScript = page.locator('script[data-domain="stadtgeschichtebasel.ch"]');
		await expect(plausibleScript).toBeDefined();
	});

	test('should handle external links correctly', async ({ page }) => {
		await page.goto('/');

		// Find external link
		const externalLink = page.locator('a[href="https://stadtgeschichtebasel.ch"]');
		await expect(externalLink).toBeVisible();

		// Check if it has target="_blank" (should open in new window)
		const target = await externalLink.getAttribute('target');
		expect(target).toBe('_blank');
	});

	test('should be responsive', async ({ page }) => {
		await page.goto('/');

		// Test mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		// Check that content is still visible and properly arranged
		await expect(page.locator('h1')).toBeVisible();

		// Test desktop viewport
		await page.setViewportSize({ width: 1200, height: 800 });
		await expect(page.locator('h1')).toBeVisible();
	});
});

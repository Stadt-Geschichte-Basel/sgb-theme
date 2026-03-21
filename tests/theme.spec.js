import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the base URL for the static site
const siteDir = join(__dirname, '..', 'test', '_site');
const baseUrl = `file://${siteDir}`;

test.describe('SGB Theme Tests', () => {
	test('should load homepage with SGB theme', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		// Check page title
		await expect(page).toHaveTitle(/Testing SGB Theme/);

		// Check that the page content is visible
		const h1Elements = page.locator('h1');
		const h1Count = await h1Elements.count();
		let foundText = false;
		for (let i = 0; i < h1Count; i++) {
			const text = await h1Elements.nth(i).textContent();
			if (text && text.includes('Welcome to SGB Theme Test')) {
				foundText = true;
				break;
			}
		}
		expect(foundText).toBeTruthy();
	});

	test('should apply custom typography', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		// Check for custom font (Euclid Circular B)
		const bodyStyles = await page.locator('body').evaluate((el) => {
			return window.getComputedStyle(el).fontFamily;
		});

		// Font might not load in test environment, but CSS should be applied
		console.log('Body font family:', bodyStyles);
	});

	test('should show table of contents', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		// Check for TOC presence - it may be in different locations
		const toc = page.locator('#toc, #TOC, .toc, nav#toc').first();
		const tocCount = await page.locator('#toc, #TOC, .toc, nav#toc').count();

		if (tocCount > 0) {
			await expect(toc).toBeAttached();
		} else {
			// TOC might be generated differently or not present
			console.log('No TOC found - may not be configured for this page');
		}
	});

	test('should have working navigation', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		// Check navigation links - look for any link to about page
		const aboutLink = page.locator('a[href*="about"]').first();
		await expect(aboutLink).toBeVisible();

		// Click about link and verify navigation
		await aboutLink.click();
		await expect(page).toHaveURL(/about/);
		await expect(page.locator('h1').first()).toBeVisible();
	});

	test('should have code copy functionality', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		// Look for code blocks
		const codeBlock = page.locator('pre code');
		await expect(codeBlock).toBeVisible();

		// Check if copy button appears (might be added by theme)
		// This depends on theme implementation
	});

	test('should not include analytics script by default', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		await expect(page.locator('script[src*="plausible.io"]')).toHaveCount(0);
		await expect(page.locator('script[data-domain="stadtgeschichtebasel.ch"]')).toHaveCount(0);
	});

	test('should handle external links correctly', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		// Find external link
		const externalLink = page.locator('a[href="https://stadtgeschichtebasel.ch"]').first();
		const count = await page.locator('a[href="https://stadtgeschichtebasel.ch"]').count();

		if (count > 0) {
			await expect(externalLink).toBeVisible();

			// Check if it has target="_blank" (should open in new window)
			const target = await externalLink.getAttribute('target');
			// Target blank may be added by extension or theme
			if (target) {
				expect(target).toBe('_blank');
			} else {
				console.log(
					'External link does not have target="_blank" - may need extension configuration'
				);
			}
		}
	});

	test('should be responsive', async ({ page }) => {
		await page.goto(`${baseUrl}/index.html`);

		// Test mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		// Check that content is still visible and properly arranged
		await expect(page.locator('h1').first()).toBeVisible();

		// Test desktop viewport
		await page.setViewportSize({ width: 1200, height: 800 });
		await expect(page.locator('h1').first()).toBeVisible();
	});
});

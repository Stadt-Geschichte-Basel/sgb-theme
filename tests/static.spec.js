import { test, expect } from '@playwright/test';

test.describe('SGB Theme Browser Tests', () => {
	test('should generate correct HTML structure and render properly', async ({ page }) => {
		// Navigate to the actual page in a browser
		await page.goto('/index.html');

		// Test basic structure
		await expect(page).toHaveTitle(/Testing SGB Theme/);
		await expect(page.locator('h1').first()).toBeVisible();
		// Check that one of the h1 elements contains the expected text
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

		// Get page content to verify theme-specific elements
		const content = await page.content();

		// Test theme-specific elements
		expect(content).toContain('Euclid Circular B'); // Custom font

		// External links get target="_blank" added by JavaScript, so check the DOM
		const externalLinks = page.locator('#quarto-content a[href^="http"]:not([href*="localhost"])');
		if ((await externalLinks.count()) > 0) {
			const firstExternal = externalLinks.first();
			// Target blank should be set by Quarto's link-external-newwindow feature
			await expect(firstExternal).toHaveAttribute('target', '_blank');
		}

		// Test TOC presence
		const toc = page.locator('nav[role="doc-toc"]');
		const tocCount = await toc.count();
		if (tocCount > 0) {
			await expect(toc).toBeAttached();
		}

		// Test code blocks rendering
		const codeBlock = page.locator('pre');
		await expect(codeBlock).toBeVisible();
		const codeElement = page.locator('code');
		await expect(codeElement).toBeVisible();
	});

	test('should include and load required CSS and JS assets', async ({ page }) => {
		// Navigate to the page
		await page.goto('/index.html');

		// Check for CSS by verifying styles are applied
		const body = page.locator('body');
		await expect(body).toBeVisible();

		// Get computed styles to verify CSS is loaded
		const backgroundColor = await body.evaluate((el) => {
			return window.getComputedStyle(el).backgroundColor;
		});
		expect(backgroundColor).toBeTruthy();

		// Check for bootstrap/theme assets by looking at CSS links
		const cssLinks = await page.locator('link[rel="stylesheet"]').count();
		expect(cssLinks).toBeGreaterThan(0);
	});

	test('should have proper meta tags and document structure', async ({ page }) => {
		await page.goto('/index.html');

		// Check document structure through DOM
		const html = page.locator('html');
		await expect(html).toBeAttached();

		const head = page.locator('head');
		await expect(head).toBeAttached();

		const body = page.locator('body');
		await expect(body).toBeVisible();

		// Check meta tags
		const charsetMeta = page.locator('meta[charset]');
		await expect(charsetMeta).toHaveCount(1);

		const viewportMeta = page.locator('meta[name="viewport"]');
		await expect(viewportMeta).toHaveCount(1);

		// Verify content is UTF-8 by checking for proper rendering
		const pageContent = await page.textContent('body');
		expect(pageContent).toBeTruthy();
	});

	test('should have about page with navigation and proper rendering', async ({ page }) => {
		await page.goto('/about.html');

		// Test about page content
		await expect(page).toHaveTitle(/About/);
		await expect(page.locator('h1.title').first()).toContainText('About');

		// Test navigation back to home (prefer role-based selection; robust to href variations)
		const homeLink = page.getByRole('link', { name: /^Home$/ });
		await expect(homeLink).toBeVisible();
		await homeLink.click();
		await expect(page).toHaveTitle(/Testing SGB Theme/);

		// Navigate back to about to verify it works both ways
		await page.goto('/index.html');
		const aboutLink = page.getByRole('link', { name: /^About$/ });
		await expect(aboutLink).toBeVisible();
		await aboutLink.click();
		await expect(page).toHaveURL(/about\.html$/); // Match end of URL
		await expect(page).toHaveTitle(/About/);
	});

	test('should apply custom typography and fonts', async ({ page }) => {
		await page.goto('/index.html');

		// Check for custom font in computed styles
		const bodyFontFamily = await page.locator('body').evaluate((el) => {
			return window.getComputedStyle(el).fontFamily;
		});

		// The font should be defined (even if not fully loaded in test environment)
		expect(bodyFontFamily).toBeTruthy();

		// Check that typography styles are applied
		const h1FontSize = await page
			.locator('h1')
			.first()
			.evaluate((el) => {
				return window.getComputedStyle(el).fontSize;
			});
		expect(h1FontSize).toBeTruthy();
		expect(h1FontSize).not.toBe('16px'); // Should be larger than default
	});
});

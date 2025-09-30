import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

test.describe('SGB Theme Static Tests', () => {
	test('should generate correct HTML structure', async () => {
		// Read the generated HTML file
		const htmlPath = join(process.cwd(), 'test', '_site', 'index.html');
		let htmlContent;

		try {
			htmlContent = readFileSync(htmlPath, 'utf-8');
		} catch (error) {
			throw new Error(
				`Could not read HTML file at ${htmlPath}. Make sure to run 'quarto render' in the test directory first.`
			);
		}

		// Test basic structure
		expect(htmlContent).toContain('<title>Testing SGB Theme</title>');
		expect(htmlContent).toContain('<h1');
		expect(htmlContent).toContain('Welcome to SGB Theme Test');

		// Test theme-specific elements
		expect(htmlContent).toContain('Euclid Circular B'); // Custom font
		expect(htmlContent).toContain('data-domain="stadtgeschichtebasel.ch"'); // Analytics
		expect(htmlContent).toContain('target="_blank"'); // External links

		// Test TOC presence
		expect(htmlContent).toContain('toc'); // Table of contents

		// Test code blocks
		expect(htmlContent).toContain('<pre'); // Code blocks should be present
		expect(htmlContent).toContain('<code'); // Code elements
	});

	test('should include required CSS and JS assets', async () => {
		const htmlPath = join(process.cwd(), 'test', '_site', 'index.html');
		let htmlContent;

		try {
			htmlContent = readFileSync(htmlPath, 'utf-8');
		} catch (error) {
			throw new Error(`Could not read HTML file at ${htmlPath}.`);
		}

		// Check for CSS includes
		expect(htmlContent).toContain('.css'); // Should have CSS references

		// Check for analytics script
		expect(htmlContent).toContain('plausible.io/js/script.outbound-links.js');

		// Check for bootstrap/theme assets (cosmo theme)
		expect(htmlContent).toMatch(/bootstrap|cosmo/i);
	});

	test('should have proper meta tags and document structure', async () => {
		const htmlPath = join(process.cwd(), 'test', '_site', 'index.html');
		let htmlContent;

		try {
			htmlContent = readFileSync(htmlPath, 'utf-8');
		} catch (error) {
			throw new Error(`Could not read HTML file at ${htmlPath}.`);
		}

		// Check document structure
		expect(htmlContent).toContain('<!DOCTYPE html>');
		expect(htmlContent).toContain('<html');
		expect(htmlContent).toContain('<head>');
		expect(htmlContent).toContain('<body');
		expect(htmlContent).toContain('</html>');

		// Check meta tags
		expect(htmlContent).toContain('<meta charset="utf-8">');
		expect(htmlContent).toContain('viewport');
	});

	test('should have about page with navigation', async () => {
		const aboutPath = join(process.cwd(), 'test', '_site', 'about.html');
		let htmlContent;

		try {
			htmlContent = readFileSync(aboutPath, 'utf-8');
		} catch (error) {
			throw new Error(`Could not read about.html file at ${aboutPath}.`);
		}

		// Test about page content
		expect(htmlContent).toContain('<title>About</title>');
		expect(htmlContent).toContain('About This Test');

		// Test navigation
		expect(htmlContent).toContain('href="index.html"'); // Home link
		expect(htmlContent).toContain('About'); // About text in nav
	});
});

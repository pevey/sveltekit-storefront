import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {

	// Required for all paths
	const response = await resolve(event)

	// SECURITY HEADERS
	// CSP directives are set elsewhere in svelte.config.js and added automatically by SvelteKit.
	// CSRF mitigation in SvelteKit is handled by header-checking and is enabled by default. More secure token-based CSRF mitigation must be added manually.
	// Token-based CSRF mitigation for the most sensitive endpoints/form actions is handled by Cloudflare Turnstile.
	// The headers below provide additional security against XSS, clickjacking, MIME-type sniffing, and other attacks.
	response.headers.set('X-Frame-Options', 'DENY')
	response.headers.set('X-Content-Type-Options', 'nosniff')
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
	response.headers.set('Permissions-Policy', 'payment=(*), accelerometer=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), gyroscope=(), hid=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()')

	return response
}
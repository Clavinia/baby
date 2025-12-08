# Deployment Configuration for SPA Routing

This Vue.js application uses client-side routing. To ensure all routes work correctly when accessed directly, you need to configure your server to serve `index.html` for all routes.

## Development

The Vite dev server (`pnpm dev`) handles SPA routing automatically. No additional configuration is needed.

## Production

### Hostinger (Apache)

The `public/.htaccess` file is already configured for Apache servers. Make sure:
1. The `.htaccess` file is copied to your `dist` folder during build (Vite automatically copies files from `public/` to `dist/`)
2. Your Apache server has `mod_rewrite` enabled (usually enabled by default on Hostinger)
3. Deploy the `dist` folder contents to your Hostinger hosting space

### Netlify

The `public/_redirects` file is already configured. Just deploy your `dist` folder to Netlify.

### Vercel

The `vercel.json` file is already configured. Just deploy to Vercel.

### Other Apache Servers

The `public/.htaccess` file is already configured. Make sure:
1. The `.htaccess` file is copied to your `dist` folder during build
2. Your Apache server has `mod_rewrite` enabled

### Nginx

Add this configuration to your Nginx server block:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Other Static Hosting Services

Configure your hosting service to:
- Serve `index.html` for all routes that don't match a file
- This is often called "fallback routing" or "SPA mode"

## Testing

After deployment, test that these URLs work:
- `https://yourdomain.com/` → Should redirect to `/primeros-alimentos`
- `https://yourdomain.com/primeros-alimentos` → Should load the Spanish version
- `https://yourdomain.com/first-food` → Should load the English version


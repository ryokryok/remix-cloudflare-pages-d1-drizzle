# Remix (Vite) for Cloudflare Pages + Cloudflare D1

It works at Cloudflare Pages.

[https://remix-cloudflare-pages-d1-34w.pages.dev/]

Stacks

- [Remix](https://remix.run/)
- [Vite](https://vitejs.dev/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Initial Setup

This project requires `wrangler.toml` for Cloudflare bindings.

```sh
mv wrangler.toml.sample wrangler.toml
```

Database setup of Cloudflare D1.

```sh
pnpm db:create
```

Local database migration with `schema.sql`.

```sh
pnpm db:init:local
```

## Development

Run the Vite dev server:

```sh
pnpm run dev
```

To run Wrangler:

```sh
pnpm run build
pnpm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
pnpm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

If you did not create database `dev-remix-d1`, run this command.

```sh
pnpm db:create
```

Remote database migration with `schema.sql`.

```sh
pnpm db:init:remote
```

First, build your app for production:

```sh
pnpm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
pnpm run deploy
```

## Notes

Configuration via `wrangler.toml` is in open beta.

[Configuration via wrangler.toml](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)

## License

MIT

import { type PlatformProxy } from "wrangler";

// This `Env` type is taken from `worker-configuration.d.ts` generated by `pnpm typegen`.
type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

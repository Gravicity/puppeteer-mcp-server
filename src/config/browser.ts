import { LaunchOptions } from 'puppeteer';

// Environment configuration
// These allow runtime configuration without modifying source code
const HEADLESS = process.env.PUPPETEER_HEADLESS !== 'false'; // Default: true
const NO_SANDBOX = process.env.PUPPETEER_NO_SANDBOX === 'true';
const DISABLE_GPU = process.env.PUPPETEER_DISABLE_GPU === 'true';
const DISABLE_DEV_SHM = process.env.PUPPETEER_DISABLE_DEV_SHM === 'true';

// Common browser arguments for both NPX and Docker environments
const commonArgs = [
  "--disable-web-security",  // Bypass CORS
  "--disable-features=IsolateOrigins,site-per-process", // Disable site isolation
  "--disable-site-isolation-trials",
  "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" // Modern Chrome UA
];

// Build args based on environment variables
function buildEnvArgs(): string[] {
  const args: string[] = [];
  if (NO_SANDBOX) args.push("--no-sandbox");
  if (DISABLE_GPU) args.push("--disable-gpu");
  if (DISABLE_DEV_SHM) args.push("--disable-dev-shm-usage");
  return args;
}

// NPX configuration - respects environment variables for flexible deployment
export const npxConfig: LaunchOptions = {
  headless: HEADLESS,
  args: [...buildEnvArgs(), ...commonArgs]
};

// Docker configuration for containerized environment (legacy, for backwards compatibility)
export const dockerConfig: LaunchOptions = {
  headless: true,
  args: [
    "--no-sandbox",
    "--single-process",
    "--no-zygote",
    ...commonArgs
  ]
};

// Default navigation timeout in milliseconds
export const DEFAULT_NAVIGATION_TIMEOUT = 30000;

// Default debugging port for Chrome
export const DEFAULT_DEBUG_PORT = 9222;

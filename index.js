#! /usr/bin/env node

//this is just an opinionated order of package manager lock files :)
const packageManagers = {
  npm: {
    name: "npm",
    lockFile: "package-lock.json",
    installCommand:
      "npm i next@latest eslint-config-next@latest react@latest react-dom@latest",
  },
  yarn: {
    name: "yarn",
    lockFile: "yarn.lock",
    installCommand:
      "yarn add next@latest eslint-config-next@latest react@latest react-dom@latest",
  },
  pnpm: {
    name: "pnpm",
    lockFile: "pnpm-lock.yaml",
    installCommand:
      "pnpm i next@latest eslint-config-next@latest react@latest react-dom@latest",
  },
  bun: {
    name: "bun",
    lockFile: "bun.lock",
    installCommand:
      "bun add next@latest eslint-config-next@latest react@latest react-dom@latest",
  },
};
async function run() {
  try {
    const currentDir = process.cwd();
    const { execSync } = require("child_process");
    const fs = require("fs");
    const path = require("path");

    // Check for package manager lock file with content check
    let currentPackageManager;
    for (const manager in packageManagers) {
      const lockFile = path.join(currentDir, packageManagers[manager].lockFile);
      if (fs.existsSync(lockFile)) {
        currentPackageManager = manager;
        break;
      }
    }

    if (!currentPackageManager) {
      throw new Error(
        "Could not identify package manager. Supported: npm, yarn, pnpm, bun"
      );
    }

    const installCommand =
      packageManagers[currentPackageManager].installCommand;
    const output = execSync(installCommand, { stdio: "pipe" }).toString();
    console.log(`stdout:\n${output}`);

    const nextVersionMatch = output.match(/next@(.*)/);
    if (nextVersionMatch) {
      console.log(
        `Successfully upgraded Next.js to version: ${nextVersionMatch[1]}`
      );
    } else {
      console.warn(
        "Next.js version not found in output. Upgrade might be incomplete."
      );
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit with non-zero code to indicate failure
  }
}
run();
console.log("Upgraded Next.js to the latest version");

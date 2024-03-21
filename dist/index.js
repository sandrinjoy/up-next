#! /usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 81:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

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
    const { execSync } = __nccwpck_require__(81);
    const fs = __nccwpck_require__(147);
    const path = __nccwpck_require__(17);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;
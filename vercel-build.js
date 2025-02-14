const { execSync } = require("child_process");

execSync("ng build:ssr", { stdio: "inherit" });
execSync("cp -r dist/client dist/public", { stdio: "inherit" });

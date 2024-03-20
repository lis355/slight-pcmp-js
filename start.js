import normalizePath from "./tools/normalizePath.js";
import SlightApplication from "./components/app/SlightApplication.js";

process.env.CWD = normalizePath(process.cwd());

const application = new SlightApplication();
await application.initialize();
await application.run();

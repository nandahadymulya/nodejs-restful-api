import { web } from "./apps/web.js";
import { logger } from "./apps/logging.js";

web.listen(300, () => {
  logger.info("Node.js RESTfull API started");
});

import { createSignal } from "solid-js";
import { createScopedLogger } from "../utils/logger";

const logger = createScopedLogger("[documentState]");

const localDocumentAddEventListener = document.addEventListener.bind(document);
const localDocumentRemoveEventListener =
  document.removeEventListener.bind(document);

const [documentReadyStateIsComplete, setDocumentReadyStateIsComplete] =
  createSignal(false);

if (document.readyState !== "complete") {
  // log("document readyState", document.readyState, "adding listener, waiting for reasyState complete event");
  localDocumentAddEventListener(
    "readystatechange",
    function readyStateChange() {
      if (document.readyState === "complete") {
        localDocumentRemoveEventListener("readystatechange", readyStateChange);
        logger.log(
          "document readyState complete event received, setting state true"
        );
        setDocumentReadyStateIsComplete(true);
      }
    }
  );
} else {
  setDocumentReadyStateIsComplete(true);
}

export default documentReadyStateIsComplete;

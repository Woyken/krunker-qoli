// ==UserScript==
// @name        Krunker.io Quality of life improvements
// @namespace   Violentmonkey Scripts
// @match       https://krunker.io/
// @grant       none
// @version     0.2
// @author      Woyken
// @description Krunker.io quality of life improvements such as removing ad popups, faster respawn (after death, click any button to respawn)
// @run-at document-start
// @downloadURL  https://woyken.github.io/krunker-qoli/script.user.js
// ==/UserScript==

const enableDebugLogs = false;

const localGetElementById = document.getElementById.bind(document);
const localDocumentGetElementsByTagName = document.getElementsByTagName.bind(document);
const localDocumentCreateEvent = document.createEvent.bind(document);
const localDocumentAddEventListener = document.addEventListener.bind(document);
const localDocumentRemoveEventListener = document.removeEventListener.bind(document);
const localMutationObserver = MutationObserver;
const localArrayFrom = Array.from.bind(Array);
const localConsoleLog = console.log.bind(console);

function log(...args) {
  if (enableDebugLogs) localConsoleLog(...args);
}

let isUserInGame = false;

function setCurrentlyInGame(isInGame) {
  if (isUserInGame === isInGame) return;
  isUserInGame = isInGame;
  // weapDisplay.style is block when player is alive and if game over screen is on
  // killCardHolder.style when kill cam is active?
  log("isUserInGame", isUserInGame);
  handleFastRespawn();
}

let isUserInDeathWindow = false;

function setIsDeathWindow(isDeathWindow) {
  if (isUserInDeathWindow === isDeathWindow) return;
  isUserInDeathWindow = isDeathWindow;
  log("isUserInDeathWindow", isUserInDeathWindow);
  handleFastRespawn();
}

function setIsAdPopupActive(isAdPopupActive) {
  if (isAdPopupActive) {
    log("popup active, killing it");
    localGetElementById("popupBack").click();
  }
}


function handleFastRespawn() {
  if (isUserInDeathWindow && !isUserInGame) {
    // after clicking on canvas it makes a request to capture mouse cursor
    // this requires genuine user action
    function tryToActivateGame() {
      const node = localArrayFrom(localDocumentGetElementsByTagName("canvas")).pop();
      var mouseDownEvent = localDocumentCreateEvent('MouseEvents');
      mouseDownEvent.initEvent ('mousedown', true, true);
      node.dispatchEvent(mouseDownEvent);
      var mouseUpEvent = localDocumentCreateEvent('MouseEvents');
      mouseUpEvent.initEvent ('mouseup', true, true);
      node.dispatchEvent(mouseUpEvent);
    }
    
    // try to make this work instantly in case user is already holding a button or something
    tryToActivateGame();
    
    // register for any keyboard event, and activate game
    localDocumentAddEventListener(
      'keydown', 
      function keyEventListener(keyEvent) {
        localDocumentRemoveEventListener('keydown', keyEventListener);
        log("key event received, activating game", keyEvent);
        tryToActivateGame();
      });
  }
}

function createMutationObserverForStyles(styleChangedCallback) {
  return new localMutationObserver((mutationList, observer) => {
    for(const mutation of mutationList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        styleChangedCallback(mutation.target.style);
      }
    }
  });
}

function createMutationObserverForStylesIfDisplayBlock(callback) {
  return createMutationObserverForStyles((style) => {
    const isDisplayBlock = style.display === 'block';
    callback(isDisplayBlock);
  });
}

log("Creating mutation observers");
const ingameuiobserver = createMutationObserverForStylesIfDisplayBlock(setCurrentlyInGame);
const killCardHolderObserver = createMutationObserverForStylesIfDisplayBlock(setIsDeathWindow);
const adPopupHolderObserver = createMutationObserverForStylesIfDisplayBlock(setIsAdPopupActive);

function initObservers() {
  log("Initializing mutation observers");
  const styleObserveConfig = { attributes: true, attributeFilter: ["style"] };
  ingameuiobserver.observe(localGetElementById("inGameUI"), styleObserveConfig);
  killCardHolderObserver.observe(localGetElementById("killCardHolder"), styleObserveConfig);
  adPopupHolderObserver.observe(localGetElementById("popupHolder"), styleObserveConfig);
}

function init() {
  initObservers();
}

if (document.readyState !== 'complete') {
  log("document readyState", document.readyState, "adding listener, waiting for reasyState complete event");
  localDocumentAddEventListener('readystatechange', function readyStateChange() {
    if (document.readyState === 'complete') {
      localDocumentRemoveEventListener('readystatechange', readyStateChange);
      log("document readyState complete event received, initializing script...");
      init();
    }
  });
} else {
  log("document readyState = complete, WARNING! It might not work... Script likely needs to be run earlier than this. Initializing anyway...");
  init();
}


chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.get(["pinned"]).then((result) => {
    if (typeof result.pinned === "undefined") {
      chrome.storage.sync.set({ pinned: [] });
    }
  });
});

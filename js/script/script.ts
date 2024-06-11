import { Nav } from "./nav";
import { Observer } from "./observer";
import { Link } from "./types";

console.log("Started");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  chrome.storage.sync.get(["pinned"]).then(async (result) => {
    if (typeof result.pinned === "undefined") {
      chrome.storage.sync.set({ pinned: [] });
      result.pinned = [];
    }

    const pinned_links = result.pinned;
    console.log(pinned_links);

    const allKeys: string[] = await new Promise((resolve) => {
      chrome.storage.sync.get(null, (items) => {
        resolve(Object.keys(items));
      });
    });

    const indexKeys: string[] = allKeys.filter((key: string) =>
      key.startsWith("index_")
    );

    const indexChunks: any[] = await new Promise((resolve) => {
      chrome.storage.sync.get(indexKeys, (items) => {
        resolve(indexKeys.map((key: string) => items[key]));
      });
    });

    const combinedIndex: Link[] = ([] as Link[]).concat(...indexChunks);

    const nav = new Nav(pinned_links);
    const observer = new Observer(pinned_links, nav, combinedIndex);
  });
});

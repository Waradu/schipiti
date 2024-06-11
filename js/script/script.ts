import { Nav } from "./nav";
import { Observer } from "./observer";
import { Search } from "./search";
import { Link } from "./types";

chrome.storage.sync.get(["pinned", "index"]).then(async (result) => {
  if (typeof result.pinned === "undefined") {
    chrome.storage.sync.set({ pinned: [] });
  }

  var pinned_links: Link[] = result.pinned;

  const nav = new Nav(pinned_links);

  const observer = new Observer(pinned_links, nav);

  const search = new Search();
  /* await search.init(); */
  console.log(search.items);
});

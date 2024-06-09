import { getSvg } from "./html";
import { Nav } from "./nav";
import { Observer } from "./observer";
import { Link } from "./types";

chrome.storage.sync.get(["pinned"]).then((result) => {
  var pinned_links: Link[] = result.pinned;

  console.log(pinned_links);

  const nav = new Nav(pinned_links);

  const observer = new Observer(pinned_links, nav);
});

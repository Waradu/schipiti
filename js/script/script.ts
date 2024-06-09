import { getSvg } from "./html";
import { Nav } from "./nav";
import { Link } from "./types";

chrome.storage.sync.get(["pinned"]).then((result) => {
  var pinned_links: Link[] = result.pinned;

  console.log(pinned_links);

  const nav = new Nav(pinned_links);

  const applyLinkFunctionality = (item) => {
    const linkElement = item.querySelector("a");
    const link = linkElement.href;
    const name = linkElement.querySelector('div[dir="auto"]').innerText;
    var pinned = pinned_links.some((l) => l.link === link);

    const waitForButton = (item, callback, interval = 100, timeout = 5000) => {
      const startTime = Date.now();

      const checkButton = () => {
        const menu = item.querySelector("button");

        if (menu) {
          if (menu.classList.contains("no_event_listener")) return;
          callback(menu);
        } else if (Date.now() - startTime < timeout) {
          setTimeout(checkButton, interval);
        } else {
          console.log("Button not found within timeout");
        }
      };

      checkButton();
    };

    waitForButton(item, (menu) => {
      menu.addEventListener("click", () => {
        const popup = document.querySelector('[role="menu"]');

        const pin = document.createElement("div");

        pin.setAttribute("role", "menuitem");
        pin.setAttribute("tabindex", "-1");
        pin.setAttribute("data-orientation", "vertical");
        pin.setAttribute("data-radix-collection-item", "");

        pin.classList.add(
          "flex",
          "items-center",
          "m-1.5",
          "p-2.5",
          "text-sm",
          "cursor-pointer",
          "focus-visible:outline-0",
          "radix-disabled:pointer-events-none",
          "radix-disabled:opacity-50",
          "group",
          "relative",
          "hover:bg-[#f5f5f5]",
          "focus-visible:bg-[#f5f5f5]",
          "dark:hover:bg-token-main-surface-secondary",
          "dark:focus-visible:bg-token-main-surface-secondary",
          "rounded-md",
          "my-0",
          "px-3",
          "mx-2",
          "radix-state-open:bg-[#f5f5f5]",
          "dark:radix-state-open:bg-token-main-surface-secondary",
          "gap-2.5",
          "py-3"
        );

        const innerDiv = document.createElement("div");

        innerDiv.classList.add(
          "flex",
          "items-center",
          "justify-center",
          "text-token-text-secondary",
          "h-5",
          "w-5"
        );

        innerDiv.innerHTML = getSvg(pinned);

        pin.appendChild(innerDiv);

        const textNode = document.createTextNode(pinned ? "Unpin" : "Pin");

        pin.appendChild(textNode);

        popup.insertBefore(pin, popup.firstChild);

        pin.addEventListener("click", () => {
          chrome.storage.sync.get(["pinned"]).then((result) => {
            pinned_links = pinned
              ? result.pinned.filter((l) => l.link !== link)
              : [...result.pinned, { link: link, name: name }];
            chrome.storage.sync.set({ pinned: pinned_links });
            pinned = !pinned;
            innerDiv.innerHTML = getSvg(pinned);
          });
        });
      });
    });
  };

  // Create a MutationObserver to watch for new items
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches("ol>li>.group:has(a)")) {
          applyLinkFunctionality(node);
        }

        // Check for nested elements if the added node is not the target but contains it
        if (node.nodeType === 1 && node.querySelectorAll) {
          const nestedItems = node.querySelectorAll("ol>li>.group:has(a)");
          nestedItems.forEach((nestedItem) => {
            applyLinkFunctionality(nestedItem);
          });
        }
      });
    });
  });

  // Start observing the document for changes in child elements
  observer.observe(document.body, { childList: true, subtree: true });

  // Apply to existing items
  document.querySelectorAll("ol>li>.group:has(a)").forEach((item) => {
    applyLinkFunctionality(item);
  });
});

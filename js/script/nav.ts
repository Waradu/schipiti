import { getCustomChatItem, getSvg } from "./html";
import toastr from "./toast";
import { Link } from "./types";

export class Nav {
  group: HTMLElement | null = null;
  ol: HTMLElement | null = null;

  constructor(pinned_links: Link[]) {
    const nav = document.querySelector("nav");

    if (!nav) {
      toastr.error("Nav not found");
      return;
    }

    const list = nav.querySelector(
      "div.flex-col.flex-1.transition-opacity.duration-500.-mr-2.pr-2.overflow-y-auto > div.flex.flex-col.gap-2.pb-2.text-token-text-primary.text-sm.juice\\:mt-5"
    );

    if (!list) return;

    this.group = document.createElement("div");
    this.group.classList.add("pinned");

    list.appendChild(this.group);

    const div1 = document.createElement("div");
    div1.classList.add(
      "relative",
      "empty:mt-0",
      "empty:hidden",
      "juice:first:mt-0",
      "wrdu_border"
    );
    div1.style.height = "auto";
    div1.style.opacity = "1";

    const div2 = document.createElement("div");
    div2.classList.add(
      "juice:sticky",
      "juice:top-0",
      "juice:z-20",
      "juice:bg-token-sidebar-surface-primary"
    );

    const span = document.createElement("span");
    span.classList.add("flex", "h-9", "items-center");

    const h3 = document.createElement("h3");
    h3.classList.add(
      "pb-2",
      "pt-3",
      "px-2",
      "text-xs",
      "font-semibold",
      "text-ellipsis",
      "overflow-hidden",
      "break-all",
      "text-token-text-secondary"
    );
    h3.textContent = "Pinned";

    this.ol = document.createElement("ol");

    span.appendChild(h3);
    div2.appendChild(span);
    div1.appendChild(div2);
    div1.appendChild(this.ol);

    this.group.appendChild(div1);

    if (pinned_links.length > 0) {
      pinned_links.forEach((link) => {
        this.add(link.link, link.name);
      });
    } else {
      this.hide();
    }
  }

  show() {
    if (!this.group) return;

    this.group.style.display = "block";
  }

  hide() {
    if (!this.group) return;

    this.group.style.display = "none";
  }

  remove(link: string) {
    if (!this.ol) return;

    this.ol.querySelectorAll("li").forEach((li) => {
      const a = li.querySelector("a");
      if (a && a.href === link) {
        li.remove();
      }
    });
  }

  add(link: string, name: string) {
    if (!this.ol) return;

    this.show();

    const [li, button] = getCustomChatItem(true, link, name);

    this.ol?.appendChild(li);

    button.addEventListener("click", () => {
      chrome.storage.sync.get(["pinned"]).then((result) => {
        const pinned_links = result.pinned.filter((l: Link) => l.link !== link);
        chrome.storage.sync.set({ pinned: pinned_links });
        li.remove();
        if (pinned_links.length <= 0) {
          this.hide();
        }
      });
    });
  }
}

import { getSvg } from "./html";
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

    const li = document.createElement("li");
    li.classList.add("relative");
    li.style.opacity = "1";
    li.style.height = "auto";

    const pinned_div1 = document.createElement("div");
    pinned_div1.classList.add(
      "group",
      "relative",
      "rounded-lg",
      "active:opacity-90",
      "hover:bg-token-sidebar-surface-secondary"
    );

    const a = document.createElement("a");
    a.href = link;
    a.classList.add("flex", "items-center", "gap-2", "p-2");

    const pinned_div2 = document.createElement("div");
    pinned_div2.classList.add(
      "relative",
      "grow",
      "overflow-hidden",
      "whitespace-nowrap"
    );
    pinned_div2.setAttribute("dir", "auto");
    pinned_div2.innerHTML = name;

    const pinned_div3 = document.createElement("div");
    pinned_div3.classList.add(
      "absolute",
      "bottom-0",
      "top-0",
      "to-transparent",
      "ltr:right-0",
      "ltr:bg-gradient-to-l",
      "rtl:left-0",
      "rtl:bg-gradient-to-r",
      "from-token-sidebar-surface-primary",
      "group-hover:from-token-sidebar-surface-secondary",
      "w-8",
      "group-hover:w-20",
      "group-hover:from-60%",
      "juice:group-hover:w-10"
    );

    pinned_div2.appendChild(pinned_div3);
    a.appendChild(pinned_div2);
    pinned_div1.appendChild(a);

    const pinned_div4 = document.createElement("div");
    pinned_div4.classList.add(
      "absolute",
      "bottom-0",
      "top-0",
      "items-center",
      "gap-1.5",
      "pr-2",
      "ltr:right-0",
      "rtl:left-0",
      "hidden",
      "group-hover:flex"
    );

    const span = document.createElement("span");
    span.setAttribute("data-state", "closed");

    const button = document.createElement("button");
    button.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "text-token-text-primary",
      "transition",
      "hover:text-token-text-secondary",
      "radix-state-open:text-token-text-secondary",
      "juice:text-token-text-secondary",
      "juice:hover:text-token-text-primary",
      "no_event_listener"
    );
    button.type = "button";
    button.title = "Click to remove pinned";
    button.id = "radix-:r32:";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("data-state", "closed");
    button.innerHTML = getSvg(true);

    span.appendChild(button);
    pinned_div4.appendChild(span);
    pinned_div1.appendChild(pinned_div4);

    li.appendChild(pinned_div1);
    this.ol?.appendChild(li);

    button.addEventListener("click", () => {
      chrome.storage.sync.get(["pinned"]).then((result) => {
        const pinned_links = result.pinned.filter((l: Link) => l.link !== link);
        chrome.storage.sync.set({ pinned: pinned_links });
        li.remove();
      });
    });
  }
}

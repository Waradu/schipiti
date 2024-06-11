import { getCustomChatItem } from "./html";
import { ApiResponse, ChatItem, Link } from "./types";
import toastr from "./toast";

export class Search {
  items: Link[] = [];
  group: HTMLElement | null = null;
  chats: HTMLElement | null = null;
  results: HTMLElement | null = null;

  constructor(items: Link[]) {
    console.log(items);
    this.items = items;
    return;

    const nav = document.querySelector("nav");

    if (!nav) {
      toastr.error("Nav not found");
      return;
    }

    const list = nav.querySelector(
      "div.flex-col.flex-1.transition-opacity.duration-500.-mr-2.pr-2.overflow-y-auto > div.flex.flex-col.gap-2.pb-2.text-token-text-primary.text-sm.juice\\:mt-5"
    );

    if (!list) {
      toastr.error("List not found");
      return;
    }

    this.group = list.querySelector("div.pinned");

    if (!this.group) {
      toastr.error("Pinned group not found");
      return;
    }

    this.results = document.createElement("div");
    this.results.classList.add("results");

    list.insertBefore(this.results, list.firstChild);

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

    const input = document.createElement("input");
    input.classList.add(
      "pb-2",
      "pt-2",
      "px-2",
      "text-xs",
      "font-semibold",
      "text-ellipsis",
      "overflow-hidden",
      "break-all",
      "text-token-text-secondary",
      "wrdu_input"
    );
    input.type = "text";
    input.placeholder = "Search...";

    const ol = document.createElement("ol");

    span.appendChild(input);
    div2.appendChild(span);
    div1.appendChild(div2);
    div1.appendChild(ol);

    input.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;

      this.chats = list.querySelector("div:not([class])");

      if (!this.chats) {
        toastr.error("Chats not found");
        return;
      }

      console.log("c");

      if (!target || !this.chats) return;

      const text = target.value;

      console.log("t");

      if (text == "") {
        ol.innerHTML = "";
        this.chats.style.display = "block";
      } else {
        console.log("e");
        ol.innerHTML = "";
        this.chats.style.display = "none";
        const [li, button] = getCustomChatItem(false, text, "");
        ol.appendChild(li);
      }
    });

    this.results.appendChild(div1);
  }

  add(item: Link) {
    const existingItemIndex = this.items.findIndex(
      (existingItem) => existingItem.link === item.link
    );
    if (existingItemIndex !== -1) {
      this.items[existingItemIndex] = item;
    } else {
      this.items.push(item);
    }
  }

  async sync() {
    if (this.items.length > 1000) {
      this.items = this.items.slice(this.items.length - 1000);
    }

    const chunks = [];
    const chunkSize = 90;

    for (let i = 0; i < this.items.length; i += chunkSize) {
      chunks.push(this.items.slice(i, i + chunkSize));
    }

    const storagePromises = chunks.map((chunk, index) => {
      return chrome.storage.sync.set({ [`index_${index}`]: chunk });
    });

    await Promise.all(storagePromises);
    console.log("synced", this.items);
  }
}

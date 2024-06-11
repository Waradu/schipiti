import { ApiResponse, ChatItem } from "./types";

export class Search {
  items: ChatItem[] = [];
  fetches = 10;

  constructor() {
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
  }

  async init() {
    const requests = [];

    for (let offset = 0; offset < this.fetches; offset += 1) {
      console.log(offset * 100);
      requests.push(
        fetch(
          `https://chatgpt.com/backend-api/conversations?offset=${
            offset * 100
          }&limit=100&order=updated`,
          {
            headers: {
              Authorization: "xxx",
            },
          }
        )
          .then((res) => res.json())
          .catch((error) => {
            console.error(`Fetch error for offset ${offset * 100}:`, error);
            return null;
          })
      );
    }

    const jsonResponses = await Promise.all(requests);

    jsonResponses.forEach((json: ApiResponse | null) => {
      if (json) {
        json.items.forEach((item) => {
          const existingItemIndex = this.items.findIndex(
            (existingItem) => existingItem.id === item.id
          );
          if (existingItemIndex !== -1) {
            this.items[existingItemIndex] = item;
          } else {
            this.items.push(item);
          }
        });
      }
    });
  }
}

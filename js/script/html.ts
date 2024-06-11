export function getSvg(pinned: boolean) {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      class="h-5 w-5 shrink-0"
    >
      <path
        ${pinned ? 'fill="currentColor"' : 'stroke="currentColor"'}
        fill-rule="evenodd"
        d="M16.0592 3.8999H7.95109C6.16898 3.8999 4.70996 5.30644 4.70996 7.02444V18.4376C4.70996 19.8944 5.79382 20.5173 7.11737 19.8039L11.2131 17.6037C11.6508 17.3726 12.3595 17.3726 12.7868 17.6037L16.8825 19.8039C18.2061 20.5173 19.2899 19.8944 19.2899 18.4376V7.02444C19.3003 5.30644 17.8413 3.8999 16.0592 3.8999Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        clip-rule="evenodd"
      ></path>
    </svg>
  `;
}

export function getCustomChatItem(pinned: boolean, link: string, name: string) {
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
  button.innerHTML = getSvg(pinned);

  span.appendChild(button);
  pinned_div4.appendChild(span);
  pinned_div1.appendChild(pinned_div4);

  li.appendChild(pinned_div1);

  return [li, button];
}

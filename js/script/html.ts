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

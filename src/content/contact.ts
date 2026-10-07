import type { Contact } from "./types";

// CONTENT.md > Contact, verbatim. The looking-for values are verbatim fragments of the
// Contact line and the Identity status and location lines (PLAN.md §5.4).
export const contact: Contact = {
  heading: "Let's talk.",
  line: "Open to full-stack and AI engineering roles in the UK.",
  lookingFor: [
    { id: "role", value: "full-stack and AI engineering roles in the UK" },
    { id: "working", value: "Open to hybrid working." },
    { id: "based", value: "Stoke-on-Trent, UK" },
    { id: "visa", value: "Eligible to work in the UK without sponsorship." },
  ],
};

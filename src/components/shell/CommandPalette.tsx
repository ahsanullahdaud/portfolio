"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { filterItems, paletteGroups, type PaletteItem } from "@/content/palette";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { PALETTE_EVENT, isEditableTarget, keys } from "@/lib/keys";

/**
 * Command palette (PLAN.md §6). Opens on Ctrl K, ⌘ K, "/" (not while typing) and the
 * path-bar button; closes on Esc, outside click, or after running an item. A modal
 * dialog: while open the shell is `inert`, body scroll is locked, Tab cycles between
 * the input and the close button, and focus returns to the opener on close. The list
 * is a listbox driven from the input through aria-activedescendant.
 */
export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const listId = `${baseId}-list`;
  const optionId = (item: PaletteItem) => `${baseId}-${item.id}`;

  const matches = useMemo(() => filterItems(query), [query]);
  const activeItem = matches[active];

  function toggle() {
    setQuery("");
    setActive(0);
    setOpen((value) => !value);
  }

  function close() {
    setOpen(false);
  }

  // Global shortcuts and the path-bar button event.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const modifier = (event.ctrlKey || event.metaKey) && !event.altKey;
      const isPaletteKey = modifier && event.key.toLowerCase() === keys.palette;
      const isSlash =
        event.key === keys.paletteAlt &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !isEditableTarget(event.target);
      if (!isPaletteKey && !isSlash) return;
      event.preventDefault();
      toggle();
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(PALETTE_EVENT, toggle);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(PALETTE_EVENT, toggle);
    };
  }, []);

  // While open: mark <html>, make the shell inert, lock body scroll, focus the input.
  // On close: undo all of it and return focus to the opener.
  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const html = document.documentElement;
    const shell = document.getElementById("shell");
    const previousOverflow = document.body.style.overflow;
    html.dataset.paletteOpen = "true";
    shell?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      delete html.dataset.paletteOpen;
      shell?.removeAttribute("inert");
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function run(item: PaletteItem) {
    close();
    switch (item.action.type) {
      case "route":
        router.push(item.action.href);
        break;
      case "external":
        window.open(item.action.href, "_blank", "noopener,noreferrer");
        break;
      case "mailto":
        window.location.assign(item.action.href);
        break;
      case "download": {
        const anchor = document.createElement("a");
        anchor.href = item.action.href;
        anchor.download = "";
        anchor.click();
        break;
      }
      case "theme":
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        break;
    }
  }

  function onDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const count = matches.length;
    switch (event.key) {
      case keys.close:
        event.preventDefault();
        close();
        break;
      case "ArrowDown":
        event.preventDefault();
        setActive((i) => (count ? (i + 1) % count : 0));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((i) => (count ? (i - 1 + count) % count : 0));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(Math.max(0, count - 1));
        break;
      case "Enter":
        event.preventDefault();
        if (activeItem) run(activeItem);
        break;
      case "Tab": {
        // Focus trap: the only tab stops are the input and the close button.
        event.preventDefault();
        const next = document.activeElement === inputRef.current ? closeRef.current : inputRef.current;
        next?.focus();
        break;
      }
    }
  }

  function onBackdropMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) close();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overscroll-contain bg-bg/70 p-4 pt-[12vh] sm:pt-[16vh]"
      onMouseDown={onBackdropMouseDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onDialogKeyDown}
        className="flex w-full max-w-xl flex-col overflow-hidden rounded-card border border-line bg-surface shadow-xl motion-safe:animate-[screen-enter_var(--dur-2)_var(--ease)_both]"
      >
        <h2 id={titleId} className="sr-only">
          {ui.palette.title}
        </h2>
        <div className="flex items-center gap-3 border-b border-line px-4 font-mono text-sm">
          <span aria-hidden="true" className="shrink-0">
            <span className="text-ok">{ui.prompt.path}</span> <span className="text-accent-text">{ui.prompt.symbol}</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={true}
            aria-controls={listId}
            aria-activedescendant={activeItem ? optionId(activeItem) : undefined}
            aria-autocomplete="list"
            aria-label={ui.palette.title}
            placeholder={ui.palette.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            autoComplete="off"
            spellCheck={false}
            className="h-12 min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-muted"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={ui.palette.close}
            className="shrink-0 rounded-ui border border-line px-1.5 py-0.5 text-[11px] text-muted transition-colors hover:border-fg hover:text-fg"
          >
            {ui.palette.closeHint}
          </button>
        </div>

        <div ref={listRef} id={listId} role="listbox" aria-label={ui.palette.title} className="max-h-[50vh] overflow-y-auto p-2">
          {matches.length === 0 && (
            <p className="px-3 py-6 text-center font-mono text-sm text-muted">{ui.palette.empty}</p>
          )}
          {paletteGroups.map((group) => {
            const items = matches.filter((item) => item.group === group);
            if (items.length === 0) return null;
            const groupId = `${baseId}-group-${group}`;
            return (
              <div key={group} role="group" aria-labelledby={groupId}>
                <div id={groupId} className="px-3 pt-2 pb-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
                  {ui.palette.groups[group]}
                </div>
                {items.map((item) => {
                  const index = matches.indexOf(item);
                  const selected = index === active;
                  const external = item.action.type === "external";
                  return (
                    <div
                      key={item.id}
                      id={optionId(item)}
                      role="option"
                      aria-selected={selected}
                      aria-label={external ? `${item.label} ${ui.a11y.opensInNewTab}` : undefined}
                      data-index={index}
                      onMouseEnter={() => setActive(index)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => run(item)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-ui px-3 py-2 font-mono text-sm",
                        selected ? "bg-surface-2 text-fg" : "text-fg-2",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span aria-hidden="true" className={cn("text-accent-text", !selected && "invisible")}>
                          ›
                        </span>
                        <span className="truncate">{item.label}</span>
                        {external && <span aria-hidden="true">{ui.glyphs.newTab}</span>}
                      </span>
                      {item.hint && <span className="shrink-0 text-xs text-muted">{item.hint}</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <p className="border-t border-line px-4 py-2 font-mono text-[11px] text-muted">{ui.palette.footer}</p>
      </div>
    </div>
  );
}

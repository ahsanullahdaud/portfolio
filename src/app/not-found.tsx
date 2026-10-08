import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/cards/Card";
import { NotFoundPath } from "@/components/shell/NotFoundPath";
import { Screen } from "@/components/shell/Screen";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";

export const metadata: Metadata = {
  title: ui.meta.pages.notFound,
};

// 404 (PLAN.md §5.5): one card with the prompt line, the shell's error line and a way home.
// Renders inside the shell, so the dock still works.
export default function NotFound() {
  return (
    <Screen rows={3}>
      <Card as="section" className="sm:col-span-6 lg:col-span-6 lg:col-start-1 lg:row-start-1">
        <NotFoundPath />
        <div className="flex flex-col gap-3 font-mono text-sm">
          <p className="text-muted">{ui.notFound.message}</p>
          <Link href={screen.index.route} className="self-start text-accent-text hover:underline">
            {ui.notFound.back}
          </Link>
        </div>
      </Card>
    </Screen>
  );
}

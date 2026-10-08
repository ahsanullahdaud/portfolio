import type { Metadata } from "next";
import { ContactHeroCard } from "@/components/cards/contact/ContactHeroCard";
import { EmailCard } from "@/components/cards/contact/EmailCard";
import { LinkCard } from "@/components/cards/contact/LinkCard";
import { LookingForCard } from "@/components/cards/contact/LookingForCard";
import { SiteCard } from "@/components/cards/contact/SiteCard";
import { Screen } from "@/components/shell/Screen";
import { identity } from "@/content/identity";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";

export const metadata: Metadata = {
  title: ui.meta.pages.contact,
  alternates: { canonical: screen.contact.route },
};

/** The last path segment of a profile URL, shown as the handle under a link card's title. */
function handleOf(url: string): string {
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? url;
}

// Contact (PLAN.md §5.4, design/MOCKUP_SPEC.md §7): hero in columns 1-5 across all
// three rows; email, the three link cards, looking-for and this-site in columns 6-12.
// DOM order is also the phone order in §5.6.
export default function Contact() {
  return (
    <Screen rows={screen.contact.rows}>
      <ContactHeroCard className="sm:col-span-6 lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1" />
      <EmailCard className="sm:col-span-6 lg:col-span-7 lg:col-start-6 lg:row-start-1" />
      <LinkCard
        label={ui.labels.profile}
        title={ui.contactCards.linkedin}
        handle={handleOf(identity.linkedin)}
        href={identity.linkedin}
        kind="external"
        className="sm:col-span-2 lg:col-span-3 lg:col-start-6 lg:row-start-2"
      />
      <LinkCard
        label={ui.labels.code}
        title={ui.contactCards.github}
        handle={handleOf(identity.github)}
        href={identity.github}
        kind="external"
        className="sm:col-span-2 lg:col-span-2 lg:col-start-9 lg:row-start-2"
      />
      <LinkCard
        label={ui.labels.download}
        title={ui.contactCards.cv}
        handle={identity.cvPath.replace(/^\//, "")}
        href={identity.cvPath}
        kind="download"
        className="sm:col-span-2 lg:col-span-2 lg:col-start-11 lg:row-start-2"
      />
      <LookingForCard className="sm:col-span-3 lg:col-span-4 lg:col-start-6 lg:row-start-3" />
      <SiteCard className="sm:col-span-3 lg:col-span-3 lg:col-start-10 lg:row-start-3" />
    </Screen>
  );
}

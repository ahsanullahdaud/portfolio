// Temporary Index placeholder for step 3. Content moves to src/content in step 6
// and the real cards arrive in step 7.
export default function Index() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-5">
      <p className="font-mono text-sm text-muted">
        <span className="text-ok">~/ahsan</span>{" "}
        <span className="text-accent-text">$</span>{" "}
        <span className="text-fg">whoami</span>
      </p>
      <h1 className="font-display text-[clamp(46px,5.3vw,76px)] font-bold leading-[0.98] tracking-[-0.03em] text-fg">
        Ahsan Ullah
        <br />
        Daud
      </h1>
      <p className="font-mono text-base font-medium text-accent-text">
        Full-Stack Web Developer
      </p>
      <p className="max-w-prose font-sans text-[15px] leading-relaxed text-fg-2">
        I take ideas from a rough brief to a live product, and I build AI-first
        with Claude Code.
      </p>
    </main>
  );
}

const stages = [
  { label: "PUSH", detail: "git push origin main" },
  { label: "BUILD", detail: "npm ci && npm run build" },
  { label: "TEST", detail: "verify build output" },
  { label: "DEPLOY", detail: "sync to S3" },
  { label: "LIVE", detail: "CloudFront invalidated" },
]

export default function Hero() {
  return (
    <section id="about" className="border-b border-line">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-6 font-mono text-xs text-teal">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
          </span>
          STATUS: OPEN TO DEVOPS &amp; CLOUD ROLES
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-ink mb-5">
          Pradeep K
        </h1>
        <p className="text-faint text-lg max-w-xl leading-relaxed mb-14">
          B.Tech IT graduate building automated, production-style deployments —
          from infrastructure as code to CI/CD pipelines that ship on every push.
        </p>

        <div className="font-mono text-xs text-faint mb-4">// DEPLOYMENT PIPELINE — THIS SITE, RIGHT NOW</div>

        <div className="relative border border-line bg-panel rounded-lg px-6 py-8 overflow-hidden">
          <div className="absolute top-1/2 left-6 right-6 h-px bg-line -translate-y-1/2" />
          <div className="absolute top-1/2 left-6 right-6 h-px -translate-y-1/2 overflow-hidden">
            <div className="pipeline-pulse absolute h-px w-16 bg-gradient-to-r from-transparent via-amber to-transparent" />
          </div>

          <div className="relative flex justify-between">
            {stages.map((stage, i) => (
              <div key={stage.label} className="flex flex-col items-center text-center w-1/5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber mb-3 ring-4 ring-panel" />
                <div className="font-mono text-[11px] tracking-wide text-ink mb-1">
                  {String(i + 1).padStart(2, "0")} · {stage.label}
                </div>
                <div className="font-mono text-[10px] text-faint hidden md:block">{stage.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

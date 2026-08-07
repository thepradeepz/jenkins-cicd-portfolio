export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm font-semibold text-ink tracking-tight">
            Pradeep K
          </span>
          <span className="font-mono text-[10px] text-amber tracking-wide">
            DEVOPS · CLOUD ENGINEER
          </span>
        </div>
        <div className="flex gap-6 font-mono text-xs text-faint">
          <a href="#about" className="hover:text-ink transition-colors">about</a>
          <a href="#projects" className="hover:text-ink transition-colors">projects</a>
          <a href="#contact" className="hover:text-ink transition-colors">contact</a>
        </div>
      </div>
    </nav>
  )
}

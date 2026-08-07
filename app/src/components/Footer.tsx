export default function Footer() {
  return (
    <footer className="py-8 text-center font-mono text-[11px] text-faint">
      © {new Date().getFullYear()} Pradeep K · built with React, shipped via GitHub Actions
    </footer>
  )
}

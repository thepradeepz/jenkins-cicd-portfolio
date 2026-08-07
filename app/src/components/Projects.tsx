const projects = [
  {
    title: "Portfolio — CI/CD on AWS",
    description:
      "React site deployed to S3 + CloudFront via GitHub Actions, with OIDC-based authentication and infrastructure fully defined in Terraform.",
    tech: ["Terraform", "AWS S3", "CloudFront", "GitHub Actions", "OIDC"],
  },
  {
    title: "Containerized App Deployment",
    description:
      "Containerized a web app with Docker, deployed to Kubernetes with self-healing pods and replica-based scaling. CI/CD cut deploy time from 15 minutes to under 3.",
    tech: ["Docker", "Kubernetes", "GitHub Actions", "CloudWatch"],
  },
  {
    title: "Cloud Infra Automation",
    description:
      "Provisioned AWS infrastructure with modular Terraform and a remote S3 backend for state. Ansible playbooks automated server configuration.",
    tech: ["Terraform", "Ansible", "AWS", "Route 53"],
  },
  {
    title: "Highly Available 3-Tier Architecture",
    description:
      "Multi-AZ VPC with public/private subnets, Auto Scaling Groups, Application Load Balancers, a Bastion Host, and an RDS MySQL backend.",
    tech: ["VPC", "EC2", "ALB", "RDS", "MySQL"],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="font-mono text-xs text-faint mb-2">// PROJECTS</div>
        <h2 className="font-display text-2xl font-semibold text-ink mb-10">What I've built</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.title}
              className="border border-line bg-panel rounded-lg p-6 hover:border-amber/50 transition-colors"
            >
              <h3 className="font-display font-medium text-ink mb-2">{p.title}</h3>
              <p className="text-sm text-faint leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-teal border border-line rounded px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

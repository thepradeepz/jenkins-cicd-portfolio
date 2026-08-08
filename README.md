# Jenkins CI/CD — Portfolio Deployment on Self-Managed AWS Infrastructure

A version of my portfolio project built to explore self-hosted CI/CD, after building the same pipeline with GitHub Actions (a fully managed service) in earlier projects. This one uses Jenkins running on my own EC2 instance, giving me hands-on experience with the parts a managed CI/CD service normally hides — provisioning the server, installing and troubleshooting the runtime, and managing credentials directly.

**Live site:** [add your CloudFront URL here]
**Repository:** https://github.com/thepradeepz/jenkins-cicd-portfolio

---

## Why build this separately

GitHub Actions handles server provisioning, runtime setup, and credential storage automatically. Jenkins doesn't — you're responsible for all of it yourself. Building this version was about understanding that difference firsthand: what a CI/CD tool actually needs underneath, and what a managed service is quietly doing for you.

---

## Technology Stack

**Frontend:** React + TypeScript + Vite, Tailwind CSS

**Infrastructure (AWS):**
- EC2 (`t3.micro`) — hosts Jenkins itself
- S3 — private bucket storing the built site
- CloudFront — CDN serving the site over HTTPS

**Infrastructure as Code:** Terraform — provisions the S3 bucket and CloudFront distribution

**CI/CD:** Jenkins (self-managed, running on the EC2 instance), triggered by pushes to this repo

---

## Deployment Architecture

```
Developer pushes to GitHub (main branch)
            │
            ▼
   Jenkins (running on EC2) picks up the change
            │
            ▼
   Checkout → Install dependencies → Build
            │
            ▼
   Authenticate to AWS using stored IAM credentials
            │
            ▼
   Sync build output to S3 → Invalidate CloudFront cache
            │
            ▼
   Live site updated
```

Unlike the GitHub Actions version of this project, Jenkins itself is a persistent, always-on process running on a real server — it doesn't spin up and disappear per run. The EC2 instance has to stay running for Jenkins to be reachable and for scheduled/triggered builds to execute.

---

## Setting Up Jenkins — What Was Involved

1. Launched a `t3.micro` EC2 instance (Amazon Linux), opened ports 22 (SSH), 8080 (Jenkins UI), and 80 in its security group
2. Installed Java 21 (Jenkins 2.568+ requires Java 21 or 25 — Java 17 fails to start it)
3. Installed Jenkins via its official YUM repository, started and enabled it as a system service
4. Completed the setup wizard, installed suggested plugins, created an admin user
5. Added AWS credentials (`aws-access-key-id`, `aws-secret-access-key`) to Jenkins' built-in credentials store, scoped to the same least-privilege IAM user (`github-actions-deploy`) used in my other projects, extended to cover this project's S3 bucket
6. Created a Pipeline job, pointed at this repo's `Jenkinsfile`

---

## Real Issues Hit and Fixed

**Java version mismatch.** Jenkins failed to start with `Running with Java 17 ... older than the minimum required version (Java 21)`. Fixed by installing `java-21-amazon-corretto` alongside the existing Java 17 and letting Jenkins pick it up.

**Node.js version too old for the build.** The EC2 instance's default Node (v18) couldn't run Vite's build process — `SyntaxError: ... does not provide an export named 'styleText'`. Installing Node via `nvm` didn't fix it, since Jenkins runs as its own system user and can't see a per-user `nvm` installation. Resolved by removing the old Amazon-Linux-provided Node 18 packages entirely and installing Node 20 system-wide via NodeSource's official RPM repository, so it's available at `/usr/bin/node` for every user, including Jenkins.

**IAM permissions scoped to the wrong bucket.** Reusing the same IAM deploy user across projects meant its policy only allowed access to my other projects' S3 buckets. Fixed by extending that user's policy to include this project's bucket ARN.

---

## CI/CD Workflow (Jenkinsfile stages)

1. **Checkout** — pulls the latest code from this repo
2. **Install Dependencies** — `npm install` in the `app` directory
3. **Build** — `npm run build`, producing the static `dist` output
4. **Deploy to S3** — `aws s3 sync` uploads the build, removing stale files
5. **Invalidate CloudFront Cache** — clears the CDN cache so the new version is served immediately

---

## Running Locally

```bash
git clone https://github.com/thepradeepz/jenkins-cicd-portfolio.git
cd jenkins-cicd-portfolio/app
npm install
npm run dev
```

---

## Infrastructure Setup

```bash
cd infra
terraform init
terraform plan
terraform apply
```

Provisions the S3 bucket and CloudFront distribution. The EC2 instance running Jenkins was provisioned manually through the AWS Console rather than Terraform, to practice the manual setup process end to end.

---

## Jenkins vs GitHub Actions — What This Project Taught Me

| | GitHub Actions | Jenkins (this project) |
|---|---|---|
| Server management | None — fully managed | Self-managed EC2 instance, must stay running |
| Runtime setup | Fresh, correct version every run automatically | Installed and maintained manually on the server |
| Credential storage | GitHub Secrets, built in | Jenkins' own credentials store, configured manually |
| Cost | Free for public repos | EC2 instance cost (or free-tier hours) |
| Best fit | Small to mid-size projects already on GitHub | Environments needing deep customization, self-hosting, or existing Jenkins infrastructure |

Both reach the same end result — automated build and deploy on every push — but Jenkins requires owning every layer beneath the pipeline itself, which is exactly the experience this project was built to get.

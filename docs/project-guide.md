# Kubernetes DevSecOps Lab — Project Guide

## 1. Purpose

This project is a production-inspired local DevOps, DevSecOps, and Platform Engineering lab.

The goal is to learn and demonstrate how a containerized application can move through a modern delivery workflow:

* local development
* Docker containerization
* Docker Compose local stack
* GitHub Actions CI
* container image publishing to GitHub Container Registry
* Kubernetes deployment
* Helm packaging
* Argo CD GitOps deployment
* Trivy security scanning
* SBOM generation
* Prometheus and Grafana observability

This is a learning and portfolio project, not a production-grade platform.

---

## 2. Architecture Overview

High-level flow:

```text
Developer writes code
   |
   v
GitHub repository
   |
   v
GitHub Actions CI
   |
   |-- run tests
   |-- build Docker images
   |-- scan with Trivy
   |-- generate SBOM
   |-- push images to GHCR
   v
GitHub Container Registry
   |
   v
Helm / GitOps configuration in Git
   |
   v
Argo CD
   |
   v
Local Kubernetes cluster
   |
   v
Application + PostgreSQL + Prometheus + Grafana
```

Core idea:

```text
Docker builds the artifact.
Kubernetes runs the artifact.
Helm packages the deployment.
Argo CD deploys from Git.
Trivy checks security.
Prometheus and Grafana provide observability.
```

---

## 3. Local Setup

The local development environment is:

```text
Windows 11 Pro
   |
   v
WSL2 Ubuntu
   |
   v
Docker Desktop with WSL2 integration
```

The project repository is stored inside the Linux filesystem:

```text
/home/mike/projects/kube-devsecops-lab
```

This avoids common performance and file permission issues that can happen when developing directly under:

```text
/mnt/c/Users/...
```

Completed local setup so far:

```text
WSL2 Ubuntu installed
Ubuntu-22.04 running with WSL version 2
Docker Desktop works from WSL2 Ubuntu
Node.js and npm are installed
Git identity is configured
VS Code Remote WSL works
```

---

## 4. Application Overview

The application will contain:

* Node.js backend
* HTML / JavaScript frontend
* PostgreSQL database

Planned backend endpoints:

```text
GET  /health
GET  /ready
GET  /metrics
GET  /api/items
POST /api/items
```

Purpose of the endpoints:

* `/health` checks whether the application process is alive.
* `/ready` checks whether the application is ready to serve traffic, including database connectivity.
* `/metrics` exposes Prometheus-compatible metrics.
* `/api/items` provides a simple database-backed API for the frontend.

Why this matters for DevOps:

* Health checks are useful for basic service availability.
* Readiness checks are useful for Kubernetes traffic routing.
* Metrics are useful for Prometheus observability.
* Database connectivity makes the application more realistic.
* API endpoints give the frontend something real to consume.

---

## 5. Docker and Docker Compose

Docker will be used to package the backend and frontend into container images.

Docker Compose will be used to run the full local stack:

```text
frontend
backend
postgres
prometheus
grafana
```

Docker Compose is useful for local development because it can start several related containers with one command.

Planned Docker learning topics:

* Dockerfile
* image
* container
* Docker build context
* `.dockerignore`
* Docker networks
* Docker volumes
* environment variables
* container logs
* Docker Compose services
* service dependencies
* troubleshooting failed containers

Important concept:

```text
An image is the packaged application template.
A container is a running instance of that image.
```

---

## 6. CI/CD with GitHub Actions

GitHub Actions will be used for CI.

Planned CI tasks:

* checkout code
* install dependencies
* run tests
* build Docker images
* run Trivy scans
* generate SBOM
* upload reports as artifacts
* publish images to GitHub Container Registry

Initial runner:

```text
ubuntu-latest
```

A self-hosted runner may be added later only if needed for local Kubernetes deployment automation.

Why GitHub Actions is used in this project:

* to learn GitHub-native CI/CD
* to compare with existing Azure DevOps pipeline knowledge
* to test, build, scan, and publish images automatically
* to create visible portfolio evidence of CI/CD implementation

---

## 7. GitHub Container Registry

GitHub Container Registry will store versioned container images.

Planned image naming:

```text
ghcr.io/adrian-mihai-marghidan/kube-devsecops-lab/backend:sha-xxxxxxx
ghcr.io/adrian-mihai-marghidan/kube-devsecops-lab/frontend:sha-xxxxxxx
```

The project should prefer immutable SHA-based tags instead of relying only on `latest`.

Why immutable tags matter:

* they make deployments traceable
* they help identify exactly what version is running
* they reduce risk compared to mutable tags such as `latest`
* they support rollback and auditability

---

## 8. Kubernetes

The application will be deployed to a local Kubernetes cluster.

Initial local cluster tool:

```text
kind
```

Kubernetes concepts to demonstrate:

* Namespace
* Pod
* Deployment
* Service
* ConfigMap
* Secret
* liveness probe
* readiness probe
* resource requests and limits
* logs
* events
* rollout
* rollback

Why Kubernetes is included:

This project is intended to strengthen practical Kubernetes knowledge. The user should not only create YAML files, but also understand what each Kubernetes object does and how to troubleshoot failures.

Key learning goal:

```text
Understand how Kubernetes runs containerized applications and maintains desired state.
```

---

## 9. Helm

Helm will be used to package Kubernetes resources.

The Helm chart will include templates for:

* backend Deployment
* backend Service
* frontend Deployment
* frontend Service
* PostgreSQL resources
* ConfigMap
* Secret

Environment-style values files:

```text
values-dev.yaml
values-staging.yaml
values-prod.yaml
```

These are production-style examples for learning. They do not mean this local lab is production-grade.

Why Helm is included:

* Helm is widely used to package Kubernetes applications.
* Helm helps avoid duplicated Kubernetes YAML.
* Helm values files demonstrate environment-specific configuration.
* Helm provides release history, upgrade, and rollback concepts.

---

## 10. Argo CD and GitOps

Argo CD will be used to demonstrate GitOps.

GitOps principle:

```text
Git is the source of truth.
Argo CD reconciles the Kubernetes cluster to match Git.
Manual changes in the cluster are treated as drift.
```

Planned learning topics:

* Argo CD installation
* Argo CD Application resource
* sync status
* health status
* drift detection
* rollback through Git history

Why Argo CD is included:

Argo CD helps demonstrate a modern deployment model where the CI pipeline builds and publishes artifacts, but the cluster deployment is controlled by Git-defined desired state.

Target explanation:

```text
GitHub Actions builds and publishes the image.
Argo CD deploys the desired application state from Git.
```

---

## 11. DevSecOps and Supply Chain Security

Security controls planned for this lab:

* Trivy filesystem scan
* Trivy image scan
* Trivy Kubernetes manifest scan
* SBOM generation
* non-root containers where practical
* no hardcoded secrets
* no privileged containers
* avoid `latest` tags for production-style deployment
* resource limits
* readiness and liveness probes

Optional later:

* Kyverno or OPA Gatekeeper
* Cosign image signing

Why this matters:

DevSecOps means security is integrated into the delivery workflow, not added only at the end. In this project, scanning and SBOM generation will help demonstrate supply-chain awareness.

Important distinction:

This lab can demonstrate security concepts, but it should not be described as a complete enterprise security platform.

---

## 12. Observability

Observability will be implemented with:

* Prometheus
* Grafana
* backend `/metrics` endpoint

Planned metrics:

* request count
* error count
* response duration if implemented
* application health/readiness indicators

Prometheus will scrape metrics.
Grafana will visualize metrics.

Why observability is included:

* to understand how applications expose metrics
* to learn how Prometheus scrapes targets
* to learn how Grafana dashboards visualize service behavior
* to connect DevOps work with SRE-style thinking

---

## 13. Troubleshooting Notes

This section will be updated as issues are encountered and fixed.

Examples of issues to document:

* Docker build failures
* Docker Compose networking problems
* PostgreSQL connection errors
* GitHub Actions failures
* Kubernetes pods stuck in Pending
* Kubernetes pods stuck in CrashLoopBackOff
* Kubernetes service/port-forwarding issues
* Argo CD sync errors
* Prometheus scrape failures
* Grafana dashboard issues

Troubleshooting format to use:

```text
Problem:
What failed?

Symptoms:
What error message or behavior was observed?

Investigation:
Which commands were used?

Root cause:
Why did it fail?

Fix:
What changed?

Learning:
What concept did this teach?
```

---

## 14. Production Readiness

This project is a local learning lab.

For a real production deployment, the following would need to be considered:

* managed Kubernetes such as AKS, EKS, or GKE
* managed PostgreSQL
* real secret manager
* TLS and certificate automation
* ingress controller
* network policies
* RBAC and least privilege
* centralized logging
* backup and restore
* autoscaling
* high availability
* image signing
* admission control policies
* real alerting
* SLOs and SLIs
* disaster recovery
* environment approval gates

Important wording:

```text
This is a production-inspired local lab.
It demonstrates production-style patterns.
It is not a production-grade platform.
```

---

## 15. Current Status

Current phase:

```text
Phase 1 — Repository initialization
```

Completed so far:

```text
- Windows 11 Pro + WSL2 Ubuntu environment prepared
- Docker Desktop WSL2 integration verified
- Node.js and npm verified
- Git identity configured
- VS Code Remote WSL verified
- GitHub repository created
- Repository cloned into WSL2 Ubuntu
- Base folder structure created
- .gitignore created
- README.md created
```

Current documentation decision:

```text
Use a single public documentation file:
docs/project-guide.md
```

Reason:

```text
A single file is easier to maintain during the learning phase.
It keeps the project guide readable from top to bottom.
It avoids unnecessary documentation overhead early in the project.
The file can be split into multiple docs later if it becomes too large.
```

Next steps:

```text
- Create or fix docs/project-guide.md
- Validate repository structure
- Make the first commit
- Push initial repository structure to GitHub
```

---

## 16. Skill Claim Tracker

The user should only claim a technology after actually implementing, testing, troubleshooting, and explaining it.

### Docker

Current status:

```text
Environment verified only. Not enough yet to claim Docker confidently.
```

Can claim after:

* creating Dockerfiles
* building images
* running containers
* using Docker Compose
* troubleshooting container logs
* explaining images vs containers

### GitHub Actions

Current status:

```text
Not started.
```

Can claim after:

* creating workflows
* running tests
* building images
* uploading artifacts
* troubleshooting failed workflow runs

### GitHub Container Registry

Current status:

```text
Not started.
```

Can claim after:

* pushing images
* pulling images
* explaining image tags and permissions

### Kubernetes

Current status:

```text
Not started.
```

Can claim after:

* deploying the app
* using Pods, Deployments, Services, ConfigMaps, and Secrets
* configuring probes
* troubleshooting logs and events
* performing rollout and rollback

### Helm

Current status:

```text
Not started.
```

Can claim after:

* creating a chart
* using templates
* using values files
* installing, upgrading, and rolling back releases

### Argo CD / GitOps

Current status:

```text
Not started.
```

Can claim after:

* installing Argo CD
* creating an Application
* syncing from Git
* testing drift detection
* explaining desired state reconciliation

### Trivy / SBOM

Current status:

```text
Not started.
```

Can claim after:

* scanning filesystem
* scanning images
* scanning Kubernetes manifests
* generating SBOM
* interpreting reports

### Prometheus / Grafana

Current status:

```text
Not started.
```

Can claim after:

* exposing `/metrics`
* configuring Prometheus scraping
* creating or using Grafana dashboards
* explaining scraping and visualization

---

## 17. Personal Learning Rule

For each phase, do not move forward only because files exist.

Move forward only after being able to answer:

1. What did I build?
2. Why did I build it this way?
3. How do I run it?
4. How do I verify it works?
5. How do I troubleshoot it?
6. What would be different in production?
7. What can I honestly claim in a CV or interview?

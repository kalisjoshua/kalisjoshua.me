## ARelOps - Automated Release Operations DRAFT
### 25 Mar 2022

 *Pronounced: ari - el - ops*

ARELOps is a standard set of practices for automated software deployment with minimal human intervention. The goal is to reduce human error through automation.

Succinctly summarized as trunk-based development with tags; the tags indicating what point in history is in which environment.

  1. **Changes** are made, and committed/pushed by a developer to a branch
      - Following [GitOps](https://www.gitops.tech/) practices
  2. A pull request is opened for peer review and **approval**
      - Multiple reviews and approvals are required
  3. An **ephemeral** environment is spun up; this is *DEV*
  4. **Testing** in the ephemeral environment
      - Code style (lint)
      - Automated unit and integration tests
      - Smoke testing by developers and QA
      - Simulated traffic with anonymized data to validate monitoring thresholds
      - Load and performance testing: 1x, 2x, 5x, 10x
      - Security and penetration testing
      - *Any regressions found MUST have tests created to cover*
  5. **Merging** will be enabled if everything is acceptable
      - No conflicts
      - Approvals
      - Testing
  6. **Automation** deploys the artifact to *TEST* and moves the Git tag
  7. A "**Soak**" period SHOULD be observed
      - Automated tests are run
      - Simulated traffic is replayed in addition to regular traffic
      - Allow for enough time to allow monitoring to alert about any errors
  8. Return to 6 (above) and repeat for all subsequent environments
      - *BETA*
      - *PASSIVE*
      - *PRODUCTION*
  9. **Canary** deployments SHOULD be used for *PASSIVE* and *PRODUCTION*

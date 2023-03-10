## ARelOps - Automated Release Operations DRAFT
### 25 Mar 2022

*Pronounced: ari - el - ops*

#### What is ARelOps?

ARelOps is a standard set of practices for automated software deployment - the goal is to reduce human error through automation - and can be summarized as "trunk-based development with standard automated tag movement"; tags indicating what each environment has deployed at any given moment.

  1. **Changes** are made, committed, and pushed by a developer to a git branch
      - Following [GitOps](https://www.gitops.tech/) practices
      - Branches are most often divergent from the `main` branch
      - The developer's machine is capable of running nearly the entire application locally
  2. A pull request is opened for peer review and **approval**
      - Multiple reviews and approvals are REQUIRED
      - Open pull requests are indication that the author(s) are seeking feedback
  3. **Testing** MUST pass before promotion to an environment: *TEST*, *BETA*, *PASSIVE*, *PRODUCTION*
      - Code style, formatting, static analysis (lint)
      - Dependency vulnerability scanning
      - Automated unit and integration tests
      - Smoke testing by developers and QA
      - Simulated traffic with anonymized data to validate monitoring thresholds
      - Load and performance testing: 1x, 2x, 5x, 10x
      - Security and penetration testing
      - *Any errors found MUST have tests created to cover them and prevent future regressions*
  4. An **ephemeral** environment SHOULD be spun up for each branch merging to trunk
      - This environment is considered to be *TEST*
      - This environment enables isolated testing on only the changes for a given set of work
  5. **Merging** will be enabled if everything is acceptable
      - No conflicts
      - Approvals
      - Testing
  6. **Automation** deploys the artifact to *BETA* and moves the Git tag
      - Automated acceptance/functional tests are run
      - Simulated traffic is replayed in addition to regular traffic
      - Integrating applications/services/systems should integrate with *BETA* as a more stable lower environment than *TEST*
  7. A "**Soak**" period SHOULD be observed
      - Allow for enough time to allow monitoring to alert about any errors
  8. Return to 6 (above) and repeat for all subsequent environments
      - *PASSIVE*
      - *PRODUCTION*
  9. **Canary** deployments SHOULD be used for *PASSIVE* and *PRODUCTION*
      - Artifacts deployed as canaries that have higher than expected or acceptable thresholds are rejected

#### Environments

  1. DEV/LOCAL
  2. TEST
  3. BETA
  4. PASSIVE
  5. PRODUCTION

##### DEV/LOCAL

A local environment is crucial for individual productivity - quick iteration and validation - of a developer's work. A tight feedback loop is what allows rapid development with minimal interruption of flow state. To enable this experience it is required that as much as is possible the full application be enabled to run completely locally with any edge-cases being mocked if necessary. The local environment is also a place to be able to run all tests in isolation from all other potential contributions; and it easily scales with the growth of the team.

##### TEST

The TEST environment is a dynamic set of multiple deployments; there may be many different ephemeral TEST environments, one created for each open pull request back to the `main` branch. This environment is the first environment where nothing is mocked out for the application thus providing the first true full integration environment for testing and validation; it is also the first environment that is available to more than the person running it on their own machine, so more people are able to access it at the same time.

##### BETA

The BETA environment

##### PASSIVE



##### PRODUCTION

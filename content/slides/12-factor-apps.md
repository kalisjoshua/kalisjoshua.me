## Twelve-Factor Apps


A set of broad conceptual solutions, and a shared vocabulary, for systemic problems seen in modern application development.

---

## Twelve-Factor Apps

A set of ideal app development practices to isolate concerns well enough to make them configurable for future flexibility with minimal changes.

---

### The Twelve Factors

  1. **[Codebase]** -
    One codebase tracked in revision control, many deploys
  2. **[Dependencies]** -
    Explicitly declare and isolate dependencies
  3. **[Config]** -
    Store config in the environment
  4. **[Backing Services]** -
    Treat backing services as attached resources
  5. **[Build, Release, Run]** -
    Strictly separate build and run stages
  6. **[Processes]** -
    Execute the app as one or more stateless processes
  7. **[Port Binding]** -
    Export services via port binding
  8. **[Concurrency]** -
    Scale out via the process model
  9. **[Disposability]** -
    Maximize robustness with fast startup and graceful shutdown
  10. **[Dev/Prod Parity]** -
    Keep development, staging, and production as similar as possible
  11. **[Logs]** -
    Treat logs as event streams
  12. **[Admin Processes]** -
    Run admin/management tasks as one-off processes

Original work available: https://12factor.net/

---

### Groups

  1. Code
      1. Codebase
      2. Dependencies
      3. Config
      4. Backing Services
  2. Deploy
      1. Build, Release, Run
      2. Processes
      3. Port Binding
      4. Concurrency
  3. Operate / Run
      1. Disposability
      2. Dev/Prod Parity
      3. Logs
      4. Admin Processes

[Aditya Satrya](https://speakerdeck.com/asatrya/how-to-build-12-factor-application-in-nodejs-using-docker?slide=20)

---

### Groups (cont.)

  1. What you do
      1. Codebase
      2. Dependencies
      3. Config
      4. Backing Services
      5. Build, Release, Run
  2. What you get
      1. Processes
      2. Port Binding
      3. Concurrency
      4. Disposability
      5. Dev/Prod Parity
  3. Monitoring
      1. Logs
      2. Admin Processes

---

### 1. [Codebase](https://12factor.net/codebase) (noun)
[Codebase]: #1-codebase-noun

There is one and only one codebase for an app and an app has only one codebase. This is the source of truth for what is "the app". The codebase ties everything together.

  * Source code
      - Application/service
      - Infrastructure
  * Configuration
  * Deployment pipeline(s)\*
  * Documentation
      - Text descriptions of processes
      - Visual diagrams of how things connect

*All of this SHOULD be version controlled in some way and kept together.*

---

### 2. [Dependencies](https://12factor.net/dependencies) (verb)
[Dependencies]: #2-dependencies-verb

  * Declaration
      - Explicit definition of what the app expects to use at runtime
      - Enables the concept of code sharing/reuse
      - Improves the maintainability of common solutions
  * Isolation
      - The ability to run the app in a consistent and deterministic environment
      - Prevents dependency on environmental tools that might change unpredictably

---

### 3. [Config](https://12factor.net/config) (noun)
[Config]: #3-config-noun

These are the "variables" that are **likely** to change between deployments/environments (dev, test, beta, prod, etc). Some obvious examples are:

  * Database connection details
  * External services credentials
  * Anything that would be considered secret

The - environment - config variables are the secrets that make the app work in the environments they will be deployed to; *including locally on a developers machine*.

**These values (above) should not be stored in the [Codebase].**

Other values - that are not secret - can be stored in [Codebase] config files.

  * Per-environment service routes/URLs
  * Instance counts for load-balanced servers
  * Exponential backoff timing

---

### 4. [Backing Services](https://12factor.net/backing-services) (noun)
[Backing Services]: #4-backing-services-noun

These are the resources that enable the Twelve-factor App to function but are "larger", or more generic, than the just the app. Similar Backing Services should be considered/treated as interchangeable without needing changes in the [Codebase]; e.g. multiple SMTP (email) services.

  > If a capability is not core to the purpose of the app it should likely be treated as a Backing Service and therefor externalized in the same way.

*Access to Backing Services should be achieved through [Config] values consumed and used at runtime by the app.*

---

### 5. [Build, Release, Run](https://12factor.net/build-release-run) (verbs)
[Build, Release, Run]: #5-build-release-run-verbs

  1. Build
      - The fetching and bundling of defined [Dependencies] and *compiled* code - from the [Codebase] - into a single unit; a **build artifact**: dmg, exe, jar/war, tar, zip, etc.
      - This build artifact is **environment independent**; it should be able to run in any environment without changes needing to be made to anything inside of it
  2. Release
      - The combination of the "build", "artifact", or "build artifact" with all of the [Config] for a given environment in the runtime environment: container, server, whatever
  3. Run
      - The phase/stage when an app is running in an environment

---

### 6. [Processes](https://12factor.net/processes)
[Processes]: #6-processes

  * A Twelve-factor App is executed in the runtime environment as one, or more, **stateless** processes
  * Persistence of any kind must be accomplished through [Backing Services]; supports statelessness
  * Processes and statelessness enables extreme scalability based on request volume

---

### 7. [Port Binding](https://12factor.net/port-binding)
[Port binding]: #7-port-binding

A Twelve-factor App will include everything needed to handle requests coming from ports and will indicate which ports it is expecting to receive requests through.

  * Everything needed to handle requests will be internal to the twelve-factor app
  * All requests will come to the twelve-factor app through one or more ports
      - `:22` - SSH
      - `:53` - DNS
      - `:80` - HTTP
      - `:443` - HTTPS
  * Expected ports should be well identified by the twelve-factor app: `:5000`, `:8080`, etc.
      - This can be done in the [Config] to allow for variance; between environments for instance

---

### 8. [Concurrency](https://12factor.net/concurrency)
[Concurrency]: #8-concurrency

  * Concurrency is enabled through stateless [Processes]
  * A Twelve-factor App is able to scale "out" - rather than "up" - and run multiple instance concurrently
      - Out - multiple instances; behind a load balancer
          + Seamless, no downtime
      - Up - more resources: memory, processing (CPU), disk
          + Requires downtime

---

### 9. [Disposability](https://12factor.net/disposability)
[Disposability]: #9-disposability

Any single instance of a Twelve-factor App should not assume that it will be successful; software "bugs", or hardware failures can cause [Processes] to fail. Since success is never a guarantee failure must always be planned for.

---

### 10. [Dev/Prod Parity](https://12factor.net/dev-prod-parity)
[Dev/Prod Parity]: #10-devprod-parity

  * All environments (dev, test, beta, prod, etc) should be as similar as possible
  * "Drift" between environments is fertile ground for defects
  * Modern tooling enables near parity for local dev; with data being an acceptable exception

---

### 11. [Logs](https://12factor.net/logs)
[Logs]: #11-logs

  * A Twelve-factor App sends log output to stdout
  * Logs are a stream of "consciousness" from the running app and are unfiltered or sorted
  * Logs are sent from the app in a "Fire and forget" strategy

---

### 12. [Admin Processes](https://12factor.net/admin-processes)
[Admin Processes]: #12-admin-processes

  * Common use cases should be coded and stored within the app not coded adhoc
  * These utilities are for rare runtime inspection to help with debugging or running admin tasks that are non-routine

---

## Joshua T Kalis
### Jan 2022

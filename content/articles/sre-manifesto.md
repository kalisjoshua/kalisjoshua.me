## SRE Manifesto
## 1 Jan 2020

This document should be used as a basis or foundation to build on; these are a set of minimums to abide by but individual teams are encouraged to add on details relevant to their domains.


### What is SRE?


Site Reliability Engineering, commonly referred to as SRE, is a Software Engineering approach to managing and scaling the traditional Infrastructure and Operations roles, processes and responsibilities. The idea and principles were first introduced by Google and have been largely adopted across the industry as core principles to follow for a successful DevOps journey.

If DevOps is the **What** we’re trying to achieve, SRE is the **How**.

SRE principles focus heavily on defining and tracking metrics to improve the SDLC and drive meaningful changes to the systems involved.


### Team Member Expectations

**It is by these expectations we judge the efficacy of the SRE team:**

  * Improve the mean Failure Metrics
      - Following the (below) [Principles](#principles)
      - Preserving characteristics of [RAMS]
  * Responsible for OnCall duties during regular rotations
      - Responding to - at a minimum - all **Technology Incidents** (TI)
      - First responder for all support requests for/of/to the team
      - Work on tech-debt and non-prioritized work during rotation
  * Facilitating the post-incident process
      - Ensuring the **Root Cause Analysis** (RCA) is done to a proper level of detail to prevent regression
      - Reviewing the **Blameless Incident Report** (BIR)
          + SRE team members likely will not be the owners of incidents but should have input for the completion of the BIR to ensure enough depth of post incident response to prevent regression


### SRE and Product Collaboration

SRE teams have the responsibility to improve the *operational excellence* of the applications built and maintained by the product delivery teams. To contrast the two team focuses:

  * **Product**
      - Focus === business features
      - Aims to provide an excellent user experience for external clients
  * **Operations**
      - Focus === site reliability | infrastructure stability | operational excellence
      - Aims to provide an excellent developer experience for product engineering teams and team members

```
   -----  -----  -----
   |   |  |   |  |   |
   | P |  | P |  | P |
   | r |  | r |  | r |
   | o |  | o |  | o |
   | d |  | d |  | d |
   | u |  | u |  | u |
   | c |  | c |  | c |
   | t |  | t |  | t |
   |   |  |   |  |   |
|-----------------------|
|  O p e r a t i o n s  |
|-----------------------|
   |   |  |   |  |   |
   -----  -----  -----
```


### Operational Excellence

  1. Low mean Failure Metrics
  2. Infrastructure best practices (i.e. CloudHub alerts)
  3. Applications satisfy enterprise standards based on business criticality level
      - Multi-region
      - DR plans
      - Security scanning (e.g. Snyk)
      - Test coverage reporting (e.g. SonarQube)
      - Automated load/performance testing
      - ... and more


### Ownership

Do SRE teams own all infrastructure for a stream? **No**.

The product engineering teams are the owners of their product(s); they are the maintainers and the ultimate authority of what gets incorporated. They are building features and aligning those to the vision of the product from business strategy. They have a need to completely control their ability to develop the product as needed.

The SRE teams should be considered contributors, focused on advancing the technical stability of the product. Their mission is to improve the features of the product that the client doesn't notice directly, often referred to as: non-functional requirements, "ilities", or the characteristics of [RAMS], and more.

Communication between product and operations roles is vital for a healthy relationship and sharing of ideas and work. The product teams will often request help/work from the operations team(s) while the inverse will also often be true. Everyone has the same goal, make the product the best that it can be for our clients.


### Principles

We follow these principles:

  1. Measure everything
  2. Eliminate toil
      - Simplify
      - Automate
  3. Embrace risk


#### Measure Everything

Data are important for making informed decisions; it is exceedingly difficult to move fast with safety without seeing the path where you are going. Measurements prior to an experiment enable comparison of previous conditions with outcomes. A scientific mindset should be utilized when making changes; forming a good hypothesis based on reliable data will result in better experiments with more accurate predictions and end results.

**Measurement**

At a *minimum* the **four golden signals** (TELS) should be set up as metrics being tracked for any product or service:

  * Traffic - what is the demand
  * Errors - what errors are occurring
  * Latency - what is the experience from the perspective of the client/user
  * Saturation - what percentage of capacity is being used


#### Eliminate Toil

  > "We define toil as mundane, repetitive operational work providing no enduring value, which scales linearly with service growth." [SRE Book][SRE-Toil]

This type of work is inherently prone to error and therefor should be reduced or eliminated above all else. Toil will erode the team's pride in their work faster than anything else.

**Measurement**

One way to measure toil is to add a tag/label to work items then during a retro review the toil that was completed for the given period of time. The discussion should focus on:

  * Was this necessary?
  * How do we eliminate it in the future?


##### Simplify

  > "... software simplicity is a prerequisite to reliability." [SRE Book][SRE-Simplicity]

The first consideration when attempting to make a system more reliable or stable should be the question, "How can this be made more simple?" Removing options that are confusing or error-prone can be a viable solution for system simplification.

A good presentation on complexity and simplicity is offered in ["Simple made easy" by Rich Hickey](https://www.youtube.com/watch?v=oytL881p-nQ).


##### Automate

Automation eliminates humans from the equation of getting things done with precision. Additionally, automation is also an excellent way to share work and externalize knowledge; both are great outcomes in communicating complex processes. We should not be reliant on any one person, or few people, to have the answer to any problem. Automation should be applied liberally but with specific intent and deliberate decision.

  > "... doing automation thoughtlessly can create as many problems as it solves." [SRE Book][SRE-Automate]

It is also good to keep in mind the return on investment for the automation you build; a good, and well accepted, source of research is available in the automation ROI grid from xkcd [Is It Worth the Time?](https://xkcd.com/1205/).


#### Embrace Risk

  > "A strange game. The only winning move is not to play." [War Games](https://www.rottentomatoes.com/m/wargames/quotes/)

There is no way to completely eliminate risk but it can be mitigated and even leveraged. We will never own the end-to-end user experience; because we do not know the device they are using or the connection they have. There will be down-time, or unavailability, from the user's perspective at some point and that is valuable if used strategically.

**Measurement**

One way to measure and strategically utilize down-time is to plan for it in SLOs and SLAs like a budget. These budgets are not intended to be "saved" (not used); if a budget is not used it should be considered to be loss; of: opportunity, innovation, or improvement.

For example, a monthly SLA of 99.9% is equivalent to 43 minutes and 49 seconds of acceptable down-time. An SLA is a promise of availability to the users of the application or system; breaking that promise means that you did not keep your side of the agreement.


### Failure Metrics

Systems fail and humans write imprecise software. These Failure Metrics provide a common set of consistently employed impartial measurements of the effectiveness of the efforts of an SRE team.

  * **TTD** = Time to Detect/Discovery
  * **TTR** = Time to Recovery
  * **TTRS** = Time to Resolve (re-solve)

```
1 --- 2 --- 3 -- 4 - 5
| TTD | TTR |
      | --- TTRS --- |
```

**Generic Timeline of Outage**

1. An error occurs; something is not working as expected
2. Monitoring/alerting are triggered by the error rate exceeding a threshold
    - An incident is opened: through automation, or individual action
    - Team members begin to diagnose the problem
3. Impact to clients is mitigated
    - A remedy/solution is found and deployed
4. Owning team's due diligence
    - Root Cause Analysis (RCA) is performed
    - Regression prevention work and deployment
5. Regression prevention deployed



[RAMS]: https://en.wikipedia.org/wiki/RAMS
[SRE-Automate]: https://sre.google/sre-book/automation-at-google/
[SRE-Simplicity]: https://sre.google/sre-book/simplicity/
[SRE-Toil]: https://sre.google/sre-book/part-II-principles/

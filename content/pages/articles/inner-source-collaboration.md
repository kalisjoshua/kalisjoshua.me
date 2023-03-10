# Inner-source Collaboration

  * Replaces: none
  * Replaced by: none
  * Topics: process, collaboration, contribution, team work, inner source


## Summary
[Summary]: #summary

Contributions to software projects SHOULD follow a consistent and agreed-upon process for collaboration to ensure common understanding for all involved. This process is meant to be a guideline for most use cases and is not meant to be inclusive of all possible situations that may arise in software development. In all cases, best intent SHOULD be assumed and all possible opportunities to align with the standards presented herein SHOULD be attempted.

Communication, early and often, between [Contributors] and [Maintainers] is highly RECOMMENDED to keep everyone involved as informed about progress as possible. Communication about intent before work starts, the progress during development, and upon completion or abandonment of efforts all parties should be reasonably up to date on the status of the effort.

This document is meant to describe the standard collaboration process between the two groups of developers: [Contributors] and [Maintainers]. Non-developer partners - business, design, product, etc. - are NOT REQUIRED to follow this standard process and should work with the leadership of the [Maintainers] group to ensure that any changes they need get prioritized in the backlog appropriately. However, non-developer partners are encouraged to join any discussion and raise issues or questions at any time.


## Conventions
[Conventions]: #conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](http://tools.ietf.org/html/rfc2119).


## Motivation
[Motivation]: #motivation

Software is inherently complicated, and the development or maintenance of software is further complicated by the need for people to communicate successfully within the challenges of remote working conditions, different time zones, conflicting priorities, etc; challenges abound that make software development difficult. These guidelines are meant to be a basis for common practices agreed upon and shared between various contributors; however frequent or infrequent they may be.

Contributions from [Contributors] are inherently more risky due to the disconnected nature of the people putting in the effort to submit the changes as they are not as well informed about the decisions/direction of the [Maintainers] and project. This is not to say that these contributions are not welcome; on the contrary, they are encouraged. However, it MUST be understood that the [Maintainers] do have the final say on when and what gets accepted into the main branch of development for a project as they are the ones accountable for all aspects. Every effort will be put forth by the [Maintainers] to be open and responsive to reasonable contributions and [respond promptly](#response-times) to all requests.


## Design
[Design]: #design

*The Planning phase is REQUIRED for all changes to source code. Improvements to documentation, fixing of typos, obvious mistakes, or anything not specifically source code DO NOT REQUIRE any Planning phase actions/steps and a pull request can be opened immediately where conversation MAY occur.*

  1. PHASE: **[Planning]**
      1. **[Request]** - communication about the need
      2. **[Discussion]** - i.e. GitHub Issue comments
      3. **[Agreement]** - consensus between [Maintainers] and [Contributors]
  2. PHASE: **[Execution]**
      4. **[Development]** - contingent upon the agreement reached; iterative and *focused* development with ongoing review
      5. **[Completion]** - final review
      6. **[Acceptance]** - merge to main branch of development

Some things to keep in mind throughout all steps of this process:

  * Give context. Help the [Maintainers] to understand what you are trying to incorporate, explain a scenario, or share an uncovered use case
      - Good example: "X doesn't happen when I do Y."
      - Poor example: "X is broken, please fix it."
  * Research beforehand. It's OK not to know things, but show that you did some due diligence
      - Good example: "I'm not sure how to implement X. I checked the help docs and didn't find any mentions."
      - Poor example: "How do I do X?"
  * Keep requests succinct. Time is our most precious asset respect others' time and they will respect yours.
      - Good example: "I'd like to write an API tutorial for X."
      - Poor example: "I was driving down the highway the other day and stopped for gas, and then I had this amazing idea for something we should be doing, but before I explain that, let me show you ..."
  * Communicate publicly. Doing so is a help to everyone who comes after you with the same idea or looking for examples of how to do something similar.
      - Good example: (as a comment) "@-maintainer Hi there! How should we proceed on this PR?"
      - Poor example: (as an email) "Hey there, sorry to bother you over email, but I was wondering if you've had a chance to review my PR?"
  * Questions are OK but be patient. Keep in mind that everyone has priorities they are working on and anything adding on to that is potentially disruptive.
      - Good example: "Thanks for looking into my error. I followed your suggestions. Here's the output."
      - Poor example: "Why can't you fix my problem? Isn't this your project?"
  * Respect decisions. Ultimately the [Maintainers] are the people that take ownership of all contributions and are thus accountable for any failures after being accepted.
      - Good example: "I'm disappointed you can't support my use case, but as you've explained it only affects a minor portion of users, I understand why. Thanks for listening."
      - Poor example: "Why won't you support my use case? This is unacceptable!"
  * Above all, keep it productive and professional. Everyone is on the same team, trying to build the best products we can and everyone potentially comes from very different backgrounds which bring with it different perspectives on solutions. Additionally, take all communication as a step toward improvement, not one aimed at criticism or negativity.


### Planning
[Planning]: #planning

The Planning phase is important because it is relatively cheaper than the Execution phase in most cases and all aspects. Some reasons why this phase is important are:

  * Similar or redundant changes may already be in development by the [Maintainers]
  * The project may be going in a different direction removing the need for the requested changes
  * The project may already support the change being proposed and documentation simply doesn't cover it well enough for clients/users to educate themselves and move forward

The collaboration tool used can take many forms and SHOULD be appropriate for the scope and urgency of the change being proposed; some suggestions are:

Communication Type  | Urgency  | Scope
------------------- | :------: | :---:
Simple GitHub Issue | low      | small
ADR or RFC          | low-med  | any
Phone call          | high     | large or unknown
Virtual meeting     | med-high | large or unknown
Slack discussion    | low      | any

During the [Planning] phase code SHOULD NOT be changed. The Planning phase is meant to produce documentation describing the desired outcome either in prose - as acceptance criteria that can be used as confirmation of completion - or any relevant visual documentation, such as architectural diagrams, graphics, process diagrams, etc.

Some forms that this documentation could use or follow are:

  * [Lean RFC](https://github.com/kalisjoshua/lean-rfc)
      1. Summary
      2. Motivation
      3. Design
      4. Drawbacks
      5. Alternatives
  * [Architectural Decision Records](https://adr.github.io/)
      1. Title
      2. Status
      3. Context
      4. Decision
      5. Consequences

No matter the choice, a repository SHOULD be consistent with a single standard. Additionally, some fundamental concerns should be covered no matter which standard is used:

  * What the decision is
  * Why the decision was chosen in favor of other options
  * What other options were considered
  * Why another option might make more sense in the future
  * How are specific concerns being addressed
      - Security
      - Performance
      - Backwards-compatibility
      - Rollout (or General Availability)
      - Future maintainability


#### Request
[Request]: #request

A GitHub Issue should be opened by the [Contributors] to detail the need/change they are looking for. Opening an issue allows for open discussion within the repository where the change is being proposed and SHOULD focus the request on the changes needed for the given repository; if the change is something that will touch multiple repositories then those issues MAY be inter-linked for reference. The issue SHOULD be commented on by all people involved including anyone interested but not involved directly.


#### Discussion
[Discussion]: #discussion

During Discussion, in the GitHub Issue, [Contributors] MUST present justification for the addition, augmentation, or removal of functionality - the proposed change - to the satisfaction of the [Maintainers]. The [Maintainers] SHOULD make every effort to help reasonable requests move forward or MUST provide clear reasoning why any proposed changes are not acceptable. All aspects of what will be done, how, and why they will be done should be made clear through either the comments on the GitHub Issue or provided documents and/or diagrams (if necessary or helpful).


#### Agreement
[Agreement]: #agreement

All people involved should understand and accept, if not completely agree with, the decision made by the [Maintainers] as a result of the [Discussion] where all questions are answered and all details explained. If the decision is to not move forward with allowing the proposed changes to be accepted the reasoning MUST be made clear by the [Maintainers] to the satisfaction of the [Contributors]. If the decision is to move forward and accept future work in support of the proposed changes all details and supporting documentation MUST be provided to the satisfaction of both the [Contributors] and the [Maintainers].

The final detail necessary is to identify who, between [Contributors] and [Maintainers], will be doing the work or if it will be a joint development effort.

It is important to note:

  * Just because a request/proposal is acceptable/agreed upon does not mean that it is a high priority for the [Maintainers]
  * Any [Contributors] proposing changes are not necessarily "on the hook" to work on the implementation/solution


### Execution
[Execution]: #execution

The Execution phase will be where all of the proposed changes, from [Planning], will be developed, reviewed, and delivered. Feedback and response - general communication - between [Contributors] and [Maintainers] should be expected and encouraged from beginning to end of [Development] to ensure a good experience for everyone involved and to reduce the possibility of overburdening anyone at any stage of this process.


#### Development
[Development]: #development

All development MUST adhere to project standards or guidance provided in pull request comments, including but not limited to:

  * **Coding style**; be consistent with the project even if it isn't your preference
  * **Testing**; add/remove/update tests as necessary given the type of development
      - *If and where possible, acceptance criteria should be codified into automated tests to prevent regression or mistaken removal.*
  * **Design patterns**; use common patterns and existing libraries before introducing more or new
  * **Documentation**; add/remove/update documentation as necessary given the type of development
  * **Security practices**; do not introduce vulnerabilities or divulge sensitive information

The changes included in the pull request SHOULD be minimized and focused only on the body of work defined in the [Planning] phase. Changes not pertinent to the body of work described and agreed upon in the [Planning] phase will be requested to be removed to another proposal unless the scope of the proposed change is agreed upon by both [Contributors] and [Maintainers].

If at any time there are questions about the acceptability of any contributions they should be raised at the time they are found and not left till the end or assumed to be acceptable. Questioning specific implementation details with the [Maintainers] is a good way to keep the communication current and will hopefully help with keeping work productive.


#### Completion
[Completion]: #completion

Once development has achieved the goals set out during the [Planning] phase anyone contributing to the development SHOULD indicate that the pull request is ready for final approval by posting a comment signifying that state change to the [Maintainers]. The final approval should be fairly trivial if they have been monitoring the development in the pull request regularly. Final approval and subsequent [Acceptance] should be quick but not guaranteed as things may have changed since the inception of the work but should not be a complete surprise as the [Maintainers] SHOULD be keeping [Contributors] informed about wide-impacting decisions proactively.

Final approval SHOULD follow any documented requirements by the project but MUST NOT be less than at least one [Maintainers] approval. How that is enforced or enacted is beyond the scope of this RFC.


#### Acceptance
[Acceptance]: #acceptance

This is the final step in the process. [Maintainers] take ownership of the pull request and all changes contained to schedule when and how best to incorporate/merge the changes. [Contributors] are not expected to maintain or support any contributions after the pull request is merged.


### Terms

These terms are used throughout this document and should have one definition (the definition below).


#### Contributors
[Contributors]: #contributors
[Contributor]: #contributors

Contributors are anyone who is not a member of the [Maintainers] team.


#### Maintainers
[Maintainers]: #maintainers
[Maintainer]: #maintainers

Maintainers are all team members responsible for the project; including but not limited to feature work and any on-call rotations or support efforts.


#### Response Times
[SLA]: #response-times

Response times for [Maintainers] SHOULD be as short as possible and SHOULD NOT exceed 24 hours - or the next business day in the event of weekends or holidays - even if the response is something akin to:

  > "We have seen your request but we will need a few days to gather/capture the needed information to properly respond, we will update with our answer/status in X days."

... where `X` is a specific timeframe that is reasonable for the request and an answer is not always required within that timeframe but an update as to why it is taking longer than expected SHOULD be provided to keep the requestor informed and involved.


## Drawbacks
[Drawbacks]: #drawbacks


### Too Much Process and Not Enough

This process documentation is verbose and yet potentially not exhaustive. Therefore, it could be introducing considerable overhead without being meaningfully comprehensive enough for its purpose. However, not having an agreed-upon standard for Federated Development has also created instances where confusion has escalated to conflict.


### Overwhelming Contributions

One concern to be aware of and proactively protect against is one of getting too many contributions coming in, such that they overwhelm the [Maintainers] attempting to maintain the project. A possibly more likely scenario might be too many contributions from [Contributors] across the many projects the [Maintainers] have responsibility for.


## Alternatives
[Alternatives]: #alternatives

Here are some community resources for more information; at least some were used for inspiration if not content directly:

  * https://opensource.guide/
  * https://opensource.com/
  * https://innersourcecommons.org/
  * https://gist.github.com/richhickey/1563cddea1002958f96e7ba9519972d9


## Unresolved (questions)
[Unresolved]: #unresolved-questions


### Contributor Timelines

There does remain the challenge of how to resolve the delivery requirements of [Contributors] and the review standards of [Maintainers]. Where the pull request would be "complete" from the perspective of the [Contributors] but not completely reviewed by the [Maintainers] and the timeline of the review does not work for the timeline of the submitting team.

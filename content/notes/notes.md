I help people achieve their goals and be their best self.

---

# Addresses

  1. 5044 Arrowhead Road
      West Bloomfield MI 48323
  2. 1247 Woodward Ave
      Detroit MI 48226
      Apt 609
  3. 1332 Fountainview Dr
      Brighton MI 48114-9101
  4. 2300 Hanover Dr
      Lansing MI 48911
  5. 734 Berkshire Ln
      East Lansing MI 48823
  6. 715 Berkshire Ln
      East Lansing MI 48823
  6. 718 Alton Rd
      East Lansing MI 48823
  6. 1130 Beech St
      East Lansing MI 48823
      Apt 140
  7. 515 Elizabeth St
      East Lansing MI 48823
  8. 6935 Tuson Blvd
      Clarkston MI 58346
      Apt ?

---

# Automated Observability Testing

During a Technology Incident (TI) there are two high-level metrics to focus on: Mean Time To Discovery (MTTD), and Mean Time To Resolution (MTTR).

**AOT Scripts**

AOT Scripts is a collection of scripts intended to intentionally misconfiguring software and infrastructure with the goal of simulating realized Technology Incidents to exercise observability reporting for teams to test their response times.

**Expected Properties**

  - Hypothesis Statement - simply worded description of what is expected
  - Configuration Options - config for the AOT Script to use for attack
  - Runtime/expires/clock/duration - duration of test run, if the Validation Script doesn't detect the problem this will end the test and revert the attack
  - Validation Script - script to automatically verify that the incident is detected or detectable is some automated way

These properties should be provided as a markdown file for a given test run and should be added to after the test is complete to include a `result` field so that a report can be generated for easy communication.

**AOT Sandbox**

AOT Sandbox is an AWS account with straw man application(s) deployed and running which will be put into various states to give team members a consistent experience in debugging and problem resolution.

### AOT Sandbox - Inbox

The inbox will be a simulated email inbox where alerts/notifications will be sent from observability tooling for the application. Not necessarily everything will be fully setup and that will be a part of the exercises.

---

# SRE (justification)

  Software/Systems Engineers at all levels between, and including, Associate and Principle are, and should be, engineers focused on developing an application for end users; that primarily includes feature development. These engineers all have different levels of capability to introduce change; more simply put, they are responsible for advancing the product for the users. However, rapid advancement of product features often conflict with the stability and scalability of the underlying platforms; to assist with this, we partner Software Engineers with Site Reliability Engineers.

  Site Reliability Engineers are focused on improving the underlying system of applications to ensure that stability, scalability, security, and general maintainability are consistent or improved as the application continues to grow and evolve. A Site Reliability Engineer will improve the underpinnings of applications to make them easier to maintain over the life of the product; they should be aiming to reduce the cost of maintenance through automation and proactive capacity affordance.

---

# Black Mesa Team Member Expectations

  1. Be excellent to yourself and others
      + Help solve problems
      + Be encouraging
      + Teach what you know
      + Learn from others what you don't know
  2. Improve the products we support
      + The ilities
          - [Non-functional requirements](https://en.wikipedia.org/wiki/Non-functional_requirement)
          - [Non-functional requirements](https://shorty/nfrs)
          - [RAMS](https://en.wikipedia.org/wiki/RAMS)
              * Reliability
              * Availability
              * Maintainability
              * Safety
      + What is it you do here?
          - CircleCI/Hal Orbs
          - Terraform modules
          - Observability dashboards
              * SLOs
              * SLAs
  3. Help resolve Technology Incidents
      1. Mitigate client impact
      2. Find root cause
      3. Solve for future occurrence
      4. Share solutions widely

---

# Evan's Questions

  The goal of these questions was to get a team member to essentially create their own argument for why they're ready for a promotion, or alternatively get them thinking about the reasons they might not be ready. Start from the mindset of, "If I were to suggest promoting this person, how would I make a case for them?"

  These aren't seen as a replacement for TRAC in any way, but rather an addition to a more traditional technical evaluation. The answers to these questions are much more subjective and holistic.

  The team member should fill out a written response to each question in advance and then discuss them together with their leader in a future one-on-one.

    1. What languages/technologies are you an expert at and how do you demonstrate that?
    2. What does the team see you as an expert on?
    3. What projects have you owned and what have the outcomes of those projects been?
    4. Who have you mentored and in what ways is the success of that mentorship demonstrated?
    5. If you were promoted, would the team be surprised by it? Why or why not?
    6. In what ways have you improved the quality or efficiency of our application?
    7. How do your skills compare to the existing people who have the title you’re looking to achieve?
    8. What business/strategy partners do you have relationships with?
    9. If you had to demonstrate your commitment to the project or product, what examples would you point to?

---

# Better System Observability

  We can not completely prevent humans from making mistakes. But, we can achieve better awareness when those mistakes happen; so that we can take corrective action sooner.

  For us to have better awareness of when problems are introduced we need better monitoring and alerting of the systems that we build. This is not a new idea, nor are the solutions themselves. What we have relied upon so far is that: every team knows what they should be monitoring, they know what alerts should be set up, they are in place for everything that we maintain, and they remain working throughout changes to the system.

  To achieve better system observability we need a clearly define the set of problems to monitor for and alert about. Then we need to be able to run automated tests against our expectations to verify that proper monitoring and alerting are in place.

    1. Define Service Level Objectives (SLOs)
    2. Identify and monitor Service Level Indicators (SLIs)
    3. Alert about broken SLOs
    4. Automated Observability Testing (AOT)
        + Obtain synthetic traffic
            * Record, and anonymize, actual traffic patterns from production
            * Create generic traffic patterns
        + Start synthetic traffic
        + AOT experiments
            * Inject error
            * Monitor for success
        + Stop synthetic traffic
        + Record results of the experiments

---

# Programming Challenge (for interviews... and fun?)

  1. Digital Scavenger Hunt
      + Data file with encrypted - using the candidate's name as a key - answers to a API scavenger hunt
      + Temperamental API client that will munge responses randomly
  2. Mastermind
      + Server
      + Client
  3. Left/right Maze
  4. Number "riddles"
      + Prime
      + Even/odd
      + Greater that or less than
      + Positive and Negative
      + Whole or fractional
      + Ends/starts with; includes
      + Palindrome
      + Repeated digits
      + Sequences: Fibonacci factorials, evens, odds, primes, etc.


  The candidate builds their dataset by picking a few options for a few questions first. Then that creates the "encrypted data" that they will then search through programatically.

    - Animals
    - Famous people from history
    - Tree types
    - Fictional characters
    - Colors
    - Patterns: polka dot, argyle, stripes
    - Shapes: circle, start, square, rectangle, triangle, octagon

---

  - [ ] What have you been working on?
  - [ ] Who have you worked with?
  - [ ] Have you run into any obstacles you need help with?
  - [ ] Have you completed all of the items on your checklists?
  - [ ] Was there anything that was especially helpful?
  - [ ] Do you have any experience with dependency injection?
  - [ ] What is the difference between an abstract class and an interface?


---

# Interview Template

Pros

  -

Cons

  -

Dig Deeper

  -

TOPICS

  - self-motivated
  - problem solving skills
  - What are you looking for in your next opportunity
  - Git
  - SOLID + OOP
  - Languages
  - a11y standards
  - APIs and requests, REST, Auth
  - Design patterns
  - Infrastructure
  - Deployment pipelines
  - Regulatory restrictions
  - Security concerns
  - Decoupling / coupling
  - Unit testing; how do you know you've got good testing
  - What benefits were you looking for in a migration from jquery to vue?
  - What sorts of customizations were made to bootstrap when using that library?
  - What benefits are gained from using Server-side-rendered pages?
  - Will you explain a little about Angular Universal?
  - What is Responsive Web Design?
  - What is a RESTful API? What are some principles of REST?
  - What is semantic markup?

---

# Process Review

  * current planning process is not aligned with team vision
  * process still tied with a regular dev team
  * other teams seem to be moving faster than we are towards SRE
  * business need v technology (operational) need
  * want to be more nimble in jumping on problems when they arise
  * concern with "squirrel syndrome"; lot's of things started not enough finished
  * *shed business responsibility so that business priority doesn't come to us*
  * Servicing SRE team - what is their process?
      - What does a typical Release look like for them?
      - Do they do Release planning?
  * TFS is HORRIBLE and no one likes it.
      - Do we need it?
  * Team member happiness is also a priority
  * Our agile process might not be adding a lot value to the developer experience
      - #Organic and #Adhoc
  * We need to have clear goals and end-state for when something will be "done"
      - *How do we know when something is "done"?*
      - *What is the __hypothesis__ statement for a given body of work.*
      - These could be "Inertial Barriers" to getting to work or getting things done
  * The plan doesn't evolve as you get into project work which does evolve
      - Need to add acceptance criteria as we learn more about the end goal

# Action Items - Practical Changes

  * [ ] We need a hypothesis statement for these proposed changes to our process
  * [ ] Get rid of regularly scheduled planning in favor of adhoc priority discussion when something new comes up
  * [ ] Get rid of the concept of Releases; we report on the Release cadence but aren't planning for it
  * [ ] Define the desired end state in a hypothesis statements; worry less about intermediate steps

---

# Leader meeting notes

  * One actionable item you will be addressing in your group [2 min]
      - What will you measure and how will you know if you are successful?
      - Provide examples of the feedback
  * One pain point that Lending Experience/Rocket Technology should address [2 min].
      - This should be a pain point that you believe is a larger systemic problem or one that doesn't make sense for your group to try to solve independently.
      - Provide examples of feedback and/or measures (Spark or anything else) that indicates there is a larger problem.

  * Continuous flow - no quarterly/monthly planning
  * Focus on SRE - get rid of service ownership

---

  - [ ] How can I improve team member connectedness within my team?


---

# raise

I want to start with acknowledging:

  1. I love my job, my team, and the mission we are working on.
  2. I appreciate and respect the leadership that I've had and have.
  3. I am literally and figuratively invested in the success of Rocket Companies and Rocket Mortgage. Over the last 9 years I have been ignoring external opportunities and unsolicited job offers because of my commitment to our culture and vision.

For the prosperity of my family and to have a feeling of being valued for my contributions I need a base salary increase of at least 50% before the end of this year.

I'll send an email summary of our conversation and look forward to hearing about progress on this in our 1o1 next week Friday.

---


---

# Notes

  - SRE team member embed trading
      + Project based
      + Time based
  - Standardized and streamlined developer experience for .NET Core C# API
  - Automated governance audit
      + Hal Gatekeeper Policy
      + Dashboard (reporting from Hal Gatekeeper Policies)
  - What is "uptime"; how should we calculate uptime
  - Dynatrace migrations
  - What are the responsibilities of an SRE team vs trains' responsibilities?
  - Terraform Pattern Modules

---

# Goodbye

---

# Things to work on

  * Rocket Mortgage is not a technology company. A technology company puts more emphasis on the technology that supports the business; Rocket puts emphasis on things other than technology which blurs the focus for team members and leaders.
  * Standards without governance is a waste of everyone's time.
      + Create a standard and include automated governance to ensure that everyone is following it; anything less is putting in effort to hope that all people will do the right thing even if they don't know what the right thing is.
      + Governance is not a bad thing.
      + Automated governance helps educate everyone on what the standards are and that creates opportunity to get feedback that the standards could be improved from the widest audience
  * Leadership problems
      + Some leaders do not come from a technical background
          - They can not make decisions about priorities on their own which will impact how quickly anything can be acted upon
      + Some leaders are just bad leaders but aren't told so by their leaders and are allowed to continue to be leaders because someone needed to be in their position
      + Some of the leaders that come from a technical background
          - Lack the integrity to fight for what is right for fear of the impact it would have on their own career
          - Fight for the wrong things and push others around who aren't willing or are unable to push back against a stronger will or more persuasive argument

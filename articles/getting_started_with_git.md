Title: Getting Started With Git
Date: 20 March 2014
Tags: Git, Best Practices, Opinion

Version control is not just for large teams or enterprises. Version control is for anyone, with a desire to gain some piece of mind when making changes to any system of any size, with ease.

## Starting Off

First, good job on starting down the road to version control; and more specifically with Git. Git is awesome. You will reap benefits from learning Git; or any version control for that matter, Git just so happens to be one of the best in my opinion.

I will say that working with any version control system will add to your tool-belt and that comes with benefits and deficits. The benefits will far out-weigh the deficits however.

## Deficits (some of them at least)

You will need to learn a whole lot more than you know now. Version control is not a simple topic to master and many people who are users of Version Control Systems (VCSs) are not masters; the author of this article included. But You can be a very apt user and still get a lot done; again, this author included.

Don't let the dearth of information available be a deterrent to your diving in to (distributed) VCS. Lot's of 'd' words in that last sentence. There is a lot of help available for learning about using VCSs for your everyday use. Here are a few that helped me:

  + https://www.atlassian.com/git/workflows
  + http://gitimmersion.com/
  + http://git-scm.com/book
  + http://book.git-scm.com/
  + http://gitready.com/
  + https://www.youtube.com/user/GitHubGuides
  + http://training.github.com/
  + http://pcottle.github.io/learnGitBranching/

*That last one is one of my favorites.*

Learning the basics is actually pretty easy to do in a day. One nice thing about Git in particular is that you can do all training on your personal computer without anything more than an install; some VCSs require a server to be set up before you will be able to practice.

So, you will need to learn a bunch of new stuff; but learning is fun right. You will also need to inject version control into your daily work by learning to stop when you complete a task and bundle up your changes and save (commit) them into the repository for others. This will be a new experience if you haven't worked with version control and any number of other people who are going to co-habit-ate with you in a single code-base. Don't worry it's fun.

Another thing you'll run into is, you will make mistakes. These will hurt, but they will be opportunities to learn and grow. A good side of this hurt is that the more you learn the less likely you will make mistakes.

## Benefits (some of them at least)

Oh, the list is so long. I promise that I will not give a complete list but I will try and explain some important points.

One of the big benefits to version control is that once changes have been committed to the VCS or repository they are safe. As long as all copies exist and the disks they are stored on continue to work and all that hardware jazz. You will have the confidence that if your personal machine that you work on every day gets put in the dish washer by someone your changes to that project your working on are still safe.

Another thing that is great about using Git for version control is the ability to share your code with people; not even necessarily people who are also working on the same project. GitHub has been a huge gain for the development community. Because Git is a DVCS - 'D' standing for distributed - you can share code between any two computers with Git installed; no need for a central server.

Freedom is the next advantage of working with Git. Git frees you to explore changes to a code-base in interesting ways very simply. Would you like to try any number of avenues to solving a problem and not have distinct complete copies of the project? Git will solve that for you.

Hopefully I have listed enough benefits to get you interested if you aren't already a convert; and if you have more ideas to share about the benefits or deficits of using version control please comment and let us all know more.

## Setup(s)

Let's start with the assumption that there is no one way that is most correct as a setup for everyone. There is also no one work-flow that is completely correct for everyone. Luckily Git is flexible and enables a number of work-flows for teams of all sizes and configurations.

I have had the lucky opportunity to work in a smaller business with a very simple Git setup and then a much larger organization which has very graciously setup GitHub Enterprise for developers within the company. Hosted repository systems like GitHub, BitBucket, GitLab, and others offer features that make some things easier but none are necessary for a team or group of people to collaborate on a coding project. It is very possible to simply have an 'agreed-upon' central repository location for all members to send changes to. What you get from the hosted solutions are things like Pull Requests (thank you GitHub) and very nice visual diffs among others.

As an example, the most basic setup could be two developers with another location that is the production version of the project. Each of the three instances has an identical copy of the code-base and both developers have access to push/pull changes from any instance. This may be viewed by many as the 'wild west' of development environments but if it works for the group then there is nothing wrong with it. Maturity is not always needed and will come with time working with a system and learning what could be better.

I encourage anyone to start learning Git and version control. It will make your development life better.

Please comment on anything that I have glossed over or stated incorrectly. If you loved this article or would like to know more I would love to hear about that as well.

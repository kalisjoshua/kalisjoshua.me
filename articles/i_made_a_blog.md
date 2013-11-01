Title: I Made A Blog! [DRAFT]
Date: 1 Nov 2013
Tags: JavaScript, NodeJS, DIY

I wanted a place to publish articles I write; which would also hopefully inspire me to write more consistently, if not often.

I wanted to find something that would do everything that I want in a blog platform without much effort. And, I wanted some very specific things, which I thought others would have already developed; so I didn't have to.

## What I Want(ed)

Let me explain what I was looking for - and eventually - did not find, and so wrote it myself. Maybe someone else will find it useful and use it themselves. Comments and criticisms always welcome.

  1. Simple
  2. Markdown Content

### Simple

I did not want to deal with installing, configuring, connecting, and maintaining a Database so I opted out of using one all together. More advanced features could be enabled by using a DB such as: user authentication and authorization, proper tagging and categorization of content, scheduled publishing, and on and on. I did not - and will not, for a while - require any of these features.

I wanted to use as few external dependencies as possible. I am a JavaScript developer so I wanted to write as much of the system as I could stand to do; once I finally decided to stop looking for something existing and do it myself. I have in the past written a templating library and Markdown-like parser as experiments yet opted to not use those for this project. I could have but I erred on the side of community standards.

### Markdown Content

When I write I find that I enjoy not being distracted by the editor. Markdown is great for that since it is very streamlined and to the point. So the rule I set was that all content editing would be done in Markdown files and rendered through a standard parser; nothing custom.

## What I Created

  1. Simple
    1. Router
    2. Server
    3. Templates
    4. Email Obfuscater
    5. Syntax Highlighting
  2. Markdown Content

### Simple

I like using stuff that I can understand. I didn't want to learn a whole lot to get a "working" site up and available.

## Conclusion

Obviously some shortcuts were taken and therefore the long-term scalability of it as a large blog is highly suspect, but it is a start and will work for a while. Time will tell how bad - or good - a thing I have created.
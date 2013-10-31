Title: BrowserSlides
Date: 4 Oct 2013
Tags: CSS, HTML, JavaScript, jQuery, Markdown

I wrote a simple slides parser / formatter and presenter library in JavaScript, jQuery, and Markdown; OK, and some CSS and HTML.

## History

I was asked by a former colleague to give a presentation on jQuery plugins to a few people he worked with at my former place of work. I thought it might be cute and a good exercise to write a plugin that converted a block of markdown text into HTML with the goal of using that HTML as the slide deck for the presentation.

As it turned out I rather liked the idea of having presentation slides as a markdown file rather than in a standard presentation software specific file format. I am a programmer through and through so I guess it should be no surprise to myself, or others, that I like, nay prefer, the markdown file format and don't mind working in it at length.

So this simple idea that I had actually grew larger than I had expected but took me on a fun journey of learning and exploration. As it turns out other people soon had a similar idea and new libraries and tools have started coming out a similar outcome: https://github.com/tmcw/biggie, and https://github.com/gnab/remark are just a few; so it must not have been too bad an idea.

## Approach

I started with a standalone file for my first presentation but as soon as I had the idea to create another presentation I immediately saw that the way I developed my first solution was not going to scale at all. I decided to abstract out what was going to change over time and keep that separate from what was not going to change between presentations.

Once written, and working, the CSS, HTML, and JavaScript will change relatively rarely compared to the presentation content. The presentation content is where I, or any presenter, will be spending the most time. So the file that needs to be edited only contains the content for the presenter; nothing else.

### Editing

I liked Markdown but had some reservations about some of its' syntax. There are parts that I don't like so I decided to create my own syntax; admittedly, not the best decision I have ever made but oh well.

I changed some of the syntax and created new stuff as well. Some features of Markdown I left out completely since I wanted to keep the syntax terse and simple to parse; since I was writing the parser myself.

The most significant addition has to be the slide-ending identifier; simply an underscore at the beginning of a line. This allowed me to parse per-slide and to wrap in a div for the navigation control.

### Viewing

I made the core (index) file the entry point and included a Table of Contents as the default content. This was if no presentation is selected at least something shows up to help the user get to something. Each link is simply an anchor link that loads the content via a server request for a document. The document returned would be the presentation file in the syntax I defined. Once the file is retrieved it would get parsed and the presentation would be ready.

## Restrictions

In creating this and using it I have restricted the functionality of a presentation. In most presentation softwares there are features for animations, formatting, fonts, sounds, and in general a whole bunch of things that, for one, I don't care about nor do I think are truly beneficial to the content.

Mobile devices prove to be challenging and that is one area that still needs some attention; not to mention navigation concerns. On some smaller or odd shaped browser sizes there can be problems with overflow of text and accessibility of content.

Given the restrictions I know I am not creating the next big thing in software for presentations any time soon but I like it for my amateur presenting.

## Benefits

The first goal of the file format I was aiming for is gaining the ability to version control presentations. I love Git and all that it offers for version control, and creating presentations in a text file is awesome for version control.

Another wonderful benefit was that this format allows me to edit my presentation in my editor of choice; I use SublimeText. I am already comfortable with working in my editor why would I want to learn something else for something that I don't do very often?

I work on the web and I like it when content I am looking for is easily accessible via a browser. Why shouldn't the slides for a presentation be viewable in a browser?

## Lessons

I think the first lesson I learned was that I wanted more features included than I had originally thought. If I had been asked I would have said it would be extremely easy to create what I wanted because "I only wanted: headings, paragraphs, and lists" but as it turned out I wanted a lot more than that: code-blocks, pre-formatted text, links, block-quotes, title slides, and more. I think at this point it probably has a bare minimum of features.

Another lesson was how complex parsing can be, how helpful regular expressions can be and where they fall down at times. I think that I am completely convinced that if you have a problem and you attempt to solve it with regex, you now have two problems; but I will not shy away from them in any case.

Others as well I am sure.

## Expansion

I have lots of ideas of where I can go with more development on this project. Here are just a few:

  1. Speaker Notes - sometimes it is nice to have notes, only for the speaker to see during a presentation, that help keep them on topic and sure that they cover all that they wanted to during preparation.
  2. Mobile Integrations
    1. Speaker Notes
    2. Control - presenters often like to move around, walk up to a screen and point at something, but as it is right now the only way to navigate is with the keyboard of the computer displaying the presentation; it would be cool to be able to pair with a mobile device and use that while moving about.
  3. Markdown Migration - I need to abandon the syntax I created and simply use standard Markdown and parse its output appropriately.
  4. SaaS - I think it would be cool to create a service similar to http://slid.es, http://slideshare.net, et al. for what I have created.

## Conclusion

I had a lot of fun creating this project and evolving it. Maybe one day it will be something that someone other then myself will use for their presentation(s); if not I am happy to be its only user.


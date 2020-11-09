## I Learned Something Old
### 31 May 2014

Often times I am working in terminal - bash - and I find that I have 2 - 3 tabs open for a given project. What I learned - and am writing about - is how to send jobs to the background so I can again use the terminal tab / window as well as kill jobs and restart them.

I will comonly have tabs for: running a local server, file watchers watching Sass or Stylus and JS files, and one tab dedicated to running Git commands. I thought I would share incase others would like a simple walkthrough of it; and so I can have a record of it if I forget or need to explain it to someone else. I say that I learned something old because I don't imagine that this is something new by any stretch of the imagiation.

### A Sample Command

For this article I will be using the Pything simple HTTP server as an example of a command that I would like to run in the background and ignore otherwise while I am developing.

```` bash
$ python SimpleHTTPServer -m 9000
````

### Send To Background

The first step will be to send the job to the background. Follow the command with a trailing space and ampersand to tell the shell to immediately send the execution of the command into the background. The resulting output will be the job number - in square brackets - and the last ... um ... something in the pipeline. I don't really care about that stuff just now but might find a use for it in the future. For now, the job is in the backgound and that is what I care about.

```` bash
$ python SimpleHTTPServer -m 9000 &
````

One thing you might want at this point is the ability to get access to the command; most specifically, to be able to stop and restart it. There are two options I see for this: 1. use `fg` to bring the job into the foreground and then `ctrl+c` to kill it, or 2. use `jobs` to list the jobs in the current context and then `kill %{job-id}` replacing the '{job-id}' part with the actual number listed in the jobs listing.

#### List Running Jobs

```` bash
$ jobs
````

The above command should out put something like:

```` bash
[1]+  Running                 python -m SimpleHTTPServer 9000 &
````

#### Kill Jobs

```` bash
$ kill %1
````

### Tell It To Shut Up

The next thing I found was that most times, I want to actually use the terminal window as if it wasn't the output location for whatever is running. To do that we simply redirect output.

```` bash
$ python -m SimpleHTTPServer $PORT > /dev/null 2>&1
````

That should quiet the output of the traffic that would normally be logged to the console.

#### Put It All Together

The final command makes life sweet.

```` bash
$ python -m SimpleHTTPServer $PORT > /dev/null 2>&1 &
````

### Use It Anywhere

Now I'm lazy and don't like to type things; partially because my typing is pretty bad. But typing less and accomplishing the same thing is called productivity. So creating an alias is a great way to use this.

```` bash
alias serve="python -m SimpleHTTPServer $PORT > /dev/null 2>&1 &"
````

#### Make It Better

That alias is great and all but what if you wanted to run more than one at a time? If you did you would want to provide the PORT number as your call to start it, right?

```` bash
simpleServer() {
  local PORT=$1

  if [ $# -eq 0 ]
  then
    PORT=9000
  fi

  python -m SimpleHTTPServer $PORT > /dev/null 2>&1 &
}

alias serve=simpleServer
````

**Tags**

  * [Bash](../#filter=Bash)
  * [Cool Stuff](../#filter=Cool Stuff)
  * [Productivity](../#filter=Productivity)

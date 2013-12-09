## My Dotfiles

### ~/.bash_profile

    # only need be run once
    # echo "set completion-ignore-case On" > ~/.inputrc
    # git config --global color.ui true

    export PATH=/usr/local/heroku/bin:/usr/local/zend/bin:~/bin:$PATH:~/.rvm/bin
    source /usr/local/git/contrib/completion/git-completion.bash


    function colorize_ls {
        # The color designators are as follows:

        # a     black
        # b     red
        # c     green
        # d     brown
        # e     blue
        # f     magenta
        # g     cyan
        # h     light grey
        # A     bold black, usually shows up as dark grey
        # B     bold red
        # C     bold green
        # D     bold brown, usually shows up as yellow
        # E     bold blue
        # F     bold magenta
        # G     bold cyan
        # H     bold light grey; looks like bright white
        # x     default foreground or background

        # The order of the attributes are as follows:

        # 1.   directory
        # 2.   symbolic link
        # 3.   socket
        # 4.   pipe
        # 5.   executable
        # 6.   block special
        # 7.   character special
        # 8.   executable with setuid bit set
        # 9.   executable with setgid bit set
        # 10.  directory writable to others, with sticky bit
        # 11.  directory writable to others, without sticky bit

        #                exfxcxdxbxegedabagacad
        #                1 2 3 4 5 6 7 8 9 0 1
        export LSCOLORS="gxbxdxbxcxexGxFxFxhxhx"
        export CLICOLOR='Yes'
        export LS_OPTIONS='--color=auto'
    }

    function customize_prompt {
        local reset="\[\033[0m\]"    # unsets color to term's fg color

        # regular colors
        # local black="\[\033[0;30m\]"      # black
        # local red="\[\033[0;31m\]"        # red
        local green="\[\033[0;32m\]"      # green
        # local yellow="\[\033[0;33m\]"     # yellow
        # local blue="\[\033[0;34m\]"       # blue
        # local magenta="\[\033[0;35m\]"    # magenta
        local cyan="\[\033[0;36m\]"       # cyan
        # local white="\[\033[0;37m\]"      # white

        # emphasized (bolded) colors
        # local b_black="\[\033[1;30m\]"      # black
        # local b_red="\[\033[1;31m\]"        # red
        # local b_green="\[\033[1;32m\]"      # green
        # local b_yellow="\[\033[1;33m\]"     # yellow
        # local b_blue="\[\033[1;34m\]"       # blue
        # local b_magenta="\[\033[1;35m\]"    # magenta
        # local b_cyan="\[\033[1;36m\]"       # cyan
        # local b_white="\[\033[1;37m\]"      # white

        # background colors
        # local bg_black="\[\033[40m\]"        # black
        # local bg_red="\[\033[41m\]"          # red
        # local bg_green="\[\033[42m\]"        # green
        # local bg_yellow="\[\033[43m\]"       # yellow
        # local bg_blue="\[\033[44m\]"         # blue
        # local bg_magenta="\[\033[45m\]"      # magenta
        # local bg_cyan="\[\033[46m\]"         # cyan
        # local bg_white="\[\033[47m\]"        # white

        function git_branch {
            git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(branch \1)/'
        }

        function post_command {
            local textreset="\033[0m"
            local color="\033[0;31m"
            echo -e "\t$color`date`$textreset"
        }

        # executes after each command
        PROMPT_COMMAND=post_command

        export PS1="\n\w $cyan\$(git_branch)$reset \n\u$green@\h$reset $ "
    }

    colorize_ls
    customize_prompt

    [[ -s "~/.rvm/scripts/rvm" ]] && source "~/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*



### ~/.gitconfig

    [color]
        ui = auto
    [http]
        sslVerify = false
    [user]
        name = Joshua T Kalis
        email = kalisjoshua@gmail.com
    [alias]
        count = rev-list --count HEAD
        lg = log --graph --pretty=format:'%Cgreen%h%Creset -%d %s (%Cgreen%ar%Creset) %an'
        squash = !sh -c 'git rebase -i $(git merge-base HEAD $1)' -
        who = shortlog -s --
    [push]
        default = simple

### Sublimetext3 Settings

    {
        "color_scheme": "Packages/Color Scheme - Default/Solarized (Light).tmTheme",
        "find_selected_text": true,
        "font_face": "menlo",
        "font_size": 15,
        "ignored_packages":
        [
            "Markdown",
            "Vintage"
        ],
        "index_files": false,
        "rulers":
        [
            80,
            120
        ],
        "scroll_past_end": true,
        "shift_tab_unindent": true,
        "tab_size": 2,
        "translate_tabs_to_spaces": true,
        "use_tab_stops": true
    }

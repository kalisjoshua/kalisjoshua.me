## My Dotfiles

### ~/.bash_profile

    parse_git_branch() {
        git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(branch \1)/'
    }

    # Colors for ls
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

        #            exfxcxdxbxegedabagacad
        #            1 2 3 4 5 6 7 8 9 0 1
    export LSCOLORS="gxbxdxbxcxexGxFxFxhxhx"
    export CLICOLOR='Yes'
    export LS_OPTIONS='--color=auto'

    source /usr/local/git/contrib/completion/git-completion.bash

    echo "set completion-ignore-case On" > ~/.inputrc

    export PATH=/usr/local/git:$PATH

    export PS1="\n\u@\h \w \$(parse_git_branch)\n\d \t :> "

    export PATH=/usr/local/zend/bin:~/bin:$PATH

    ### Added by the Heroku Toolbelt
    export PATH="/usr/local/heroku/bin:$PATH"

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
        lg = log --decorate --graph --oneline
        squash = !sh -c 'git rebase -i $(git merge-base HEAD $1)' -
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

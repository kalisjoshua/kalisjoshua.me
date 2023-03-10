## Git Config For Personal AND Professional Development
### 6 Jan 2022

I would like to work on person projects using one Git config but work on employer related work with a different Git config. This could be limited to only a difference in the email address included in my commits. The way that I have set this up is:

```bash
$ git config --global -e
```

...and in that file I will have all my default configurations:

```config
[user]
  name = Joshua T Kalis
  email = kalisjoshua@gmail.com
[includeIf "gitdir:~/git/working/for/employer/"]
  path = ~/git/working/for/employer/.gitconfig
```

...which then allows me to customize my employer-specific settings:

```config
[user]
  email = josh.kalis@employer.com
```

Doing this frees me from needing to remember to change configs when switching between personal and professional projects. Which also means that I am not messing up Git histories with incorrect contact information for me; and then needing to remove commits or rewrite histories to be correct.

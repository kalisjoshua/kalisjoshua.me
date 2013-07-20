
# Getting set up with node.js and Heroku

[Source Tim Taylor](https://github.com/toolbear/easy-breezy-node-heroku)

## 2. Install Heroku CLI

Pre-requisites:

* Heroku account - https://api.heroku.com/signup
* Ruby

Download Heroku CLI

* http://devcenter.heroku.com/articles/node-js#local_workstation_setup

Login to Heroku. You only have to do this once.

    heroku login

## 5. Deploy!

Create new Heroku app in your account. You do this once per app.
**Important**: specifying Cedar is important. The original Heroku stack
was Ruby only.

    heroku create --stack cedar
    # optionaly: heroku create --stack cedar friendly_app_name

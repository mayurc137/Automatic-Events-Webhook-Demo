# Automatic Webhook Demo App

A node.js app to demonstrate the use of the [Automatic Webhook API](https://developer.automatic.com/api-reference/#real-time-events). It maps realtime location events on a map.

This app listens to events for all authorized users of this app via a webhook URL. It then sends each logged-in user's events to their browser via a websocket connection. The result is that users can see a realtime stream of their own vehicle events.

The app is designed responsively to work well in mobile browsers.

## Demo

A version of this application is available at [https://automatic-webhook-demo.herokuapp.com](https://automatic-webhook-demo.herokuapp.com).

## One-Click deploy to Heroku

Click this button to instantly deploy this app to Heroku. You'll need an [Automatic client ID and secret](http://developer.automatic.com) as well as a [mapbox access token](https://www.mapbox.com/signup/).

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

After deploying, you will need to use the Automatic [Developer Apps Manager](https://developer.automatic.com/my-apps/) to set your application's redirect URL and webhook URL to match the Heroku app name you selected when deploying. For instance, if you name your app `automatic-test` in Heroku your redirect URL should be `https://automatic-test.herokuapp.com/redirect` and your webhook URL should be `https://automatic-test.herokuapp.com/webhook`. Note that the URLs must start with `https`.


## Running Locally

### Install node and gulp

    brew install node

    npm install gulp -g

### Install required packages from NPM and Bower:

    npm install

This will also grab frontend packages needed from bower and put them in `public/bower_components`

### Configure your client id and client secret

Copy the file `config-sample.json` to `config.json` and add your Automatic client id and client secret.  Alternatively, create environment variables named `AUTOMATIC_CLIENT_ID` and `AUTOMATIC_CLIENT_SECRET`.

Get a [mapbox access token](https://www.mapbox.com/signup/) and add it to the `config.json` file.

### Run the app

    DEBUG=automatic-webhook-demo gulp develop

### View the app

Open `localhost:3000` in your browser.

### Testing locally, skipping OAuth

You can test locally as a logged in user, bypassing OAuth by including an `TOKEN` and `USER_ID` when running the app.

    DEBUG=automatic-webhook-demo USER_ID=<YOUR_USER_ID> TOKEN=<YOUR-AUTOMATIC-ACCESS-TOKEN> gulp develop

## Deploying

If you have the [heroku toolbelt](https://toolbelt.heroku.com/) installed, you can create, configure and deploy this app to Heroku.  To create an app:

    heroku create

If you already created an app, add it as a git remote:

    git remote add heroku YOUR-HEROKU-GIT-URL

Configure the heroku app's environment variables:

    heroku config:add AUTOMATIC_CLIENT_ID=<YOUR AUTOMATIC CLIENT ID>
    heroku config:add AUTOMATIC_CLIENT_SECRET=<YOUR AUTOMATIC CLIENT SECRET>
    heroku config:add SESSION_SECRET=<YOUR SESSION SECRET>

Deploy your app to heroku:

    git push heroku master

See [deploying a node.js app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) for more information.

### Support

Please write to developer@automatic.com if you have any questions or need help.

## License

This project is licensed under the terms of the Apache 2.0 license.

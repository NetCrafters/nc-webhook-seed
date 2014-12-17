# NetCrafters Webhook Seed

The intent of this repo is to provide a stand-alone method to maintain and re-use layout/style themes within [Webhook](http://webhook.com).

It does not follow theming methods outlined in the Webhook documentation.

## Installation

* Be in your webhook site's folder
* Download this repo: ```curl -O https://github.com/NetCrafters/nc-webhook-seed/archive/master.zip```
* Unzip: ```unzip master.zip```

## Usage from Shell

* ```# cd webhook-site```
* ```# grunt```
* ```# cd nc-webhook-seed```
* ```# grunt```

Grunt will watch for changes in the following folders:

* javascript
* scss
* less
* templates
* pages

After a change is detected, a build process is triggered and the final files are copied to Webhook (at this point, Webhook's simple-watch task will be triggered, as normal.)

This should also work with the Webhook UI.

## Planned Improvements

* Integrate re-usable content-type installation. This will require changes within Webhook. 



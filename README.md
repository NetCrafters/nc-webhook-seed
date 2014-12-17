# NetCrafters Webhook Seed
#### An add-on stand-alone "theme" manager for use with the Webhook CMS platform.

The intent of this repo is to provide a stand-alone method to maintain and re-use layout/style themes within [Webhook](http://webhook.com).

It does not follow theming methods outlined in the Webhook documentation.

It was created in order to support our existing development workflow and client processes at NetCrafters.

## Requirements

You must have a webhook site installed.

## Installation

* Be in your webhook site's folder
* Download this repo: ```wget https://github.com/NetCrafters/nc-webhook-seed/archive/master.zip```
* Unzip: ```unzip master.zip```
* Install dependencies:
  * ```# cd nc-webhook-seed```
  * ```# npm install && bower install```

## Usage from Shell

* Open a terminal and change into your webhook site's folder and start the local webhook server: ```grunt```
* Open another terminal (or tab) and change into the nc-webhook-seed folder and start its watchers: ```grunt```

NOTE: You will have two grunt processes running.

Now, login to your Webhook CMS and start creating some content types. If you allow the CMS to create your scaffolding, you can use those as starting points for template development within nc-webhook-seed -- just make sure you preserve the hiearchy.

## Watchers

Grunt will watch for changes in nc-webhook-seed the following folders:

* images
* javascript 
* scss 
* less
* templates
* pages

After a change is detected, a build process is triggered and the final files are copied to Webhook. The ```scss``` and ```less``` files are proprocessed as necessary and a ```main.css``` and ``print.css`` is generated and copied to the Webhook ```static``` folder. The ```images``` content is copied as is to the Webhook ```static``` folder. The ```templates``` and ```pages``` folder content are copied as is to Webhook proper.

The directory structure is preserved from the source folders. After the copy to Webhook proper, Webhook's simple-watch task will be triggered, as normal.

## Warnings

* The watchers *will* overwrite templates and pages in your webhook folder if the structure/files exist in nc-webhook-seed
* This has not been tested with the standalone Webhook Application, but I see no reason why it shouldn't work the same.

## Planned Improvements

* Create a data-master partial example
* Integrate re-usable content-type installation. This will require changes within Webhook (I may look into this change myself - DK.)



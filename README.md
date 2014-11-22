[![Mapping Sale Lake City Logo](http://www.mappingslc.org/images/mapping.png)](http://mappingslc.org/)

## Mapping Salt Lake City

Mapping Salt Lake City is a community-created archive of Salt Lake City’s neighborhoods and people that documents the city’s changes through art, critical and creative literature, personal maps and multi-media projects.

We invite people to engage with and evolve this site by submitting their own contributions.


## About Us
[Paisley Rekdal](http://www.poetryfoundation.org/bio/paisley-rekdal) ([home page](http://www.paisleyrekdal.com/)) is
the creator and Editor for Mapping Salt Lake City.

[Chris Tanseer](http://www.christanseer.com) is a founding member of the project and serves as the Assistant Editor and Lead Web Developer for the project.

[Isomer Academy](http://www.isomer.io), a web development bootcamp in Salt Lake City, maintains the web site. Managed
 by Isomer instructors, the students work on the site as a core part of their training.

We welcome you to join our community, either by assisting in the development of the site, or by [submitting work](http://www.mappingslc.org/index.php?option=com_k2&view=item&layout=item&id=4&Itemid=279) to the project.

Funding has been provided by [The Utah Humanities Council](http://www.utahhumanities.org/), [The University of Utah]
(http://www.utah.edu/), The Richard B. Siegel Foundation, and [Westminster College](http://www.westminstercollege.edu/).

Mapping Salt Lake City was inspired by the work of [Rebecca Solnit](http://rebeccasolnit.net/).


## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

### Cloning The Mapping SLC GitHub Repository
You can also use Git to directly clone the Mapping Salt Lake City repository:
```
$ git clone https://github.com/PoetsRock/MappingSLC.git
```
This will clone the latest version of the Mapping Salt Lake City repository to your local machine.

## Quick Install
Begin by installing the Node.js dependencies.  Go to your application folder and run in the command line:

```
$ npm install
```

We've noticed that, on occasion, you need to run this command two or three times to get all of the dependencies.
Additionally, you'll want to run:

```
$ bower install
```

(If it asks you to pick a version of AngularJS, select version 1.2.26.)

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)
                            
That's it! your application should be running by now, to proceed with your development check the other sections in this documentation. 
If you encounter any problem try the Troubleshooting section.

## License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

All published content [Mapping Salt Lake City](http://www.mappingslc.org) is copyrighted by Mapping Salt Lake City
for use on the site, in promotional material, and other marketing-related content, and otherwise is copyrighted by the
author(s) of each piece.

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
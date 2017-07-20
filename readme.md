# Annotations Plugin for VideoJS

## Collaboration through in-player annotations

##### Goals:

- Provide useful collaboration features including annotations, comments/replies, ranged time markers, and more. All with intuitive controls.
- Everything is contained within the player. There is no need to build additional UI components. Just install VideoJS, register the plugin, and start collaborating.
- The plugin can be integrated with existing commenting systems. Custom events are available for communicating with external APIs, providing support for on-page interactions and data persistence. **(In the works)*

### VideoJS Plugins

[VideoJS](http://docs.videojs.com/) is a popular open source HTML5 video player library used by 400k+ sites. As of v6, there is an extendable plugin architecture which was used to create this plugin. Here are some [examples of other VideoJS plugins.](https://github.com/videojs/video.js/wiki/Plugins). This plugin is built against [VideoJS v 6.2.0](https://www.npmjs.com/package/video.js/)

### Add it to your VideoJS player

```javascript
// Initialize VideoJS
var player = videojs('video-id');

// Add plugin
// Options here are set to defaults
player.annotationComments({
    // Collection of annotation data to initialize
    annotationObjects: [],
    // Use arrow keys to move through annotations when Annotation mode is active
    bindArrowKeys: true,
    // Flexible meta data object. Currently used for user data
    meta: { user_id: null, user_name: null },
    // Provide a callback func to be fired when the plugin data state changes
    onStateChanged: null,
    // Show or hide the control panel
    showControls: true,
    // Show or hide the comment list when an annotation is active
    showCommentList: true,
    // Show or hide the full screen button within the player toolbar
    showFullScreen: true,
    // Show or hide the tool tips on marker hover
    showMarkerTooltips: true
});
```

### Programmatic Control

If you'd like to drive the plugin or render plugin data through external UI elements, you can configure the plugin to hide the internal components and pass data through custom events. There are two kinds of AnnotationComments API events, _externally fired_ and _internally fired_.

##### Supported Externally Fired Events:

```javascript
// openAnnotation : Opens an annotation within the player given an ID
plugin.fire('openAnnotation', { id: myAnnotationId });
```

##### Supported Internally Fired Events:

```javascript
// annotationOpened.videoAnnotations : Fired whenever an annotation is opened
plugin.on('annotationOpened.videoAnnotations', function(event) {
    var annotationData = event.detail;
    // do something with annotation data
});
```

### Develop and Build

We're using [npm](https://www.npmjs.com/) for package management and [gulp](https://github.com/gulpjs/gulp) as our build system.

The fastest way to get started:
- Clone the repo
- Run `npm install`
- Run `npm install -g handlebars` (NOTE: the template compilation process should be improved so this is no longer needed)
- Run `gulp build`
- Run `gulp watch`
- Visit `http://localhost:3004/test.html` to see the magic happen.

#### Templates

We're using the handlebars templating library to render various components within the plugin. For performance, the templates are pre-compiled into a JS file within the development environment. That way we only need to require the runtime, saving nearly 100kb from the minified build! ⚡️

The `gulp templates` task is used to precompile every template within the `/src/templates` directory. The destination file is `/src/compiled_templates.js`.

#### Testing

##### Feature tests

Feature tests are currently browser-based and run by visiting `http://localhost:3004/test/mocha/features/index.html`. Feature tests can be added as files in the `/test/mocha/features/` directory and then included within the `index.html` file as an external script. In the future, running these tests should be automated through phantomJS and a gulp task.

##### Unit tests

Unit tests are run through the `gulp test` task. If the `tdd` task is included in `gulp watch`, the tests will run with every change to the test files. Each module should have a corresponding unit test file within the `/test/mocha/modules` directory.

#### Gulp commands

`gulp watch`: Fires up webserver @ `http://localhost:3004/test.html` and watches for any file changes in `/src` (which repackages and transpiles to unminified file in `/build`)

`gulp transpile`: Transpiles modules/files to build file in `/build` with JS maps

`gulp build`: Runs transpile then minifies to distribution filename in `/build` with attribution

`gulp templates`: Uses handlebars cli to pre-compile templates into a javascript file. See Templates section above.

`gulp test`: Runs the mocha unit tests within the `/test/mocha/modules/` directory.

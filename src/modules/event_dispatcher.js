'use strict';
/*
    Component for registering and handling custom events for external interaction support.
    Will be bound to plugin object as a message gateway between external elements and the plugin.
*/

class EventDispatcher {

    constructor (plugin) {
        this.plugin = plugin;
        this.registeredListeners = [];
    }

    // TODO: use a smarter namespacing system
        // so all matching event types aren't unbound at the same time
    nameSpacedType (type) {
        return type + '.videoAnnotations';
    }

    // Use the EventRegistry to mass register events on each component initialization
    registerListenersFor (obj) {
        let matchingEvents = EventRegistry[obj.constructor.name];
        if (matchingEvents) {
            Object.keys(matchingEvents).forEach((key) => {
                // Don't register again if already in cached collection
                if (!~this.registeredListeners.indexOf(key)) {
                    let callback = matchingEvents[key].bind(obj)
                    this.registerListener(key, callback)
                }
            });
        }
    }

    // Bind a listener to the plugin
    registerListener (type, callback) {
        this.plugin.on(this.nameSpacedType(type), callback);
        this.registeredListeners.push(type);
    }

    // Remove a listener to the plugin
    // NOTE: not yet being used
    destroyListener (type) {
        this.plugin.off(this.nameSpacedType(type));
    }

    // Trigger an event on the plugin
    fire (type, data) {
        let evt = new CustomEvent(this.nameSpacedType(type), { 'detail': data });
        this.plugin.trigger(evt);
    }
};

/*
    A centralized collection of event callbacks organized by component and name
*/

const EventRegistry = {
    AnnotationState: {
        openAnnotation: function (event) {
            let annotationId = event.detail.id;
            let annotation = this.annotations.find((a) => a.id === parseInt(annotationId));
            if (annotation) this.openAnnotation(annotation);
        }
    }
}

module.exports = {
    class: EventDispatcher
};
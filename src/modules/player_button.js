"use strict";
/*
    Component main 'annotation toggle' button in the player controls, including notifier for # annotations
*/

const PlayerComponent = require("./player_component").class;

class PlayerButton extends PlayerComponent {

    constructor (playerId) {
        super(playerId);
        this.draw();
    }

    // Add button to player
    draw () {
        let btn = player.getChild('controlBar').addChild('button', {});
        btn.addClass('vac-player-btn');
        btn.controlText("Toggle Animations");
        this.$el = $(btn.el());
    }

    // Update the number of annotations displayed in the bubble
    updateNumAnnotations (num) {
        let $bubble = this.$el.find("b");

        if(!$bubble.length){
                $bubble = $("<b/>");
                this.$el.append($bubble);
        }

        $bubble.text(num);
        num > 0 ? this.$el.addClass('show') : this.$el.addClass('hide');
    }
}

module.exports = {
    class: PlayerButton
};

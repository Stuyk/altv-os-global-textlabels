/// <reference types="@altv/types-server" />
import alt from 'alt-server';

alt.on('playerConnect', handlePlayerConnect);
alt.on('textLabel:Create', handleCreation);
alt.on('textLabel:Destroy', handleDestroy);

let textLabels = [];

export class TextLabel {
    /**
     * Create a new text label that is synced automatically.
     * @param  {string} identifier
     * @param  {string} text
     * @param  {alt.Vector3} position
     * @param  {number} distance
     * @param  {number} fontType
     * @param  {number} scale
     * @param  {number} r
     * @param  {number} g
     * @param  {number} b
     * @param  {number} a
     */
    constructor(identifier, text, position, distance, fontType, scale, r, g, b, a) {
        this.identifier = identifier;
        this.text = text;
        this.position = position;
        this.distance = distance;
        this.font = fontType;
        this.scale = scale;
        this.color = {
            r,
            g,
            b,
            a
        };

        textLabels.push(this);
        this.syncPlayer(null); // Sync all.
    }

    update() {
        alt.emitClient(null, 'textlabel:Update', this);
    }

    syncPlayer(player) {
        alt.emitClient(player, 'textlabel:Create', this);
    }

    destroy() {
        alt.emitClient(null, 'textlabel:Destroy', this.identifier);
    }
}

function handlePlayerConnect(player) {
    for (let i = 0; i < textLabels.length; i++) {
        const label = textLabels[i];
        label.syncPlayer(player);
    }
}

/**
 * Create a new text label that is synced automatically.
 * @param  {string} identifier
 * @param  {string} text
 * @param  {alt.Vector3} position
 * @param  {number} distance
 * @param  {number} fontType
 * @param  {number} scale
 * @param  {number} r
 * @param  {number} g
 * @param  {number} b
 * @param  {number} a
 */
function handleCreation(identifier, text, position, distance, fontType, scale, r, g, b, a) {
    new TextLabel(identifier, text, position, distance, fontType, scale, r, g, b, a);
}

function handleDestroy(identifier) {
    const index = textLabels.findIndex(label => {
        if (label.identifier === identifier) {
            return true;
        }
    });

    if (index <= -1) {
        return;
    }

    textLabels[index].destroy();
    textLabels.splice(index, 1);
}

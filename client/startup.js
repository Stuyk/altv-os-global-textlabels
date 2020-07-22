/// <reference types="@altv/types-client" />
import alt from 'alt-client';
import * as native from 'natives';

const timeBetweenUpdates = 250;

let nextTextLabelUpdate = Date.now() + timeBetweenUpdates;
let textLabels = [];
let closestTextLabels = [];
let interval;

alt.onServer('textlabel:Create', handleCreate);
alt.onServer('textlabel:Destroy', handleDestroy);
alt.onServer('textlabel:Update', handleUpdate);

/**
 * @param {{identifier: string, text: string, position: alt.Vector3, distance: float, font: number, scale: number, color: {r: number, g: number, b: number, a: number}}} labelData
 */
function handleCreate(labelData) {
    textLabels.push(labelData);

    if (interval) {
        return;
    }

    interval = alt.setInterval(drawLabels, 0);
}

function getLabelIndex(identifier) {
    const index = textLabels.findIndex(label => {
        if (label && label.identifier === identifier) {
            return true;
        }
    });

    return index;
}

function handleDestroy(identifier) {
    const index = getLabelIndex(identifier);

    if (index <= -1) {
        return;
    }

    textLabels.splice(index, 1);

    if (textLabels.length <= 0 && interval) {
        alt.clearInterval(interval);
        interval = null;
    }
}

function handleUpdate(labelData) {
    const index = getLabelIndex(identifier);

    if (index <= -1) {
        return;
    }

    textLabels[index] = labelData;
}

function drawLabels() {
    if (textLabels.length <= 0) {
        return;
    }

    if (Date.now() > nextTextLabelUpdate) {
        nextTextLabelUpdate = Date.now() + timeBetweenUpdates;
        closestTextLabels = textLabels.filter(label => {
            const dist = distance2d(label.position, alt.Player.local.pos);
            if (dist < label.distance) {
                return true;
            }
        });
    }

    if (closestTextLabels.length <= 0) {
        return;
    }

    for (let i = 0; i < closestTextLabels.length; i++) {
        const label = closestTextLabels[i];
        drawText(label.text, label.position, label.font, label.scale, label.color);
    }
}

function distance2d(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

function drawText(text, position, font, scale, color) {
    native.setDrawOrigin(position.x, position.y, position.z, 0);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(color.r, color.g, color.b, color.a);
    native.setTextOutline();
    native.endTextCommandDisplayText(0, 0);
    native.clearDrawOrigin();
}

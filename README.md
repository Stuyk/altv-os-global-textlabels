# Open Source - Global Text Labels

Created by Stuyk (Trevor Wessel)

❤️ Please support my open source work by donating. I'm here to provide general context for complicated procedures for you new developers. ❤️

https://github.com/sponsors/Stuyk/

⭐ This repository if you found it useful!

---

![](https://i.imgur.com/tTmia7K.jpg)

# Description

Easily create global text labels with custom color, font, scale, and distance. Text Labels are automatically synchronized when a player joins the server.

Keep in mind that these are globally seen by all players.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

After simply add the name of this resource to your `server.cfg` resource section.

`altv-os-global-textlabels`

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/Stuyk/altv-os-global-textlabels
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

## Creating a Text Label

Uses the event called `'textLabel:Create'`

| Parameter    | Description                                |
| ------------ | ------------------------------------------ |
| `identifier` | Unique string to associate with the label. |
| `text`       | The text to display in the label.          |
| `position`   | A Vector3 or `position` to place it.       |
| `distance`   | Distance before it draws for a player.     |
| `fontType`   | 0,1,2,4, and 7                             |
| `scale`      | Size of the text. Recommend: 0.4           |
| `red`        | 0-255                                      |
| `green`      | 0-255                                      |
| `blue`       | 0-255                                      |
| `alpha`      | 0-255                                      |

### Example

```js
alt.emit(
    'textLabel:Create',
    'label2',
    'Testing',
    {
        x: -1303.6351318359375,
        y: 153.87692260742188,
        z: 58.160400390625
    },
    5,
    2,
    0.4,
    255,
    255,
    255,
    100
);
```

## Destroy a Text Label

If you ever need to destroy the label you have created during the runtime you can simply call `textLabel:Destroy`.

| Parameter    | Description                                |
| ------------ | ------------------------------------------ |
| `identifier` | Unique string to associate with the label. |

### Example

```js
alt.emit('textLabel:Destroy', 'label2');
```

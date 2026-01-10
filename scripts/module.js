import { libWrapper } from './lib/libwrapper-shim.js'

const MODULE_NAME = "extra-embed";

const SENTENCE_REGEXP = /^(@\w+\[.+?\]\{.+?\}|.)+?[.?!]/;
const HEADER_REGEXP = /H[1-6]/i;

function getEmbedFromAnchorLinks(anchor, content) {
    let anchorType = undefined;
    const selection = [];
    const span = document.createElement("span");

    for (let i = 0; i < content.length; i++) {
        const elem = content[i];
        if (HEADER_REGEXP.test(elem.tagName)) {
            if (elem.innerText.toLowerCase() === anchor.toLowerCase() && anchorType == null) {
                anchorType = elem.tagName;
                selection.push(elem);
            }
            else if (anchorType != null && anchorType === elem.tagName) {
                break;
            }
        }
        else if (anchorType != null) {
            selection.push(elem);
        }
    }
    if (anchorType == null) {
        console.warn("Unable to find matching element with anchor.", anchor);
        const broken = document.createElement("p");
        broken.classList.add("broken", "content-embed");
        broken.innerHTML = `
            <i class="fas fa-circle-exclamation"></i>
            ${game.i18n.format("EDITOR.EmbedFailed", { uuid: config.uuid })}
            `;
        return broken;
    }
    selection.forEach(e => span.appendChild(e));
    return span;
}

async function my_createFigureEmbed(wrapped, content, {anchor, ...config}, options ) {
    if (anchor != null &&
        content instanceof HTMLCollection &&
        content.length > 0) {
        const embedContent = getEmbedFromAnchorLinks(anchor, content);
        content = embedContent;
    }

    return wrapped(content, config, options);
}

async function my_createInlineEmbed(wrapped, content, {anchor, ...config}, options) {
    // --- Core Foundry V12 does this: ---
    // const section = document.createElement("section");
    // if ( content instanceof HTMLCollection ) section.append(...content);
    // else section.append(content);
    // return section;
    if (!config) return wrapped(content, config, options);

    if (anchor != null &&
        content instanceof HTMLCollection &&
        content.length > 0) {
        return getEmbedFromAnchorLinks(anchor, content);
    }

    if (config.inline === 'sentence' &&
        content instanceof HTMLCollection &&
        content.length > 0) {
        const elem = content.item(0);
        const found = elem.innerHTML.match(SENTENCE_REGEXP);
        if (found) {
            const span = document.createElement("span");
            span.innerText = found[0];
            return span;
        }
    }
    else if (typeof config.inline === 'string' &&
        config.inline.startsWith('paragraph') &&
        content instanceof HTMLCollection) {
        let match = config.inline.match(/paragraph(?::(\d+))*/);
        let instance = Math.max(1, Number(match[1] || "1"));
        for (const elem of content)
            if (elem.nodeName === 'P' && --instance === 0) {
                const span = document.createElement("span");
                span.innerHTML = elem.innerHTML;
                return span;
            }
    }
    return wrapped(content, config, options);
}

function my_parseEmbedConfig(raw, options = {}) {
    const config = { values: [] };

    for (const part of raw.match(/(?:[^\s"]+|"[^"]*")+/g)) {
        if (!part) continue;
        const [key, value] = part.split("=")
        const valueLower = value?.toLowerCase();
        if (value === undefined) config.values.push(key.replace(/(^"|"$)/g, ""));
        else if ((valueLower === "true") || (valueLower === "false")) config[key] = valueLower === "true";
        else if (Number.isNumeric(value)) config[key] = Number(value);
        else config[key] = value.replace(/(^"|"$)/g, "");
    }

    // Handle finding and extracting the page anchor
    for (const [i, value] of config.values.entries()) {
        const [valueNoAnchor, anchor] = value.split("#");
        if (anchor != null) {
            config.anchor = anchor;
            config.values[i] = valueNoAnchor;
        }
    }

    // Handle default embed configuration options.
    if (!("cite" in config)) config.cite = true;
    if (!("caption" in config)) config.caption = true;
    if (!("inline" in config)) {
        const idx = config.values.indexOf("inline");
        if (idx > -1) {
            config.inline = true;
            config.values.splice(idx, 1);
        }
    }
    if (!config.uuid) {
        for (const [i, value] of config.values.entries()) {
            try {
                const parsed = foundry.utils.parseUuid(value, options);
                if (parsed?.documentId) {
                    config.uuid = value;
                    config.values.splice(i, 1);
                    break;
                }
            } catch { }
        }
    }
    return config;
}


Hooks.once('ready', async function () {
    libWrapper.register(MODULE_NAME, 'JournalEntryPage.prototype._createInlineEmbed', my_createInlineEmbed, libWrapper.MIXED);
    libWrapper.register(MODULE_NAME, 'Item.prototype._createInlineEmbed', my_createInlineEmbed, libWrapper.MIXED);
    libWrapper.register(MODULE_NAME, 'JournalEntryPage.prototype._createFigureEmbed', my_createFigureEmbed, libWrapper.MIXED);
    libWrapper.register(MODULE_NAME, 'Item.prototype._createFigureEmbed', my_createFigureEmbed, libWrapper.MIXED);
    libWrapper.register(MODULE_NAME, 'TextEditor._parseEmbedConfig', my_parseEmbedConfig, libWrapper.OVERRIDE);
});

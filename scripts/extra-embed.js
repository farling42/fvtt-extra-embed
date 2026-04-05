import {libWrapper} from './lib/libwrapper-shim.js'

const MODULE_NAME = "extra-embed";

const SENTENCE_REGEXP = /^(@\w+\[.+?\]\{.+?\}|.)+?[.?!]/;

async function my_createInlineEmbed(wrapped, content, config, options) {
    // --- Core Foundry V12 does this: ---
    // const section = document.createElement("section");
    // if ( content instanceof HTMLCollection ) section.append(...content);
    // else section.append(content);
    // return section;
    if (!config) return wrapped(content, config, options);

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
        let instance = Math.max(1,Number(match[1] || "1"));
        for (const elem of content)
            if (elem.nodeName === 'P' && --instance === 0) {
                const span = document.createElement("span");
                span.innerHTML = elem.innerHTML;
                return span;
            }
    }
    return wrapped(content, config, options);
}


Hooks.once('ready', async function() {
    libWrapper.register(MODULE_NAME, 'JournalEntryPage.prototype._createInlineEmbed', my_createInlineEmbed, libWrapper.MIXED);
    libWrapper.register(MODULE_NAME, 'Item.prototype._createInlineEmbed',             my_createInlineEmbed, libWrapper.MIXED);
});

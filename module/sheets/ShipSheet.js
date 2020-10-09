import { shipType } from "../data/Actor/ActorTypes.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ShipSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["the-expanse", "sheet", "ship", shipType],
            template: "systems/the-expanse/templates/sheets/ShipSheet.hbs",
            width: 600,
            height: 600,
        });
    }
    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable)
            return;
	}
    getData() {
        const sheetData = super.getData();
        return sheetData;
    }
    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 150;
        sheetBody.css("height", bodyHeight);
        return position;
    }
    /** @override */
    _updateObject(event, formData) {
        // Re-combine formData
        formData = Object.entries(formData).reduce((obj, e) => {
            obj[e[0]] = e[1];
            return obj;
        }, {
            _id: this.object._id,
        });
        // Update the Actor
        return this.object.update(formData);
    }
}


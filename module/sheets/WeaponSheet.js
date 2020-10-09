import { weaponType } from "../data/Item/ItemTypes.js";
export class WeaponSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["the-expanse", "sheet", weaponType],
            template: "systems/the-expanse/templates/sheets/weaponSheet.hbs",
            width: 520,
            height: 300,
        });
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
    activateListeners(html) {
        super.activateListeners(html);
        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable)
            return;
    }
    /** @override */
    _updateObject(_, formData) {
        // Re-combine formData
        formData = Object.entries(formData).reduce((obj, e) => {
            obj[e[0]] = e[1];
            return obj;
        }, { _id: this.object._id });
        // Update the Item
        return this.object.update(formData);
    }
}
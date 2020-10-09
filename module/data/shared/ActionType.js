export var ActionType;
(function (ActionType) {
    ActionType[ActionType["none"] = 0] = "none";
    ActionType[ActionType["minor"] = 1] = "minor";
    ActionType[ActionType["major"] = 2] = "major";
    ActionType[ActionType["concentration"] = 3] = "concentration";
    ActionType[ActionType["varies"] = 4] = "varies";
})(ActionType || (ActionType = {}));

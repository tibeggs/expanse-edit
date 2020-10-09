import { talentType } from "./ItemTypes.js";
export var TalentRank;
(function (TalentRank) {
    TalentRank[TalentRank["Novice"] = 1] = "Novice";
    TalentRank[TalentRank["Expert"] = 2] = "Expert";
    TalentRank[TalentRank["Master"] = 3] = "Master";
})(TalentRank || (TalentRank = {}));
export const emptyTalent = {
    type: talentType,
    rank: TalentRank.Novice,
    description: "",
};

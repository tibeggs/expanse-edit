export const preloadTemplates = async function () {
    const templatePaths = [
    // Add paths to "systems/the-expanse/templates"
    ];
    Handlebars.registerHelper("checked", (v) => (v ? " checked" : ""));
    return loadTemplates(templatePaths);
};

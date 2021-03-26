/**
 * Function to create color gradient with a any number of colors.
 * 
 * @param {*} elementWithId Id of the element for which the gradient should be created.
 * @param {*} colorList List (Array) of colors which should be used for gradient.
 */
function createColorGradient(elementWithId, colorList) { 
    // Create color gradient.
    gradientBackground = elementWithId.createLinearGradient(500, 0, 100, 0);

    // Section variables.
    let sectionStop = 1/colorList.length; // divide the sections to get nice color distrubtion.
    let sectionStartValue = 0;

    // For each color in color list create color stop.
    colorList.forEach(color => { gradientBackground.addColorStop(sectionStartValue, color), sectionStartValue += sectionStop });
    // Return gradient.
    return gradientBackground;
}


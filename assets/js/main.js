

/** this variable holds the conversion state
 *  for the image to blueprint conversion.
 */
var conversionState = {
    'filename': "empty", ///< filename of the original image
    'canvas': null,      ///< the canvas holding the image to be converted
    'previewcanvas': null,
    'previewimagearray': null,
    'currentY': 0,
    'entities': [],
    'tiles': [],
    'timeout': null,
    'error-right': 0,
}
var use_entities;
var resolution_x = 0;
var resolution_y = 0;

var ENTITY = 1;
var TILE = 2;
var INPUT_LIST = []
var OBJECT_LIST_VANILLA = [
    //VANILLA
    {'type':ENTITY, 'name':"stone-wall",     'r':206, 'g':219, 'b':206}, 
    {'type':ENTITY, 'name':"transport-belt", 'r':206, 'g':162, 'b':66}, 
    {'type':ENTITY, 'name':"underground-belt", 'r':115, 'g':89, 'b':0}, 
    {'type':ENTITY, 'name':"heat-pipe", 'r':58, 'g':129, 'b':173}, 
    {'type':ENTITY, 'name':"pipe", 'r':66, 'g':129, 'b':164}, 
    {'type':ENTITY, 'name':"gate", 'r':123, 'g':125, 'b':123}, 
    {'type':ENTITY, 'name':"small-lamp", 'r':0, 'g':97, 'b':148},
    {'type':TILE,   'name':"stone-path",    'r':82, 'g':81, 'b':74},
    {'type':TILE,   'name':"concrete",       'r':58, 'g':61, 'b':58},
    {'type':TILE,   'name':"refined-concrete",    'r':49, 'g':49, 'b':41},
    {'type':TILE,   'name':"hazard-concrete-left",         'r':181, 'g':142, 'b':33},
    {'type':TILE,   'name':"refined-hazard-concrete-left", 'r':115, 'g':93, 'b':25}]
    /* default values for the mod Enhanced Map Colors
    {'type':ENTITY, 'name':"stone-wall",     'r':206, 'g':219, 'b':206},   
    {'type':ENTITY, 'name':"transport-belt", 'r':255, 'g':186, 'b':0}, 
    {'type':ENTITY, 'name':"underground-belt", 'r':173, 'g':129, 'b':0}, 
    {'type':ENTITY, 'name':"fast-transport-belt", 'r':255, 'g':69, 'b':8}, 
    {'type':ENTITY, 'name':"fast-underground-belt", 'r':173, 'g':49, 'b':8}, 
    {'type':ENTITY, 'name':"express-transport-belt", 'r':33, 'g':170, 'b':181}, 
    {'type':ENTITY, 'name':"express-underground-belt", 'r':25, 'g':117, 'b':123}, 
    {'type':ENTITY, 'name':"heat-pipe", 'r':140, 'g':0, 'b':0}, 
    {'type':ENTITY, 'name':"pipe", 'r':90, 'g':36, 'b':156}, 
    {'type':ENTITY, 'name':"gate", 'r':123, 'g':125, 'b':123}, 
    {'type':ENTITY, 'name':"iron-chest", 'r':0, 'g':97, 'b':148},
    {'type':TILE,   'name':"stone-path",    'r':82, 'g':81, 'b':74},
    {'type':TILE,   'name':"concrete",       'r':58, 'g':61, 'b':58},
    {'type':TILE,   'name':"refined-concrete",    'r':49, 'g':49, 'b':41},
    {'type':TILE,   'name':"hazard-concrete-left",         'r':181, 'g':142, 'b':33},
    {'type':TILE,   'name':"refined-hazard-concrete-left", 'r':115, 'g':93, 'b':25}]*/
var OBJECT_LIST_DECTORIO = [
    //DECTORIO
    {'type':TILE,   'name':"dect-coal-gravel",    'r':82, 'g':85, 'b':82}, 
    {'type':TILE,   'name':"dect-copper-ore-gravel",    'r':164, 'g':117, 'b':115}, 
    {'type':TILE,   'name':"dect-iron-ore-gravel",    'r':115, 'g':138, 'b':164}, 
    {'type':TILE,   'name':"dect-stone-gravel",    'r':148, 'g':146, 'b':148}, 
    {'type':TILE,   'name':"dect-concrete-grid",    'r':132, 'g':129, 'b':132}, 
    {'type':TILE,   'name':"dect-wood-floor",    'r':140, 'g':69, 'b':16}, 
    {'type':TILE,   'name':"dect-paint-danger-left",    'r':206, 'g':77, 'b':74}, 
    {'type':TILE,   'name':"dect-paint-emergency-left",    'r':222, 'g':89, 'b':99}, 
    {'type':TILE,   'name':"dect-paint-caution-left",    'r':222, 'g':142, 'b':66}, 
    {'type':TILE,   'name':"dect-paint-refined-radiation-left",    'r':222, 'g':142, 'b':197}, 
    {'type':TILE,   'name':"dect-paint-defect-left",    'r':115, 'g':125, 'b':255}, 
    {'type':TILE,   'name':"dect-paint-refined-operations-left",    'r':90, 'g':93, 'b':90}, 
    {'type':TILE,   'name':"dect-paint-refined-safety-left",    'r':156, 'g':198, 'b':99},
    /*{'type':TILE,   'name':"dect-base-dirt-1",    'r':140, 'g':105, 'b':58}, 
    {'type':TILE,   'name':"dect-base-dirt-2",    'r':140, 'g':97, 'b':58}, 
    {'type':TILE,   'name':"dect-base-dirt-3",    'r':132, 'g':93, 'b':49}, 
    {'type':TILE,   'name':"dect-base-dirt-4",    'r':99, 'g':73, 'b':41}, 
    {'type':TILE,   'name':"dect-base-dirt-5",    'r':90, 'g':61, 'b':33}, 
    {'type':TILE,   'name':"dect-base-dirt-6",    'r':82, 'g':53, 'b':25}, 
    {'type':TILE,   'name':"dect-base-dry-dirt",    'r':90, 'g':65, 'b':33}, 
    {'type':TILE,   'name':"dect-base-grass-1",    'r':49, 'g':53, 'b':8}, 
    {'type':TILE,   'name':"dect-base-grass-1",    'r':66, 'g':57, 'b':8}, THESE CANT BE BLUEPRINTED*/
    //note these are vanilla but dectorio gives them a recipe
    //these look the same as the concrete versions below, but more expensive
    {'type':TILE,   'name':"acid-refined-concrete",      'r':140, 'g':194, 'b':41}, 
    {'type':TILE,   'name':"black-refined-concrete",      'r':25, 'g':24, 'b':25},
    {'type':TILE,   'name':"blue-refined-concrete",      'r':33, 'g':138, 'b':230},
    {'type':TILE,   'name':"brown-refined-concrete",      'r':74, 'g':28, 'b':0},
    {'type':TILE,   'name':"cyan-refined-concrete",      'r':66, 'g':194, 'b':181},
    {'type':TILE,   'name':"green-refined-concrete",      'r':16, 'g':194, 'b':41},
    {'type':TILE,   'name':"orange-refined-concrete",      'r':222, 'g':125, 'b':33},
    {'type':TILE,   'name':"pink-refined-concrete",      'r':238, 'g':97, 'b':132},
    {'type':TILE,   'name':"purple-refined-concrete",      'r':123, 'g':28, 'b':173},
    {'type':TILE,   'name':"red-refined-concrete",      'r':206, 'g':4, 'b':0},
    {'type':TILE,   'name':"yellow-refined-concrete",      'r':214, 'g':170, 'b':16}]
    //COLOR CODING 
var OBJECT_LIST_COLORCODING = [
    {'type':TILE,   'name':"stone-path-red",      'r':230, 'g':129, 'b':123},
    {'type':TILE,   'name':"stone-path-green",      'r':140, 'g':227, 'b':247},
    {'type':TILE,   'name':"stone-path-blue",      'r':148, 'g':198, 'b':247},
    {'type':TILE,   'name':"stone-path-orange",      'r':238, 'g':190, 'b':148},
    {'type':TILE,   'name':"stone-path-yellow",      'r':238, 'g':214, 'b':140},
    {'type':TILE,   'name':"stone-path-pink",      'r':247, 'g':178, 'b':197},
    {'type':TILE,   'name':"stone-path-purple",      'r':189, 'g':142, 'b':214},
    {'type':TILE,   'name':"stone-path-black",      'r':140, 'g':142, 'b':140},
    {'type':TILE,   'name':"stone-path-brown",      'r':164, 'g':142, 'b':123},
    {'type':TILE,   'name':"stone-path-cyan",      'r':164, 'g':223, 'b':222},
    {'type':TILE,   'name':"stone-path-acid",      'r':197, 'g':227, 'b':148},
    {'type':TILE,   'name':"stone-path-white",      'r':255, 'g':255, 'b':255},
    {'type':TILE,   'name':"concrete-red",      'r':206, 'g':4, 'b':0},
    {'type':TILE,   'name':"concrete-green",      'r':16, 'g':194, 'b':41},
    {'type':TILE,   'name':"concrete-blue",      'r':33, 'g':138, 'b':230},
    {'type':TILE,   'name':"concrete-orange",      'r':222, 'g':125, 'b':33},
    {'type':TILE,   'name':"concrete-yellow",      'r':214, 'g':170, 'b':16},
    {'type':TILE,   'name':"concrete-pink",      'r':238, 'g':97, 'b':132},
    {'type':TILE,   'name':"concrete-purple",      'r':123, 'g':28, 'b':173},
    {'type':TILE,   'name':"concrete-black",      'r':25, 'g':24, 'b':25},
    {'type':TILE,   'name':"concrete-brown",      'r':74, 'g':28, 'b':0},
    {'type':TILE,   'name':"concrete-cyan",      'r':66, 'g':194, 'b':181},
    {'type':TILE,   'name':"concrete-acid",      'r':140, 'g':194, 'b':41}, 
    //{'type':TILE,   'name':"concrete-white",      'r':255, 'g':255, 'b':255}, looks the same as stone path white
    
    {'type':TILE,   'name':"refined-concrete-red",      'r':99, 'g':0, 'b':0},
    {'type':TILE,   'name':"refined-concrete-green",      'r':8, 'g':97, 'b':16},
    {'type':TILE,   'name':"refined-concrete-blue",      'r':16, 'g':69, 'b':115},
    {'type':TILE,   'name':"refined-concrete-orange",      'r':107, 'g':61, 'b':16},
    {'type':TILE,   'name':"refined-concrete-yellow",      'r':107, 'g':85, 'b':6},
    {'type':TILE,   'name':"refined-concrete-pink",      'r':115, 'g':49, 'b':66},
    {'type':TILE,   'name':"refined-concrete-purple",      'r':58, 'g':12, 'b':82},
    {'type':TILE,   'name':"refined-concrete-black",      'r':8, 'g':12, 'b':8},
    {'type':TILE,   'name':"refined-concrete-brown",      'r':33, 'g':12, 'b':0},
    {'type':TILE,   'name':"refined-concrete-cyan",      'r':33, 'g':97, 'b':90},
    {'type':TILE,   'name':"refined-concrete-acid",      'r':66, 'g':97, 'b':16},
    {'type':TILE,   'name':"refined-concrete-white",      'r':123, 'g':125, 'b':123},
    //COLOR CODING PLUS
    
    {'type':TILE,   'name':"stone-path-gray",    'r':189, 'g':190, 'b':189},
    {'type':TILE,   'name':"stone-path-slate",    'r':148, 'g':166, 'b':164},
    {'type':TILE,   'name':"stone-path-olive",    'r':189, 'g':190, 'b':123},
    {'type':TILE,   'name':"stone-path-magenta",    'r':255, 'g':125, 'b':255},
    {'type':TILE,   'name':"stone-path-navy",    'r':123, 'g':125, 'b':189},
    {'type':TILE,   'name':"stone-path-maroon",    'r':189, 'g':125, 'b':123},
    {'type':TILE,   'name':"stone-path-aqua",    'r':189, 'g':255, 'b':238},
    {'type':TILE,   'name':"stone-path-teal",    'r':123, 'g':190, 'b':189},
    {'type':TILE,   'name':"stone-path-violet",    'r':197, 'g':150, 'b':247},
    {'type':TILE,   'name':"stone-path-emerald",    'r':164, 'g':227, 'b':189},
    {'type':TILE,   'name':"stone-path-tangerine",    'r':238, 'g':182, 'b':140},
    {'type':TILE,   'name':"stone-path-plum",    'r':238, 'g':206, 'b':238},

    {'type':TILE,   'name':"concrete-gray",    'r':132, 'g':129, 'b':132},
    {'type':TILE,   'name':"concrete-slate",    'r':41, 'g':77, 'b':74},
    {'type':TILE,   'name':"concrete-olive",    'r':132, 'g':129, 'b':0},
    {'type':TILE,   'name':"concrete-magenta",    'r':255, 'g':0, 'b':255},
    {'type':TILE,   'name':"concrete-navy",    'r':0, 'g':0, 'b':132},
    {'type':TILE,   'name':"concrete-maroon",    'r':132, 'g':0, 'b':0},
    {'type':TILE,   'name':"concrete-aqua",    'r':123, 'g':255, 'b':214},
    {'type':TILE,   'name':"concrete-teal",    'r':0, 'g':129, 'b':132},
    {'type':TILE,   'name':"concrete-violet",    'r':140, 'g':40, 'b':230},
    {'type':TILE,   'name':"concrete-emerald",    'r':82, 'g':198, 'b':123},
    {'type':TILE,   'name':"concrete-tangerine",    'r':214, 'g':105, 'b':25},
    {'type':TILE,   'name':"concrete-plum",    'r':222, 'g':158, 'b':222},

    {'type':TILE,   'name':"refined-concrete-gray",    'r':66, 'g':65, 'b':66},
    {'type':TILE,   'name':"refined-concrete-slate",    'r':16, 'g':36, 'b':33},
    {'type':TILE,   'name':"refined-concrete-olive",    'r':66, 'g':65, 'b':0},
    {'type':TILE,   'name':"refined-concrete-magenta",    'r':123, 'g':0, 'b':123},
    {'type':TILE,   'name':"refined-concrete-navy",    'r':0, 'g':0, 'b':66},
    {'type':TILE,   'name':"refined-concrete-maroon",    'r':66, 'g':0, 'b':0},
    {'type':TILE,   'name':"refined-concrete-aqua",    'r':58, 'g':125, 'b':107},
    {'type':TILE,   'name':"refined-concrete-teal",    'r':0, 'g':65, 'b':66},
    {'type':TILE,   'name':"refined-concrete-violet",    'r':66, 'g':20, 'b':115},
    {'type':TILE,   'name':"refined-concrete-emerald",    'r':41, 'g':97, 'b':58},
    {'type':TILE,   'name':"refined-concrete-tangerine",    'r':107, 'g':53, 'b':8}, 
    {'type':TILE,   'name':"refined-concrete-plum",    'r':107, 'g':77, 'b':107},

    {'type':ENTITY,   'name':"stone-wall-red",    'r':49, 'g':0, 'b':0},
    {'type':ENTITY,   'name':"stone-wall-green",    'r':0, 'g':49, 'b':8},
    {'type':ENTITY,   'name':"stone-wall-blue",    'r':8, 'g':32, 'b':58},
    {'type':ENTITY,   'name':"stone-wall-orange",    'r':49, 'g':28, 'b':8},
    {'type':ENTITY,   'name':"stone-wall-yellow",    'r':49, 'g':40, 'b':0},
    {'type':ENTITY,   'name':"stone-wall-pink",    'r':58, 'g':24, 'b':33},
    {'type':ENTITY,   'name':"stone-wall-purple",    'r':25, 'g':4, 'b':41},
    {'type':ENTITY,   'name':"stone-wall-black",    'r':0, 'g':4, 'b':0},
    {'type':ENTITY,   'name':"stone-wall-brown",    'r':16, 'g':4, 'b':0},
    {'type':ENTITY,   'name':"stone-wall-cyan",    'r':16, 'g':49, 'b':41},
    {'type':ENTITY,   'name':"stone-wall-acid",    'r':33, 'g':49, 'b':8},
    {'type':ENTITY,   'name':"stone-wall-white",    'r':58, 'g':61, 'b':58},
    {'type':ENTITY,   'name':"stone-wall-gray",    'r':33, 'g':32, 'b':33},
    {'type':ENTITY,   'name':"stone-wall-slate",    'r':8, 'g':16, 'b':16},
    {'type':ENTITY,   'name':"stone-wall-olive",    'r':33, 'g':32, 'b':0},
    {'type':ENTITY,   'name':"stone-wall-magenta",    'r':58, 'g':0, 'b':58},
    {'type':ENTITY,   'name':"stone-wall-navy",    'r':0, 'g':0, 'b':33},
    {'type':ENTITY,   'name':"stone-wall-maroon",    'r':33, 'g':0, 'b':0},
    {'type':ENTITY,   'name':"stone-wall-aqua",    'r':25, 'g':61, 'b':49},
    {'type':ENTITY,   'name':"stone-wall-teal",    'r':0, 'g':32, 'b':33},
    {'type':ENTITY,   'name':"stone-wall-violet",    'r':33, 'g':8, 'b':58},
    {'type':ENTITY,   'name':"stone-wall-emerald",    'r':16, 'g':49, 'b':25},
    {'type':ENTITY,   'name':"stone-wall-tangerine",    'r':49, 'g':24, 'b':0},
    {'type':ENTITY,   'name':"stone-wall-plum",    'r':49, 'g':36, 'b':49} 
];

function contrastImage(imgData, contrast){  //input range [-100..100]
    var d = imgData.data;
    contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
    var intercept = 128 * (1 - contrast);
    for(var i=0;i<d.length;i+=4){   //r,g,b,a
        d[i] = d[i]*contrast + intercept;
        d[i+1] = d[i+1]*contrast + intercept;
        d[i+2] = d[i+2]*contrast + intercept;
    }
    return imgData;
}

function lab2rgb(lab){
    var y = (lab[0] + 16) / 116,
        x = lab[1] / 500 + y,
        z = y - lab[2] / 200,
        r, g, b;
  
    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
    y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);
  
    r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    b = x *  0.0557 + y * -0.2040 + z *  1.0570;
  
    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;
  
    return [Math.max(0, Math.min(1, r)) * 255, 
            Math.max(0, Math.min(1, g)) * 255, 
            Math.max(0, Math.min(1, b)) * 255]
  }
  
  
  function rgb2lab(rgb){
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        x, y, z;
  
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  }
  
  // calculate the perceptual distance between colors in CIELAB
  // https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs
  
  function deltaE(labA, labB){
    var deltaL = labA[0] - labB[0];
    var deltaA = labA[1] - labB[1];
    var deltaB = labA[2] - labB[2];
    var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    var deltaC = c1 - c2;
    var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    var sc = 1.0 + 0.045 * c1;
    var sh = 1.0 + 0.015 * c1;
    var deltaLKlsl = deltaL / (1.0);
    var deltaCkcsc = deltaC / (sc);
    var deltaHkhsh = deltaH / (sh);
    var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  }
  


/** Creates an object structure from the given color */
function objectFromColor(r, g, b, a) {
    
    var objectr;

    if (document.getElementById("tt").value) {
        if (a < document.getElementById("tt").value * 255 /100) {
            return null;
        }
    } else {
        if (a < 128) {
            return null;
        }
    }

    // find an object with approximately same color
    for (var i = 0; i < INPUT_LIST.length; i++) {
        var object = INPUT_LIST[i];
        if (object.type == ENTITY && !use_entities) {
            continue;
        }

        if (objectr) {
        
        if (document.getElementById("quant").selectedIndex == 1) {
            var object_labcolor = rgb2lab([object.r, object.g, object.b])
            var objectr_labcolor = rgb2lab([objectr.r, objectr.g, objectr.b])
            var pixel_labcolor = rgb2lab([r, g, b])
            if (deltaE(object_labcolor, pixel_labcolor) < deltaE(objectr_labcolor, pixel_labcolor)) {
                objectr = object;
            }
        } else {
            if (Math.pow(r - object.r, 2) + Math.pow(g - object.g, 2) + Math.pow(b - object.b, 2) < Math.pow(r - objectr.r, 2) + Math.pow(g - objectr.g, 2) + Math.pow(b - objectr.b, 2)) {
            objectr = object;
            }
        }

        // old version
        /*if (r > object.r - 10 && r < object.r + 10 &&
            g > object.g - 10 && g < object.g + 10 &&   
            b > object.b - 10 && b < object.b + 10) {
            return object;
        }*/
        } else {
            objectr = object;
        }
    }

    return objectr;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function conversionStep(ctx) {

    conversionState.timeout = null; // the old timeout is done
    var canvas = conversionState.canvas;

    var y = conversionState.currentY;

    // -- look at one line and create the tiles and entities

    //var imageData = ctx.getImageData(0, y, Math.min(canvas.width, 10000), 1);
    for (var x = 0; x < canvas.width && x < 10000; x++) {
        var r = ctx.data[(y * (ctx.width * 4)) + (x * 4) + 0];
        var g = ctx.data[(y * (ctx.width * 4)) + (x * 4) + 1];
        var b = ctx.data[(y * (ctx.width * 4)) + (x * 4) + 2];
        var a = ctx.data[(y * (ctx.width * 4)) + (x * 4) + 3];
        var object = objectFromColor(r, g, b, a);

        if (object) {
            if (object.type == ENTITY) {
                var entity =  {
                    "entity_number": conversionState.entities.length + 1,
                    "name": object.name,
                    "position": {
                        "x": x - canvas.width / 2,
                        "y": y - canvas.height / 2,
                    }
                };
                conversionState.entities.push(entity);

            } else if (object.type == TILE) {
                var tile =  {
                    "name": object.name,
                    "position": {
                        "x": x - canvas.width / 2,
                        "y": y - canvas.height / 2,
                    }
                };
                conversionState.tiles.push(tile);
            }
        }
        if (object) {
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 0] = object.r;
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 1] = object.g;
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 2] = object.b;
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 3] = 255;
        } else {
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 0] = 0;
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 1] = 0;
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 2] = 0;
            conversionState.previewimagearray[(y * (ctx.width * 4)) + (x * 4) + 3] = 0;
        }
        //Floyd Steinberg dithering algorithm
        
        if (document.getElementById("dithering").selectedIndex == 1) {
        var colorerror = {"r": 0, "g": 0, "b": 0, "a": 0}
        if (object) {
            colorerror = {"r": r - object.r, "g": g - object.g, "b": b - object.b, "a": 0}
        } else {
            if (document.getElementById("dtt").value) {
                colorerror.a = document.getElementById("dtt").value * 255 /100
            } else {
                colorerror.a = 128
            }
        }
        //console.log(colorerror)
        
        //pixel to the right weight = 7
        if (x + 1 < canvas.width) {
            ctx.data[(y * (ctx.width * 4)) + ((x+1) * 4) + 0] += colorerror.r * (7/16)
            ctx.data[(y * (ctx.width * 4)) + ((x+1) * 4) + 1] += colorerror.g * (7/16)
            ctx.data[(y * (ctx.width * 4)) + ((x+1) * 4) + 2] += colorerror.b * (7/16)
            ctx.data[(y * (ctx.width * 4)) + ((x+1) * 4) + 3] += colorerror.a * (7/16)
        }
        //console.log(y)
        //console.log(canvas.height)
        if (y+1 == canvas.height) {
            console.log("continued")
            continue
        }
        //console.log("continue invalid")

        //pixel to the left-bottom weight = 3
        if (x > 0) {
            ctx.data[((y + 1) * (ctx.width * 4)) + ((x-1) * 4) + 0] += colorerror.r * (3/16)
            ctx.data[((y + 1) * (ctx.width * 4)) + ((x-1) * 4) + 1] += colorerror.g * (3/16)
            ctx.data[((y + 1) * (ctx.width * 4)) + ((x-1) * 4) + 2] += colorerror.b * (3/16)
            ctx.data[((y + 1) * (ctx.width * 4)) + ((x-1) * 4) + 3] += colorerror.a * (3/16)
            //console.log(colorerror.r * (3/16))
        }
        
        //pixel to the bottom weight = 5
        ctx.data[((y+1) * (ctx.width * 4)) + (x * 4) + 0] += colorerror.r * (5/16)
        ctx.data[((y+1) * (ctx.width * 4)) + (x * 4) + 1] += colorerror.g * (5/16)
        ctx.data[((y+1) * (ctx.width * 4)) + (x * 4) + 2] += colorerror.b * (5/16)
        ctx.data[((y+1) * (ctx.width * 4)) + (x * 4) + 3] += colorerror.a * (5/16)

        //pixel to the bottom right weight = 1
        if (x + 1 < canvas.width) {
            ctx.data[((y+1) * (ctx.width * 4)) + ((x+1) * 4) + 0] += colorerror.r * (1/16)
            ctx.data[((y+1) * (ctx.width * 4)) + ((x+1) * 4) + 1] += colorerror.g * (1/16)
            ctx.data[((y+1) * (ctx.width * 4)) + ((x+1) * 4) + 2] += colorerror.b * (1/16)
            ctx.data[((y+1) * (ctx.width * 4)) + ((x+1) * 4) + 3] += colorerror.a * (1/16)
        }
    }
    }

    conversionState.currentY++;
    if ((conversionState.currentY < canvas.height) &&
        (conversionState.currentY < 10000)) {

        // need another loop
        conversionState.timeout = setTimeout((conversionStep(ctx)), 10);

        // do the progress bar
        //var bar = document.getElementById("bar");
        //bar.style.width = (conversionState.currentY / canvas.height * 100) + '%';

    } else {

        // -- build the result string

        var result = {
            "blueprint": {
                "item": "blueprint",
                "label": conversionState.filename,
                "version": 68719935492,
                "icons": [
                {
                    "signal": {
                        "type": "item",
                        "name": "signal-everything"
                    },
                    "index": 1
                }
                ],
                "entities": conversionState.entities,
                "tiles": conversionState.tiles
            } };

        // finalize
        var previewctx = conversionState.previewcanvas.getContext("2d");
        const imgData = previewctx.createImageData(conversionState.previewcanvas.width, conversionState.previewcanvas.height);
        imgData.data.set(conversionState.previewimagearray);
        previewctx.putImageData(imgData, 0, 0)
        encode(JSON.stringify(result, null, 4));
    }
}


function imageLoaded(e) {
  console.log("Loaded");

    resolution_x = document.getElementById("resx").value
    resolution_y = document.getElementById("resy").value

  if (document.getElementById("use-entities").checked == false) {
    use_entities = false
  } else {
    use_entities = true
  }

  INPUT_LIST = []
    var childelements = document.getElementById("itemlist").children
    for (var x = 0; x < childelements.length; x++) {
        if (!childelements[x].firstChild.checked) {continue}
        if (!childelements[x].getElementsByClassName("name")[0].value) {continue}

        var itemtype
        console.log(childelements[x].getElementsByClassName("select"))
        if (childelements[x].getElementsByClassName("select")[0].selectedIndex == 1) {
            itemtype = ENTITY
        } else {
            itemtype = TILE
        }
        var name = childelements[x].getElementsByClassName("name")[0].value
        var color = hexToRgb(childelements[x].getElementsByClassName("color")[0].value)
        

        INPUT_LIST.push({'type':itemtype, 'name':name, 'r':color.r, 'g':color.g, 'b':color.b})
    }
  var img = e.target;

  var canvas = $('#testCanvas')[0];
  var preview = $('#preview')[0];
  var scale = document.getElementById("scale").value
  if (resolution_x && resolution_y) {
        if (scale) {
            canvas.width = resolution_x * scale;
            canvas.height = resolution_y * scale;
            preview.width = resolution_x * scale;
            preview.height = resolution_y * scale;
        } else {
            canvas.width = resolution_x;
            canvas.height = resolution_y;
            preview.width = resolution_x;
            preview.height = resolution_y;
        }
  } else {
    if (scale) {
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        preview.width = img.width * scale;
        preview.height = img.height * scale;
    } else {
        canvas.width = img.width;
        canvas.height = img.height;
        preview.width = img.width;
        preview.height = img.height;
    }
  }

  var ctx = canvas.getContext("2d");
  //if (resolution_x && resolution_y) {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);         // draw the image
  if (document.getElementById("contrast").value) {
    var contrastimg = contrastImage(ctx.getImageData(0, 0, canvas.width, canvas.height), document.getElementById("contrast").value)
    ctx.putImageData(contrastimg, 0, 0);
  }
  //}// else {
  //      ctx.drawImage(img, 0, 0);         // draw the image
  //}

  conversionState.filename = $('#inputImage')[0].files[0].name;
  if (!conversionState.filename)
      conversionState.filename = "unnamed image";
  conversionState.canvas = canvas;
  conversionState.previewcanvas = preview;
  //conversionState.previewimage = preview.getContext("2d").createImageData(preview.width, preview.height);
  conversionState.previewimagearray = new Uint8ClampedArray(canvas.width * canvas.height * 4)
  conversionState.currentY = 0;
  conversionState.blueprintStruct = 0;
  conversionState.entities = [];
  conversionState.tiles = [];
  if (conversionState.timeout) {
      clearTimeout(conversionState.timeout);
      conversionState.timeout = null;
  }

  
  var imgparse = canvas.getContext("2d")
  conversionState.timeout = setTimeout(conversionStep(imgparse.getImageData(0, 0, canvas.width, canvas.height)), 100);
}

function createImage(loaded) {
    var img = new Image();
    img.onload = imageLoaded;
    img.src = loaded.target.result;
    if (img.width > 0)
      imageLoaded({'target': img});

}


function loadImage(input)
{
    var file = input.files[0];
    var fr = new FileReader();
    fr.onload = createImage;   // onload fires after reading is complete
    fr.readAsDataURL(file);    // begin reading
}

function decode()
{
    var base64 = $("#b").val();
    if (base64 == '')
    {
        $("#j").val('');
        return;
    }
    var binary = Base64.decode(base64.substring(1));
    // console.log("binary", binary);
    var uzip = pako.inflate(binary);
    // console.log("uzip", uzip);
    var string = new TextDecoder("utf-8").decode(uzip);
    // console.log("string", string);
    $("#j").val(JSON.stringify(JSON.parse(string), null, 4));
}

function encode(json)
{
    if (!json)
        json = $("#j").val();

    var string = json.replace(/\s/g, "");
     console.log("string", string);
    var enc = new TextEncoder("utf-8").encode(string);
    console.log("enc", enc);
    var zip = pako.deflate(enc, {level: 9});
    // console.log("zip", zip);
    var base64 = Base64.encodeU(zip);
    var bstring = "0" + base64;
    $("#o").val(bstring);
}

function addItemForm()
{
    document.getElementById("original").firstChild.checked = true;
    var clone = document.getElementById("original").cloneNode(true)
    clone.id = ""
    clone.width = 550
    clone.height = 32.5
    document.getElementById("itemlist").appendChild(clone)
}
function updateVanillaItems(button) {
    var children = document.getElementById("itemlist").children

    if (button.checked == true) {
        for (var x = 0; x < OBJECT_LIST_VANILLA.length; x++) {
            document.getElementById("original").firstChild.checked = true;
            var clone = document.getElementById("original").cloneNode(true)
            clone.id = ""
            clone.width = 550
            clone.height = 32.5
            if (OBJECT_LIST_VANILLA[x].type == TILE) {
                clone.getElementsByClassName("select")[0].selectedIndex = 0
            } else {
                clone.getElementsByClassName("select")[0].selectedIndex = 1
            }
            clone.getElementsByClassName("name")[0].value = OBJECT_LIST_VANILLA[x].name
            clone.getElementsByClassName("color")[0].value = rgbToHex(OBJECT_LIST_VANILLA[x].r, OBJECT_LIST_VANILLA[x].g, OBJECT_LIST_VANILLA[x].b)
            document.getElementById("itemlist").appendChild(clone)
        }
    
    } else {
        for (var x = 0; x < children.length; x++) {
            for (var y = 0; y < OBJECT_LIST_VANILLA.length; y++) {
                if (children[x].getElementsByClassName("name")[0].value == OBJECT_LIST_VANILLA[y].name) {
                    children[x].remove()
                }
            }
        }
    }
}

function updateDectorioItems(button) {
    var children = document.getElementById("itemlist").children

    if (button.checked == true) {
        for (var x = 0; x < OBJECT_LIST_DECTORIO.length; x++) {
            document.getElementById("original").firstChild.checked = true;
            var clone = document.getElementById("original").cloneNode(true)
            clone.id = ""
            clone.width = 550
            clone.height = 32.5
            if (OBJECT_LIST_DECTORIO[x].type == TILE) {
                clone.getElementsByClassName("select")[0].selectedIndex = 0
            } else {
                clone.getElementsByClassName("select")[0].selectedIndex = 1
            }
            clone.getElementsByClassName("name")[0].value = OBJECT_LIST_DECTORIO[x].name
            clone.getElementsByClassName("color")[0].value = rgbToHex(OBJECT_LIST_DECTORIO[x].r, OBJECT_LIST_DECTORIO[x].g, OBJECT_LIST_DECTORIO[x].b)
            document.getElementById("itemlist").appendChild(clone)
        }
    
    } else {
        for (var x = 0; x < children.length; x++) {
            for (var y = 0; y < OBJECT_LIST_DECTORIO.length; y++) {
                if (children[x].getElementsByClassName("name")[0].value == OBJECT_LIST_DECTORIO[y].name) {
                    children[x].remove()
                }
            }
        }
    }
}

function updateColorCodingItems(button) {
    var children = document.getElementById("itemlist").children

    if (button.checked == true) {
        for (var x = 0; x < OBJECT_LIST_COLORCODING.length; x++) {
            document.getElementById("original").firstChild.checked = true;
            var clone = document.getElementById("original").cloneNode(true)
            clone.id = ""
            clone.width = 550
            clone.height = 32.5
            if (OBJECT_LIST_COLORCODING[x].type == TILE) {
                clone.getElementsByClassName("select")[0].selectedIndex = 0
            } else {
                clone.getElementsByClassName("select")[0].selectedIndex = 1
            }
            clone.getElementsByClassName("name")[0].value = OBJECT_LIST_COLORCODING[x].name
            clone.getElementsByClassName("color")[0].value = rgbToHex(OBJECT_LIST_COLORCODING[x].r, OBJECT_LIST_COLORCODING[x].g, OBJECT_LIST_COLORCODING[x].b)
            document.getElementById("itemlist").appendChild(clone)
        }
    
    } else {
        for (var x = 0; x < children.length; x++) {
            for (var y = 0; y < OBJECT_LIST_COLORCODING.length; y++) {
                if (children[x].getElementsByClassName("name")[0].value == OBJECT_LIST_COLORCODING[y].name) {
                    children[x].remove()
                }
            }
        }
    }
}
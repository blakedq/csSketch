import sketch from 'sketch'
const levenshtein = require('js-levenshtein');
const systemFonts = NSFontManager.sharedFontManager().availableFontFamilies();

export default function() {
  const selectedLayers = sketch.getSelectedDocument().selectedLayers;
  const lines = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString).split("\n");

  let sketchStyles = preprocessStyles(lines);

  selectedLayers.forEach(layer => {
    layer.style.fontSize = sketchStyles[0];
    layer.style.textColor = sketchStyles[1];
    layer.style.lineHeight = sketchStyles[2];
    layer.style.fontWeight = sketchStyles[3];
    layer.style.textUnderline = sketchStyles[4];
    layer.style.textStrikethrough = sketchStyles[5];
    layer.style.fontFamily = sketchStyles[6];
    layer.style.fontStyle = sketchStyles[7];
    layer.style.kerning = sketchStyles[8];
    layer.style.textTransform = sketchStyles[9];
    layer.style.fontVariant = sketchStyles[10];
    layer.style.shadows.enabled = sketchStyles[11];
    if (sketchStyles[11]) {
      layer.style.shadows = [
        {
          x: sketchStyles[12],
          y: sketchStyles[13],
          blur: sketchStyles[14],
          color: sketchStyles[15]
        }
      ]
    }
  })
}

function preprocessStyles(styleLines) {
  let sketchStyles = [];
  styleLines.forEach(declaration => {
    let colon = declaration.indexOf(":");
    if(colon !== -1)  {
      let prop = declaration.slice(0, colon).trim();
      let val = declaration.slice(colon+1).trim();
      switch(prop)  {
        case 'font-size':
          sketchStyles[0] = Math.round(parseFloat(val));
          break;
        case 'color':
          sketchStyles[1] = val;
          break;
        case 'line-height':
          sketchStyles[2] = Math.round(parseFloat(val));
          break;
        case 'font-weight':
          sketchStyles[3] = convertWeight(val);
          break;
        case 'text-decoration':
          let textDecorations = convertDecoration(val);
          sketchStyles[4] = textDecorations[0];
          sketchStyles[5] = textDecorations[1];
          break;
        case 'font-family':
          sketchStyles[6] = convertFontFamily(val);
          break;
        case 'font-style':
          sketchStyles[7] = convertFontStyle(val);
          break;
        case 'letter-spacing':
          sketchStyles[8] = convertKerning(val);
          break;
        case 'text-transform':
          sketchStyles[9] = convertTransform(val);
          break;
        case 'font-variant':
          sketchStyles[10] = convertVariant(val);
          break;
        case 'text-shadow':
          let textShadows = convertTextShadows(val);
          if (textShadows) {
            sketchStyles[11] = true;
            for(let i = 0; i < 4; ++i)  {
              sketchStyles[12 + i] = textShadows[i];
            }
          } else {
            sketchStyles[11] = textShadows;
          }
          break;
        default:
          alertM('Unknown CSS property: ' + prop);
      }
    }
  })
  return sketchStyles;
}

function convertWeight(weight)  {
  if (weight <= 50 || weight >= 950)  return 5;
  let select_weight = Math.round(weight / 100) - 1;
  const app_kit_font_weights = [
    2,   // FontWeight100
    3,   // FontWeight200
    4,   // FontWeight300
    5,   // FontWeight400
    6,   // FontWeight500
    8,   // FontWeight600
    9,   // FontWeight700
    10,  // FontWeight800
    12,  // FontWeight900
  ]
  return app_kit_font_weights[select_weight];
}

function convertDecoration(dec) {
  dec = dec.substring(0,dec.indexOf("rgb") - 1);
  let split = dec.split(' ');

  let decorations = [];
  for(let i = 0; i < split.length - 1; ++i) {
    switch(split[i])  {
      case 'underline':
        decorations[0] = true;
        break;
      case 'line-through':
        decorations[1] = true;
        break;
      case 'none':
        decorations[0] = false;
        decorations[1] = false;
        break;
      default:
        alertM('Unknown text-decoration: ' + split[i]);
    }
  }

  for(let i = 0; i <= 1; ++i) {
    if(decorations[i]) {
      switch(split[split.length - 1]) {
        case 'double':
          decorations[i] = 'double';
          break;
        case 'solid':
          decorations[i] = 'single';
          break;
        case 'dotted':
          decorations[i] = 'single dot';
          break;
        case 'dashed':
          decorations[i] = 'single dash';
          break;
        default:
          alertM('Unknown text-decoration-style: ' + split[split.length - 1]);
      }
    }
  }

  return decorations;
}

function convertFontFamily(fonts) {
  let firstFont = fonts.indexOf(',');
  if(firstFont !== -1)  {
    fonts = fonts.substring(0,firstFont);
  }
  fonts = fonts.replace(/"|'/g,'');
  let bestFontScore = Infinity;
  let bestFont;
  for (let i = 0; i < systemFonts.count(); ++i) {
    let fontScore = levenshtein(systemFonts[i].toLowerCase(), fonts.toLowerCase());
    if (fontScore < bestFontScore) {
      bestFont = systemFonts[i];
      bestFontScore = fontScore;
    }
  }
  console.log(fonts);
  console.log(bestFont);
  console.log(bestFontScore);
  return bestFont;
}

function convertFontStyle(style)  {
  return style === 'italic' || style === 'oblique' ? 'italic' : undefined;
}

function convertKerning(kerning)  {
  let num = parseFloat(kerning);
  return isNaN(num) ? 0 : num;
}

function convertTransform(transform)  {
  return transform === 'capitalize' ? 'none' : transform;
}

function convertVariant(variant)  {
  return variant === 'small-caps' ? variant : undefined;
}

function convertTextShadows(shadow) {
  let rgb = shadow.indexOf(')');
  if (rgb === -1) {
    return false;
  } else {
    let rgbStr = shadow.substring(0, rgb + 1);
    shadow = shadow.substring(rgb + 2);
    shadow = shadow.split(' ');
    for(let i = 0; i < 3; ++i)  {
      shadow[i] = parseFloat(shadow[i]);
    }
    shadow.push(rgbStr);
    return shadow;
  }
}

function alertM(alert)  {
  console.log(alert);
  sketch.UI.message(alert);
}

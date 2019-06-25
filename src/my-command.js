import sketch from 'sketch'

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
          sketchStyles[0] = parseFloat(val);
          break;
        case 'color':
          sketchStyles[1] = val;
          break;
        case 'line-height':
          sketchStyles[2] = parseFloat(val);
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
  return fonts.replace(/"|'/g,'');
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

function alertM(alert)  {
  console.log(alert);
  sketch.UI.message(alert);
}

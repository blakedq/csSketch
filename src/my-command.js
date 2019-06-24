import sketch from 'sketch'

export default function() {
  const doc = sketch.getSelectedDocument();
  const selectedLayers = doc.selectedLayers;
  const pasteBoard = NSPasteboard.generalPasteboard();
  const input = pasteBoard.stringForType(NSPasteboardTypeString);
  const lines = input.split("\n");
  lines.forEach(declaration => {
    let colon = declaration.indexOf(":");
    if(colon !== -1)  {
      let prop = declaration.slice(0, colon).trim();
      let val = declaration.slice(colon+1).trim();
      selectedLayers.forEach(layer => {
        switch(prop)  {
          case 'font-size':
            layer.style.fontSize = parseFloat(val);
            break;
          case 'color':
            layer.style.textColor = val;
            break;
          case 'line-height':
            layer.style.lineHeight = parseFloat(val);
            break;
          case 'font-weight':
            layer.style.fontWeight = convertWeight(val);
            break;
          case 'text-decoration':
            let textDecorations = convertDecoration(val);
            layer.style.textUnderline = textDecorations[0];
            layer.style.textStrikethrough = textDecorations[1];
            break;
          case 'font-family':
            layer.style.fontFamily = convertFontFamily(val);
            break;
          case 'font-style':
            layer.style.fontStyle = (val === 'italic' || val === 'oblique' ? 'italic' : undefined);
            break;
          case 'letter-spacing':
            layer.style.kerning = convertKerning(val);
            break;
          default:
            alertM('Unknown CSS property: ' + prop);
        }
      })
    }
  })
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

function convertColor(orig) {
  let parsedColor = orig.match(/^[^\d]*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\)\s*$/);
  let newColor = "#";
  for(let i = 1; i < 4; ++i)  {
    newColor += stringToHex(parsedColor[i]);
  }
  newColor += stringToHex(isNaN(parsedColor[4]) ? 255 : parsedColor[4] * 255);
  return newColor;
}

function convertFontFamily(fonts) {
  let firstFont = fonts.indexOf(',');
  if(firstFont !== -1)  {
    fonts = fonts.substring(0,firstFont);
  }
  return fonts.replace(/"|'/g,'');
}

function convertKerning(kerning)  {
  let kerning = parseFloat(kerning);
  return isNaN(kerning) ? 0 : kerning;
}

function stringToHex(str)  {
  return parseInt(str).toString(16).padStart(2, "0");
}

function alertM(alert)  {
  console.log(alert);
  sketch.UI.message(alert);
}

import { assetHost } from "lib/constants";
import jsPDF from "jspdf";
import logoDark from "./assets/logo_black.png";
import logoLight from "./assets/logo_gray.png";
import { Canvg, presets } from 'canvg';
import "./fonts";
import './svg';

function fillDots(doc, pL, pT, w, h) {
  const s = 5;
  const dot = 0.5;
  const pR = s / 2;
  const pB = s / 2;
  const width = w + pL;
  const height = h + pT;

  doc.setFillColor(221, 221, 221);
  for (var x = pL + pR; x <= width - dot; x += s) {
    for (var y = pT + pB; y <= height - dot; y += s) {
      doc.circle(x, y, dot, "F");
    }
  }
}

async function rasterize(svg, w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  const options = {
    ignoreMouse: true,
    ignoreAnimation: true,
    ignoreDimensions: true,
  };

  const instance = await Canvg.fromString(ctx, svg, options);
  await instance.render(options);
  return canvas.toDataURL();
}

async function rasterize2(img, w, h) {
  const canvas = document.createElement("canvas");
  // canvas.width = img.width;
  // canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  const instance = await Canvg.from(ctx, `${assetHost}${img.url}`);
  const t = 501;
  const ratio = h / w;
  // instance.resize(img.width * .75, img.height * .75);
  // instance.resize(img.width, img.height);
  // instance.resize(t, t * ratio);
  // instance.resize(w, h)
  // instance.resize(w)
  await instance.render();
  return canvas.toDataURL();
}

export async function generatePDF(product, selection) {
  function addCharacteristic(key, value = "", y) {
    const keyWidth = 35;
    const lines = doc.splitTextToSize(key, keyWidth);
    doc.setTextColor("#000");
    doc.setFontSize(9);
    const x = 20;
    lines.forEach((line, i) => {
      doc.setFont("Quicksand-Bold");
      doc.text(line, x, y + i * 5);
    });

    doc.setFont("Quicksand-Regular");
    doc.text(value, x + keyWidth, y);
    return y + (lines.length - 1) * 5;
  }
  const doc = new jsPDF();
  let ly = 22;
  doc.setFont("Quicksand-Bold");
  doc.setFontSize(25);
  doc.text(product.name, doc.internal.pageSize.width / 2, ly, "center");

  ly += 7;
  doc.setFont("Quicksand-SemiBold");
  doc.setFontSize(11);
  doc.setTextColor("#B6B6B6");
  const category = product.categories.data
    .map((category) => category.attributes.name)
    .join(", ")
    .toUpperCase();
  doc.text(category, doc.internal.pageSize.width / 2, ly, "center");

  ly += 23;
  doc.setFont("Quicksand-Bold");
  doc.setTextColor("#000");
  doc.setFontSize(18);
  doc.text("Product description", 20, ly);

  ly += 12;
  doc.setFont("Quicksand-Bold");
  doc.setTextColor("#000");
  doc.setFontSize(11);
  let label = "Product code -";
  doc.text(label, 20, ly);
  doc.setFont("Quicksand-Regular");
  doc.setTextColor("#303030");
  const width = doc.getTextWidth(label);
  doc.text(selection.code, 20 + width + 2, ly);

  ly += 12;
  doc.setFont("Quicksand-Bold");
  doc.setTextColor("#B8A078");
  doc.setFontSize(11);
  doc.text("Illumination info", 20, ly);

  ly += 15;
  const illumination = [
    ["Colors", selection.color],
    ["CCT", selection.cct],
    ["CRI", selection.cri],
    ...(selection.beamAngle ? [["Beam Angle", selection.beamAngle]] : []),
    ...product.illumination.map((i) => [i.name, i.value]),
    ["Drivers", selection.drivers],
  ];
  let spacing = 8;
  illumination.forEach((c, i) =>
    addCharacteristic(c[0], c[1], ly + i * spacing)
  );

  ly += illumination.length * spacing + 10;
  doc.setFont("Quicksand-Bold");
  doc.setTextColor("#B8A078");
  doc.setFontSize(11);
  doc.text("Dimensions", 20, ly);

  const dimensions = [...product.dimensions.map((i) => [i.name, i.value])];
  dimensions.reduce(
    (p, c) => addCharacteristic(c[0], c[1], p) + spacing,
    ly + 15
  );

  doc.setFont("Quicksand-Bold");
  doc.setTextColor("#000");
  doc.setFontSize(8);
  doc.text("ADDRESS", 115, 270);
  doc.setFont("Quicksand-SemiBold");
  doc.setTextColor("#858080");
  doc.text("DEESS BV, TER WAARDE 50,\n8900 IEPER, BELGIUM", 115, 278);

  doc.setFont("Quicksand-Bold");
  doc.setTextColor("#000");
  doc.text("CONTACT", 165, 270);
  doc.setFont("Quicksand-SemiBold");
  doc.setTextColor("#858080");
  doc.text("info@deess.com", 165, 278);

  let ratio = 4.57;
  let w = 45;
  doc.addImage(logoDark.src, "png", 20, 268, w, w / ratio);
  doc.addImage(logoLight.src, "png", -10, 260);

  w = 70;
  const lx = 120;
  let h = -10;
  const blueprint = product.blueprint.data;
  let img;
  if (blueprint) {
    img = blueprint.attributes;
    ratio = img.width / img.height;
    h = w / ratio;
    ly = 50;
    doc.setDrawColor(221, 221, 221);
    doc.rect(lx, ly, w, h);
    fillDots(doc, lx, ly, w, h);
    const ext = img.ext.slice(1);
    if (ext === "svg") {
      // const rsp = await fetch(`${assetHost}${img.url}`);
      // const svg = await rsp.text();
      // const parser = new DOMParser();
      // const foo = parser.parseFromString(svg, "image/svg+xml");
      // console.log(foo.documentElement.firstChild);
      // doc.addSVG(svg, lx, ly, w, h);
      // ---
      const imgData = await rasterize2(img, w, h);
      doc.addImage(imgData, 'png', lx, ly, w, h);
      // ---
      // const imgData = await rasterize(svg, w, h);
      // doc.addImage(imgData, 'png', lx, ly, w, h);
      // ---
      // await doc.addSvgAsImage(svg, lx, ly, w, h, "", false);
      // ---
      // doc.addImage(`${assetHost}${img.url}`, 'jpeg', lx, ly, w, h);
    } else {
      doc.addImage(`${assetHost}${img.url}`, img.ext.slice(1), lx, ly, w, h);
    }
  }

  // ly += h + 10;
  // const displayImages = product.displayImages.data;
  // if (displayImages) {
  //   img = displayImages[0].attributes;
  //   ratio = img.width / img.height;
  //   doc.addImage(
  //     `${assetHost}${img.url}`,
  //     img.ext.slice(1),
  //     lx,
  //     ly,
  //     w,
  //     w / ratio
  //   );
  // }

  // console.log(doc.internal.pageSize);
  doc.save(`${selection.code}.pdf`);
  // doc.output("dataurlnewwindow");
  // return doc.output("datauristring");
}

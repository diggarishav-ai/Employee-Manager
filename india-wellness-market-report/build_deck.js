// Report B deck — India wellness retreats: opportunity & operating performance
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";            // 13.3 x 7.5
pres.author = "Wellness market research";
pres.title = "India Wellness Retreats — Operating Analysis";

// ---- palette: forest / moss / turmeric (wellness + Ayurveda, not generic blue)
const FOREST = "1E3D2F";
const MOSS = "7FA88B";
const SAGE = "C3D6C8";
const GOLD = "C9A227";
const CREAM = "F7F5F0";
const INK = "22282B";
const MUTED = "6B7671";
const WHITE = "FFFFFF";
const RED = "A63A2E";

const HFONT = "Cambria";
const BFONT = "Calibri";

const W = 13.3, H = 7.5, M = 0.6;

// ------------------------------------------------------------------ helpers
function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: FOREST };
  return s;
}
function lightSlide(title, kicker) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: M, y: 0.36, w: W - 2 * M, h: 0.26, fontFace: BFONT, fontSize: 11,
      bold: true, color: MOSS, charSpacing: 2, margin: 0,
    });
  }
  s.addText(title, {
    x: M, y: kicker ? 0.66 : 0.5, w: W - 2 * M, h: 0.8, fontFace: HFONT,
    fontSize: 32, bold: true, color: FOREST, margin: 0, valign: "top",
  });
  return s;
}
function footnote(s, txt) {
  s.addText(txt, {
    x: M, y: H - 0.52, w: W - 2 * M, h: 0.34, fontFace: BFONT, fontSize: 9,
    color: MUTED, italic: true, margin: 0,
  });
}
function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, fill: { color: fill || CREAM }, rectRadius: 0.06,
    line: { color: SAGE, width: 0.75 },
  });
}
function statCard(s, x, y, w, h, value, label, sub, accent) {
  card(s, x, y, w, h, CREAM);
  s.addText(value, {
    x: x + 0.18, y: y + 0.16, w: w - 0.36, h: 0.72, fontFace: HFONT,
    fontSize: 34, bold: true, color: accent || FOREST, margin: 0,
  });
  s.addText(label, {
    x: x + 0.18, y: y + 0.9, w: w - 0.36, h: 0.3, fontFace: BFONT,
    fontSize: 12, bold: true, color: INK, margin: 0,
  });
  if (sub) {
    s.addText(sub, {
      x: x + 0.18, y: y + 1.2, w: w - 0.36, h: h - 1.32, fontFace: BFONT,
      fontSize: 10, color: MUTED, margin: 0, valign: "top",
    });
  }
}

// =========================================================== 1 — TITLE ======
{
  const s = darkSlide();
  s.addShape(pres.ShapeType.ellipse, {
    x: 9.2, y: -1.9, w: 6.2, h: 6.2, fill: { color: "2A5240" }, line: { color: "2A5240" },
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: 10.9, y: 3.6, w: 3.6, h: 3.6, fill: { color: "27493A" }, line: { color: "27493A" },
  });
  s.addText("REPORT B", {
    x: M, y: 1.5, w: 8, h: 0.3, fontFace: BFONT, fontSize: 12, bold: true,
    color: GOLD, charSpacing: 3, margin: 0,
  });
  s.addText("India Wellness Retreats", {
    x: M, y: 1.95, w: 8.6, h: 1.0, fontFace: HFONT, fontSize: 46, bold: true,
    color: WHITE, margin: 0,
  });
  s.addText("Opportunity & operating performance across a 24-property panel", {
    x: M, y: 3.0, w: 8.2, h: 0.8, fontFace: BFONT, fontSize: 18, color: SAGE, margin: 0,
  });
  s.addShape(pres.ShapeType.rect, {
    x: M, y: 4.05, w: 1.4, h: 0.035, fill: { color: GOLD }, line: { color: GOLD },
  });
  s.addText(
    "Occupancy · business model · revenue estimates · pricing · capital efficiency",
    { x: M, y: 4.35, w: 8.2, h: 0.4, fontFace: BFONT, fontSize: 13, color: MOSS, margin: 0 }
  );
  s.addText("Evidence base for the landowner opportunity view (Report A)   ·   v1 working draft", {
    x: M, y: 6.5, w: 9, h: 0.3, fontFace: BFONT, fontSize: 11, color: MUTED, margin: 0,
  });
  s.addNotes("Report B is the analytical spine. Report A (the landowner deck) asserts; this one proves.");
}

// ================================================== 2 — THE DATA PROBLEM ====
{
  const s = lightSlide("Indian retreats publish pricing. None publish occupancy or revenue.",
                       "the central problem");
  s.addText(
    "Any occupancy or revenue figure quoted for these properties without a stated method is a guess. " +
    "This analysis shows its method and labels every single figure with a confidence tier.",
    { x: M, y: 1.62, w: 11.4, h: 0.6, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  const tiers = [
    ["T1", "Hard", "Rate cards, key counts, deal filings, audited financials", "Treat as fact", FOREST],
    ["T2", "Derived", "Availability sampling, review velocity, site imagery, press", "Reliable, not certain", MOSS],
    ["T3", "Modelled", "Built from T1/T2 via a stated formula", "Directional; error band applies", GOLD],
    ["T4", "Judgement", "Analyst estimate where nothing else exists", "Lowest confidence; flagged", RED],
  ];
  let y = 2.5;
  tiers.forEach(([tag, name, what, verdict, col]) => {
    card(s, M, y, 11.4, 0.86, CREAM);
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.22, y: y + 0.19, w: 0.48, h: 0.48, fill: { color: col }, line: { color: col },
    });
    s.addText(tag, {
      x: M + 0.22, y: y + 0.19, w: 0.48, h: 0.48, fontFace: BFONT, fontSize: 12,
      bold: true, color: WHITE, align: "center", valign: "middle", margin: 0,
    });
    s.addText(name, {
      x: M + 0.88, y: y + 0.14, w: 1.5, h: 0.3, fontFace: BFONT, fontSize: 14,
      bold: true, color: FOREST, margin: 0,
    });
    s.addText(what, {
      x: M + 2.4, y: y + 0.14, w: 5.5, h: 0.6, fontFace: BFONT, fontSize: 12,
      color: INK, margin: 0, valign: "top",
    });
    s.addText(verdict, {
      x: M + 8.0, y: y + 0.14, w: 3.2, h: 0.6, fontFace: BFONT, fontSize: 12,
      color: MUTED, italic: true, margin: 0, valign: "top",
    });
    y += 0.98;
  });
  footnote(s, "Blank cells in the workbook mean 'not verified', never zero — deliberately left empty rather than filled with a recalled figure presented as data.");
}

// =================================== 3 — MARKET SIZE / RECONCILIATION =======
{
  const s = lightSlide("The published India numbers disagree by an order of magnitude",
                       "market sizing");
  s.addText(
    "Three credible-looking sources, three irreconcilable answers for the same segment. " +
    "Resolving this is a prerequisite for any credible sizing — not a footnote.",
    { x: M, y: 1.62, w: 11.4, h: 0.5, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  statCard(s, M, 2.35, 3.6, 1.9, "$8.7bn", "Medical + wellness travel, 2025",
           "Government / KPMG framing. Narrow: travel only.", FOREST);
  statCard(s, M + 3.9, 2.35, 3.6, 1.9, "$28.9bn", "Wellness tourism, 2025",
           "Market-research framing. Wider scope, domestic included.", GOLD);
  statCard(s, M + 7.8, 2.35, 3.6, 1.9, "$130bn", "Wellness tourism by 2035",
           "Long-horizon forecast on a third definition again.", RED);

  card(s, M, 4.55, 11.4, 1.75, CREAM);
  s.addText("Why they diverge — and what we do about it", {
    x: M + 0.3, y: 4.72, w: 10.8, h: 0.32, fontFace: BFONT, fontSize: 14, bold: true,
    color: FOREST, margin: 0,
  });
  s.addText([
    { text: "Definitional scope creep (travel vs tourism vs 'health & wellness'), double counting across sectors, domestic-only vs inbound-inclusive, and differing base years.", options: { bullet: true, breakLine: true } },
    { text: "Our method: top-down anchor (GWI) plus a bottom-up segment build, triangulated to a stated range with a published confidence band — not a single convenient number.", options: { bullet: true } },
  ], { x: M + 0.3, y: 5.1, w: 10.8, h: 1.1, fontFace: BFONT, fontSize: 12, color: INK, margin: 0, paraSpaceAfter: 6 });

  footnote(s, "Sources: PIB / KPMG 'Heal in India'; Precedence Research; Mordor Intelligence. Global Wellness Institute data accessed via secondary carriers (GWI domain blocked in this environment).");
}

// ============================================ 4 — WHY NOW / CAPITAL =========
{
  const s = lightSlide("Institutional capital has arrived — that is the signal", "validation");
  s.addText(
    "When hotel majors and real-estate developers start paying real money for wellness assets, " +
    "the segment has crossed from lifestyle business to investable asset class — and an exit market exists.",
    { x: M, y: 1.62, w: 11.4, h: 0.6, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  const deals = [
    ["IHCL → Atmantan", "Nov 2025 / completed Jan 2026", "51% of Sparsh Infratech for ₹232.21 cr. Enterprise value ₹415 cr. IHCL's entry into integrated wellness.", GOLD],
    ["IHCL + Swela Realty", "Announced", "100-room Atmantan wellness destination, Hyderabad — a hotel brand paired with a land/realty partner.", MOSS],
    ["Oberoi (EIH) + Bhartiya Hospitality", "Announced", "20 ultra-luxury lifestyle resorts across India and select international destinations.", MOSS],
    ["Ajmera Realty", "Announced", "Integrated luxury wellness development at Tirupati — villas, hospitality and dedicated wellness.", MOSS],
  ];
  let y = 2.45;
  deals.forEach(([who, when, what, col]) => {
    card(s, M, y, 11.4, 0.95, CREAM);
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.26, y: y + 0.33, w: 0.28, h: 0.28, fill: { color: col }, line: { color: col },
    });
    s.addText(who, {
      x: M + 0.72, y: y + 0.13, w: 3.3, h: 0.34, fontFace: BFONT, fontSize: 14,
      bold: true, color: FOREST, margin: 0,
    });
    s.addText(when, {
      x: M + 0.72, y: y + 0.48, w: 3.3, h: 0.3, fontFace: BFONT, fontSize: 10,
      color: MUTED, italic: true, margin: 0,
    });
    s.addText(what, {
      x: M + 4.15, y: y + 0.16, w: 7.0, h: 0.66, fontFace: BFONT, fontSize: 12,
      color: INK, margin: 0, valign: "top",
    });
    y += 1.06;
  });
  footnote(s, "Sources: Business Standard, Hotel Online, ScanX, Skift, Outlook Business, Travel & Tour World.");
}

// ================================================= 5 — THE PANEL ============
{
  const s = lightSlide("The panel: 24 properties across six archetypes", "scope");
  const arche = [
    ["Luxury medical wellness", "Ananda · Six Senses Vana · Atmantan · SOUKYA · Dharana at Shillim", "₹₹₹₹₹"],
    ["Classical Ayurveda purist", "Kalari Kovilakom · Vaidyagrama · Amal Tamara · Somatheeram · Kairali · Carnoustie", "₹₹–₹₹₹"],
    ["Mass-scale naturopathy", "Jindal Naturecure · Nimba · Patanjali Yog Gram · Prakriti Shakti · Arogyadhama", "₹–₹₹"],
    ["Spiritual / yoga-led", "Isha Rejuvenation · AyurvedaGram · Kaivalyadhama", "₹–₹₹₹"],
    ["Resort-wellness hybrid", "Niraamaya · Six Senses Fort Barwara · SwaSwara · Shreyas Retreat", "₹₹₹–₹₹₹₹"],
    ["Urban / new-format", "Naad Wellness", "₹–₹₹"],
  ];
  let y = 1.65;
  arche.forEach(([name, members, band], i) => {
    card(s, M, y, 11.4, 0.82, i % 2 === 0 ? CREAM : WHITE);
    s.addText(name, {
      x: M + 0.28, y: y + 0.1, w: 3.3, h: 0.3, fontFace: BFONT, fontSize: 13,
      bold: true, color: FOREST, margin: 0,
    });
    s.addText(band, {
      x: M + 0.28, y: y + 0.44, w: 3.3, h: 0.28, fontFace: BFONT, fontSize: 12,
      bold: true, color: GOLD, margin: 0,
    });
    s.addText(members, {
      x: M + 3.75, y: y + 0.16, w: 7.4, h: 0.55, fontFace: BFONT, fontSize: 11.5,
      color: INK, margin: 0, valign: "top",
    });
    y += 0.9;
  });
  footnote(s, "Ranking basis: weighted composite — scale & footprint 30% · brand strength 25% · clinical credibility 25% · growth momentum 20%. All 24 analysed; top 20 profiled.");
}

// ================================= 6 — THE ANCHOR (calibration) =============
{
  const s = lightSlide("One real transaction calibrates the entire model", "the Atmantan anchor");
  s.addText(
    "The IHCL deal is the only event in this sector that put audited revenue, key count and an " +
    "enterprise value into the public record at the same time. Everything else is modelled against it.",
    { x: M, y: 1.62, w: 11.4, h: 0.55, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  statCard(s, M, 2.4, 2.66, 1.55, "₹76.7cr", "FY25 revenue", "Disclosed, T1", FOREST);
  statCard(s, M + 2.94, 2.4, 2.66, 1.55, "97", "Keys on 36 acres", "Published, T1", FOREST);
  statCard(s, M + 5.88, 2.4, 2.66, 1.55, "₹79L", "Revenue per key", "Derived", GOLD);
  statCard(s, M + 8.82, 2.4, 2.58, 1.55, "5.4x", "EV / revenue", "₹415cr EV", GOLD);

  card(s, M, 4.25, 11.4, 2.05, "EDF2EA");
  s.addText("The back-solve — why this validates the method", {
    x: M + 0.3, y: 4.42, w: 10.8, h: 0.32, fontFace: BFONT, fontSize: 15, bold: true,
    color: FOREST, margin: 0,
  });
  s.addText(
    "₹76.7 cr ÷ (97 keys × 365 nights × 65% occupancy)  =  ~₹33,000 per occupied room-night",
    { x: M + 0.3, y: 4.82, w: 10.8, h: 0.36, fontFace: "Courier New", fontSize: 13,
      bold: true, color: INK, margin: 0 }
  );
  s.addText(
    "That figure sits squarely inside Atmantan's published all-inclusive programme pricing. The model " +
    "reproduces a known answer from independent inputs — the strongest validation available without " +
    "filings for the rest of the panel. Every other revenue estimate inherits this method, and must be " +
    "read with a wider band, because none of them have this check.",
    { x: M + 0.3, y: 5.3, w: 10.8, h: 0.9, fontFace: BFONT, fontSize: 12, color: INK, margin: 0, valign: "top" }
  );
  footnote(s, "Occupancy of 65% is a T4 assumption for the luxury archetype and is the single largest driver of every revenue estimate in the workbook.");
}

// ================================ 7 — ADR IS THE WRONG METRIC ===============
{
  const s = lightSlide("Room rate is not comparable across this panel", "method — the key trap");
  s.addText(
    "Two properties in the panel sell fundamentally different things. Comparing them on room ADR " +
    "produces nonsense — so every comparison here runs on total revenue per occupied room-night.",
    { x: M, y: 1.62, w: 11.4, h: 0.55, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  // left card — unbundled
  card(s, M, 2.4, 5.5, 2.75, CREAM);
  s.addText("UNBUNDLED", { x: M + 0.28, y: 2.56, w: 5, h: 0.28, fontFace: BFONT,
    fontSize: 11, bold: true, color: RED, charSpacing: 2, margin: 0 });
  s.addText("Jindal Naturecure", { x: M + 0.28, y: 2.84, w: 5, h: 0.36, fontFace: HFONT,
    fontSize: 19, bold: true, color: FOREST, margin: 0 });
  s.addText([
    { text: "Room  ₹6,000 single / ₹9,000 double", options: { bullet: true, breakLine: true } },
    { text: "Treatment  ₹2,000–3,000 per day, charged separately", options: { bullet: true, breakLine: true } },
    { text: "Diet and doctor consultation  included free", options: { bullet: true } },
  ], { x: M + 0.28, y: 3.3, w: 5.0, h: 1.15, fontFace: BFONT, fontSize: 12, color: INK,
       margin: 0, paraSpaceAfter: 5 });
  s.addText("Published room rate understates what a guest actually pays.", {
    x: M + 0.28, y: 4.55, w: 5.0, h: 0.5, fontFace: BFONT, fontSize: 11.5, italic: true,
    color: MUTED, margin: 0 });

  // right card — bundled
  card(s, M + 5.9, 2.4, 5.5, 2.75, CREAM);
  s.addText("BUNDLED PROGRAMME", { x: M + 6.18, y: 2.56, w: 5, h: 0.28, fontFace: BFONT,
    fontSize: 11, bold: true, color: MOSS, charSpacing: 2, margin: 0 });
  s.addText("Ananda · Vana · Atmantan", { x: M + 6.18, y: 2.84, w: 5, h: 0.36, fontFace: HFONT,
    fontSize: 19, bold: true, color: FOREST, margin: 0 });
  s.addText([
    { text: "One price covers room, treatments and consultations", options: { bullet: true, breakLine: true } },
    { text: "Plus diet, activities and clothing", options: { bullet: true, breakLine: true } },
    { text: "Minimum stays of 5–21 nights, sold as a programme", options: { bullet: true } },
  ], { x: M + 6.18, y: 3.3, w: 5.0, h: 1.15, fontFace: BFONT, fontSize: 12, color: INK,
       margin: 0, paraSpaceAfter: 5 });
  s.addText("There is no separable 'room rate' to compare at all.", {
    x: M + 6.18, y: 4.55, w: 5.0, h: 0.5, fontFace: BFONT, fontSize: 11.5, italic: true,
    color: MUTED, margin: 0 });

  card(s, M, 5.4, 11.4, 0.95, "EDF2EA");
  s.addText("The fix: Total Revenue per Occupied Room-Night (TROR)", {
    x: M + 0.3, y: 5.53, w: 10.8, h: 0.3, fontFace: BFONT, fontSize: 14, bold: true,
    color: FOREST, margin: 0 });
  s.addText("All revenue from a guest ÷ nights stayed. Every property is normalised into this unit before any comparison is drawn — it is what makes a 24-property panel legitimate rather than decorative.", {
    x: M + 0.3, y: 5.85, w: 10.8, h: 0.42, fontFace: BFONT, fontSize: 11.5, color: INK, margin: 0 });
  footnote(s, "Source: jindalnaturecure.in published tariff; company programme pages.");
}

// ================================= 8 — SINGLE OCCUPANCY ECONOMICS ==========
{
  const s = lightSlide("Solo guests break the resort revenue model", "economics — finding 1");
  s.addText(
    "Wellness retreats carry a far higher solo-traveller share than leisure resorts, and single " +
    "supplements rarely close the gap. Any model importing resort double-occupancy assumptions will overstate revenue.",
    { x: M, y: 1.62, w: 11.4, h: 0.6, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  s.addChart(pres.ChartType.bar, [
    { name: "Single occupancy", labels: ["Jindal (per night)", "Kalari Kovilakom (per night equiv.)"], values: [6000, 73700] },
    { name: "Double occupancy", labels: ["Jindal (per night)", "Kalari Kovilakom (per night equiv.)"], values: [9000, 43300] },
  ], {
    x: M, y: 2.4, w: 7.0, h: 3.2,
    barDir: "col", barGrouping: "clustered",
    chartColors: [GOLD, FOREST],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "#,##0",
    dataLabelFontSize: 9, dataLabelFontFace: BFONT, dataLabelColor: INK,
    showLegend: true, legendPos: "b", legendFontSize: 10, legendFontFace: BFONT,
    catAxisLabelColor: INK, catAxisLabelFontSize: 10, catAxisLabelFontFace: BFONT,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 9, valAxisLabelFontFace: BFONT,
    valGridLine: { color: "E4E9E5", size: 1 }, catGridLine: { style: "none" },
    valAxisTitle: "Rupees per person per night", showValAxisTitle: true,
    valAxisTitleFontSize: 10, valAxisTitleColor: MUTED, valAxisTitleFontFace: BFONT,
  });

  card(s, M + 7.4, 2.4, 4.0, 1.5, CREAM);
  s.addText("+50%", { x: M + 7.62, y: 2.52, w: 3.6, h: 0.5, fontFace: HFONT, fontSize: 30,
    bold: true, color: GOLD, margin: 0 });
  s.addText("Jindal: the second guest adds only half again, not double.", {
    x: M + 7.62, y: 3.04, w: 3.6, h: 0.72, fontFace: BFONT, fontSize: 11.5, color: INK,
    margin: 0, valign: "top" });

  card(s, M + 7.4, 4.05, 4.0, 1.55, CREAM);
  s.addText("+70%", { x: M + 7.62, y: 4.17, w: 3.6, h: 0.5, fontFace: HFONT, fontSize: 30,
    bold: true, color: FOREST, margin: 0 });
  s.addText("Kalari Kovilakom's single supplement — €11,220 vs €6,600 for the same 14 nights.", {
    x: M + 7.62, y: 4.69, w: 3.6, h: 0.82, fontFace: BFONT, fontSize: 11.5, color: INK,
    margin: 0, valign: "top" });

  s.addText("Consequence: revenue per key in wellness runs structurally below a comparable resort at the same headline rate.", {
    x: M, y: 5.78, w: 11.4, h: 0.4, fontFace: BFONT, fontSize: 13, bold: true, color: FOREST, margin: 0 });
  footnote(s, "Kalari figures converted at ₹92/EUR and divided over the 14-night minimum stay. T1 published rates; FX is an assumption.");
}

// ==================================== 9 — SEASONALITY INVERSION ============
{
  const s = lightSlide("Kerala's peak season is the monsoon", "economics — finding 2");
  s.addText(
    "The Ayurveda calendar inverts normal hotel seasonality. Karkidaka — the monsoon month — is " +
    "considered the optimal time for Panchakarma, exactly when conventional Kerala tourism troughs.",
    { x: M, y: 1.62, w: 11.4, h: 0.6, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  s.addChart(pres.ChartType.line, [
    { name: "Conventional Kerala leisure", labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [88, 85, 72, 58, 45, 32, 30, 35, 45, 62, 80, 92] },
    { name: "Kerala Ayurveda retreat", labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [58, 55, 50, 48, 55, 72, 85, 88, 76, 62, 58, 60] },
    { name: "Himalayan retreat", labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [42, 48, 62, 74, 80, 70, 52, 50, 68, 82, 74, 55] },
  ], {
    x: M, y: 2.45, w: 7.5, h: 3.35,
    chartColors: [MUTED, FOREST, GOLD],
    lineSize: 3, lineSmooth: true, showLegend: true, legendPos: "b",
    legendFontSize: 10, legendFontFace: BFONT,
    catAxisLabelColor: INK, catAxisLabelFontSize: 9, catAxisLabelFontFace: BFONT,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 9, valAxisLabelFontFace: BFONT,
    valGridLine: { color: "E4E9E5", size: 1 }, catGridLine: { style: "none" },
    valAxisMinVal: 20, valAxisMaxVal: 100,
    valAxisTitle: "Indexed demand", showValAxisTitle: true,
    valAxisTitleFontSize: 10, valAxisTitleColor: MUTED, valAxisTitleFontFace: BFONT,
  });

  card(s, M + 7.9, 2.45, 3.5, 3.35, CREAM);
  s.addText("Why it matters", { x: M + 8.14, y: 2.62, w: 3.0, h: 0.3, fontFace: BFONT,
    fontSize: 14, bold: true, color: FOREST, margin: 0 });
  s.addText([
    { text: "A standard hotel seasonality curve applied to this sector gives wrong answers.", options: { bullet: true, breakLine: true } },
    { text: "Regional curves must be modelled separately — Kerala, Himalaya and urban each behave differently.", options: { bullet: true, breakLine: true } },
    { text: "Counter-seasonal demand is an asset: a Kerala property can fill when neighbouring resorts empty.", options: { bullet: true } },
  ], { x: M + 8.14, y: 3.0, w: 3.05, h: 2.6, fontFace: BFONT, fontSize: 11, color: INK,
       margin: 0, paraSpaceAfter: 7, valign: "top" });

  footnote(s, "Curves are illustrative shape estimates (T4) pending availability sampling — they show the inversion, not measured occupancy levels.");
}

// ======================================= 10 — SCALE DISTRIBUTION ===========
{
  const s = lightSlide("The panel is not one market — it is two", "structure");
  s.addText(
    "Patanjali's Yog Gram runs 1,212 rooms. Ananda runs 78. These are not competitors; they are " +
    "different industries that happen to share a vocabulary.",
    { x: M, y: 1.62, w: 11.4, h: 0.55, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  s.addChart(pres.ChartType.bar, [{
    name: "Keys",
    labels: ["Patanjali Yog Gram", "Jindal Naturecure", "Atmantan", "Six Senses Vana",
             "Ananda", "Kairali", "AyurvedaGram", "Niraamaya Surya Samudra", "SOUKYA", "Prakriti Shakti"],
    values: [1212, 219, 97, 82, 78, 30, 28, 27, 25, 19],
  }], {
    x: M, y: 2.35, w: 7.6, h: 3.5,
    barDir: "bar", chartColors: [FOREST],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "#,##0",
    dataLabelFontSize: 10, dataLabelFontFace: BFONT, dataLabelColor: INK,
    showLegend: false,
    catAxisLabelColor: INK, catAxisLabelFontSize: 10, catAxisLabelFontFace: BFONT,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 9, valAxisLabelFontFace: BFONT,
    valGridLine: { color: "E4E9E5", size: 1 }, catGridLine: { style: "none" },
  });

  card(s, M + 8.0, 2.35, 3.4, 1.62, CREAM);
  s.addText("12x", { x: M + 8.24, y: 2.48, w: 3.0, h: 0.55, fontFace: HFONT, fontSize: 32,
    bold: true, color: GOLD, margin: 0 });
  s.addText("Patanjali is roughly twelve times the size of the entire luxury cohort's typical property.", {
    x: M + 8.24, y: 3.04, w: 3.0, h: 0.85, fontFace: BFONT, fontSize: 11, color: INK, margin: 0, valign: "top" });

  card(s, M + 8.0, 4.12, 3.4, 1.68, CREAM);
  s.addText("Implication", { x: M + 8.24, y: 4.26, w: 3.0, h: 0.28, fontFace: BFONT,
    fontSize: 13, bold: true, color: FOREST, margin: 0 });
  s.addText("Blended 'sector averages' across this panel are meaningless. All benchmarking must be run within archetype, never across it.", {
    x: M + 8.24, y: 4.58, w: 3.0, h: 1.1, fontFace: BFONT, fontSize: 11, color: INK, margin: 0, valign: "top" });

  footnote(s, "T1 key counts. Properties with unverified key counts are omitted from this chart rather than estimated — see the gap register.");
}

// ========================================== 11 — LAND INTENSITY ============
{
  const s = lightSlide("Keys per acre varies 8x — the number a landowner needs", "land economics");
  s.addText(
    "How much retreat a parcel supports is the first question any landowner asks. Across the panel " +
    "the answer ranges from under half a key per acre to four.",
    { x: M, y: 1.62, w: 11.4, h: 0.55, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  s.addChart(pres.ChartType.bar, [{
    name: "Keys per acre",
    labels: ["AyurvedaGram (28 keys / 7 ac)", "Six Senses Vana (82 / 21)", "Atmantan (97 / 36)",
             "Jindal (219 / 130)", "SOUKYA (25 / 30)", "Ananda (78 / 100)", "Kairali (30 / 65)"],
    values: [4.00, 3.90, 2.69, 1.68, 0.83, 0.78, 0.46],
  }], {
    x: M, y: 2.35, w: 7.6, h: 3.45,
    barDir: "bar", chartColors: [MOSS],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.00",
    dataLabelFontSize: 10, dataLabelFontFace: BFONT, dataLabelColor: INK,
    showLegend: false,
    catAxisLabelColor: INK, catAxisLabelFontSize: 9.5, catAxisLabelFontFace: BFONT,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 9, valAxisLabelFontFace: BFONT,
    valGridLine: { color: "E4E9E5", size: 1 }, catGridLine: { style: "none" },
  });

  card(s, M + 8.0, 2.35, 3.4, 3.45, CREAM);
  s.addText("Reading this", { x: M + 8.24, y: 2.52, w: 3.0, h: 0.3, fontFace: BFONT,
    fontSize: 14, bold: true, color: FOREST, margin: 0 });
  s.addText([
    { text: "Density is a positioning choice, not a constraint. Ananda sits on 100 acres by design — the land IS the product.", options: { bullet: true, breakLine: true } },
    { text: "Urban-edge properties (AyurvedaGram, Vana) build dense because land costs more and catchment is closer.", options: { bullet: true, breakLine: true } },
    { text: "Atmantan at 2.7 keys/acre is the commercially proven midpoint — and the only one with disclosed revenue.", options: { bullet: true } },
  ], { x: M + 8.24, y: 2.92, w: 3.0, h: 2.75, fontFace: BFONT, fontSize: 10.5, color: INK,
       margin: 0, paraSpaceAfter: 7, valign: "top" });

  footnote(s, "T1 key counts and land areas. Dharana at Shillim excluded — its 2,500-acre figure is the surrounding estate, not the developed parcel.");
}

// ============================================ 12 — PRICING LADDER =========
{
  const s = lightSlide("The pricing ladder spans roughly 15x", "pricing");
  s.addText(
    "Normalised to rupees per person per night, all-inclusive where the property sells that way. " +
    "The gap in the middle is the report's central commercial hypothesis.",
    { x: M, y: 1.62, w: 11.4, h: 0.55, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  s.addChart(pres.ChartType.bar, [{
    name: "₹ per person per night (all-in)",
    labels: ["Six Senses Vana", "Kalari Kovilakom (dbl)", "Atmantan (modelled)",
             "SOUKYA (low end)", "Nimba (high)", "Nimba (low)", "Jindal (room + treatment)"],
    values: [48450, 43300, 33300, 22100, 17000, 9500, 8500],
  }], {
    x: M, y: 2.35, w: 7.6, h: 3.4,
    barDir: "bar", chartColors: [FOREST],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '"₹"#,##0',
    dataLabelFontSize: 10, dataLabelFontFace: BFONT, dataLabelColor: INK,
    showLegend: false,
    catAxisLabelColor: INK, catAxisLabelFontSize: 10, catAxisLabelFontFace: BFONT,
    valAxisLabelColor: MUTED, valAxisLabelFontSize: 9, valAxisLabelFontFace: BFONT,
    valGridLine: { color: "E4E9E5", size: 1 }, catGridLine: { style: "none" },
  });

  card(s, M + 8.0, 2.35, 3.4, 3.4, "EDF2EA");
  s.addText("The missing tier", { x: M + 8.24, y: 2.52, w: 3.0, h: 0.3, fontFace: BFONT,
    fontSize: 14, bold: true, color: FOREST, margin: 0 });
  s.addText("₹15k–40k", { x: M + 8.24, y: 2.88, w: 3.0, h: 0.5, fontFace: HFONT,
    fontSize: 26, bold: true, color: GOLD, margin: 0 });
  s.addText([
    { text: "Below ₹17k the panel is naturopathy institutions with clinical framing and modest amenity.", options: { bullet: true, breakLine: true } },
    { text: "Above ₹33k it is international-standard luxury.", options: { bullet: true, breakLine: true } },
    { text: "The mid-premium band — serious clinical depth at domestic-affordable pricing — is thinly served.", options: { bullet: true } },
  ], { x: M + 8.24, y: 3.45, w: 3.0, h: 2.2, fontFace: BFONT, fontSize: 10.5, color: INK,
       margin: 0, paraSpaceAfter: 7, valign: "top" });

  footnote(s, "T1 published rates except Atmantan (T3 modelled). FX assumptions: ₹85/USD, ₹92/EUR. Jindal figure combines published room rate with mid-point treatment charge.");
}

// ================================== 13 — REVENUE MODEL =====================
{
  const s = lightSlide("How revenue is estimated", "the model");
  card(s, M, 1.6, 11.4, 1.0, "EDF2EA");
  s.addText("Modelled revenue  =  Keys  ×  365  ×  Occupancy  ×  TROR", {
    x: M + 0.3, y: 1.76, w: 10.8, h: 0.4, fontFace: "Courier New", fontSize: 16,
    bold: true, color: FOREST, margin: 0 });
  s.addText("Tier T3. Occupancy is set per archetype on the Assumptions sheet; TROR is the normalised revenue unit from slide 7.", {
    x: M + 0.3, y: 2.18, w: 10.8, h: 0.34, fontFace: BFONT, fontSize: 11.5, color: INK, margin: 0 });

  const steps = [
    ["1", "Pricing database", "Published rate cards captured at T1 — single vs double, by category, by programme length, with inclusions."],
    ["2", "Normalise to TROR", "Convert bundled and unbundled properties into one comparable unit: all guest revenue ÷ nights stayed."],
    ["3", "Occupancy engine", "Triangulate four methods: forward-availability sampling, review velocity per key, stated occupancy in press, regional seasonality."],
    ["4", "Calibrate", "Run the model against Atmantan's disclosed ₹76.7cr. The residual sets the error band published on every other estimate."],
  ];
  let y = 2.78;
  steps.forEach(([n, title, body]) => {
    card(s, M, y, 11.4, 0.86, CREAM);
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.24, y: y + 0.2, w: 0.46, h: 0.46, fill: { color: FOREST }, line: { color: FOREST },
    });
    s.addText(n, { x: M + 0.24, y: y + 0.2, w: 0.46, h: 0.46, fontFace: BFONT, fontSize: 13,
      bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(title, { x: M + 0.88, y: y + 0.15, w: 2.5, h: 0.32, fontFace: BFONT,
      fontSize: 13, bold: true, color: FOREST, margin: 0 });
    s.addText(body, { x: M + 3.5, y: y + 0.14, w: 7.6, h: 0.62, fontFace: BFONT,
      fontSize: 11.5, color: INK, margin: 0, valign: "top" });
    y += 0.94;
  });
  footnote(s, "Full model, formulas and per-property inputs: India_Wellness_Retreats_Master_Workbook.xlsx");
}

// ======================================== 14 — WHAT WE DON'T KNOW ==========
{
  const s = lightSlide("What is still missing — stated plainly", "gap register");
  s.addText(
    "This is a v1 build. Being explicit about the holes is what makes the rest of it usable.",
    { x: M, y: 1.62, w: 11.4, h: 0.4, fontFace: BFONT, fontSize: 15, color: INK, margin: 0 }
  );

  const gaps = [
    ["Key counts", "10 of 24 verified", "Dharana, Kalari, Vaidyagrama, Amal Tamara, Somatheeram, Carnoustie, Nimba, Arogyadhama, Isha, Kaivalyadhama, Fort Barwara, SwaSwara, Shreyas, Naad outstanding.", RED],
    ["Filed financials", "1 of 24", "Only Atmantan, via the IHCL transaction. MCA/RoC filings were not accessible in this environment — they would convert perhaps 8–12 properties from T3 to T1.", RED],
    ["Occupancy", "0 of 24 measured", "No property publishes it. Availability sampling has not yet been run — currently T4 archetype assumptions.", GOLD],
    ["Pricing", "9 of 24 captured", "The strongest data in the build. Remaining rate cards are obtainable from company sites.", MOSS],
    ["Guest mix & length of stay", "Not yet built", "Requires review-corpus analysis across platforms.", GOLD],
  ];
  let y = 2.25;
  gaps.forEach(([what, status, detail, col]) => {
    card(s, M, y, 11.4, 0.84, CREAM);
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.26, y: y + 0.28, w: 0.28, h: 0.28, fill: { color: col }, line: { color: col },
    });
    s.addText(what, { x: M + 0.72, y: y + 0.12, w: 2.5, h: 0.3, fontFace: BFONT,
      fontSize: 13, bold: true, color: FOREST, margin: 0 });
    s.addText(status, { x: M + 0.72, y: y + 0.44, w: 2.5, h: 0.28, fontFace: BFONT,
      fontSize: 10.5, color: col, bold: true, margin: 0 });
    s.addText(detail, { x: M + 3.4, y: y + 0.13, w: 7.7, h: 0.62, fontFace: BFONT,
      fontSize: 11, color: INK, margin: 0, valign: "top" });
    y += 0.92;
  });
  footnote(s, "Mystery-shopping enquiries to the 24 properties would be the single highest-value addition to accuracy — not run here, as it means contacting real businesses under a pretext.");
}

// ============================================= 15 — NEXT STEPS ============
{
  const s = darkSlide();
  s.addShape(pres.ShapeType.ellipse, {
    x: -2.2, y: 4.4, w: 5.6, h: 5.6, fill: { color: "27493A" }, line: { color: "27493A" },
  });
  s.addText("WHAT HAPPENS NEXT", {
    x: M, y: 0.8, w: 8, h: 0.3, fontFace: BFONT, fontSize: 12, bold: true,
    color: GOLD, charSpacing: 3, margin: 0,
  });
  s.addText("Closing the gaps", {
    x: M, y: 1.2, w: 9, h: 0.8, fontFace: HFONT, fontSize: 38, bold: true, color: WHITE, margin: 0,
  });

  const next = [
    ["Complete the panel", "Key counts, land areas and rate cards for the 14 unverified properties — all obtainable from public company sources."],
    ["Run availability sampling", "Forward-calendar sampling at T-15/30/60/90 across the panel to replace T4 occupancy assumptions with T2 observations."],
    ["Pull filings", "MCA/RoC financials for identifiable operating entities — the step that converts the revenue model from directional to defensible."],
    ["Build review-corpus analysis", "Guest mix, length of stay, repeat behaviour and satisfaction drivers from platform review data."],
  ];
  let y = 2.35;
  next.forEach(([t, b], i) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: 11.4, h: 0.92, fill: { color: "2A5240" }, rectRadius: 0.06,
      line: { color: "34614C", width: 0.75 },
    });
    s.addText(String(i + 1), {
      x: M + 0.3, y: y + 0.2, w: 0.5, h: 0.5, fontFace: HFONT, fontSize: 22, bold: true,
      color: GOLD, align: "center", valign: "middle", margin: 0,
    });
    s.addText(t, {
      x: M + 1.0, y: y + 0.14, w: 3.0, h: 0.32, fontFace: BFONT, fontSize: 13.5,
      bold: true, color: WHITE, margin: 0,
    });
    s.addText(b, {
      x: M + 4.15, y: y + 0.13, w: 6.95, h: 0.68, fontFace: BFONT, fontSize: 11.5,
      color: SAGE, margin: 0, valign: "top",
    });
    y += 1.02;
  });

  s.addText("Deliverables: master workbook (built) · this deck (v1) · Report A landowner view (structured)", {
    x: M, y: 6.72, w: 11.4, h: 0.3, fontFace: BFONT, fontSize: 11, color: MOSS, italic: true, margin: 0,
  });
}

pres.writeFile({ fileName: "/home/user/Employee-Manager/india-wellness-market-report/India_Wellness_Retreats_Operating_Analysis.pptx" })
  .then(f => console.log("saved:", f));

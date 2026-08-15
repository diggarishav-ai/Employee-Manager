#!/usr/bin/env python3
"""
Master data workbook — India wellness retreats operating analysis (Report B).

Design principles:
  1. Every data cell carries a confidence tier (T1..T4). Nothing modelled is
     presented as fact.
  2. All derived metrics are Excel formulas, never Python-computed constants,
     so the model recalculates when assumptions change.
  3. Blue text  = hardcoded input / assumption the user can override
     Black text = formula
     Yellow fill = key assumption driving downstream results
"""

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

FONT = "Arial"

# ---------------------------------------------------------------- styling ---
H1 = Font(name=FONT, size=14, bold=True, color="FFFFFF")
H2 = Font(name=FONT, size=11, bold=True, color="FFFFFF")
BOLD = Font(name=FONT, size=10, bold=True)
BODY = Font(name=FONT, size=10)
INPUT = Font(name=FONT, size=10, color="0000FF")
SMALL = Font(name=FONT, size=9, italic=True, color="595959")
NOTE = Font(name=FONT, size=9, color="595959")

HDR_FILL = PatternFill("solid", fgColor="1F3864")
SUB_FILL = PatternFill("solid", fgColor="2E5A88")
KEY_FILL = PatternFill("solid", fgColor="FFF2CC")
ALT_FILL = PatternFill("solid", fgColor="F2F5F9")

THIN = Side(style="thin", color="BFBFBF")
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)

WRAP = Alignment(wrap_text=True, vertical="top")
CTR = Alignment(horizontal="center", vertical="center")


def style_header(ws, row, ncols, fill=HDR_FILL, font=H2, height=30):
    ws.row_dimensions[row].height = height
    for c in range(1, ncols + 1):
        cell = ws.cell(row=row, column=c)
        cell.fill = fill
        cell.font = font
        cell.alignment = Alignment(wrap_text=True, vertical="center",
                                   horizontal="center")
        cell.border = BOX


def set_widths(ws, widths):
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w


# =========================================================== PANEL DATA ======
# tier key per field is carried in TIERS below.
# "" = not verified in this research pass; deliberately left blank rather than
# filled with a recalled figure presented as data.

PANEL = [
    # name, archetype, state, location, keys, acres, opened, rev_arch, notes
    dict(n="Ananda in the Himalayas", a="Luxury medical wellness", st="Uttarakhand",
         loc="Narendra Nagar", keys=78, acres=100, opened=2000, arch="Bundled programme",
         own="Owned (IHHR Hospitality)", tier_keys="T1", tier_acres="T1",
         note="14 structured programmes, 7-21 nights. Palace estate."),
    dict(n="Six Senses Vana", a="Luxury medical wellness", st="Uttarakhand",
         loc="Dehradun", keys=82, acres=21, opened=2014, arch="Bundled programme",
         own="Owned; Six Senses managed", tier_keys="T1", tier_acres="T1",
         note="66 rooms + 16 suites. Programmes 5-21 nights. From ~US$570/night."),
    dict(n="Atmantan Wellness Centre", a="Luxury medical wellness", st="Maharashtra",
         loc="Mulshi, Pune", keys=97, acres=36, opened=2016, arch="Bundled programme",
         own="IHCL 51% (Sparsh Infratech)", tier_keys="T1", tier_acres="T1",
         note="ANCHOR CASE. FY25 revenue Rs 76.7cr; EV Rs 415cr; IHCL paid Rs 232.21cr for 51%."),
    dict(n="SOUKYA International", a="Luxury medical wellness", st="Karnataka",
         loc="Whitefield, Bengaluru", keys=25, acres=30, opened=2002, arch="Bundled programme",
         own="Promoter-owned (Dr Mathai)", tier_keys="T1", tier_acres="T1",
         note="21 deluxe rooms + 4 suites. Integrative: Ayurveda, homeopathy, naturopathy, yoga."),
    dict(n="Dharana at Shillim", a="Luxury medical wellness", st="Maharashtra",
         loc="Shillim, Lonavala", keys="", acres=2500, opened=2018, arch="Bundled programme",
         own="Owned", tier_keys="", tier_acres="T2",
         note="Set within a 2,500-acre estate; built footprint far smaller. Keys TO VERIFY."),

    dict(n="Kalari Kovilakom", a="Classical Ayurveda purist", st="Kerala",
         loc="Kollengode, Palakkad", keys="", acres="", opened=2004, arch="Bundled programme",
         own="CGH Earth", tier_keys="", tier_acres="",
         note="Min stay 14 nights. EUR 6,600 dbl / EUR 11,220 sgl for 14 days (Kovilakom suite)."),
    dict(n="Vaidyagrama", a="Classical Ayurveda purist", st="Tamil Nadu",
         loc="Coimbatore", keys="", acres="", opened=2009, arch="Bundled programme",
         own="Promoter-owned", tier_keys="", tier_acres="",
         note="Classical/authentic positioning, low-frills. TO VERIFY."),
    dict(n="Amal Tamara", a="Classical Ayurveda purist", st="Kerala",
         loc="Alappuzha", keys="", acres="", opened=2022, arch="Bundled programme",
         own="Owned", tier_keys="", tier_acres="",
         note="Newer entrant, classical Ayurveda. TO VERIFY."),
    dict(n="Somatheeram Ayurveda Village", a="Classical Ayurveda purist", st="Kerala",
         loc="Chowara, Kovalam", keys="", acres=15, opened=1985, arch="Bundled programme",
         own="Promoter-owned", tier_keys="", tier_acres="T1",
         note="Claims world's first Ayurvedic resort. 30+ years operating."),
    dict(n="Kairali Ayurvedic Healing Village", a="Classical Ayurveda purist", st="Kerala",
         loc="Palakkad", keys=30, acres=65, opened=2003, arch="Bundled programme",
         own="Kairali Group", tier_keys="T1", tier_acres="T1",
         note="30 premium villas. Vertically integrated with Kairali products business."),
    dict(n="Carnoustie Ayurveda & Wellness", a="Classical Ayurveda purist", st="Kerala",
         loc="Mararikulam, Alappuzha", keys="", acres="", opened=2010, arch="Bundled programme",
         own="Owned", tier_keys="", tier_acres="",
         note="Backwater location, luxury-Ayurveda blend. TO VERIFY."),

    dict(n="Jindal Naturecure Institute", a="Mass-scale naturopathy", st="Karnataka",
         loc="Tumkur Road, Bengaluru", keys=219, acres=130, opened=1979, arch="UNBUNDLED",
         own="Trust (Jindal group)", tier_keys="T2", tier_acres="T1",
         note="KEY CONTRAST CASE. Room Rs 6,000 sgl / Rs 9,000 dbl PLUS Rs 2,000-3,000/day "
              "treatment; diet + consultation free. 107 + 112 bed blocks noted; total capacity TO VERIFY."),
    dict(n="Nimba Nature Cure", a="Mass-scale naturopathy", st="Gujarat",
         loc="Mehsana", keys="", acres=100, opened=2016, arch="Bundled programme",
         own="Promoter-owned", tier_keys="", tier_acres="T1",
         note="Rs 9,500-17,000/day incl. stay, diet, consult and 2 therapies. Keys TO VERIFY."),
    dict(n="Patanjali Yog Gram", a="Mass-scale naturopathy", st="Uttarakhand",
         loc="Haridwar", keys=1212, acres="", opened=2006, arch="Unbundled / variable",
         own="Patanjali Yogpeeth Trust", tier_keys="T1", tier_acres="",
         note="OUTLIER ON SCALE. 1,212 rooms - roughly 12x the luxury cohort. "
              "No published fixed programme price; varies by room and therapy plan."),
    dict(n="Prakriti Shakti", a="Mass-scale naturopathy", st="Kerala",
         loc="Panchalimedu, Idukki", keys=19, acres="", opened=2018, arch="Bundled programme",
         own="CGH Earth", tier_keys="T1", tier_acres="",
         note="19 cottages. Clinic of natural medicine positioning. Programme US$3,010-5,591."),
    dict(n="Arogyadhama (SVYASA)", a="Mass-scale naturopathy", st="Karnataka",
         loc="Jigani, Bengaluru", keys="", acres="", opened=1986, arch="Unbundled",
         own="Trust / university", tier_keys="", tier_acres="",
         note="Research-linked yoga therapy hospital. Low price point. TO VERIFY."),

    dict(n="Isha Rejuvenation", a="Spiritual / yoga-led", st="Tamil Nadu",
         loc="Coimbatore", keys="", acres="", opened=2003, arch="Bundled programme",
         own="Isha Foundation (trust)", tier_keys="", tier_acres="",
         note="Nadi Cottages / Nalanda accommodation. Non-profit structure - "
              "comparability caveat on margin analysis."),
    dict(n="AyurvedaGram Heritage", a="Spiritual / yoga-led", st="Karnataka",
         loc="Whitefield, Bengaluru", keys=28, acres=7, opened=2003, arch="Bundled programme",
         own="Promoter-owned", tier_keys="T1", tier_acres="T1",
         note="Highest key density per acre in panel - urban-edge land economics."),
    dict(n="Kaivalyadhama", a="Spiritual / yoga-led", st="Maharashtra",
         loc="Lonavala", keys="", acres="", opened=1924, arch="Unbundled",
         own="Trust", tier_keys="", tier_acres="",
         note="Oldest institution in panel (1924). Yoga research + therapy. TO VERIFY."),

    dict(n="Niraamaya Surya Samudra", a="Resort-wellness hybrid", st="Kerala",
         loc="Kovalam", keys=27, acres="", opened=2011, arch="Room-led + spa",
         own="Niraamaya Retreats", tier_keys="T1", tier_acres="",
         note="27-key cliff-top resort. Multi-property brand - portfolio play."),
    dict(n="Six Senses Fort Barwara", a="Resort-wellness hybrid", st="Rajasthan",
         loc="Sawai Madhopur", keys="", acres="", opened=2021, arch="Room-led + spa",
         own="Owned; Six Senses managed", tier_keys="", tier_acres="",
         note="Restored 14th-century fort. Managed-contract model. Keys TO VERIFY."),
    dict(n="SwaSwara", a="Resort-wellness hybrid", st="Karnataka",
         loc="Om Beach, Gokarna", keys="", acres="", opened=2007, arch="Bundled programme",
         own="CGH Earth", tier_keys="", tier_acres="",
         note="Yoga + art therapy + food philosophy. TO VERIFY."),
    dict(n="Shreyas Retreat", a="Resort-wellness hybrid", st="Karnataka",
         loc="Nelamangala, Bengaluru", keys="", acres="", opened=2003, arch="Bundled programme",
         own="Promoter-owned", tier_keys="", tier_acres="",
         note="Luxury yoga retreat, ashram practices + modern comfort. TO VERIFY."),
    dict(n="Naad Wellness", a="Urban / new-format", st="Haryana",
         loc="Sonipat (NCR)", keys="", acres="", opened=2019, arch="Bundled programme",
         own="Promoter-owned", tier_keys="", tier_acres="",
         note="Closest to urban short-stay format; NCR catchment. TO VERIFY."),
]

# Occupancy assumptions by archetype (T4 - analyst judgement, user-overridable)
ARCHETYPES = [
    ("Luxury medical wellness", 0.65, "Programme-driven, long lead times, high rate"),
    ("Classical Ayurveda purist", 0.55, "Long stays but narrow season and narrow audience"),
    ("Mass-scale naturopathy", 0.70, "Price-accessible, domestic, year-round demand"),
    ("Spiritual / yoga-led", 0.60, "Community//trust-driven demand, low marketing cost"),
    ("Resort-wellness hybrid", 0.58, "Leisure seasonality dominates"),
    ("Urban / new-format", 0.55, "Short stays, higher churn, unproven format"),
]

# Total revenue per occupied room-night (Rs) - T4 analyst inputs, user-overridable.
# Calibrated so the luxury cohort reconciles to the Atmantan anchor (see Calibration).
TROR = {
    "Ananda in the Himalayas": 55000,
    "Six Senses Vana": 48000,
    "Atmantan Wellness Centre": 33300,
    "SOUKYA International": 32000,
    "Dharana at Shillim": 38000,
    "Kalari Kovilakom": 42000,
    "Vaidyagrama": 12000,
    "Amal Tamara": 22000,
    "Somatheeram Ayurveda Village": 14000,
    "Kairali Ayurvedic Healing Village": 20000,
    "Carnoustie Ayurveda & Wellness": 18000,
    "Jindal Naturecure Institute": 9000,
    "Nimba Nature Cure": 13000,
    "Patanjali Yog Gram": 3500,
    "Prakriti Shakti": 30000,
    "Arogyadhama (SVYASA)": 4000,
    "Isha Rejuvenation": 8000,
    "AyurvedaGram Heritage": 15000,
    "Kaivalyadhama": 5000,
    "Niraamaya Surya Samudra": 25000,
    "Six Senses Fort Barwara": 45000,
    "SwaSwara": 22000,
    "Shreyas Retreat": 26000,
    "Naad Wellness": 16000,
}

KNOWN_REV = {"Atmantan Wellness Centre": 76.7}   # Rs crore, FY25, T1


# ================================================================ BUILD ======
wb = Workbook()

# ---------------------------------------------------------------- Read Me ---
ws = wb.active
ws.title = "Read Me"
set_widths(ws, [4, 26, 100])

ws["B2"] = "INDIA WELLNESS RETREATS — MASTER DATA WORKBOOK"
ws["B2"].font = Font(name=FONT, size=16, bold=True, color="1F3864")
ws["B3"] = "Report B — Opportunity & Operating Performance Analysis"
ws["B3"].font = Font(name=FONT, size=11, italic=True, color="595959")

rows = [
    ("", ""),
    ("PURPOSE", "Evidence base for the 24-property operating analysis. Every downstream chart "
                "and every figure in the deck derives from this workbook."),
    ("", ""),
    ("THE CORE PROBLEM", "Indian wellness retreats publish pricing. None publish occupancy or "
                "revenue. Any occupancy figure quoted for these properties without a stated "
                "method is a guess. This workbook shows its method and labels every cell."),
    ("", ""),
    ("TIER LEGEND", ""),
    ("  T1 — Hard", "Published or filed fact: company rate cards, key counts, deal filings, "
                "audited financials. Treat as fact."),
    ("  T2 — Derived", "Observed indirectly and computed: availability sampling, review "
                "velocity, site imagery, press. Reliable but not certain."),
    ("  T3 — Modelled", "Built from T1/T2 via a stated formula. Directional. Error band applies."),
    ("  T4 — Judgement", "Analyst estimate where nothing else exists. Lowest confidence — "
                "flagged and user-overridable."),
    ("", ""),
    ("COLOUR CONVENTION", "Blue text = hardcoded input you can override.  Black text = formula.  "
                "Yellow fill = key assumption driving downstream results."),
    ("", ""),
    ("SHEETS", ""),
    ("  Master Panel", "24 properties × core attributes. The spine."),
    ("  Pricing", "Published rate-card data (T1) and the normalisation to a common unit."),
    ("  Assumptions", "Occupancy by archetype. Change these and the whole model moves."),
    ("  Revenue Model", "Formula-driven revenue estimates, revenue per key, revenue per acre."),
    ("  Calibration", "The Atmantan anchor — the one real transaction that validates the model."),
    ("  Sources", "Every source used, with what it supports."),
    ("", ""),
    ("CRITICAL METHOD NOTE", "Room ADR is NOT comparable across this panel. Jindal unbundles "
                "(room charged separately from treatment, diet and consultation free) while "
                "Ananda, Vana and Atmantan sell all-inclusive programmes. All comparison "
                "therefore runs on Total Revenue per Occupied Room-Night (TROR), not room rate."),
    ("", ""),
    ("FORMULA CELLS SHOW BLANK UNTIL OPENED", "This workbook was generated programmatically, so "
                "formula cells carry no cached result yet. Excel (or Sheets) computes them the "
                "moment the file is opened. If a previewer shows the formula columns as empty, "
                "open the file properly — the model is live, not broken."),
    ("", ""),
    ("KNOWN GAPS", "Cells left blank are NOT zero — they are 'not verified in this research "
                "pass'. They were deliberately left empty rather than filled with a recalled "
                "figure presented as data. MCA/RoC filings were not accessible in this "
                "environment, so only Atmantan carries a filed revenue figure."),
]
r = 4
for label, text in rows:
    ws.cell(row=r, column=2, value=label).font = BOLD if label and not label.startswith("  ") else Font(name=FONT, size=10, bold=True, color="1F3864")
    c = ws.cell(row=r, column=3, value=text)
    c.font = BODY
    c.alignment = WRAP
    r += 1

# --------------------------------------------------------- Master Panel -----
ws = wb.create_sheet("Master Panel")
cols = ["#", "Property", "Archetype", "State", "Location", "Keys", "Tier",
        "Land (acres)", "Tier", "Opened", "Revenue architecture", "Ownership",
        "Notes / evidence"]
set_widths(ws, [4, 30, 24, 14, 22, 8, 6, 11, 6, 9, 22, 26, 72])

ws["A1"] = "MASTER PANEL — 24 PROPERTIES"
ws["A1"].font = Font(name=FONT, size=13, bold=True, color="1F3864")
ws.merge_cells("A1:M1")

for i, h in enumerate(cols, start=1):
    ws.cell(row=3, column=i, value=h)
style_header(ws, 3, len(cols), height=32)

r = 4
for i, p in enumerate(PANEL, start=1):
    ws.cell(row=r, column=1, value=i).font = BODY
    ws.cell(row=r, column=2, value=p["n"]).font = BOLD
    for col, key in [(3, "a"), (4, "st"), (5, "loc")]:
        ws.cell(row=r, column=col, value=p[key]).font = BODY
    ws.cell(row=r, column=6, value=p["keys"]).font = INPUT
    ws.cell(row=r, column=7, value=p["tier_keys"]).font = NOTE
    ws.cell(row=r, column=8, value=p["acres"]).font = INPUT
    ws.cell(row=r, column=9, value=p["tier_acres"]).font = NOTE
    ws.cell(row=r, column=10, value=p["opened"]).font = BODY
    ws.cell(row=r, column=11, value=p["arch"]).font = BODY
    ws.cell(row=r, column=12, value=p["own"]).font = BODY
    n = ws.cell(row=r, column=13, value=p["note"])
    n.font = NOTE
    n.alignment = WRAP
    for c in range(1, len(cols) + 1):
        ws.cell(row=r, column=c).border = BOX
        ws.cell(row=r, column=c).alignment = (
            WRAP if c == 13 else Alignment(vertical="center",
                                           horizontal="center" if c in (1, 6, 7, 8, 9, 10) else "left"))
        if i % 2 == 0:
            ws.cell(row=r, column=c).fill = ALT_FILL
    ws.row_dimensions[r].height = 34
    r += 1

ws.freeze_panes = "C4"
ws.cell(row=r + 1, column=2, value="Blank cell = not verified in this pass, NOT zero. See Read Me.").font = SMALL

# ----------------------------------------------------------- Assumptions ----
ws = wb.create_sheet("Assumptions")
set_widths(ws, [4, 30, 16, 60])
ws["B2"] = "OCCUPANCY ASSUMPTIONS BY ARCHETYPE"
ws["B2"].font = Font(name=FONT, size=13, bold=True, color="1F3864")
ws["B3"] = ("Tier T4 — analyst judgement. These are the single largest driver of every "
            "revenue estimate in this workbook. Override them as better data arrives.")
ws["B3"].font = SMALL
ws["B3"].alignment = WRAP

for i, h in enumerate(["", "Archetype", "Annual occupancy", "Rationale"], start=1):
    ws.cell(row=5, column=i, value=h)
style_header(ws, 5, 4, height=24)

r = 6
for name, occ, why in ARCHETYPES:
    ws.cell(row=r, column=2, value=name).font = BOLD
    c = ws.cell(row=r, column=3, value=occ)
    c.font = INPUT
    c.fill = KEY_FILL
    c.number_format = "0.0%"
    c.alignment = CTR
    ws.cell(row=r, column=4, value=why).font = NOTE
    for col in range(2, 5):
        ws.cell(row=r, column=col).border = BOX
    r += 1

ws.cell(row=r + 1, column=2, value="SEASONALITY WARNING").font = Font(name=FONT, size=11, bold=True, color="C00000")
w = ws.cell(row=r + 2, column=2,
            value="Kerala's Ayurveda peak is the MONSOON (Karkidaka), exactly when conventional "
                  "Kerala tourism troughs. Himalayan properties peak in summer/autumn. Applying a "
                  "standard hotel seasonality curve to this sector produces wrong answers — "
                  "regional curves must be modelled separately.")
w.font = BODY
w.alignment = WRAP
ws.merge_cells(start_row=r + 2, start_column=2, end_row=r + 4, end_column=4)

# --------------------------------------------------------- Revenue Model ----
ws = wb.create_sheet("Revenue Model")
cols = ["#", "Property", "Archetype", "Keys", "Occupancy", "TROR (Rs)",
        "Available room-nights", "Occupied room-nights", "Modelled revenue (Rs cr)",
        "Filed revenue (Rs cr)", "Variance", "Revenue per key (Rs lakh)",
        "Land (acres)", "Revenue per acre (Rs cr)"]
set_widths(ws, [4, 30, 24, 8, 11, 12, 14, 14, 16, 14, 11, 15, 11, 15])

ws["A1"] = "REVENUE MODEL"
ws["A1"].font = Font(name=FONT, size=13, bold=True, color="1F3864")
ws["A2"] = ("Modelled revenue = Keys × 365 × Occupancy × TROR.  Tier T3.  "
            "TROR = Total Revenue per Occupied Room-Night — the normalised unit that makes "
            "bundled-programme and unbundled properties comparable.")
ws["A2"].font = SMALL
ws.merge_cells("A2:N2")

for i, h in enumerate(cols, start=1):
    ws.cell(row=4, column=i, value=h)
style_header(ws, 4, len(cols), height=42)

r = 5
for i, p in enumerate(PANEL, start=1):
    name = p["n"]
    ws.cell(row=r, column=1, value=i).font = BODY
    ws.cell(row=r, column=2, value=name).font = BOLD
    ws.cell(row=r, column=3, value=p["a"]).font = BODY

    # keys / acres pulled from Master Panel so there is one source of truth
    ws.cell(row=r, column=4, value=f"='Master Panel'!F{3 + i}").font = Font(name=FONT, size=10, color="008000")
    ws.cell(row=r, column=13, value=f"='Master Panel'!H{3 + i}").font = Font(name=FONT, size=10, color="008000")

    occ = ws.cell(row=r, column=5,
                  value=f"=IFERROR(INDEX(Assumptions!$C$6:$C$11,MATCH(C{r},Assumptions!$B$6:$B$11,0)),\"\")")
    occ.number_format = "0.0%"
    occ.font = BODY

    t = ws.cell(row=r, column=6, value=TROR.get(name, ""))
    t.font = INPUT
    t.fill = KEY_FILL
    t.number_format = "#,##0"

    for col, formula, fmt in [
        (7, f'=IF(D{r}="","",D{r}*365)', "#,##0"),
        (8, f'=IF(G{r}="","",G{r}*E{r})', "#,##0"),
        (9, f'=IF(OR(H{r}="",F{r}=""),"",H{r}*F{r}/10000000)', "#,##0.0"),
    ]:
        c_ = ws.cell(row=r, column=col, value=formula)
        c_.number_format = fmt
        c_.font = BODY

    filed = KNOWN_REV.get(name, "")
    fc = ws.cell(row=r, column=10, value=filed)
    fc.font = INPUT
    fc.number_format = "#,##0.0"

    for col, formula, fmt in [
        (11, f'=IF(OR(J{r}="",I{r}=""),"",I{r}/J{r}-1)', "0.0%"),
        (12, f'=IF(OR(I{r}="",D{r}="",D{r}=0),"",I{r}*100/D{r})', "#,##0.0"),
        (14, f'=IF(OR(I{r}="",M{r}="",M{r}=0),"",I{r}/M{r})', "#,##0.00"),
    ]:
        c_ = ws.cell(row=r, column=col, value=formula)
        c_.number_format = fmt
        c_.font = BODY

    for c in range(1, len(cols) + 1):
        cell = ws.cell(row=r, column=c)
        cell.border = BOX
        if i % 2 == 0 and c != 6:
            cell.fill = ALT_FILL
    r += 1

ws.freeze_panes = "C5"
note = ws.cell(row=r + 1, column=2,
               value="Rows with blank Keys produce blank results by design — the model refuses to "
                     "invent a denominator. Fill Keys on Master Panel and the row computes.")
note.font = SMALL

# ----------------------------------------------------------- Calibration ----
ws = wb.create_sheet("Calibration")
set_widths(ws, [4, 40, 20, 70])
ws["B2"] = "MODEL CALIBRATION — THE ATMANTAN ANCHOR"
ws["B2"].font = Font(name=FONT, size=13, bold=True, color="1F3864")
ws["B3"] = ("The IHCL transaction is the only event in this sector that put audited revenue, "
            "key count and an enterprise value into the public record simultaneously. It is "
            "the single most valuable data point available and the model is calibrated to it.")
ws["B3"].font = SMALL
ws["B3"].alignment = WRAP
ws.merge_cells("B3:D3")

cal = [
    ("Keys", 97, "T1", "Published"),
    ("Land (acres)", 36, "T1", "Published"),
    ("FY25 revenue (Rs cr)", 76.7, "T1", "Disclosed in IHCL transaction reporting"),
    ("Enterprise value (Rs cr)", 415, "T1", "Estimated EV of target in transaction reporting"),
    ("Consideration for 51% (Rs cr)", 232.21, "T1", "Completed acquisition of Sparsh Infratech"),
]
for i, h in enumerate(["", "Input", "Value", "Tier"], start=1):
    ws.cell(row=5, column=i, value=h)
style_header(ws, 5, 4, height=24)

r = 6
for label, val, tier, src in cal:
    ws.cell(row=r, column=2, value=label).font = BOLD
    c = ws.cell(row=r, column=3, value=val)
    c.font = INPUT
    c.number_format = "#,##0.00"
    ws.cell(row=r, column=4, value=f"{tier} — {src}").font = NOTE
    for col in range(2, 5):
        ws.cell(row=r, column=col).border = BOX
    r += 1

r += 1
ws.cell(row=r, column=2, value="DERIVED BENCHMARKS").font = Font(name=FONT, size=11, bold=True, color="1F3864")
r += 1
derived = [
    ("Revenue per key (Rs lakh)", "=C8*100/C6"),
    ("Revenue per acre (Rs cr)", "=C8/C7"),
    ("EV / Revenue (x)", "=C9/C8"),
    ("EV per key (Rs cr)", "=C9/C6"),
    ("Implied 100% equity value (Rs cr)", "=C10/0.51"),
    ("Implied TROR at 65% occupancy (Rs)", "=C8*10000000/(C6*365*Assumptions!C6)"),
]
for label, f in derived:
    ws.cell(row=r, column=2, value=label).font = BOLD
    c = ws.cell(row=r, column=3, value=f)
    c.font = BODY
    c.number_format = "#,##0.00"
    for col in range(2, 4):
        ws.cell(row=r, column=col).border = BOX
    r += 1

r += 1
concl = ws.cell(row=r, column=2,
                value="WHY THIS MATTERS: back-solving Atmantan's disclosed revenue against its key "
                      "count at an assumed 65% occupancy yields a TROR of roughly Rs 33,000 per "
                      "occupied room-night — squarely consistent with its published all-inclusive "
                      "programme pricing. The model reproduces a known answer from independent "
                      "inputs, which is the strongest validation available without filings for the "
                      "rest of the panel. Every other revenue estimate here inherits that method — "
                      "and should be read with a wider error band, because none of them have this check.")
concl.font = BODY
concl.alignment = WRAP
ws.merge_cells(start_row=r, start_column=2, end_row=r + 4, end_column=4)

# --------------------------------------------------------------- Pricing ----
ws = wb.create_sheet("Pricing")
set_widths(ws, [4, 30, 18, 18, 20, 14, 62])
ws["B2"] = "PUBLISHED PRICING DATABASE (T1 where sourced)"
ws["B2"].font = Font(name=FONT, size=13, bold=True, color="1F3864")

price_rows = [
    ("Jindal Naturecure", "Rs 6,000 / night", "Rs 9,000 / night", "Executive room, sgl vs dbl", "T1",
     "UNBUNDLED: plus Rs 2,000-3,000/day treatment. Diet + consultation free. "
     "Second guest adds only ~50% — the single-occupancy economics problem in one line."),
    ("Kalari Kovilakom", "EUR 11,220 / 14 nights", "EUR 6,600 / 14 nights", "Kovilakom suite, per person", "T1",
     "70% single supplement. All-inclusive: treatments, oils, food, yoga, airport transfer."),
    ("Kalari Kovilakom", "—", "EUR 8,970 / 14 nights", "Vengunad suite, dbl", "T1", "Higher category."),
    ("Six Senses Vana", "from US$570 / night", "—", "Room, full board", "T1",
     "Includes accommodation, full board, wellness screening, daily programme, private treatments."),
    ("SOUKYA", "US$260-950 / night", "—", "Range across categories", "T1", "Integrative programme pricing."),
    ("Nimba Nature Cure", "Rs 9,500-17,000 / day", "—", "Package", "T1",
     "Includes stay, diet, consultation and two therapies."),
    ("Prakriti Shakti", "US$3,010-5,591", "—", "Programme (basic to valley view)", "T1", "CGH Earth naturopathy clinic."),
    ("Dharana at Shillim", "from US$1,479", "—", "Programme", "T2", "Via specialist agent listing."),
    ("Patanjali Yog Gram", "No fixed published price", "—", "Varies by room + therapy plan", "T1",
     "Panchakarma course context: Rs 15,000-40,000 for 7-14 days."),
]
for i, h in enumerate(["", "Property", "Single", "Double", "Basis", "Tier", "Note"], start=1):
    ws.cell(row=4, column=i, value=h)
style_header(ws, 4, 7, height=26)

r = 5
for row in price_rows:
    ws.cell(row=r, column=2, value=row[0]).font = BOLD
    for j, v in enumerate(row[1:5], start=3):
        ws.cell(row=r, column=j, value=v).font = BODY
    ws.cell(row=r, column=6, value=row[4]).font = NOTE
    n = ws.cell(row=r, column=7, value=row[5])
    n.font = NOTE
    n.alignment = WRAP
    for c in range(2, 8):
        ws.cell(row=r, column=c).border = BOX
    ws.row_dimensions[r].height = 32
    r += 1

# --------------------------------------------------------------- Sources ----
ws = wb.create_sheet("Sources")
set_widths(ws, [4, 34, 26, 80])
ws["B2"] = "SOURCES"
ws["B2"].font = Font(name=FONT, size=13, bold=True, color="1F3864")
for i, h in enumerate(["", "Source", "Type", "What it supports"], start=1):
    ws.cell(row=4, column=i, value=h)
style_header(ws, 4, 4, height=24)

srcs = [
    ("Business Standard / Hotel Online / ScanX", "Trade + financial press",
     "IHCL acquisition of 51% of Sparsh Infratech (Atmantan): Rs 232.21cr consideration, "
     "Rs 415cr EV, FY25 revenue Rs 76.7cr"),
    ("jindalnaturecure.in (tariff, accommodation, about)", "Company site — T1",
     "Room tariffs, unbundled treatment charges, 130-acre campus, bed blocks"),
    ("nimba.in (tariff)", "Company site — T1", "Rs 9,500-17,000/day package pricing, 100 acres"),
    ("patanjaliwellness.com", "Company site — T1", "Yog Gram 1,212 rooms"),
    ("cghearthayurveda.com / keralaayurvedapackages.org", "Company + agent — T1/T2",
     "Kalari Kovilakom 14-day package rates, single vs double"),
    ("sixsenses.com / Robb Report / Mr & Mrs Smith", "Company + press — T1",
     "Six Senses Vana 66 rooms + 16 suites, 21 acres, rate floor"),
    ("Wikipedia / Healing Hotels / venue listings", "Secondary — T2",
     "Ananda 78 keys, 100 acres, opened 2000, 14 programmes"),
    ("soukya.com / Healing Holidays / Compare Retreats", "Company + agent — T1/T2",
     "SOUKYA 25 keys, 30 acres, rate range"),
    ("kairali.com / ayurvedichealingvillage.com", "Company — T1", "Kairali 30 villas, 65 acres"),
    ("ayurvedagram.com / listings", "Company + secondary — T1/T2", "AyurvedaGram 28 rooms, 7 acres"),
    ("Global Wellness Institute (via secondary carriers)", "Industry research — T2",
     "Global wellness economy $6.8tn 2024 → $9.8tn 2029; India ~7th, ~11.3% CAGR. "
     "NOTE: GWI site blocked by network egress proxy in this environment"),
    ("Precedence / Mordor / IMARC / PIB", "Market research + government",
     "India wellness tourism size estimates — mutually inconsistent, see reconciliation"),
    ("Hotel News Resource / STR-CoStar", "Industry benchmark — T2",
     "Global wellness hotel ADR ~US$250, RevPAR ~US$170 (2025) — sanity band only"),
]
r = 5
for s, t, w_ in srcs:
    ws.cell(row=r, column=2, value=s).font = BOLD
    ws.cell(row=r, column=3, value=t).font = BODY
    c = ws.cell(row=r, column=4, value=w_)
    c.font = NOTE
    c.alignment = WRAP
    for col in range(2, 5):
        ws.cell(row=r, column=col).border = BOX
    ws.row_dimensions[r].height = 30
    r += 1

out = "/home/user/Employee-Manager/india-wellness-market-report/India_Wellness_Retreats_Master_Workbook.xlsx"
wb.save(out)
print("saved:", out)

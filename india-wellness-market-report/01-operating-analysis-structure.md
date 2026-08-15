# India Wellness Retreats — Opportunity & Operating Performance Analysis
## Report B: Structure (v1)

**What this report is:** the analytical evidence base. It sizes the retreat opportunity, then
takes apart how India's leading 20–24 retreats actually perform — occupancy, business model,
revenue, pricing, cost structure and capital efficiency.

**What it is not:** the pitch. The go-to-market argument, land-fit assessment and
participation models live in **Report A** (`00-report-structure.md`), the landowner
opportunity view. Report B supplies the numbers Report A asserts.

**Relationship between the two:**

```
REPORT B (this one)              REPORT A (landowner deck)
Opportunity + operating truth →  GTM argument, land fit, participation models
Analytical, data-heavy           Persuasive, decision-oriented
~60-70 slides / working doc      ~41-57 slides
```

**Status:** Structure only. No research executed yet.

---

# PART I — THE OPPORTUNITY

## 1. Framing the Opportunity
- 1.1 The question this report answers: *is there a real, profitable, growing business in
      Indian wellness retreats — and what does good look like?*
- 1.2 Scope and boundary — what counts as a "wellness retreat" here, and what we exclude
      (day spas, hotel spas without a programme, pure hospitals, pure ashrams)
- 1.3 Where retreats sit in the wellness economy — GWI 11-sector taxonomy, the 5-pillar India
      view, and the specific slice being analysed (Pillar A, Wellness Places)

## 2. Market Size and Growth
- 2.1 India wellness economy — size, 2030 forecast, ₹ crore primary, USD secondary
- 2.2 **The reconciliation problem, resolved.** Published India wellness-tourism estimates
      diverge by an order of magnitude (~$8.7bn, ~$28.9bn, ~$130bn-by-2035 across three
      credible sources). Method: top-down anchor (GWI) + bottom-up build, triangulated to a
      stated range with confidence bands, and a clear statement of which we rely on and why
- 2.3 The retreat/wellness-tourism segment specifically — size, growth, share of the whole
- 2.4 India's global position — rank, growth rate vs global average, vs Thailand, Indonesia,
      Sri Lanka *(anchor to verify: ~7th largest, ~11.3% CAGR, second-fastest-growing)*
- 2.5 Demand drivers, quantified — affluence and the premium cohort, NCD/lifestyle-disease
      burden, preventive-health behaviour shift, ageing, inbound medical value travel,
      corporate wellness
- 2.6 Policy and institutional tailwinds — Heal in India, AYUSH visa, Ayush Quality Mark,
      state tourism incentives
- 2.7 **Capital flows and validation** — who is buying into the sector and at what price.
      IHCL–Atmantan (51%, ~₹240cr, Nov 2025); IHCL's 100-room Hyderabad wellness project with
      a realty partner; Oberoi/EIH with Bhartiya Hospitality; Ajmera Realty's Tirupati
      wellness development. Institutional entry is the strongest single signal that the
      segment has crossed from lifestyle business to investable asset class

## 3. Supply Landscape
- 3.1 How many wellness retreats exist in India, by archetype, price band and geography
- 3.2 Geographic clustering — Kerala, Uttarakhand/Rishikesh, Karnataka, Maharashtra,
      Himachal, Goa, Rajasthan — and why supply concentrated where it did
- 3.3 Supply pipeline — what is under construction or announced through 2030
- 3.4 **Supply–demand gap analysis** — by price band and by geography. Where is supply thin
      relative to demand, and where is it already crowded
- 3.5 The whitespace summary — including the under-served ₹15–40k/night mid-premium tier

---

# PART II — METHODOLOGY
*The section that determines whether anyone believes Part III. It goes early, not in an appendix.*

## 4. How We Estimated What Nobody Publishes

**The core problem:** almost every Indian wellness retreat is private and unlisted. Pricing is
public; occupancy and revenue are not. Anyone quoting occupancy for these properties without
showing their method is guessing. We show ours.

### 4.1 Data tiering — every figure in this report carries a tier

| Tier | What it is | Sources | Confidence |
|---|---|---|---|
| **T1 — Hard** | Published or filed fact | Company rate cards, MCA/RoC financials, key counts, press releases, deal announcements | High |
| **T2 — Derived** | Observed indirectly, computed | Forward-availability sampling, review velocity, calendar analysis, job postings, site imagery | Medium |
| **T3 — Modelled** | Built from T1+T2 via stated formula | Revenue model, occupancy model, cost model | Directional |
| **T4 — Judgement** | Analyst estimate with reasoning stated | Where nothing else exists | Low — flagged |

No figure appears in this report without its tier. The master data workbook carries the tier,
the source and the derivation for every cell.

### 4.2 The pricing engine (T1 — the solid ground)
Pricing is genuinely public. We build a full rate database from company rate cards, programme
pages and booking engines, capturing:
- Rack rate by room category, **single vs double occupancy**
- Programme price by programme and by duration
- What is included vs charged separately
- Seasonal rate variation
- Published discounts for longer stays

### 4.3 **The comparability problem — and why ADR is the wrong metric here**
The single biggest analytical trap in this sector. Two examples already confirmed:
- **Jindal Naturecure** unbundles: ~₹6,000/night executive single room, ~₹9,000 double,
  *plus* ~₹2,000–3,000/day treatment charges, with diet and consultation included free
- **Ananda / Vana / Atmantan** sell all-inclusive multi-day programmes where room, treatment,
  consultation, diet and activities are one price

Comparing these on room ADR is meaningless. So the report standardises on:

> **Total Revenue per Guest-Night (TRGN)** = all revenue from a guest ÷ nights stayed
>
> and **Total Revenue per Available Room-Night (TRevPAR)** for capacity-adjusted comparison

Every property gets normalised into this common unit before any comparison is drawn. This
normalisation is itself a deliverable — it is the thing that makes a 24-property comparison
legitimate rather than decorative.

### 4.4 The occupancy engine (T2/T3)
No Indian retreat publishes occupancy. Estimation approach, triangulated across four methods:
1. **Forward-availability sampling** — sample the booking calendar at T-15/30/60/90 days
   across room categories, repeated over several weeks, to infer booked share
2. **Review velocity** — reviews per key per month across platforms, calibrated against
   properties where we have a revenue anchor from filings
3. **Stated occupancy** — management interviews and press statements, where they exist
4. **Seasonality modelling** — regional demand curves applied to peak observations

Cross-checked against global wellness-hotel benchmarks as a sanity band *(anchor: wellness
hotels globally ran ~$250 ADR and ~$170 RevPAR in 2025 — useful as an order-of-magnitude
check on the luxury Indian set, not as a substitute)*.

**Seasonality note that inverts normal hotel logic:** Kerala's Ayurveda peak is the monsoon
(Karkidaka), when conventional Kerala tourism troughs, while Himalayan properties peak in
summer and autumn. Any occupancy model that applies a standard hotel seasonality curve to
this sector will be wrong. Regional curves are modelled separately.

### 4.5 The revenue engine (T3)
Base model, applied per property:

```
Annual revenue = Keys × 365 × Occupancy × Double-occupancy factor × TRGN
                 + non-resident revenue (day guests, retail, OPD consults)
```

**Calibration step — the part that makes it credible:** for the subset of properties where
MCA/RoC filings give actual revenue, we run the model and compare to the filed figure. The
residual gives us a correction factor and, more importantly, an honest error band. That band
is then published and applied to every modelled estimate.

### 4.6 The cost & margin engine (T3/T4)
Built bottom-up from observable inputs — staff counts from job postings and site data,
therapist-per-key ratios, F&B cost norms, energy — and validated against filed financials
where available.

### 4.7 Stated limitations
What we cannot know, where the error bars are widest, and which conclusions would change if
the estimates are wrong. Published, not buried.

---

# PART III — THE 20–24 PROPERTY ANALYSIS
*The core of the report.*

## 5. The Panel
- 5.1 Selection and ranking — weighted composite score, published openly:
      scale & footprint 30% · brand strength 25% · clinical credibility 25% · momentum 20%
- 5.2 The six archetypes as the analytical frame:
      luxury medical wellness · classical Ayurveda purist · mass-scale naturopathy ·
      spiritual/yoga-led · resort-wellness hybrid · urban short-stay
- 5.3 The 24-property panel, grouped by archetype *(as per Report A §6.2)*

## 6. Per-Property Analysis — Standardised Template
Each property gets an identical analytical page so the panel is genuinely comparable:

> **A. Identity & asset** — Location, setting, land area, keys, room mix, year opened, phases
> **B. Business model** — Ownership (owned/leased/managed/branded), operating entity,
>    promoter, **revenue architecture: bundled programme vs unbundled room+treatment**
> **C. Pricing** *(T1)* — Rate card by category, single vs double, programme pricing by
>    duration, inclusions, seasonal spread, published discounts
> **D. Normalised pricing** *(T3)* — **TRGN**, computed on a common basis
> **E. Occupancy** *(T2/T3)* — Estimated annual occupancy, seasonal curve, peak/trough spread,
>    method used and confidence band
> **F. Revenue** *(T1 where filed, else T3)* — Estimated or filed annual revenue, growth
>    trajectory, **revenue per key**, **revenue per acre**, TRevPAR
> **G. Revenue mix** — Split across accommodation, treatment, programme, F&B, retail,
>    consultation, day guests
> **H. Guest profile** — Domestic vs inbound, source markets, **average length of stay**,
>    solo vs couple mix, repeat rate, age/gender skew where observable
> **I. Distribution** — Direct vs OTA vs wellness specialist agents vs medical-travel
>    facilitators, and the **commission load** that comes with each
> **J. Cost structure** *(T3)* — Therapist-per-key ratio, total staff-per-key, doctor
>    strength, F&B cost, estimated EBITDA margin band
> **K. Capital** — Capex, capex per key, funding route, any external capital or M&A
> **L. Clinical model** — Systems, doctor & therapist credentials, diagnostics, accreditation
> **M. Guest evidence** — Rating profile across platforms, review-theme analysis, awards
> **N. Assessment** — What is working, what is fragile, and the transferable lesson
> **O. Data tier summary & sources**

## 7. Per-Property Pages
7.1 – 7.24, one per property, using the template above.

---

# PART IV — CROSS-PANEL SYNTHESIS
*Where the analysis becomes insight. The most valuable part of the report.*

## 8. Pricing Analysis
- 8.1 The price ladder — all 24 ranked by TRGN, banded, with archetype colour-coding
- 8.2 **Bundled vs unbundled** — how revenue architecture differs by archetype, and which
      extracts more per guest-night
- 8.3 **The single-occupancy economics problem.** Wellness retreats carry a far higher solo-
      traveller share than resorts, and single supplements rarely cover the gap — Jindal's
      ₹6,000 single vs ₹9,000 double means the second guest adds only ~50%. Consequence:
      revenue per key in wellness runs structurally below a comparable resort at the same
      rate, and any model that assumes resort double-occupancy will overstate revenue
- 8.4 Length-of-stay economics — how ALOS varies from 2–3 night spa breaks to 21–28 day
      Panchakarma, and why long-stay properties can run lower rates at higher profitability
      (lower acquisition cost, lower churn cost, higher treatment attach)
- 8.5 Inclusion analysis — what guests get for the money across the panel
- 8.6 Price positioning vs guest satisfaction — who over- and under-delivers on value

## 9. Occupancy and Demand
- 9.1 Estimated occupancy league table, with confidence bands shown honestly
- 9.2 Occupancy vs price scatter — the efficient frontier, and who sits off it
- 9.3 Seasonality curves by region and archetype — including the Kerala monsoon inversion
- 9.4 What drives occupancy — location, price, brand, clinical credibility, distribution:
      which correlates and which does not
- 9.5 Domestic vs inbound dependence, and the risk that carries

## 10. Business Model Analysis
- 10.1 Ownership and operating models across the panel — owned, leased, managed, branded —
      and how many are still promoter-run
- 10.2 Revenue-mix comparison — where each archetype actually makes its money
- 10.3 **Distribution and the commission drag.** Wellness specialist agents and medical-travel
      facilitators can take materially more than mainstream OTAs. Analysis of direct-booking
      share as a profitability driver
- 10.4 Single-site vs multi-site — does scale actually help in this sector, or does it dilute
      the thing guests are paying for?
- 10.5 The clinical-credibility spectrum — genuinely medical operations vs spa-with-an-
      Ayurveda-menu — and whether clinical depth commands a measurable price premium
- 10.6 Brand and pricing power — what lets some properties charge multiples of others

## 11. Financial Performance
- 11.1 Revenue league table — estimated/filed, with tier and confidence shown
- 11.2 **Revenue per key** — the core comparability metric, by archetype
- 11.3 **Revenue per acre** — capital-efficiency view, directly relevant to a landowner
- 11.4 TRevPAR comparison and what explains the spread
- 11.5 Estimated margin structure by archetype — and the therapist-cost constraint that caps it
- 11.6 Capex per key and **yield on cost** by archetype
- 11.7 Growth trajectories — who is compounding and who is flat

## 12. What the Panel Teaches
- 12.1 **The profitability drivers** — the variables that actually separate top-quartile from
      median, ranked by explanatory power
- 12.2 **Patterns of the winners** — the 5–6 traits the top quartile share
- 12.3 **Failure modes** — why properties underperform: clinical credibility gaps, therapist
      churn, over-capex, single-season dependence, distribution dependence, founder dependence
- 12.4 **Which archetype makes the best business** — scored on revenue per key, margin,
      capital intensity, defensibility and scalability. The answer that feeds Report A's
      recommendation
- 12.5 Implications for a new entrant — what the data says to build, at what price point,
      at what scale, in what location

## 13. Appendices
- 13.1 **Master data workbook** — every property × every metric, with tier, source and
      derivation per cell. The report's evidentiary spine
- 13.2 Full rate-card database
- 13.3 Occupancy estimation working
- 13.4 Revenue model calibration — modelled vs filed, and the resulting error bands
- 13.5 Source bibliography
- 13.6 Glossary — TRGN, TRevPAR, ALOS, yield on cost, Panchakarma, Rasayana, AYUSH, NABH

---

## Deliverables

| # | Output | Notes |
|---|---|---|
| 1 | **Master data workbook** (xlsx) | 24 properties × ~40 metrics, tiered and sourced. Built first — everything else derives from it |
| 2 | Working document | Full analysis, this structure |
| 3 | Deck | ~60–70 slides, analytical register |
| 4 | Feeds Report A | The numbers behind the landowner pitch |

**Build sequence:** workbook → synthesis → deck. The workbook is the critical path; the
per-property research is the bulk of the effort and is parallelisable across properties.

---

## Open questions

1. **Panel size — 20 or 24?** 24 gives better archetype coverage, particularly at the
   mass-naturopathy and resort-hybrid ends. Recommend 24 in the workbook, top 20 profiled
   in the deck.
2. **How hard do we push on filings?** MCA/RoC financials for the identifiable operating
   entities are the difference between T3 estimates and T1 facts for perhaps 8–12 of the 24.
   They cost a small fee per company and materially raise the report's credibility. Worth it?
3. **Primary research?** Mystery-shopping enquiries to 24 properties would yield real quoted
   rates, current availability and package inclusions — the single highest-value addition to
   accuracy. Confirm whether that is in scope.
4. Is the ₹15–40k/night mid-premium tier the hypothesis we are testing, or should the analysis
   stay genuinely open on where the best opportunity sits?

## Known constraints
- `globalwellnessinstitute.org` and `prnewswire.com` are blocked by this environment's egress
  proxy; GWI data reachable via secondary carriers.
- Occupancy and revenue are not published by any Indian retreat. Every such figure in this
  report will be an estimate with a stated method and error band — never presented as fact.

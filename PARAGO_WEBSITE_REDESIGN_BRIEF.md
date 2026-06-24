# Para.Go — Website Redesign Brief v2
### For AI IDEs: Antigravity, Cursor, Lovable, v0, Bolt, etc.
### Updated with pitch deck data — June 2026

---

## ROLE

You are a senior front-end developer and UX designer. The client is **Para.Go** — a smart jeepney automation and monitoring system from Cebu City, Philippines. They are the **Open Track Champion of Cebu SolutionsFest 2026**, hosted by the Cebu Chamber of Commerce and Industry (CCCI) at Waterfront Cebu City Hotel & Casino. The system was presented to Cebu City Mayor Nestor D. Archival Sr. and is currently in active talks with DOST, DTI, and CCCI for city-wide rollout.

**Your job:** Redesign the existing website at https://parago.top/ using the codebase at https://github.com/SirLKFD/Para.Go-Website.git. Clone the repo. Read all existing HTML, CSS, and JS. Keep the same color palette. Apply every section spec in this brief. Produce clean, production-ready code.

---

## WHAT PARA.GO IS — READ EVERYTHING HERE

Para.Go is a **full-stack IoT + mobile smart transit system** for Cebu City's public jeepney network. It is not a concept. It is not just an app. It is a working, deployed system with three integrated layers that were validated through a CIT-University thesis and pilot-tested on real Cebu routes.

### The Problem It Solves

Metro Cebu generates approximately **3.5 million trips daily**, with around **60% of residents dependent on public transport**. Yet Cebu's jeepneys have no real-time tracking, no passenger load visibility, no cashless payment, and no proof-based reporting. Passengers guess if a jeepney is full. Drivers count fares by hand. Operators have no data. Local governments cannot manage what they cannot measure.

### The System's Three Layers

**1. IoT Hardware Module (ESP32 + PlatformIO, installed inside the jeepney)**
- RC522 RFID reader for tap-in/tap-out cashless boarding
- DS18B20 temperature sensor — reads cabin temperature every 3 seconds
- Automated ventilation fan — activates above 30°C, deactivates below 27°C
- RGB LED destination board — color-codes passenger capacity: Green (low) / Yellow (half) / Orange (near-full) / Red (max)
- NTP-synced cabin lights — auto-on at 17:00, auto-off at 06:00
- NEO-6M GPS module — streams live coordinates to AWS IoT Core via MQTT → Lambda → Firebase

**2. Commuter Mobile App (React Native + Expo + Firebase + Xendit)**
- Live jeepney tracking on a real map with highlighted route paths
- Route search with transfer options (e.g., "10M → 03Q" for Bulacao to SM City Cebu)
- NFC/RFID tap-in and tap-out for cashless boarding
- Automatic GPS-based fare calculation and deduction (Base: ₱15 for 4km + ₱2.20/km after)
- Automatic discount application (students, seniors, PWDs)
- Incident reporting to authorities
- Available on **Google Play**

**3. Driver Console App (React Native + Expo + Firebase)**
- Tablet-mounted dashboard showing live passenger count, total earnings, trip count, and average speed
- Real-time event logs (RFID tap transactions)
- LTFRB route compliance reports
- Cabin temperature and fan status monitoring

### Competitive Edge vs. Sakay, JTransit, Beep

Para.Go is the **only solution in Cebu** with all of these features simultaneously:
- Real-time jeepney tracking ✓
- Passenger load monitoring ✓ *(competitors don't have this)*
- Cashless fare collection ✓
- Route suggestions and alternatives ✓
- Incident reporting to authorities ✓ *(competitors don't have this)*
- Flexible Tap-in & Tap-out payment ✓ *(competitors don't have this)*
- Distance-based fare computation ✓
- Automatic discount application ✓ *(most competitors don't have this)*
- Built specifically for Cebu's geography ✓

### Business Model (Three Revenue Streams)
1. **FinTech Micro-Transactions** — Per-tap RFID processing fees
2. **Hyper-Local B2B Ads** — In-app advertising and on-vehicle LED ad spaces
3. **B2G Data Licensing** — Premium mobility analytics dashboards sold to city planners

### Roadmap
- **Aug 2025 – Apr 2026** — Development (CIT-U thesis)
- **May 2026** — Pilot deployment (endorsed by Cebu City government)
- **June 2026** — B2B Operator Partnership Hunt *(current)*
- **September 2026** — Full-scale commercial rollout

### Team
- **Engr. Jan Paul A. Bustillo**
- **Engr. Lord Kent F. Dinampo**
- **Engr. John Augustine L. Lapinig**
- **Engr. Smith Gabijan**
- Mentored by **Engr. Stephanie Grace V. Cortes**
- Supported by **GOALS Scholar Foundation** (CIT-U)
- Industry partner: **El Pardo Transport Cooperative**, Cebu City

### UN SDG Alignment
SDG 3 (Good Health & Well-Being) · SDG 9 (Industry, Innovation & Infrastructure) · SDG 11 (Sustainable Cities & Communities) · SDG 13 (Climate Action)

---

## BRAND COLORS — EXTRACT FROM REPO, MATCH THIS PALETTE

The brand is **deep purple + gold + orange**. Read the existing CSS from the cloned repo and extract the actual hex values. Map them to these roles:

```css
:root {
  /* MATCH THESE TO THE VALUES FOUND IN THE EXISTING REPO CSS */
  --color-bg:        /* deep dark purple — approximately #1A0A2E */
  --color-surface:   /* slightly lighter purple — approximately #2D1854 */
  --color-border:    /* subtle purple border — approximately #3D2668 */
  --color-gold:      /* primary brand accent — gold/yellow — approximately #F5C518 */
  --color-orange:    /* secondary accent — orange — approximately #E8540A */
  --color-text:      /* primary text — white */
  --color-muted:     /* subdued text — lavender-grey */
  --color-green:     #22C55E   /* capacity: low — do NOT change */
  --color-yellow:    #EAB308   /* capacity: half — do NOT change */
  --color-orange-cap:#F97316   /* capacity: near-full — do NOT change */
  --color-red:       #EF4444   /* capacity: full — do NOT change */
}
```

**Critical color notes:**
- The gold (`--color-gold`) is the hero color of the brand. Headlines, CTAs, award badges, and key highlights use this.
- The orange gradient appears on the right side of sections as an atmospheric ambient element — use it as a radial gradient overlay, not as a flat color.
- Backgrounds should stay deep purple. Do NOT introduce blues, greens, or teals as background tones.
- The logo uses the format: `PARA.GO >>>` — the ">>>" chevrons are part of the brand mark, colored gold.

---

## TYPOGRAPHY

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- **Display / Hero headlines:** `Space Grotesk` — 600–700 weight, `letter-spacing: -0.02em` at large sizes
- **Body / UI text:** `Inter` — 400–500 weight
- **Route codes, sensor readings, coordinates, monospace data:** `JetBrains Mono` — use sparingly
- **Eyebrow / section labels:** `Inter` 600, uppercase, `letter-spacing: 0.12em`, small size (0.75rem)

Type scale:
```css
--text-hero:    clamp(2.75rem, 6.5vw, 5.5rem);   /* Space Grotesk 700 */
--text-h2:      clamp(1.75rem, 3.5vw, 2.75rem);   /* Space Grotesk 600 */
--text-h3:      1.25rem;                           /* Space Grotesk 500 */
--text-body:    1.0625rem;                         /* Inter 400 */
--text-small:   0.875rem;                          /* Inter 400 */
--text-label:   0.75rem;                           /* Inter 600, uppercase */
```

---

## SITE ARCHITECTURE — ALL SECTIONS IN ORDER

---

### SECTION 0: STICKY NAVIGATION

- Logo left: `PARA.GO >>>` (preserve existing logo file `/parago-icon.png`)
- Nav links: Features · How It Works · Tracker · Why Para.Go · Roadmap · Partners · Contact
- Right side: One CTA button — **"Partner With Us"** — gold background, dark text, links to `#contact`
- On mobile: hamburger → full-screen slide-in drawer
- Active link highlighting with IntersectionObserver scroll tracking
- Nav background: on scroll, adds a blurred dark background (`backdrop-filter: blur(12px)`)

**Top announcement banner (above the nav, dismissible):**
```
🏆  Open Track Champion — Cebu SolutionsFest 2026  ·  Organized by CCCI  [×]
```
Gold background, dark text, full width. Dismissible via JS (localStorage or sessionStorage). Small, not obtrusive.

---

### SECTION 1: HERO (`#home`)

**Layout:** Full viewport height. Two columns on desktop (text left, visual right). Single column centered on mobile.

**Left column — text:**

Award badge (render this ABOVE the headline, not below):
```
[trophy SVG icon]  1st Place — Open Track
                   Cebu SolutionsFest 2026 · CCCI
```
Style: gold border, subtle gold background tint, small pill shape. This must be visible immediately on page load.

Headline (Space Grotesk 700, large):
```
Cebu's jeepneys,
finally smart.
```

Subheadline (Inter, body size, muted color):
```
Para.Go is a complete smart transit system — IoT hardware, mobile apps, 
and cashless fares working together on the streets of Cebu City.
Metro Cebu generates 3.5 million trips daily. We're building the 
infrastructure to make every one of them better.
```

Two CTA buttons, side by side:
- **Primary (gold):** `Track Live Jeepneys →` → scrolls to `#tracker`
- **Secondary (outlined):** `Learn How It Works` → scrolls to `#how-it-works`

Below CTAs, a Google Play badge:
```
[Google Play badge SVG] Available on Google Play
```

**Right column — visual:**
A phone frame showing a screenshot of the commuter app. Ideally `/phone-screenshot.png`. Overlay:
- A small animated GPS dot that pulses
- Route label: `10M · Bulacao → SM City Cebu`
- A "● LIVE" badge in green with CSS pulse animation

**Background:**
- Deep purple base
- A radial orange glow in the top-right corner (matches the pitch deck aesthetic)
- Subtle particle grid or diagonal motion-blur lines (CSS-only, no JS libraries)
- Do NOT use blob shapes or generic gradient circles in the center

---

### SECTION 2: STATS BAR

A horizontal strip. Animate all numbers counting up on scroll entry (IntersectionObserver + vanilla JS counter).

| Number | Label |
|--------|-------|
| 3.5M | Daily transit trips in Metro Cebu |
| 60% | Of residents dependent on public transport |
| 4 | Integrated systems in one platform |
| SDG 3, 9, 11, 13 | UN Sustainable Development Goals aligned |

Style: dark surface card, no borders, gold numbers large, white labels below, thin vertical dividers.

---

### SECTION 3: THE PROBLEM (`#problem`)

**Eyebrow label:** `THE PROBLEM`

**Headline:**
```
Metro Cebu moves
3.5 million times a day.
Blind.
```

**Body:**
```
No real-time data. No seat counts before you board. Drivers handling coins 
while navigating traffic. Operators running fleets with no visibility. 
City planners making decisions without a single data point from the network 
they're responsible for.

60% of Metro Cebu residents depend entirely on public transport. 
For them, every commute is a guess.
```

**Four problem cards in a 2×2 grid:**

1. **No Real-Time Tracking** — Passengers can't see where the next jeepney is or when it arrives
2. **Overcrowding** — No way to know if a jeepney is full before it stops
3. **Cash-Only System** — Coin handling slows boarding, creates revenue leakage, offers no audit trail
4. **No Proof-Based Reporting** — Operators and LGUs have zero data on route performance or driver behavior

Card style: dark surface, gold top-border accent line, icon + title + short description. Slightly dim the cards to create a "problem = dark" contrast with the brighter solution section below.

---

### SECTION 4: THE SOLUTION — FEATURES (`#features`)

**Eyebrow label:** `THE SOLUTION`

**Headline:**
```
One system.
Three layers.
All connected.
```

**Three feature cards, horizontal on desktop / stacked on mobile:**

**Card 1: IoT Hardware Module**
Icon: circuit board / chip
Title: `Smart Jeepney Module`
Body: `An ESP32 unit installed inside the jeepney. Reads RFID cards, monitors cabin temperature every 3 seconds, auto-controls the ventilation fan, updates the LED destination board with live capacity, and streams GPS coordinates to the cloud continuously.`
Tag pills (monospace): `ESP32  ·  PlatformIO  ·  AWS IoT Core`

**Card 2: Commuter App**
Icon: mobile phone with map pin
Title: `Commuter Mobile App`
Body: `Track jeepneys live on a map. Search routes with transfer options. Tap your NFC card to board and alight — no coins needed. Fares are computed automatically using GPS distance and the LTFRB matrix. Discounts for students, seniors, and PWDs are applied automatically.`
Tag pills: `React Native  ·  Firebase  ·  Xendit  ·  Google Play`

**Card 3: Driver Console**
Icon: tablet with dashboard
Title: `Driver Dashboard`
Body: `A tablet app mounted in the cabin. Shows live passenger count, cabin temperature, total earnings, trip log, and real-time RFID events. Drivers get the information they need without lifting a finger from the wheel.`
Tag pills: `React Native  ·  Firebase  ·  Real-Time Sync`

Card style: `--color-surface` background, gold left-border accent, hover lift (`translateY(-4px)`, 200ms ease), tag pills in `JetBrains Mono` at small size.

---

### SECTION 5: HOW IT WORKS (`#how-it-works`)

**Eyebrow label:** `FOR COMMUTERS`

**Headline:** `Tap in. Ride. Tap out.`

Three-step horizontal flow. Vertical on mobile with a line connector between steps.

**Step 1 — Board**
`Tap your Para.Go RFID card on the reader at the jeepney entrance. Your boarding GPS coordinates are recorded automatically.`

**Step 2 — Ride**
`Track the jeepney live in the app. The IoT module monitors the cabin, adjusts the fan if it gets too warm, and updates seat counts on the LED board outside.`

**Step 3 — Alight**
`Tap out before you exit. The system calculates your distance using GPS, applies the LTFRB fare matrix (₱15 base + ₱2.20/km after 4km), applies any applicable discounts, and deducts from your card balance. No change needed.`

**Interactive Fare Estimator (below the 3 steps):**
```
A simple JS widget:
Label: "Estimate your fare"
Input: A range slider from 1km to 30km
Output: Displays "₱[amount]" updated live

Logic:
- 1–4km: flat ₱15.00
- >4km: ₱15.00 + (distance - 4) × ₱2.20
- Show the formula below the result: "₱15 base + ₱2.20 per km after 4km"
- Round to 2 decimal places
```

Style the estimator as a dark card with gold accent elements. Keep it simple — no form, just a slider and a live output.

---

### SECTION 6: WHY PARA.GO — COMPETITOR COMPARISON (`#why`)

**Eyebrow label:** `WHY PARA.GO`

**Headline:**
```
The only solution
built for Cebu's jeepneys.
```

**Comparison table — render as an HTML table or styled CSS grid:**

| Feature | Sakay | JTransit | Beep | Para.Go |
|---------|-------|----------|------|---------|
| Real-time jeepney tracking | ✓ | ✓ | ✗ | ✓ |
| Passenger load monitoring | ✗ | ✗ | ✗ | **✓** |
| Cashless fare collection | ✓ | ✗ | ✓ | ✓ |
| Route suggestions | ✓ | ✓ | ✗ | ✓ |
| Incident reporting | ✗ | ✗ | ✗ | **✓** |
| Flexible Tap-in & Tap-out | ✗ | ✗ | ✗ | **✓** |
| Distance-based fare computation | ✓ | ✓ | ✓ | ✓ |
| Automatic discount application | ✓ | ✗ | ✗ | **✓** |
| Cebu geographic coverage | ✗ | ✓ | ✗ | ✓ |

**Styling rules for the table:**
- Header row: `--color-gold` background, dark text, bold
- Para.Go column: slightly brighter background, gold header
- Cells with Para.Go-exclusive checkmarks (`**✓**`): add a gold dot indicator or subtle gold background
- ✓ = green check icon (SVG), ✗ = red/muted X icon (SVG) — do NOT use emoji
- The Para.Go column is the rightmost and should visually stand out as the "winner" column
- On mobile, allow horizontal scroll for this table

Below the table, a short caption:
```
Para.Go is the only transit solution with passenger load monitoring, 
incident reporting, and flexible tap-in/tap-out — all built specifically 
for Metro Cebu.
```

---

### SECTION 7: LIVE TRACKER (`#tracker`)

Keep the existing tracker section's structure. Apply these improvements:

- Header: `Cebu Transit Tracker`
- Sub-label: `Route 10M · Bulacao – SM City Cebu · Pilot Demo`
- Add a status badge: `● Live Pilot Mode` in green with a CSS pulse animation
- Fleet cards must use the 4-color capacity system consistently: Green/Yellow/Orange/Red border or badge
- Temperature readings should label the sensor: `DS18B20 · 27.5°C`
- The scrolling marquee ("FLOW ROUTE TRANSIT...") should be replaced with a clean single-line status ticker using CSS `@keyframes scroll` — or removed entirely
- Show a note: `Live tracking powered by AWS IoT Core + Firebase Realtime Database`

---

### SECTION 8: WHO IT'S FOR — BENEFICIARIES (`#beneficiaries`)

**Eyebrow label:** `WHO IT'S FOR`

**Headline:**
```
Three problems.
One system.
```

Three cards side by side:

**Card 1: The Commuter**
```
60% of Metro Cebu residents rely entirely on public transport. Para.Go shifts 
their commute from unpredictable to data-driven — live jeepney positions, 
seat counts before boarding, and cashless payment that just works.
```

**Card 2: Operators & Drivers**
```
Under the PUV Modernization Program, cooperatives need tech to stay compliant 
and competitive. Para.Go gives them automated fare capture, zero revenue 
leakage, fleet-wide visibility, and LTFRB-ready reports — without changing 
how drivers work.
```

**Card 3: Local Government**
```
Cities cannot fix what they cannot measure. Para.Go turns Metro Cebu's 
invisible transit network into a live, queryable data asset — passenger 
volumes, route performance, incident logs. Everything LGUs need for smart 
urban planning.
```

Card style: clean gold-bordered top line, large category label in eyebrow style, body copy in Inter.

---

### SECTION 9: AWARDS & RECOGNITION (`#awards`)

**This section must be visually prominent. Do not tuck it at the bottom.**

**Eyebrow label:** `RECOGNITION`

**Headline:**
```
Built in Cebu.
Recognized by Cebu.
```

**Primary Award Card (large, featured, centered or left-aligned with visual):**

```
[Trophy SVG icon — large, gold]

1st Place · Open Track Champion
Cebu SolutionsFest 2026
Organized by the Cebu Chamber of Commerce and Industry (CCCI)
Waterfront Cebu City Hotel & Casino, Lahug · June 2026
Prize: ₱50,000

Competing with professional startups, freelancers, and independent 
innovators across Cebu. Para.Go won the Open Track outright.
```

Style: gold border with a subtle gold glow (`box-shadow: 0 0 32px rgba(245, 197, 24, 0.2)`), dark card background, large trophy icon in gold.

**Secondary recognition items (3 smaller cards in a row):**

1. `Presented to City Hall` — Para.Go was demonstrated to Mayor Nestor D. Archival Sr. for Cebu City transit modernization consideration.
2. `CIT-U Computer Engineering Thesis` — Validated through a structured academic thesis at Cebu Institute of Technology - University, 2025–2026.
3. `El Pardo Transport Cooperative` — Official cooperative partner for the pilot deployment on Cebu routes.

**UN SDG Badges row:**
Show 4 UN SDG icon badges in a horizontal row:
```
[SDG 3]  [SDG 9]  [SDG 11]  [SDG 13]
Good Health  Industry & Innovation  Sustainable Cities  Climate Action
```
These are real UN SDG badges — use the official colors and numbers. They signal that Para.Go is aligned with international development frameworks, which matters for institutional audiences.

---

### SECTION 10: ROADMAP (`#roadmap`)

**Eyebrow label:** `ROADMAP`

**Headline:**
```
Thesis to streets.
Here's the timeline.
```

A horizontal timeline on desktop, vertical on mobile. Four milestones:

```
[●] Aug 2025 – Apr 2026
    Development
    CIT-U Computer Engineering thesis. Built the IoT module, commuter app, 
    and driver console. Validated with 116 Metro Cebu commuters.

[●] May 2026
    Pilot Deployment
    Endorsed by Cebu City government. Live deployment with El Pardo 
    Transport Cooperative on Route 10M (Bulacao–SM City Cebu).

[●] June 2026  ← CURRENT
    B2B Operator Partnership Hunt
    Actively onboarding modern jeepney cooperatives across Metro Cebu. 
    Open Track Champion, Cebu SolutionsFest 2026.

[○] September 2026
    Full-Scale Commercial Rollout
    Full Metro Cebu deployment target. Integration with LTFRB compliance 
    systems and LGU urban mobility dashboards.
```

Style: a snaking road/path line (SVG) connecting the four nodes, each node a filled circle in gold (past) or outlined circle (future). The current milestone (June 2026) should have a pulsing gold ring. Labels above/below alternating on desktop.

---

### SECTION 11: BUSINESS MODEL — SUSTAINABILITY (`#model`)

**Eyebrow label:** `HOW IT SUSTAINS`

**Headline:**
```
Not just a product.
A platform.
```

Three column cards:

**Column 1: FinTech Micro-Transactions**
```
Every RFID tap generates a small processing fee. At 3.5 million daily 
trips, micro-transactions at scale become a significant, reliable 
revenue stream with near-zero marginal cost.
```

**Column 2: Hyper-Local B2B Advertising**
```
In-app advertising and on-vehicle LED board ad spaces give local 
Cebu businesses a captive transit audience. Every jeepney becomes 
a moving billboard with audience data behind it.
```

**Column 3: B2G Data Licensing**
```
Premium mobility analytics dashboards sold to LGUs, LTFRB, and urban 
planners. Live route demand data, peak hour mapping, and incident 
frequency — the kind of insight no transit system in Cebu has ever had.
```

Keep this section clean and minimal. No heavy charts. Just three cards with a header and body copy.

---

### SECTION 12: MAGIC PARTNERSHIPS (`#partners`)

**Eyebrow label:** `MAGIC PARTNERSHIPS`

**Headline:**
```
This isn't built alone.
It's built with Cebu.
```

**Body intro:**
```
Para.Go operates under the MAGIC partnership model — Government, Industry, 
and Public working together. We're currently in the CCCI SolutionsFest 
90-day adoption pipeline and in active conversations with DOST, DTI, 
and Cebu City transport agencies.
```

**Three MAGIC cards (only G, I, P represented from the pitch deck):**

**Government**
```
Local Government Units (LGUs) and national agencies: LTFRB, DOTr, DOST.
Outcome: Fast-tracks regulatory approvals, secures pilot funding, and 
integrates Para.Go into Cebu's smart city initiatives.
```

**Industry**
```
Transport operators, commercial companies, telecom providers, and fintech 
infrastructure companies. El Pardo Transport Cooperative (active partner).
Outcome: Accelerates real-world fleet deployment and enables e-wallet 
and payment infrastructure at scale.
```

**The Public**
```
Commuter advocacy groups, student organizations, senior citizen associations, 
and PWD groups.
Outcome: Drives community adoption, builds public trust, and ensures 
automated discount enforcement for all passenger categories.
```

Style: Each card has a large single letter (`G / I / P`) in gold display type, then the category name, then partner list, then outcome line.

**Partnership CTA below the cards:**
```
We are actively onboarding cooperatives and institutional partners 
for our September 2026 commercial rollout.

[Talk to the Team →]        [Download Partnership Deck →]
```

---

### SECTION 13: ORIGINS / STORY (`#origins`)

**Eyebrow label:** `HOW IT STARTED`

**Headline:**
```
From a thesis.
To the streets.
```

**Narrative:**
```
Para.Go started as a Computer Engineering thesis at Cebu Institute of 
Technology - University. The problem was local and specific: Cebu's 
jeepneys had no data. No seat counts. No cashless option. No way to 
know if a vehicle was full before it pulled up.

The team spent from August 2025 to April 2026 building everything — 
the IoT board, the firmware, the passenger app, the driver console, 
the cloud backend. The system was tested with real commuters on real 
Cebu routes. The data came back strong.

In May 2026, the system was deployed in a city-endorsed pilot. In 
June 2026, Para.Go won 1st place at Cebu SolutionsFest against 
professional startups and independent innovators.

This is what Cebuano engineering looks like.
```

**Photo grid — 2×2 layout:**

Four image slots. If actual photos exist in the repo assets, use them. If not, use a dark placeholder with a centered label in muted text — NO "💡 Tip:" messages anywhere.

```
Slot 1: IoT hardware module (label: "CIT-U Engineering Lab · ESP32 + RFID Module")
Slot 2: City Hall presentation (label: "Cebu City Hall · Presented to Mayor Archival")
Slot 3: SolutionsFest awarding (label: "Open Track Champion · Cebu SolutionsFest 2026")
Slot 4: Pilot commuter testing (label: "Route 10M Pilot · Bulacao–SM City Cebu")
```

**CRITICAL:** Remove ALL placeholder tip text from the existing codebase. Any string matching "💡 Tip" must be deleted.

---

### SECTION 14: DOWNLOAD THE APP (`#download`)

**A short standalone section:**

**Headline:** `Para.Go is live on Google Play.`

**Body:** `Download the commuter app and follow our jeepneys live. Available now.`

Show:
- A large Google Play badge (use the official SVG badge)
- A QR code image (use the one from the pitch deck if available in assets, or create a placeholder)
- A "Coming soon to iOS" note below in muted text

---

### SECTION 15: CONTACT / CTA (`#contact`)

**Eyebrow label:** `GET IN TOUCH`

**Headline:**
```
Let's bring Para.Go
to more routes.
```

**Four things the team needs (from the pitch deck CTA slide):**
Display these as four numbered items before the contact form:
```
1. Partnerships — Access to modern jeepney operators and cooperatives
2. Infrastructure — A dedicated innovation hub or lab space
3. Mentorship — Professional business and operations guidance
4. Funding — Capital for hardware deployment and commercial rollout
```

Style these as clean list items with gold numbering. NOT bullet points.

**Two-column below:**

Left — contact info:
- Email: `info@parago.ph`
- Location: `CIT-University, N. Bacalso Ave, Cebu City 6000`
- Facebook: [Para.Go Facebook Page](https://www.facebook.com/profile.php?id=61579400990238)

Right — contact form (HTML form):
```
Name:         [________________]
Organization: [________________]
Email:        [________________]
Message:      [________________]
              [Send Message    →]
```

Form style: dark input fields with `--color-border` border, focus ring in `--color-gold`, gold submit button with dark text, sentence-case labels above each field.

---

### SECTION 16: FOOTER

**Left:** Para.Go logo (`/parago-icon.png`) + tagline:
```
COMMUTE CEBU. SMARTER.
```
Below tagline: `Bridging Youth Innovation with Civic Impact`

**Center:** Quick nav — Home · Features · Tracker · Awards · Partners · Contact

**Right:** Social icons — Facebook (link to FB page), GitHub (optional)

**UN SDG badges — small row in footer:**
```
[SDG 3] [SDG 9] [SDG 11] [SDG 13]
```

**Bottom bar:**
```
© 2026 Para.Go — Smart Jeepney Monitoring and Commuter Information System
CIT-University Computer Engineering · El Pardo Transport Cooperative · Cebu City, Philippines
```

Remove "Home of the Technologians" from the footer entirely.

---

## GLOBAL DESIGN RULES

### Layout
- Max content width: 1200px, centered
- Section padding: `padding: clamp(4rem, 8vw, 7rem) 1.5rem`
- Card gap: `1.5rem` to `2rem`
- Use CSS Grid and Flexbox — no Bootstrap, no Tailwind, no heavy CSS frameworks unless already in the existing codebase

### DO
- Preserve every existing CSS variable found in the repo
- Use `Space Grotesk` for all headlines and display text
- Use `Inter` for body copy
- Animate stat counters with IntersectionObserver + vanilla JS (no library)
- Add `prefers-reduced-motion` media query around every animation
- Use `clamp()` for all responsive font sizes
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`, `<footer>`, `<h1>`–`<h3>`
- Every `<img>` needs `loading="lazy"` and a descriptive `alt` attribute
- Every section needs an `id` that matches the nav anchor link

### DO NOT
- Do NOT add blob gradient shapes (the purple and pink circles that float behind hero text on generic sites)
- Do NOT use `font-family: 'Poppins'`, `'Nunito'`, or `'Raleway'`
- Do NOT use 3-column grids with rocket, lightbulb, and star icons
- Do NOT use `box-shadow: 0 20px 60px rgba(0,0,0,0.5)` on every card
- Do NOT use `<marquee>` tags — replace with CSS `@keyframes scroll` if scrolling text is needed
- Do NOT use fake testimonials or made-up user reviews
- Do NOT use the words: *seamlessly, revolutionize, cutting-edge, leverage, robust, game-changer, empower, synergy, innovative solution, disruptive*
- Do NOT leave any placeholder tip text (`💡 Tip: ...`) visible
- Do NOT use Lottie, GSAP, Three.js, or any heavy animation library unless it already exists in the repo
- Do NOT use stock photo illustrations — use SVG icons from Heroicons, Lucide, or Phosphor

---

## COPY VOICE

Para.Go's copy voice is **specific, direct, and proud without being arrogant.** The team won a real competition and has real data. State facts plainly. Use numbers where you have them.

Rules:
- Sentence case for all headlines (not Title Case, not ALL CAPS — except eyebrow labels)
- Short paragraphs: 2–3 sentences maximum per block
- Be local: reference Cebu City, Route 10M, Bulacao, SM City Cebu, El Pardo Cooperative
- No filler words. "No real-time data" is better than "the absence of real-time data solutions"
- Active voice: "Para.Go calculates your fare" not "Fares are calculated by Para.Go"
- Numbers over adjectives: "3.5 million" is better than "millions of"

---

## ANIMATIONS — THREE ALLOWED, NOTHING ELSE

1. **Scroll fade-up:** Elements enter with `opacity: 0; transform: translateY(24px)` → `opacity: 1; transform: translateY(0)` over 400ms ease. Apply via IntersectionObserver. Use on: section headings, stat cards, feature cards, timeline nodes.

2. **Number counter:** Stats in Section 2 count up from 0 to their value over 1.5 seconds using `requestAnimationFrame`. Trigger on IntersectionObserver entry.

3. **Pulsing live indicator:** A CSS `@keyframes` pulse on the green ● dot in the tracker section. Radius expands and fades. Nothing else should pulse.

No parallax. No typing animations on the hero. No scroll-jacking. No full-page transitions.

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile-first */
@media (min-width: 640px)  { /* sm — 2-column adjustments */  }
@media (min-width: 1024px) { /* lg — full layout */           }
@media (min-width: 1280px) { /* xl — max-width 1200px cap */  }
```

All grids default to 1 column (mobile), switch to 2–3 columns at `lg`.

---

## FILES — PRESERVE ALL EXISTING ASSET PATHS

```
/parago-icon.png               — Logo (used in nav, hero, footer)
/phone-screenshot.png          — Commuter app mockup (used in hero)
/tablet-driver-dashboard.png   — Driver console mockup (fleet section)
/logo512.png                   — OG meta image
```

If you add new assets (SVG icons, etc.), place them in `/assets/`.

---

## FINAL CHECKLIST

Before delivering, verify every item:

- [ ] All placeholder `💡 Tip:` text removed from the entire codebase
- [ ] Top announcement banner shows SolutionsFest 2026 win
- [ ] Award badge visible in the hero section, above the headline
- [ ] Awards section exists as its own prominent section
- [ ] Stats bar has animated counters (3.5M, 60%, 4, SDGs)
- [ ] Competitor comparison table is present with Para.Go as the clear winner column
- [ ] Roadmap timeline section exists with current milestone highlighted
- [ ] Beneficiaries section exists (Commuters, Operators, LGUs)
- [ ] Business model / revenue streams section exists
- [ ] MAGIC partnerships section updated with correct content
- [ ] Fare estimator widget is functional (slider → live fare output)
- [ ] Google Play badge and app download section present
- [ ] All nav links scroll to correct section IDs
- [ ] Mobile navigation works
- [ ] Footer does not contain "Home of the Technologians"
- [ ] Copy contains zero instances of: seamlessly, revolutionize, cutting-edge, leverage, robust, game-changer
- [ ] UN SDG badges appear in the awards section and footer
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Table is mobile-scrollable
- [ ] No broken placeholder images visible to end users
- [ ] Google Play badge links to the actual Play Store listing (use correct URL when known)

---

## REFERENCE LINKS

- **Live site:** https://parago.top/
- **Website repo:** https://github.com/SirLKFD/Para.Go-Website.git
- **Passenger app repo:** https://github.com/SirLKFD/Para.Go-Passenger.git
- **Driver app repo:** https://github.com/SirLKFD/Para.Go-Driver.git
- **IoT firmware repo:** https://github.com/SirLKFD/Para.Go-IOT.git
- **Facebook page:** https://www.facebook.com/profile.php?id=61579400990238
- **Competition:** Cebu SolutionsFest 2026 by CCCI — Open Track, 1st Place Champion, ₱50,000 prize

---

## BRAND SUMMARY (Quick Reference)

```
Product name:    Para.Go (with the >>> chevrons as logo suffix)
Tagline 1:       COMMUTE CEBU. SMARTER.
Tagline 2:       Bridging Youth Innovation with Civic Impact
Colors:          Deep purple background + Gold/yellow primary + Orange gradient accent
Typography:      Space Grotesk (display) + Inter (body) + JetBrains Mono (data)
Key numbers:     3.5M daily trips · 60% public transport dependent · Route 10M pilot
Current status:  B2B Operator Partnership Hunt (June 2026)
Rollout target:  September 2026
Won:             Open Track Champion, Cebu SolutionsFest 2026, CCCI
Partners:        El Pardo Transport Cooperative, Cebu City government, CIT-U
Needs:           Operator partnerships · Innovation hub · Mentorship · Funding
```

---

*Para.Go Website Redesign Brief v2 — June 2026*
*CIT-University Computer Engineering Graduates · Cebu City, Philippines*

// Source of truth for real project imagery. Every entry is a genuine screenshot supplied by the owner.
// Coordinates are in the 2000px-wide preview space used while inspecting (x1,y1,x2,y2); the pipeline
// scales them to the original 2940px width. Regions are pixelated in the PRODUCTION copy only.
// Excluded on purpose: kavya 'trip summary.png' (its "Completed 0" card reads as a result). Original is kept in assets/.
// Delete a region to ship that detail unredacted (only with the client's permission).

const AVATAR_TOP_RIGHT = [1918, 6, 1976, 62]
const PROFILE_BOTTOM_LEFT = [16, 1020, 172, 1072]

export const SCREENSHOTS = {
  yamini: [
    {
      file: 'gps page.png',
      name: 'yamini-gps-live-tracking',
      role: 'hero',
      title: 'Live tracking',
      alt: 'Yamini Infotech admin app, Live Tracking page: field-team list, satellite map and a per-employee status panel (employee identities pixelated)',
      caption: 'LIVE TRACKING · FIELD TEAM, MAP AND STATUS PANEL',
      redact: [
        AVATAR_TOP_RIGHT, PROFILE_BOTTOM_LEFT,
        [338, 452, 630, 598], [1558, 290, 1792, 358], [1243, 520, 1362, 705],
        [1728, 602, 1952, 628], [344, 1010, 470, 1034], [1030, 896, 1152, 924],
      ],
    },
    {
      file: 'attendance page.png',
      name: 'yamini-attendance',
      role: 'detail',
      title: 'Attendance',
      alt: 'Yamini Infotech admin app, Attendance Management page: on-time, late and absent counts with a per-employee table (employee names pixelated)',
      caption: 'ATTENDANCE MANAGEMENT · STATUS PER EMPLOYEE',
      redact: [AVATAR_TOP_RIGHT, PROFILE_BOTTOM_LEFT, [424, 492, 625, 1087], [772, 972, 1060, 1014]],
    },
    {
      file: 'main dashboard.png',
      name: 'yamini-erp-dashboard',
      role: 'support',
      title: 'ERP dashboard',
      alt: 'Yamini Infotech admin app dashboard: enquiries, complaints, salesmen and revenue cards with recent enquiries and service escalations (customer names pixelated)',
      caption: 'ERP DASHBOARD · ENQUIRIES AND SERVICE ESCALATIONS',
      redact: [AVATAR_TOP_RIGHT, PROFILE_BOTTOM_LEFT, [498, 582, 745, 962], [1384, 582, 1545, 968]],
    },
  ],
  kavya: [
    {
      file: 'live tracking.png',
      name: 'kavya-fleet-live-tracking',
      role: 'hero',
      title: 'Fleet tracking',
      alt: 'Kavya Transports fleet-management app, Live Tracking page: vehicle list, map of vehicle positions across South India and a vehicle detail panel (vehicle registrations pixelated)',
      caption: 'FLEET TRACKING · VEHICLE LIST, MAP AND DETAIL PANEL',
      redact: [[372, 372, 520, 1000], [1660, 378, 1870, 414], [1855, 766, 1965, 852], [1378, 984, 1500, 1012]],
    },
    {
      file: ' dashboard.png',
      name: 'kavya-fleet-dashboard',
      role: 'support',
      title: 'Fleet dashboard',
      alt: 'Kavya Transports fleet-management app dashboard: vehicles, active trips, drivers and pending LRs with suggested actions',
      caption: 'FLEET DASHBOARD · VEHICLES, TRIPS, DRIVERS',
      redact: [],
    },
    {
      file: 'vehicles.png',
      name: 'kavya-vehicles',
      role: 'support',
      title: 'Vehicles',
      alt: 'Kavya Transports fleet-management app, Vehicles page: vehicle list with make, type, ownership, status and odometer (registration numbers pixelated)',
      caption: 'VEHICLES · FLEET MASTER LIST',
      redact: [180, 277, 373, 470, 566, 663, 759, 856, 953, 1049].map(y => [470, y - 16, 612, y + 16]),
    },
  ],
  uzhavan: [],
}

// Verified logos. Plates are light because several marks have dark outlines or text.
export const LOGOS = [
  { file: 'yamini-logo.png', name: 'yamini', owner: 'Yamini Infotech', alt: 'Yamini Infotech logo' },
  { file: 'kavyalogo.png', name: 'kavya', owner: 'Kavya Transports', alt: 'Kavya Transports logo' },
  { file: 'uzhavan-logo.png', name: 'uzhavan', owner: 'UZHAVAN AI', alt: 'UzhavaAI logo' },
  { file: 'karunya.png', name: 'karunya', owner: 'Karunya Institute of Technology and Sciences', alt: 'Karunya logo' },
  { file: 'life_changers_ind.jpeg', name: 'lifechangersind', owner: 'LifeChangersInd', alt: 'LifeChangersInd logo' },
]

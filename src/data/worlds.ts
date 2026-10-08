// Story content for the three project worlds.
// Evidence rule: every claim is tagged. Source meanings:
//   resume  = Resume.pdf
//   owner   = stated by Ajai in the project brief
//   concept = explanatory definition of a named concept; describes the mechanism,
//             not a claim about implementation details. Always shown next to a SIMULATION label.
// NOT usable: text from the earlier localhost case-study PDFs (they are exports of this
// site's own previous pages, not independent documentation).

export type ClaimSource = 'resume' | 'owner' | 'concept'

export interface Claim {
  id: string
  label: string
  text: string
  source: ClaimSource
}

export interface Beat {
  key: 'PROBLEM' | 'SYSTEM' | 'CHALLENGE' | 'SOLUTION' | 'RESULT'
  text: string
  source: ClaimSource
}

export const yamini = {
  beats: [
    {
      key: 'PROBLEM',
      text: 'A business client needed workforce management, service operations and CRM in one system, with GPS live tracking and attendance for people working in the field.',
      source: 'resume',
    },
    {
      key: 'SYSTEM',
      text: 'A Python / FastAPI backend on PostgreSQL, a Flutter mobile app and a React web client. MongoDB holds the GPS tracking data.',
      source: 'resume',
    },
    {
      key: 'CHALLENGE',
      text: 'Field GPS is messy: apps get backgrounded, connectivity drops, and a continuous stream has to become meaningful routes and attendance.',
      source: 'concept',
    },
    {
      key: 'SOLUTION',
      text: 'GPS live tracking, attendance management, CRM and service-operations modules, with route segmentation covered by automated tests.',
      source: 'resume',
    },
    {
      key: 'RESULT',
      text: 'Documented: 247+ field employees on GPS tracking and attendance, and 178+ automated tests (13 route-segmentation unit tests + 165 regression tests).',
      source: 'owner',
    },
  ] as Beat[],
  engineering: [
    { id: 'background-gps', label: 'BACKGROUND GPS', text: 'Location capture that has to keep working when the app is not in the foreground.', source: 'owner' },
    { id: 'auth-lifecycle', label: 'AUTHENTICATION LIFECYCLE', text: 'JWT sessions across the mobile and web clients: issue, refresh and expiry.', source: 'owner' },
    { id: 'offline-queue', label: 'OFFLINE GPS QUEUE', text: 'Points recorded without connectivity are held locally and synced when the connection returns.', source: 'owner' },
    { id: 'route-segmentation', label: 'ROUTE SEGMENTATION', text: 'Turning a continuous GPS stream into travel, stop and deviation segments. 13 unit tests cover it.', source: 'owner' },
    { id: 'high-frequency-writes', label: 'HIGH-FREQUENCY WRITES', text: 'Storing frequent GPS writes from the field workforce.', source: 'owner' },
    { id: 'geofence-attendance', label: 'GEOFENCE ATTENDANCE', text: 'Attendance driven by entering and leaving defined zones.', source: 'owner' },
  ] as Claim[],
  architecture: {
    nodes: [
      { id: 'flutter', label: 'FLUTTER APP', group: 'client' },
      { id: 'react', label: 'REACT WEB', group: 'client' },
      { id: 'api', label: 'FASTAPI', group: 'core' },
      { id: 'auth', label: 'AUTH', group: 'module' },
      { id: 'attendance', label: 'ATTENDANCE', group: 'module' },
      { id: 'gps', label: 'GPS', group: 'module' },
      { id: 'ops', label: 'OPERATIONS', group: 'module' },
      { id: 'pg', label: 'POSTGRESQL', group: 'store' },
      { id: 'mongo', label: 'MONGODB · GPS DATA', group: 'store' },
    ],
    edges: [
      ['flutter', 'api'], ['react', 'api'],
      ['api', 'auth'], ['api', 'attendance'], ['api', 'gps'], ['api', 'ops'],
      ['api', 'pg'], ['gps', 'mongo'],
    ] as [string, string][],
    note: 'Datastores follow the resume: PostgreSQL for the ERP, MongoDB for GPS tracking data.',
  },
}

export const kavya = {
  beats: [
    {
      key: 'PROBLEM',
      text: 'A transport business needed vehicle tracking, trip monitoring, billing and day-to-day transport operations on one platform.',
      source: 'resume',
    },
    {
      key: 'SYSTEM',
      text: 'A Python / FastAPI backend with async SQLAlchemy, a React / TypeScript web client and a Flutter app. PostgreSQL holds fleet data, MongoDB holds GPS and log data, Redis handles caching, and Celery and APScheduler run background jobs. WebSockets carry real-time updates, access uses JWT with role-based permissions, documents go to AWS S3, and a pytest suite covers the backend.',
      source: 'owner',
    },
    {
      key: 'SOLUTION',
      text: 'REST endpoints and a relational schema for fleet operations, with real-time updates pushed over WebSockets.',
      source: 'resume',
    },
    {
      key: 'RESULT',
      text: 'Built January to May 2026. No usage metrics are published for this project.',
      source: 'resume',
    },
  ] as Beat[],
  capabilities: [
    { id: 'gps', label: 'REAL-TIME GPS', text: 'Vehicle positions flowing from GPS devices to the platform, with real-time updates over WebSockets.', source: 'resume' },
    { id: 'trips', label: 'TRIP MANAGEMENT', text: 'Trip monitoring for the fleet.', source: 'resume' },
    { id: 'routes', label: 'ROUTE INTELLIGENCE', text: 'Route information derived from recorded GPS data.', source: 'owner' },
    { id: 'dashboard', label: 'FLEET DASHBOARD', text: 'One operations view over vehicles and trips.', source: 'owner' },
    { id: 'drivers', label: 'DRIVER OPERATIONS', text: 'Driver-side operations in the transport workflow.', source: 'owner' },
    { id: 'logistics', label: 'LOGISTICS DATA', text: 'Billing and transport-operations records.', source: 'resume' },
  ] as Claim[],
  flow: [
    { id: 'device', label: 'GPS DEVICE' },
    { id: 'api', label: 'BACKEND API' },
    { id: 'modules', label: 'VEHICLES · TRIPS · ROUTES · DASHBOARD' },
    { id: 'db', label: 'POSTGRESQL · MONGODB' },
  ],
}

export const uzhavan = {
  status: 'IN DEVELOPMENT',
  beats: [
    {
      key: 'PROBLEM',
      text: 'Farm advice should be in Tamil and grounded in local agricultural knowledge, weather and crop conditions, not generic guidance.',
      source: 'resume',
    },
    {
      key: 'SYSTEM',
      text: 'A Tamil-first agricultural decision-support system combining TNAU-grounded knowledge, weather-aware recommendations, crop and disease intelligence, and agricultural scheme information retrieval.',
      source: 'resume',
    },
    {
      key: 'SOLUTION',
      text: 'ML pipelines for crop classification and yield prediction, developed and evaluated.',
      source: 'resume',
    },
    {
      key: 'RESULT',
      text: 'F1 = 0.839 for crop classification and RMSE = 749 kg/ha for yield prediction. Still in development: no deployment, user or coverage figures are published.',
      source: 'resume',
    },
  ] as Beat[],
  metrics: [
    { value: '0.839', label: 'F1 · CROP CLASSIFICATION', source: 'resume' as ClaimSource },
    { value: '749', label: 'RMSE · KG/HA · YIELD PREDICTION', source: 'resume' as ClaimSource },
  ],
  inputs: [
    { id: 'crop', label: 'CROP', ta: 'பயிர்' },
    { id: 'leaf', label: 'LEAF', ta: 'இலை' },
    { id: 'weather', label: 'WEATHER', ta: 'வானிலை' },
    { id: 'ask', label: 'ASK IN TAMIL', ta: 'தமிழில் கேளுங்கள்' },
  ],
  pipeline: [
    { id: 'input', label: 'FARMER INPUT' },
    { id: 'api', label: 'FASTAPI' },
    { id: 'vision', label: 'VISION' },
    { id: 'nlp', label: 'NLP' },
    { id: 'weather', label: 'WEATHER' },
    { id: 'knowledge', label: 'CROP KNOWLEDGE' },
    { id: 'llm', label: 'LLM' },
    { id: 'out', label: 'TAMIL RESPONSE' },
  ],
}

export type WorldId = 'yamini' | 'kavya' | 'uzhavan'

export const worldTheme: Record<WorldId, { bg: string; accent: string; line: string; label: string }> = {
  yamini: { bg: '#060a05', accent: '#B8FF3D', line: 'rgba(184,255,61,0.18)', label: 'OPERATIONS' },
  kavya: { bg: '#04070d', accent: '#4DE8FF', line: 'rgba(77,232,255,0.18)', label: 'FLEET' },
  uzhavan: { bg: '#0a0803', accent: '#D8B35A', line: 'rgba(216,179,90,0.2)', label: 'FIELD' },
}

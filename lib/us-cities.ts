/** [longitude, latitude] for react-simple-maps */
export type Coordinates = [number, number];

const STATE_CENTROIDS: Record<string, Coordinates> = {
  AL: [-86.8, 32.8],
  AK: [-152.4, 64.2],
  AZ: [-111.7, 34.3],
  AR: [-92.4, 34.8],
  CA: [-119.4, 36.8],
  CO: [-105.5, 39.0],
  CT: [-72.7, 41.6],
  DE: [-75.5, 39.0],
  DC: [-77.0, 38.9],
  FL: [-81.5, 28.6],
  GA: [-83.4, 32.6],
  HI: [-157.8, 21.3],
  ID: [-114.7, 44.1],
  IL: [-89.4, 40.0],
  IN: [-86.3, 39.8],
  IA: [-93.1, 42.0],
  KS: [-98.5, 38.5],
  KY: [-84.9, 37.8],
  LA: [-91.9, 30.9],
  ME: [-69.4, 45.3],
  MD: [-76.8, 39.0],
  MA: [-71.5, 42.4],
  MI: [-84.5, 44.3],
  MN: [-94.2, 46.3],
  MS: [-89.7, 32.7],
  MO: [-92.6, 38.5],
  MT: [-110.4, 47.0],
  NE: [-99.9, 41.5],
  NV: [-117.0, 39.3],
  NH: [-71.6, 43.2],
  NJ: [-74.7, 40.1],
  NM: [-106.0, 34.5],
  NY: [-75.0, 43.0],
  NC: [-79.0, 35.5],
  ND: [-100.5, 47.5],
  OH: [-82.8, 40.4],
  OK: [-97.5, 35.5],
  OR: [-120.5, 44.0],
  PA: [-77.2, 41.2],
  RI: [-71.5, 41.7],
  SC: [-80.9, 33.8],
  SD: [-100.2, 44.4],
  TN: [-86.6, 35.8],
  TX: [-99.9, 31.5],
  UT: [-111.9, 39.3],
  VT: [-72.7, 44.1],
  VA: [-78.7, 37.5],
  WA: [-120.7, 47.4],
  WV: [-80.6, 38.6],
  WI: [-89.6, 44.6],
  WY: [-107.3, 43.0],
};

const CITY_LOOKUP: Record<string, Coordinates> = {
  "new york,ny": [-74.006, 40.7128],
  "los angeles,ca": [-118.2437, 34.0522],
  "chicago,il": [-87.6298, 41.8781],
  "houston,tx": [-95.3698, 29.7604],
  "phoenix,az": [-112.074, 33.4484],
  "philadelphia,pa": [-75.1652, 39.9526],
  "san antonio,tx": [-98.4936, 29.4241],
  "san diego,ca": [-117.1611, 32.7157],
  "dallas,tx": [-96.797, 32.7767],
  "austin,tx": [-97.7431, 30.2672],
  "jacksonville,fl": [-81.6557, 30.3322],
  "san francisco,ca": [-122.4194, 37.7749],
  "seattle,wa": [-122.3321, 47.6062],
  "denver,co": [-104.9903, 39.7392],
  "nashville,tn": [-86.7816, 36.1627],
  "boston,ma": [-71.0589, 42.3601],
  "las vegas,nv": [-115.1398, 36.1699],
  "portland,or": [-122.6765, 45.5152],
  "detroit,mi": [-83.0458, 42.3314],
  "atlanta,ga": [-84.388, 33.749],
  "miami,fl": [-80.1918, 25.7617],
  "minneapolis,mn": [-93.265, 44.9778],
  "cleveland,oh": [-81.6944, 41.4993],
  "pittsburgh,pa": [-79.9959, 40.4406],
  "st. louis,mo": [-90.1994, 38.627],
  "saint louis,mo": [-90.1994, 38.627],
  "kansas city,mo": [-94.5786, 39.0997],
  "indianapolis,in": [-86.1581, 39.7684],
  "charlotte,nc": [-80.8431, 35.2271],
  "orlando,fl": [-81.3792, 28.5383],
  "tampa,fl": [-82.4572, 27.9506],
  "new orleans,la": [-90.0715, 29.9511],
  "salt lake city,ut": [-111.891, 40.7608],
  "milwaukee,wi": [-87.9065, 43.0389],
  "raleigh,nc": [-78.6382, 35.7796],
  "columbus,oh": [-82.9988, 39.9612],
  "cincinnati,oh": [-84.512, 39.1031],
  "washington,dc": [-77.0369, 38.9072],
  "baltimore,md": [-76.6122, 39.2904],
  "memphis,tn": [-90.049, 35.1495],
  "louisville,ky": [-85.7585, 38.2527],
  "oklahoma city,ok": [-97.5164, 35.4676],
  "hartford,ct": [-72.6851, 41.7658],
  "buffalo,ny": [-78.8784, 42.8864],
  "richmond,va": [-77.436, 37.5407],
  "birmingham,al": [-86.8025, 33.5186],
  "honolulu,hi": [-157.8583, 21.3069],
  "anchorage,ak": [-149.9003, 61.2181],
  "boise,id": [-116.2023, 43.615],
  "omaha,ne": [-95.9345, 41.2565],
  "des moines,ia": [-93.6091, 41.5868],
  "madison,wi": [-89.4012, 43.0731],
  "providence,ri": [-71.4128, 41.824],
  "brooklyn,ny": [-73.9442, 40.6782],
  "manhattan,ny": [-73.9712, 40.7831],
};

function cityKey(city: string, state: string) {
  return `${city.trim().toLowerCase()},${state.trim().toUpperCase()}`;
}

export function hasExactCity(city: string | null, state: string | null): boolean {
  if (!city || !state) return false;
  return Boolean(CITY_LOOKUP[cityKey(city, state)]);
}

export function getConcertCoordinates(
  city: string | null,
  state: string | null,
  index = 0
): Coordinates | null {
  if (!state) return null;
  const code = state.trim().toUpperCase();

  if (city) {
    const key = cityKey(city, code);
    const exact = CITY_LOOKUP[key];
    if (exact) {
      return jitter(exact, index);
    }
  }

  const centroid = STATE_CENTROIDS[code];
  if (!centroid) return null;
  return jitter(centroid, index);
}

function jitter([lng, lat]: Coordinates, index: number): Coordinates {
  const offset = index * 0.35;
  return [lng + offset * 0.15, lat + offset * 0.08];
}

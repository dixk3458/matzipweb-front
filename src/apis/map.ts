import axios from 'axios';

async function getAddress(lat: number, lng: number) {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address|route|political&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ko`
  );

  return data;
}

export { getAddress };

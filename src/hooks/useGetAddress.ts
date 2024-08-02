import { useEffect, useState } from 'react';
import messages from '../constants/messages';
import { getAddress } from '../apis';

function useGetAddress(location: google.maps.LatLngLiteral) {
  const { lat, lng } = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getAddress(lat, lng); 

        const address = data.results.length
          ? data.results[0].formatted_address
          : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult(messages.CANT_NOT_GET_ADDRESS);
      }
    })();
  }, [lat, lng]);

  return result;
}

export default useGetAddress;

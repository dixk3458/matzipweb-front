import { useEffect, useState } from 'react';
import messages from '../constants/messages';
import { getAddress } from '../apis';

function useGetAddress(location: google.maps.LatLngLiteral | null) {
  const [result, setResult] = useState('주소를 불러올 수 없습니다.');

  useEffect(() => {
    if (location) {
      const { lat, lng } = location;

      (async () => {
        try {
          const data = await getAddress(lat, lng);

          const address = data.results.length
            ? data.results[0].formatted_address
            : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

          setResult(address);
        } catch (error) {
          setResult(messages.CAN_NOT_GET_ADDRESS);
        }
      })();
    }
  }, [location]);

  return result;
}

export default useGetAddress;

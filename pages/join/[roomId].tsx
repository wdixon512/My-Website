import { DMHelperContextProvider } from '@lib/components/contexts/DMHelperContext';
import JoinRoomPage from '@lib/components/dm-helper/JoinRoomPage';

export function JoinRoom({ Component, pageProps }) {
  return (
    <DMHelperContextProvider>
      <JoinRoomPage />
    </DMHelperContextProvider>
  );
}

export default JoinRoom;

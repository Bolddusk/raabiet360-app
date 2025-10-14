import { useEffect } from 'react';
import ScreenGuardModule from 'react-native-screenguard';

const useScreenProtection = () => {
  useEffect(() => {
    const enableProtection = async () => {
      try {
        await ScreenGuardModule.register({
          backgroundColor: '#000000',
          timeAfterResume: 2000,
        });

        const unsubscribeRecording =
          ScreenGuardModule.registerScreenRecordingEventListener(false, () => {

          });

        return () => {
          unsubscribeRecording?.();
        };
      } catch (error) {
        console.log('Screen protection error:', error);
      }
    };

    enableProtection();

    return () => {
      ScreenGuardModule.unregister();
    };
  }, []);
};

export default useScreenProtection;

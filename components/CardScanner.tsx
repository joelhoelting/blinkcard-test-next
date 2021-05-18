import { useEffect, useRef } from 'react';
import * as BlinkCardSDK from '@microblink/blinkcard-in-browser-sdk';

export const isScannerAvailable = BlinkCardSDK.isBrowserSupported();

// localhost
// sRwAAAYJbG9jYWxob3N0r/lOPmg/w35CpOHWK+o5YN90QAi2XHJp/VoWzkCkzRGDNoXNS8cgkEYvMmeViNQjINvPBsbMFjDfjeeaLimUXEH3ONhyJtBfsxBd1yZXVpi3qqtFXSje7xcYDbgWMLqvrZ44OhlQIoYaTwP+u7ZowHsvO/cRKiSHaheMnmLnGkBAKp2UanYRlLUaBF+fSfOFHzBfBQMjX6DHrqQPskItGz9xPHZpftzSeE/hnqoI4g==

// joel-hoelting-macbook-pro.local
// sRwAAAYfam9lbC1ob2VsdGluZy1tYWNib29rLXByby5sb2NhbBHEkda9lDGk/qQU1mKvOiOGuDUHfB1D98VNEc58JmaaeKdsTSRYDSqsSYXcwL25daEqxb82zFO3HhvgvGGEEwBGISMiIRG9xfj3NzuWRifpxDi3U5FJIJZLE2cHbYgcCfUaLULjhxqJyoyUsXAZy4GG11M/v7PLKxQg280P6uoLV+PNq85kxvED1M+csmlnKdcKIHndfbVQEDhw+hVFLkxPxKKA5kEKERXdWKT3QRg=

// dev-customer.flo.io
// sRwAAAYTZGV2LWN1c3RvbWVyLmZsby5pb3qsr6s+Tnkq1VNPr1Z2in4i+bZNZ3u/p9IXL2A8RMA0N+z0Ye1RmilyIdVrxvfL69eizpyVkj/uEdy2gL/drZxqH/p5U4wW3HKE342YyYhGHkSfarx+Lkf4zSTZTj+dLU7NY13nlI7+Vd90GvY8spCqMPOaLS0vnYeLb2iSABsjKo7iltFhZsisy2pJ7mcRrnWyGVabqMJNpfpxGB1rZTmU7FEEQWTBLKn035O0liQ=

// blinkcard.joelhoelting.com
// sRwAAAYaYmxpbmtjYXJkLmpvZWxob2VsdGluZy5jb20J4seuEgIka/UkWLMV+fjKO2Taepm/iiRoyG7H9OY6s6ihLeGkc9KZTXNRTQTvQ2Aaf6W/+x0jXBfu6z7zBNhJivRnv4ONXQr4U3BZy3HGXnACw104lhhfQjgvdTnK+0DZMtuWPR3jO1hbLKNEoskdxDGjhZbbf/Wo2ABrnvgyzW5kSJuN4Rnbsjl5smpqw6M5VrnvvK1o+xuAm+Jt/7GSF5D7iMJ3cejg/eg9C2AT

const licenseMap = {
  localhost:
    'sRwAAAYJbG9jYWxob3N0r/lOPmg/w35CpOHWK+o5YN90QAi2XHJp/VoWzkCkzRGDNoXNS8cgkEYvMmeViNQjINvPBsbMFjDfjeeaLimUXEH3ONhyJtBfsxBd1yZXVpi3qqtFXSje7xcYDbgWMLqvrZ44OhlQIoYaTwP+u7ZowHsvO/cRKiSHaheMnmLnGkBAKp2UanYRlLUaBF+fSfOFHzBfBQMjX6DHrqQPskItGz9xPHZpftzSeE/hnqoI4g==',
  'joel-hoelting-macbook-pro.local':
    'sRwAAAYfam9lbC1ob2VsdGluZy1tYWNib29rLXByby5sb2NhbBHEkda9lDGk/qQU1mKvOiOGuDUHfB1D98VNEc58JmaaeKdsTSRYDSqsSYXcwL25daEqxb82zFO3HhvgvGGEEwBGISMiIRG9xfj3NzuWRifpxDi3U5FJIJZLE2cHbYgcCfUaLULjhxqJyoyUsXAZy4GG11M/v7PLKxQg280P6uoLV+PNq85kxvED1M+csmlnKdcKIHndfbVQEDhw+hVFLkxPxKKA5kEKERXdWKT3QRg=',
  'dev-customer.flo.io':
    'sRwAAAYTZGV2LWN1c3RvbWVyLmZsby5pb3qsr6s+Tnkq1VNPr1Z2in4i+bZNZ3u/p9IXL2A8RMA0N+z0Ye1RmilyIdVrxvfL69eizpyVkj/uEdy2gL/drZxqH/p5U4wW3HKE342YyYhGHkSfarx+Lkf4zSTZTj+dLU7NY13nlI7+Vd90GvY8spCqMPOaLS0vnYeLb2iSABsjKo7iltFhZsisy2pJ7mcRrnWyGVabqMJNpfpxGB1rZTmU7FEEQWTBLKn035O0liQ=',
  'blinkcard.joelhoelting.com':
    'sRwAAAYaYmxpbmtjYXJkLmpvZWxob2VsdGluZy5jb20J4seuEgIka/UkWLMV+fjKO2Taepm/iiRoyG7H9OY6s6ihLeGkc9KZTXNRTQTvQ2Aaf6W/+x0jXBfu6z7zBNhJivRnv4ONXQr4U3BZy3HGXnACw104lhhfQjgvdTnK+0DZMtuWPR3jO1hbLKNEoskdxDGjhZbbf/Wo2ABrnvgyzW5kSJuN4Rnbsjl5smpqw6M5VrnvvK1o+xuAm+Jt/7GSF5D7iMJ3cejg/eg9C2AT',
};

const engineLocationMap = {
  localhost: 'http://localhost:3000',
  'joel-hoelting-macbook-pro.local': 'http://joel-hoelting-macbook-pro.local:3000/',
  'dev-customer.flo.io': 'dev-customer.flo.io',
  'blinkcard.joelhoelting.com': 'https://blinkcard.joelhoelting.com',
};

type CardScannerProps = {
  active: boolean;
  handleCancelScan: () => void;
  handleScanResults: (results: { cardNumber: string }) => void;
};

const CardScanner: React.FC<CardScannerProps> = ({ active, handleCancelScan, handleScanResults }) => {
  const blinkWasmSDK = useRef<BlinkCardSDK.WasmSDK | null>(null);
  const cameraFeed = useRef<HTMLVideoElement>(null);

  const recognizer = useRef<BlinkCardSDK.BlinkCardRecognizer | null>(null);
  const recognizerRunner = useRef<BlinkCardSDK.RecognizerRunner | null>(null);
  const videoRecognizer = useRef<BlinkCardSDK.VideoRecognizer | null>(null);

  useEffect(() => {
    if (!BlinkCardSDK.isBrowserSupported()) {
      return;
    }

    if (active && blinkWasmSDK.current) {
      startScan();
      return;
    }

    if (active && !blinkWasmSDK.current) {
      const blinkLicense = licenseMap[window.location.hostname];
      console.log(licenseMap[window.location.hostname]);
      const loadSettings = new BlinkCardSDK.WasmSDKLoadSettings(blinkLicense);

      // loadSettings.allowHelloMessage = false;
      console.log(`${engineLocationMap[window.location.hostname]}/blinkcard`);
      loadSettings.engineLocation = `${engineLocationMap[window.location.hostname]}/blinkcard`;

      BlinkCardSDK.loadWasmModule(loadSettings).then(
        (wasmSDK: BlinkCardSDK.WasmSDK) => {
          blinkWasmSDK.current = wasmSDK;
          startScan();
          // The SDK was initialized successfully, save the wasmSDK for future use
        },
        (error: any) => {
          // Error happened during the initialization of the SDK
          console.log('Error during the initialization of the SDK!', error);
          handleScanResults({ cardNumber: '' });
        }
      );
    }

    // if (cameraFeedback.current) {
    //   drawContext.current = cameraFeedback.current.getContext('2d') as CanvasRenderingContext2D;
    // } else {
    //   alert('Failed to set draw context');
    // }
  }, [active]);

  const startScan = async () => {
    console.log('trigger');
    if (blinkWasmSDK.current && cameraFeed.current) {
      recognizer.current = await BlinkCardSDK.createBlinkCardRecognizer(blinkWasmSDK.current);

      const callbacks = {
        onQuadDetection: (quad: BlinkCardSDK.DisplayableQuad) => console.log('quad detected'),
        onFirstSideResult: () => alert('Flip the document'),
      };

      recognizerRunner.current = await BlinkCardSDK.createRecognizerRunner(
        // SDK instance to use
        blinkWasmSDK.current,
        // List of recognizer objects that will be associated with created RecognizerRunner object
        [recognizer.current],
        // [OPTIONAL] Should recognition pipeline stop as soon as first recognizer in chain finished recognition
        false,
        // [OPTIONAL] Callbacks object that will receive recognition events
        callbacks
      );

      try {
        videoRecognizer.current = await BlinkCardSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
          cameraFeed.current,
          recognizerRunner.current
        );
        const processResult = await videoRecognizer.current.recognize();
        if (processResult !== BlinkCardSDK.RecognizerResultState.Empty) {
          const recognitionResult = await recognizer.current.getResult();
          handleScanResults(recognitionResult);
        } else {
          console.log('Recognition was not successful!');
        }

        videoRecognizer.current.releaseVideoFeed();
        recognizerRunner.current.delete();
        recognizer.current.delete();

        // To obtain recognition results see next step
      } catch (error) {
        if (error.name === 'VideoRecognizerError') {
          // Reason is of type BlinkCardSDK.NotSupportedReason and contains information why video
          // recognizer could not be used. Usually this happens when user didn't grant access to a
          // camera or when a hardware or OS error occurs.
          const reason = (error as BlinkCardSDK.VideoRecognizerError).reason;
          console.error(reason);
        }

        recognizerRunner.current.delete();
        recognizer.current.delete();
      }
    }
  };

  const stopScan = () => {
    recognizerRunner.current?.delete();
    recognizer.current?.delete();
    handleCancelScan();
  };

  return (
    <div className={`card-scanner ${active && 'active'}`}>
      <button className="otg-close close-icon cursor-pointer" onClick={stopScan}>
        x
      </button>
      <video ref={cameraFeed} playsInline />
      <div className="rectangle-container">
        <div className="box wrapper"></div>
        <div className="box body">
          <div className="middle-left"></div>
          <div className="rectangle">
            <div className="rectangle__guides">
              <div className="rectangle__el" />
              <div className="rectangle__el" />
              <div className="rectangle__el" />
              <div className="rectangle__el" />
            </div>
          </div>
          <div className="middle-right"></div>
        </div>
        <div className="box wrapper"></div>
      </div>
    </div>
  );
};

export default CardScanner;

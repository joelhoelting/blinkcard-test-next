import { useEffect, useRef, useState } from 'react';
import * as BlinkCardSDK from '@microblink/blinkcard-in-browser-sdk';

// localhost
// sRwAAAYJbG9jYWxob3N0r/lOPmg/w35CpOHWK+o5YN90QAi2XHJp/VoWzkCkzRGDNoXNS8cgkEYvMmeViNQjINvPBsbMFjDfjeeaLimUXEH3ONhyJtBfsxBd1yZXVpi3qqtFXSje7xcYDbgWMLqvrZ44OhlQIoYaTwP+u7ZowHsvO/cRKiSHaheMnmLnGkBAKp2UanYRlLUaBF+fSfOFHzBfBQMjX6DHrqQPskItGz9xPHZpftzSeE/hnqoI4g==
// joel-hoelting-macbook-pro.local
// sRwAAAYfam9lbC1ob2VsdGluZy1tYWNib29rLXByby5sb2NhbBHEkda9lDGk/qQU1mKvOiOGuDUHfB1D98VNEc58JmaaeKdsTSRYDSqsSYXcwL25daEqxb82zFO3HhvgvGGEEwBGISMiIRG9xfj3NzuWRifpxDi3U5FJIJZLE2cHbYgcCfUaLULjhxqJyoyUsXAZy4GG11M/v7PLKxQg280P6uoLV+PNq85kxvED1M+csmlnKdcKIHndfbVQEDhw+hVFLkxPxKKA5kEKERXdWKT3QRg=
const blinkLicense =
  'sRwAAAYJbG9jYWxob3N0r/lOPmg/w35CpOHWK+o5YN90QAi2XHJp/VoWzkCkzRGDNoXNS8cgkEYvMmeViNQjINvPBsbMFjDfjeeaLimUXEH3ONhyJtBfsxBd1yZXVpi3qqtFXSje7xcYDbgWMLqvrZ44OhlQIoYaTwP+u7ZowHsvO/cRKiSHaheMnmLnGkBAKp2UanYRlLUaBF+fSfOFHzBfBQMjX6DHrqQPskItGz9xPHZpftzSeE/hnqoI4g==';

const InputScan = () => {
  const [showScanner, toggleShowScanner] = useState(false);
  const [scannerAvailable, setIsScannerAvailable] = useState(false);

  const blinkWasmSDK = useRef<BlinkCardSDK.WasmSDK | null>(null);
  const cameraFeed = useRef<HTMLVideoElement>(null);
  // const cameraFeedback = useRef<HTMLCanvasElement>(null);
  // const drawContext = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!BlinkCardSDK.isBrowserSupported()) {
      return;
    }

    // if (cameraFeedback.current) {
    //   drawContext.current = cameraFeedback.current.getContext('2d') as CanvasRenderingContext2D;
    // } else {
    //   alert('Failed to set draw context');
    // }

    const loadSettings = new BlinkCardSDK.WasmSDKLoadSettings(blinkLicense);
    // loadSettings.allowHelloMessage = false;
    // loadSettings.engineLocation = 'http://localhost:3000/blinkcard';

    BlinkCardSDK.loadWasmModule(loadSettings).then(
      (wasmSDK: BlinkCardSDK.WasmSDK) => {
        setIsScannerAvailable(true);
        blinkWasmSDK.current = wasmSDK;
        // The SDK was initialized successfully, save the wasmSDK for future use
      },
      (error: any) => {
        // Error happened during the initialization of the SDK
        console.log('Error during the initialization of the SDK!', error);
      }
    );
  }, []);

  const startScan = async () => {
    toggleShowScanner(!showScanner);

    const blinkCardRecognizer = await BlinkCardSDK.createBlinkCardRecognizer(blinkWasmSDK.current);

    // const callbacks = {
    //   onQuadDetection: (quad: BlinkCardSDK.DisplayableQuad) => alert('hello'),
    // };

    const recognizerRunner = await BlinkCardSDK.createRecognizerRunner(
      // SDK instance to use
      blinkWasmSDK.current,
      // List of recognizer objects that will be associated with created RecognizerRunner object
      [blinkCardRecognizer],
      // [OPTIONAL] Should recognition pipeline stop as soon as first recognizer in chain finished recognition
      false
      // [OPTIONAL] Callbacks object that will receive recognition events
    );

    const videoRecognizer = await BlinkCardSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
      cameraFeed.current,
      recognizerRunner
    );

    const processResult = await videoRecognizer.recognize();
    if (processResult !== BlinkCardSDK.RecognizerResultState.Empty) {
      const recognitionResult = await blinkCardRecognizer.getResult();
      console.log(recognitionResult);
    } else {
      console.log('Recognition was not successful!');
    }
  };

  return (
    <>
      <div className="input-scan-wrapper">
        <input required type="text" placeholder="Eg: 0101 0012 1234 1234" />
        {scannerAvailable && (
          <div className="scan-wrapper">
            <i className="otg-camera fs-20">
              <button onClick={startScan}>Scan</button>
            </i>
          </div>
        )}
      </div>
      <div
        id="screen-scanning"
        style={{
          background: 'black',
          height: '100%',
          width: '100%',
          position: 'fixed',
          display: showScanner ? 'initial' : 'none',
          top: 0,
          left: 0,
          zIndex: 999,
        }}
      >
        <video ref={cameraFeed} id="camera-feed" playsInline></video>
        {/* <canvas ref={cameraFeedback} id="camera-feedback"></canvas> */}
        <p id="camera-guides">Point the camera towards Payment cards.</p>
      </div>
    </>
  );
};

export default InputScan;

import { useState } from 'react';
import { Form } from 'react-bootstrap';

import CardScanner, { isScannerAvailable } from './CardScanner';

const InputScan = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardScannerActive, toggleCardScannerActive] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setCardNumber(event.target.value);

  const closeScanner = () => {
    toggleCardScannerActive(false);
  };

  const handleScanResults = (results: { cardNumber: string }) => {
    setCardNumber(results.cardNumber);
    toggleCardScannerActive(false);
  };

  return (
    <>
      <div className="input-scan-wrapper">
        <Form.Control
          type="tel"
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          autoComplete="cc-number"
          maxLength={19}
          placeholder="Eg: 0101 0012 1234 1234"
          onChange={handleInputChange}
          value={cardNumber}
          required
        />
        {isScannerAvailable && (
          <div className="scan-wrapper">
            <button className="otg-camera fs-20 cursor-pointer" onClick={() => toggleCardScannerActive(true)}>
              scan
            </button>
          </div>
        )}
      </div>
      {isScannerAvailable && (
        <CardScanner active={cardScannerActive} handleCancelScan={closeScanner} handleScanResults={handleScanResults} />
      )}
    </>
  );
};

export default InputScan;

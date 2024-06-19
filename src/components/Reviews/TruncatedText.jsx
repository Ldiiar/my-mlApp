import React, { useState, useEffect, useRef } from 'react';
import './ReviewEl.css'

function TruncatedText({ text, maxLength = 400 }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const actualLength = textRef.current?.textContent?.length;
    setIsTruncated(actualLength && actualLength > maxLength);
  }, [text, maxLength]);

  return (
    <p className="the-review" ref={textRef}>
      {isTruncated ? `${text.substring(0, maxLength)}  ` : text}
      {isTruncated && (
        <span className='show-more' onClick={() => setIsTruncated(false)}>...more</span>
      )}
    </p>
  );
}

export default TruncatedText;
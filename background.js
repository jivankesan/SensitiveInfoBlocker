chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    const text = request.text;
    const sensitivePatterns = [
      /\d{3}-\d{2}-\d{4}/,  // SIN number pattern (Social Insurance Number)
      /\d{3}-\d{2}-\d{4}/,  // SSN number pattern (Social Security Number) - Note: Same as SIN, update if needed
      /\b(?:\d[ -]*?){13,19}\b/,  // Credit Card number pattern
      /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,  // Email pattern (case-sensitive)
      /(?:\d{1,3}\.){3}\d{1,3}/,  // IP address pattern
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,  // Email pattern (case-insensitive)
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,  // Strong Password pattern
      /\d{10}/,  // 10-digit phone number pattern
      /\d{4} \d{4} \d{4} \d{4}/,  // Credit Card format pattern (XXXX XXXX XXXX XXXX)
      /(?:\d{4}-){3}\d{4}/,  // Another Credit Card format pattern (XXXX-XXXX-XXXX-XXXX)
      /\b\d{5}\b/,  // 5-digit ZIP code pattern
      /\b\d{5}-\d{4}\b/  // 9-digit ZIP+4 code pattern
    ];

    let allow = true;
    for (const pattern of sensitivePatterns){
        if (pattern.test(text)){
            allow = false;
            break;
        }
    }

    sendResponse({allow: allow});
    return true;
});

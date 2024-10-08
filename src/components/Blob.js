export function blobCreationFromURL(inputURI) {
  var binaryVal;
  // mime extension extraction
  var inputMIME = inputURI?.split(",")[0].split(":")[1].split(";")[0];

  // Extract remaining part of URL and convert it to binary value
  if (inputURI.split(",")[0].indexOf("base64") >= 0)
    binaryVal = atob(inputURI.split(",")[1]);
  // Decoding of base64 encoded string
  else binaryVal = unescape(inputURI.split(",")[1]);

  var blobArray = [];
  for (var index = 0; index < binaryVal.length; index++) {
    blobArray.push(binaryVal.charCodeAt(index));
  }

  return new Blob([blobArray], {
    type: inputMIME,
  });
}

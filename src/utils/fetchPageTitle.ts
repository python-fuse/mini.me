export const fetchUrlTitle = async (url: string) => {
  const response = await fetch(
    `http://localhost:3000/api/fetchMetadata?url=${encodeURIComponent(url)}`
  );
  const metadata = await response.json();

  if (!response.ok) {
    console.error("Error fetching metadata:", metadata.error);
    throw new Error(metadata.error);
  }

  return metadata;
};

export const fetchQrCode = async (url: string) => {
  const response = await fetch(
    `http://localhost:3000/api/generateQR?url=${encodeURIComponent(url)}`
  );
  const qrCode = await response.json();
  console.log(qrCode);

  if (!response.ok) {
    console.error("Error fetching QR Code:", qrCode.error);
    throw new Error(qrCode.error);
  }

  return qrCode;
};

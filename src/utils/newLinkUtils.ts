import { fetchQrCode, fetchUrlTitle } from "./fetchPageTitle";

export const getMetadata = async (url: string, metadaFetch: any) => {
  try {
    metadaFetch.display_loading();
    const response: { title: string } = await fetchUrlTitle(url);

    metadaFetch.display_success("Metadata fetched successfully");
    return response.title;
  } catch (error) {
    metadaFetch.display_error(error as any);
  }
};

export const generateQrCode = async (url: string) => {
  try {
    const response = await fetchQrCode(url);
    console.log(response);

    return response.qrCode;
  } catch (error) {}
};

export const getFavicon = async (url: string) => {
  try {
    const domain = url.split("/")[2];

    const response = await fetch(
      `https://www.google.com/s2/favicons?domain=${domain}`
    );
    console.log(response.json());

    return response.json();
  } catch (error) {
    console.error(error as any);
  }
};

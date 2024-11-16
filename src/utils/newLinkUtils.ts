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

export const getFaviconUrl = (url: string) => {
  try {
    const domain = url.split("/")[2];
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch (error) {
    // Fallback to a default favicon
    return "/default-favicon.ico";
  }
};

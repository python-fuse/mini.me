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

"use client";

import { Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyButton from "../../../../components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { fetchQrCode, fetchUrlTitle } from "@/src/utils/fetchPageTitle";
import useFetch from "@/src/hooks/useFetch";
import { URL } from "@prisma/client";
import { uuid } from "uuidv4";

const page = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [metadata, setMetadata] = useState<any>();

  const metadaFetch = useFetch();
  const qrCodeFetch = useFetch();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  const formik = useFormik({
    initialValues: {
      link: "",
      title: "",
      domain: "http://localhost:3000",
      customPath: "",
      qrCode: false,
    },
    validationSchema: Yup.object({
      link: Yup.string().required("Required"),
      title: Yup.string(),
      customPath: Yup.string(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    if (metadata && !formik.values.title) {
      formik.setFieldValue("title", metadata.title);
    }
  }, [metadata, formik.values.title]);

  const getMetadata = async (url: string) => {
    try {
      metadaFetch.display_loading();
      const response: { title: string } = await fetchUrlTitle(url);

      setMetadata(response);

      metadaFetch.display_success("Metadata fetched successfully");
    } catch (error) {
      metadaFetch.display_error(error as any);
    }
  };

  const generateQrCode = async (url: string) => {
    try {
      qrCodeFetch.display_loading();
      const response = await fetchQrCode(url);
      console.log(response);

      qrCodeFetch.display_success("QR Code generated successfully");
      return response.qrCode;
    } catch (error) {
      qrCodeFetch.display_error(error as any);
    }
  };

  const handleSubmit = async (values: {
    link: string;
    title: string;
    domain: string;
    customPath: string;
    qrCode: boolean;
  }) => {
    const randomPath = Math.random().toString(36).substring(2, 8);
    let qrCode = "";

    if (!values.title) {
      await getMetadata(values.link);
    }

    if (values.qrCode) {
      qrCode = await generateQrCode(values.link);
      console.log(qrCode);
    }

    const data: Omit<URL, "createdAt" | "updatedAt" | "clicks"> = {
      id: uuid(),
      userId: session?.user?.id ?? "",
      original_url: values.link,
      title: values.title,
      short_url: `${values.domain}/${values.customPath ?? randomPath}`,
      qrCode: values.qrCode ? qrCode : "",
      urlIcon: `${values.link}/${"favicon.ico"}`,
    };

    console.log(data);
  };

  return (
    <section className="mx-auto py-10 flex flex-col gap-y-4 max-w-[60%]">
      <h2 className="text-4xl text-black/80 font-bold ">New link</h2>
      <p>*Minifying your links increase leads by 70%</p>

      <form
        className="bg-white p-6 flex flex-col gap-y-5 rounded-md"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          required
          label="Your link"
          variant="outlined"
          value={formik.values.link}
          placeholder="https://example.com/my-long-link"
          onChange={formik.handleChange("link")}
        />
        <TextField
          label="Title (optional)"
          variant="outlined"
          value={formik.values.title}
          onChange={formik.handleChange("title")}
          disabled={metadaFetch.loading}
        />

        <div className="flex gap-x-2  items-center justify-between">
          <TextField
            label="Domain"
            disabled
            value={"mini.me"}
            variant="outlined"
          />
          <p className="text-2xl">/</p>
          <TextField
            label="Custom path (optional)"
            variant="outlined"
            value={formik.values.customPath}
            onChange={formik.handleChange("customPath")}
          />
        </div>

        <h3 className="font-semibold text-xl text-black/80">
          Additional formats
        </h3>

        <div className="flex justify-between">
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold text-lg text-black/80">QR Code</h3>
            <p className=" text-xs text-black/60">
              Generate a QR code to make sharing more interactive
            </p>
          </div>

          <Switch {...formik.getFieldProps("qrCode")} />
        </div>
        <MyButton type="submit">Create</MyButton>
      </form>
    </section>
  );
};
export default page;

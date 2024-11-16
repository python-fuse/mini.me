"use client";

import { Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import MyButton from "../../../../components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import useFetch from "@/src/hooks/useFetch";
import { URL } from "@prisma/client";
import { uuid } from "uuidv4";
import { generateQrCode, getMetadata } from "@/src/utils/newLinkUtils";
import { createLink } from "@/src/data/linkQueries";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  const metadaFetch = useFetch();
  const qrCodeFetch = useFetch();
  const submitFetch = useFetch();

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

  const populateform = async (values: {
    link: string;
    title: string;
    domain: string;
    customPath: string;
    qrCode: boolean;
  }) => {
    submitFetch.display_loading();

    let qrCode = "";
    let title = values.title;

    if (!values.title) {
      let fetchedTitle = await getMetadata(values.link, metadaFetch);
      formik.setFieldValue("title", fetchedTitle);
      title = fetchedTitle || `${values.link.split("/")[2]} - untitled`;
    }

    if (values.qrCode) {
      qrCode = await generateQrCode(values.link);
      console.log(qrCode);
    }

    const randomPath = Math.random().toString(36).substring(2, 8);

    if (!values.customPath) {
      formik.setFieldValue("customPath", randomPath);
    }

    console.log(formik.values);

    const data: Omit<URL, "createdAt" | "updatedAt" | "clicks"> = {
      id: randomPath,
      userId: session?.user.id ?? "",
      original_url: values.link,
      title: title,
      short_url: `${values.domain}/${randomPath}`,
      qrCode: values.qrCode ? qrCode : "",
    };

    console.log(data);
    return data;
  };

  const handleSubmit = async (values: {
    link: string;
    title: string;
    domain: string;
    customPath: string;
    qrCode: boolean;
  }) => {
    try {
      submitFetch.setLoading(true);
      const data = await populateform(values);
      await createLink(data);

      return router.push(`/dashboard/links/${data.id}`);
    } catch (error) {
      submitFetch.display_error(error as any);
      formik.setValues({
        link: values.link,
        title: "",
        domain: "http://localhost:3000",
        customPath: "",
        qrCode: values.qrCode,
      });
    } finally {
      submitFetch.setLoading(false);
    }
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

        {session && (
          <MyButton type="submit" loading={submitFetch.loading}>
            Create
          </MyButton>
        )}
      </form>
    </section>
  );
};
export default page;

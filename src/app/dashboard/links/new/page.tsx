'use client';

import { Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MyButton from '../../../../components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import useFetch from '@/src/hooks/useFetch';
import { URL } from '@prisma/client';
import { generateQrCode, getMetadata } from '@/src/utils/newLinkUtils';
import { createLink } from '@/src/data/linkQueries';
import { useRouter } from 'next/navigation';
import { BiChevronLeft, BiQr } from 'react-icons/bi';
import Image from 'next/image';
import { generateLiveQR } from '@/src/actions/actions';

const Page = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [liveQr, setLiveQR] = useState<string | null>('');

  const metadaFetch = useFetch();
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
      link: '',
      title: '',
      domain:
        process.env.NODE_ENV == 'development'
          ? 'http://localhost:3000'
          : 'https://mini-me-kappa.vercel.app',
      customPath: '',
    },
    validationSchema: Yup.object({
      link: Yup.string().required('Required'),
      title: Yup.string(),
      customPath: Yup.string(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    const handleLiveQr = async (url: string) => {
      if (!url) {
        setLiveQR(null);
        return;
      }
      const res = await generateLiveQR(url);
      setLiveQR(res);
    };

    const handler = setTimeout(async () => {
      await handleLiveQr(formik.values.link);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [formik.values.link]);

  const populateform = async (values: {
    link: string;
    title: string;
    domain: string;
    customPath: string;
  }) => {
    submitFetch.display_loading();

    let title = values.title;

    if (!values.title) {
      let fetchedTitle = await getMetadata(values.link, metadaFetch);
      formik.setFieldValue('title', fetchedTitle);
      title = fetchedTitle || `${values.link.split('/')[2]} - untitled`;
    }

    const randomPath = Math.random().toString(36).substring(2, 8);

    if (!values.customPath) {
      formik.setFieldValue('customPath', randomPath);
    }

    const data: Omit<URL, 'createdAt' | 'updatedAt' | 'clicks'> = {
      id: randomPath,
      userId: session?.user.id ?? '',
      original_url: values.link,
      title: title,
      short_url: `${values.domain}/l/${formik.values.customPath}`,
      qrCode: liveQr,
    };

    console.log(data);
    return data;
  };

  const handleSubmit = async (values: {
    link: string;
    title: string;
    domain: string;
    customPath: string;
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
        title: '',
        domain:
          process.env.NODE_ENV == 'development'
            ? 'http://localhost:3000'
            : 'https://mini-me-kappa.vercel.app',
        customPath: '',
      });
    } finally {
      submitFetch.setLoading(false);
    }
  };

  return (
    <section className="mx-auto py-5 flex flex-col gap-y-4 max-w-[80%]">
      <div
        className="flex space-x-2 items-center hover:underline cursor-pointer"
        onClick={() => router.push('/dashboard/links')}
      >
        <BiChevronLeft size={18} />
        Back
      </div>
      <h2 className="text-4xl text-black/80 font-bold ">New link</h2>
      <p>*Minifying your links increase leads by 70%</p>

      <div className="flex justify-between space-x-4">
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
            onChange={formik.handleChange('link')}
          />
          <TextField
            label="Title (optional)"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            disabled={metadaFetch.loading}
          />

          <div className="flex gap-x-2  items-center justify-between">
            <TextField
              label="Domain"
              disabled
              value={'mini.me'}
              variant="outlined"
            />
            <p className="text-2xl">/</p>
            <TextField
              label="Custom path (optional)"
              variant="outlined"
              value={formik.values.customPath}
              onChange={formik.handleChange('customPath')}
            />
          </div>

          {session && (
            <MyButton type="submit" loading={submitFetch.loading}>
              Create
            </MyButton>
          )}
        </form>

        <div className="bg-white p-6 flex flex-col flex-1 gap-y-5 rounded-md place-items-center  justify-center ">
          <p className="text-2xl self-start"> Live QR</p>
          {liveQr && (
            <Image
              width={200}
              height={100}
              // className="w- "
              src={liveQr}
              alt={'qr'}
            />
          )}
          {!formik.values.link && (
            <div className="border text-sm p-4 flex flex-col place-items-center h-full justify-center rounded-md ">
              <BiQr size={50} />
              Enter the long URL to generate the QR
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Page;

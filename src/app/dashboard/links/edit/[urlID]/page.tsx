'use client';

import MyButton from '@/src/components/global/Button';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Session } from 'next-auth';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import * as Yup from 'yup';
import { URL as TURL } from '@prisma/client';
import useFetch from '@/src/hooks/useFetch';
import { getSession } from 'next-auth/react';
import { updateUrl } from '@/src/app/actions';

const Page = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [linkData, setLinkData] = useState<TURL | null>(null);
  const submitFetch = useFetch();

  const { urlID } = useParams();

  const formik = useFormik({
    initialValues: {
      link: '',
      title: '',
      domain:
        process.env.NODE_ENV == 'development'
          ? 'http://localhost:3000/'
          : 'https://mini-me-kappa.vercel.app/',
      customPath: '',
      qrCode: false,
    },
    validationSchema: Yup.object({
      link: Yup.string().required('Required'),
      title: Yup.string(),
      customPath: Yup.string(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchLinkData = async () => {
      const res = await fetch(`/api/links/?urlId=${urlID}`);
      const data: TURL = await res.json();
      setLinkData(data);

      formik.setFieldValue('link', data.original_url);
      formik.setFieldValue('title', data.title);
      formik.setFieldValue('customPath', data.short_url.split('/')[2]);
      formik.setFieldValue('qrCode', data.qrCode);
    };
    fetchLinkData();
  }, [urlID]);

  const handleSubmit = async (values: {
    link: string;
    title: string;
    domain: string;
    customPath: string;
    qrCode: boolean;
  }) => {
    try {
      submitFetch.display_loading();

      let qrCode = '';
      let title = values.title;

      const res = await updateUrl(urlID as string, {
        title: values.title,
        original_url: values.link,
        short_url: `${values.domain}/l/${values.customPath}`,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      submitFetch.setLoading(false);
    }
  };

  return (
    <section className="mx-auto py-5 flex flex-col gap-y-4 max-w-[60%]">
      <div
        className="flex space-x-2 items-center hover:underline cursor-pointer"
        onClick={() => router.back()}
      >
        <BiChevronLeft size={18} />
        Back
      </div>
      <h2 className="text-4xl text-black/80 font-bold ">Edit link</h2>

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
            Update
          </MyButton>
        )}
      </form>
    </section>
  );
};
export default Page;

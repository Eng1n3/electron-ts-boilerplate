import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../../mantine';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';

// import { GoogleAnalytics } from 'nextjs-google-analytics';
import '../styles/global.css';

// import { cache } from '@/utils/theme-cache';
import { useScrollRestoration } from '@/utils';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout | any;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useScrollRestoration();

  const getLayout = Component.getLayout ?? ((page : NextPage) => page);

  const title = 'Data Pokok Kebudayaan (DAPOBUD)';
  const description =
    'Aplikasi Data Pokok Kebudayaan, yang selanjutnya disingkat Aplikasi DAPOBUD adalah bagian dari Sistem Pendataan Kebudayaan Terpadu yang dikelola oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi yang digunakan untuk mengintegrasikan dan menyajikan berbagai data kebudayaan yang diperbaharui secara daring untuk mewujudkan Data Referensi Kebudayaan yang terintegrasi dari tingkat Kabupaten/Kota, Provinsi, sampai tingkat Pusat.';
  const url = `${process.env.NEXT_PUBLIC_URL}`;
  const icon = '/favicon.ico';
  const metaImage = `${
    process.env.NEXT_PUBLIC_DAPOBUD_LANDING_PAGE_URL ??
    'https://dapobud.kemdikbud.vercel.optimap.id'
  }/meta-image.png`;

  return getLayout(
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="title" content="Data Pokok Kebudayaan (DAPOBUD)" />
        <meta name="description" content={description} />

        <link rel="apple-touch-icon" sizes="57x57" href={icon} />
        <link rel="apple-touch-icon" sizes="60x60" href={icon} />
        <link rel="apple-touch-icon" sizes="72x72" href={icon} />
        <link rel="apple-touch-icon" sizes="76x76" href={icon} />
        <link rel="apple-touch-icon" sizes="114x114" href={icon} />
        <link rel="apple-touch-icon" sizes="120x120" href={icon} />
        <link rel="apple-touch-icon" sizes="144x144" href={icon} />
        <link rel="apple-touch-icon" sizes="152x152" href={icon} />
        <link rel="apple-touch-icon" sizes="180x180" href={icon} />
        <link rel="icon" type="image/png" sizes="192x192" href={icon} />
        <link rel="icon" type="image/png" sizes="32x32" href={icon} />
        <link rel="icon" type="image/png" sizes="96x96" href={icon} />
        <link rel="icon" type="image/png" sizes="16x16" href={icon} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={metaImage} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <Notifications position="top-right" notificationMaxHeight={400} />
            <NextNProgress
              color={theme?.colors?.brand?.[5] ?? '#38d9a9'}
              height={4}
              options={{
                showSpinner: false,
              }}
            />
            <Component {...pageProps} />
            {/* <GoogleAnalytics trackPageViews /> */}
          </MantineProvider>
    </>
  );
}

export default MyApp;

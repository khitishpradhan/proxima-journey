'use client';

import dynamic from 'next/dynamic';
import Head from 'next/head';

const SimulationCanvas = dynamic(() => import('@/components/SimulationCanvas'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Proxima Journey</title>
      </Head>
      <main style={{ width: '100vw', height: '100vh' }}>
        <SimulationCanvas />
      </main>
    </>
  );
}

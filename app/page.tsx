'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Head from 'next/head';
import HUDOverlay from '@/components/HUDOverlay';

const CanvasScene = dynamic(() => import('@/components/CanvasScene'), { ssr: false });

export default function Home() {
  const [simulationMode, setSimulationMode] = useState(false);

  return (
    <>
      <Head>
        <title>Proxima Journey</title>
      </Head>

      {/* Simulation mode toggle */}
      <button
        className="absolute top-5 right-5 z-50 p-4 bg-gray-900/85 hover:bg-gray-700 rounded cursor-pointer"
        onClick={() => setSimulationMode((v) => !v)}
      >
        {simulationMode ? 'Exit Simulation' : 'Simulation Mode'}
      </button>

      <main style={{ width: '100vw', height: '100vh' }}>
        <CanvasScene simulationMode={simulationMode} />
        {simulationMode && <HUDOverlay />}
      </main>
    </>
  );
}

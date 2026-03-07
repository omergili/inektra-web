import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'inektra GmbH – Professionelle Werkskalibrierung';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            color: '#ea580c',
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          inektra GmbH
        </div>
        <div
          style={{
            color: '#e2e8f0',
            fontSize: 36,
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Professionelle Werkskalibrierung nach ISO-Normen
        </div>
        <div
          style={{
            color: '#94a3b8',
            fontSize: 24,
            marginTop: '20px',
          }}
        >
          Labor in Nordhorn | 3.200+ Gerätetypen | deutschlandweit
        </div>
      </div>
    ),
    { ...size },
  );
}

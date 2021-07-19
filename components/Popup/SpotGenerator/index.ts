import dynamic from 'next/dynamic';

const SpotGenerator = dynamic(() => import('./SpotGenerator'), {
  ssr: false,
});

export default SpotGenerator;
export * from './SpotGenerator';

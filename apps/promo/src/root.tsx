import React from 'react';
import {Composition} from 'remotion';
import {HedgeFit, HedgeFitSilent} from './video';

export const Root: React.FC = () => (
  <>
    <Composition
      id="HedgeFit"
      component={HedgeFit}
      durationInFrames={840}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="HedgeFitSilent"
      component={HedgeFitSilent}
      durationInFrames={840}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);

import React from 'react';
import {Composition} from 'remotion';
import {SemanticHedgeFund, SemanticHedgeFundSilent} from './video';

export const Root: React.FC = () => (
  <>
    <Composition
      id="SemanticHedgeFund"
      component={SemanticHedgeFund}
      durationInFrames={840}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="SemanticHedgeFundSilent"
      component={SemanticHedgeFundSilent}
      durationInFrames={840}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);

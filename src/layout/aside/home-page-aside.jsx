import React from 'react';
import { Slider } from "@shared";
import { Footer } from '../footer';

export const HomePageAside = React.memo(() => {
  return (
    <>
      <Slider />
      <Footer />
    </>
  );
});

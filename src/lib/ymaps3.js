import React from "react";
import ReactDOM from "react-dom";

const ymaps3Reactify = await window.ymaps3.import(
  "@yandex/ymaps3-reactify"
);

const reactify = ymaps3Reactify.reactify.bindTo(
  React,
  ReactDOM
);

export const {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
} = reactify.module(window.ymaps3);
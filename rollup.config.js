import babel from '@rollup/plugin-babel';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import postcssUrl from "postcss-url";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import image from "@rollup/plugin-image";
import postcssInlineSvg from "postcss-inline-svg";

import fs from "fs-extra";
import path from "path";
import { hashFile } from "hasha";

const IMAGES_RX = /\.(png|jpe?g|gif|webp|svg)$/;

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        include: 'src/components/os-mui-phone-input/flags/',
        presets: ['@babel/preset-env','@babel/preset-react']
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        plugins: [
          postcssUrl({
            url: "inline",
          })
        ]
      }),
      terser(),
      image({dom: true}),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/, ...Object.keys(packageJson.peerDependencies)]
  },
];
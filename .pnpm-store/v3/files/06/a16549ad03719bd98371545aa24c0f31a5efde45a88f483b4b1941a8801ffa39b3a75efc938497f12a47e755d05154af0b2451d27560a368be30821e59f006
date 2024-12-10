# @figspec/react

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/@figspec/react?label=%40figspec%2Freact)](https://www.npmjs.com/package/@figspec/react)

A React binding for [`@figspec/components`](https://github.com/pocka/figspec).

## Installation

```sh
# npm
$ npm i @figspec/react

# Yarn
$ yarn add @figspec/react

# pnpm
$ pnpm add @figspec/react
```

## Usage

See the docs at `@figspec/components`.

This bindings enables you to use the CustomElement's property via React's component props.
You don't need to use kebab-case attributes :camel::dash:

```jsx
import { FigspecViewer } from "@figspec/react";

const logSelectedNode = (ev) => {
  console.log(ev.detail.selectedNode);
};

<FigspecFrameViewer
  nodes={nodes}
  renderedImage={renderedImage}
  zoomMargin={200}
  onNodeSelect={logSelectedNode}
/>;
```

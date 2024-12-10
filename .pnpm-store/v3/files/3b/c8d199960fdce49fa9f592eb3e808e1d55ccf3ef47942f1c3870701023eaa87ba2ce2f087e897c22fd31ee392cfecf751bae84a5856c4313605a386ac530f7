import React, { CSSProperties, FC } from 'react';
import { Of } from '@storybook/blocks';

interface ConfigBase {
    name?: string;
    offscreen?: boolean;
}
interface IFrameConfigBase extends ConfigBase {
    url: string;
    allowFullscreen?: boolean;
}
interface IFrameConfig extends IFrameConfigBase {
    type: "iframe";
}
interface FigmaConfig extends IFrameConfigBase {
    type: "figma";
    embedHost?: string;
}
interface FigspecConfig extends ConfigBase {
    type: "figspec" | "experimental-figspec";
    url: string;
    accessToken: string;
}
interface TransformableConfigBase extends ConfigBase {
    scale?: number;
    offset?: [number, number];
}
interface ImageConfig extends TransformableConfigBase {
    type: "image";
    url: string;
}

interface BlocksCommonProps {
    className?: string;
    style?: CSSProperties;
    height?: string | number;
    collapsable?: boolean;
    children?: React.ReactNode;
    defaultCollapsed?: boolean;
    placeholder?: string;
    showLink?: boolean;
    onCollapsedChange?(newValue: boolean, oldValue: boolean): void;
}
declare const DocBlockBase: FC<BlocksCommonProps>;
declare const Figma: FC<Omit<FigmaConfig, "type"> & BlocksCommonProps>;
declare const Figspec: FC<Omit<FigspecConfig, "type"> & BlocksCommonProps>;
declare const IFrame: FC<Omit<IFrameConfig, "type"> & BlocksCommonProps>;
declare const Image: FC<Omit<ImageConfig, "type"> & BlocksCommonProps>;
interface DesignProps {
    of: Of;
}
declare const Design: FC<DesignProps & Omit<BlocksCommonProps, "showLink">>;

export { type BlocksCommonProps, Design, type DesignProps, DocBlockBase, Figma, Figspec, IFrame, Image };

import * as React from 'react';
import { VideoTextureProps } from '..';
export type ScreenVideoTextureProps = Omit<VideoTextureProps, 'src'> & {
    options?: DisplayMediaStreamOptions;
};
export declare const ScreenVideoTexture: React.ForwardRefExoticComponent<Omit<{
    children?: (texture: import("three").VideoTexture) => React.ReactNode;
    src: string | MediaProvider | null;
} & {
    unsuspend?: keyof HTMLVideoElementEventMap;
    start?: boolean;
    hls?: Parameters<(userConfig?: Partial<import("hls.js").HlsConfig> | undefined) => Promise<import("hls.js").default | null>>[0];
    onVideoFrame?: VideoFrameRequestCallback;
} & Partial<Omit<HTMLVideoElement, "children" | "src" | "srcObject">>, "src"> & {
    options?: DisplayMediaStreamOptions;
} & React.RefAttributes<import("three").VideoTexture>>;

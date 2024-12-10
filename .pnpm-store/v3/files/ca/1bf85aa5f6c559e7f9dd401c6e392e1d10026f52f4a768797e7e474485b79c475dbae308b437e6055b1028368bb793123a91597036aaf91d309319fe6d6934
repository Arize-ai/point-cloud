declare const PanelName: string;
declare const ParameterName = "design";

type Config = IFrameConfig | FigmaConfig | FigspecConfig | SketchConfig | ImageConfig | LinkConfig;
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
interface SketchConfig extends IFrameConfigBase {
    type: "sketch";
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
interface LinkConfig extends ConfigBase {
    type: "link";
    url: string;
    label?: string;
    showArrow?: boolean;
    target?: string;
    rel?: string;
}

declare const config: (c: Config | Config[]) => Config | Config[];

export { type Config, ParameterName as PARAM_KEY, PanelName, config };

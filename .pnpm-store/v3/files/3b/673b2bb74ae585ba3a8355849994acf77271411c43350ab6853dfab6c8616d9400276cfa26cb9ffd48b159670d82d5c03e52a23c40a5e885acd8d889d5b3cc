/// <reference types="node" />
import { RequestOptions } from 'http';

declare const FormData: {
  new (): FormData;
  prototype: FormData;
};

/** @type {typeof globalThis.Blob} */
declare const Blob: typeof globalThis.Blob;

type AbortSignal = {
	readonly aborted: boolean;

	addEventListener: (type: 'abort', listener: (this: AbortSignal) => void) => void;
	removeEventListener: (type: 'abort', listener: (this: AbortSignal) => void) => void;
};

type HeadersInit = Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>;


/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 * */
declare class Headers {
	constructor(init?: HeadersInit);

	append(name: string, value: string): void;
	delete(name: string): void;
	get(name: string): string | null;
	has(name: string): boolean;
	set(name: string, value: string): void;
	forEach(
		callbackfn: (value: string, key: string, parent: Headers) => void,
		thisArg?: any
	): void;

	[Symbol.iterator](): IterableIterator<[string, string]>;
	/**
	 * Returns an iterator allowing to go through all key/value pairs contained in this object.
	 */
	entries(): IterableIterator<[string, string]>;
	/**
	 * Returns an iterator allowing to go through all keys of the key/value pairs contained in this object.
	 */
	keys(): IterableIterator<string>;
	/**
	 * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
	 */
	values(): IterableIterator<string>;

	/** Node-fetch extension */
	raw(): Record<string, string[]>;
}

interface RequestInit {
	/**
	 * A BodyInit object or null to set request's body.
	 */
	body?: BodyInit | null;
	/**
	 * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
	 */
	headers?: HeadersInit;
	/**
	 * A string to set request's method.
	 */
	method?: string;
	/**
	 * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
	 */
	redirect?: RequestRedirect;
	/**
	 * An AbortSignal to set request's signal.
	 */
	signal?: AbortSignal | null;
	/**
	 * A string whose value is a same-origin URL, "about:client", or the empty string, to set request’s referrer.
	 */
	referrer?: string;
	/**
	 * A referrer policy to set request’s referrerPolicy.
	 */
	referrerPolicy?: ReferrerPolicy;

	// Node-fetch extensions to the whatwg/fetch spec
	agent?: RequestOptions['agent'] | ((parsedUrl: URL) => RequestOptions['agent']);
	compress?: boolean;
	counter?: number;
	follow?: number;
	hostname?: string;
	port?: number;
	protocol?: string;
	size?: number;
	highWaterMark?: number;
	insecureHTTPParser?: boolean;
}

interface ResponseInit {
	headers?: HeadersInit;
	status?: number;
	statusText?: string;
}

type BodyInit =
	| Blob
	| Buffer
	| URLSearchParams
	| FormData
	| NodeJS.ReadableStream
	| string;
declare class BodyMixin {
	constructor(body?: BodyInit, options?: {size?: number});

	readonly body: NodeJS.ReadableStream | null;
	readonly bodyUsed: boolean;
	readonly size: number;

	/** @deprecated Use `body.arrayBuffer()` instead. */
	buffer(): Promise<Buffer>;
	arrayBuffer(): Promise<ArrayBuffer>;
	formData(): Promise<FormData>;
	blob(): Promise<Blob>;
	json(): Promise<unknown>;
	text(): Promise<string>;
}

type RequestRedirect = 'error' | 'follow' | 'manual';
type ReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' | 'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';

type ResponseType = 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect';

declare class Response extends BodyMixin {
	constructor(body?: BodyInit | null, init?: ResponseInit);

	readonly headers: Headers;
	readonly ok: boolean;
	readonly redirected: boolean;
	readonly status: number;
	readonly statusText: string;
	readonly type: ResponseType;
	readonly url: string;
	clone(): Response;

	static error(): Response;
	static redirect(url: string, status?: number): Response;
}

interface Env {
    CHROMATIC_INDEX_URL: string;
    CHROMATIC_PROJECT_TOKEN: string;
    CHROMATIC_RETRIES: number;
    CHROMATIC_POLL_INTERVAL: number;
    CHROMATIC_OUTPUT_INTERVAL: number;
    CHROMATIC_TIMEOUT: number;
    CHROMATIC_STORYBOOK_VERSION: string;
    CHROMATIC_DNS_SERVERS: string[];
    CHROMATIC_DNS_FAILOVER_SERVERS: string[];
    ENVIRONMENT_WHITELIST: RegExp[];
    LOGGLY_CUSTOMER_TOKEN: string;
    STORYBOOK_VERIFY_TIMEOUT: number;
    STORYBOOK_BUILD_TIMEOUT: number;
    STORYBOOK_CLI_FLAGS_BY_VERSION: typeof STORYBOOK_CLI_FLAGS_BY_VERSION;
    HTTPS_PROXY: string;
    HTTP_PROXY: string;
}
declare const STORYBOOK_CLI_FLAGS_BY_VERSION: {
    '--ci': string;
    '--loglevel': string;
};

declare const LOG_LEVELS: {
    silent: number;
    error: number;
    warn: number;
    info: number;
    debug: number;
};
declare type LogFn = (...args: any[]) => void;
interface Logger {
    error: LogFn;
    warn: LogFn;
    info: LogFn;
    log: LogFn;
    debug: LogFn;
    queue: () => void;
    flush: () => void;
    setLevel: (value: keyof typeof LOG_LEVELS) => void;
    setInteractive: (value: boolean) => void;
}

interface Flags {
    projectToken?: string[] | string;
    buildScriptName?: string;
    outputDir?: string[];
    storybookBuildDir?: string[];
    autoAcceptChanges?: string;
    branchName?: string;
    ci?: boolean;
    exitOnceUploaded?: string;
    exitZeroOnChanges?: string;
    externals?: string[];
    ignoreLastBuildOnBranch?: string;
    onlyChanged?: string;
    onlyStoryFiles?: string[];
    onlyStoryNames?: string[];
    patchBuild?: string;
    repositorySlug?: string;
    skip?: string;
    storybookBaseDir?: string;
    storybookConfigDir?: string;
    untraced?: string[];
    zip?: boolean;
    debug?: boolean;
    diagnostics?: boolean;
    dryRun?: boolean;
    forceRebuild?: string;
    junitReport?: string;
    list?: boolean;
    interactive?: boolean;
    traceChanged?: string;
    allowConsoleErrors?: boolean;
    appCode?: string[];
    only?: string;
    preserveMissing?: boolean;
}
interface Options {
    projectToken: string;
    onlyChanged: true | string;
    onlyStoryFiles: Flags['onlyStoryFiles'];
    onlyStoryNames: Flags['onlyStoryNames'];
    untraced: Flags['untraced'];
    externals: Flags['externals'];
    traceChanged: true | string;
    list: Flags['list'];
    fromCI: boolean;
    skip: true | string;
    dryRun: Flags['dryRun'];
    forceRebuild: true | string;
    verbose: boolean;
    interactive: boolean;
    junitReport: true | string;
    zip: Flags['zip'];
    autoAcceptChanges: true | string;
    exitZeroOnChanges: true | string;
    exitOnceUploaded: true | string;
    isLocalBuild: boolean;
    ignoreLastBuildOnBranch: Flags['ignoreLastBuildOnBranch'];
    preserveMissingSpecs: boolean;
    originalArgv: string[];
    buildScriptName: Flags['buildScriptName'];
    outputDir: string;
    allowConsoleErrors: Flags['allowConsoleErrors'];
    url?: string;
    storybookBuildDir: string;
    storybookBaseDir: Flags['storybookBaseDir'];
    storybookConfigDir: Flags['storybookConfigDir'];
    ownerName: string;
    repositorySlug: Flags['repositorySlug'];
    branchName: string;
    patchHeadRef: string;
    patchBaseRef: string;
    /** A callback that is called at the completion of each task */
    onTaskComplete?: (ctx: Context) => void;
}
interface Context {
    env: Env;
    log: Logger;
    pkg: {
        name: string;
        version: string;
        description: string;
        bugs: {
            url: string;
            email: string;
        };
        docs: string;
    };
    sessionId: string;
    packageJson: {
        [key: string]: any;
    };
    packagePath: string;
    help: any;
    argv: string[];
    flags: Flags;
    options: Options;
    title: string;
    skip?: boolean;
    skipSnapshots?: boolean;
    now?: number;
    startedAt?: number;
    activity?: {
        end: () => void;
    };
    exitCode: number;
    exitCodeKey: string;
    userError?: boolean;
    runtimeErrors?: Error[];
    runtimeWarnings?: Error[];
    environment?: Record<string, string>;
    reportPath?: string;
    isPublishOnly?: boolean;
    isOnboarding: boolean;
    turboSnapAvailability?: string;
    http: {
        fetch: (url: string, options?: RequestInit, opts?: any) => Promise<Response>;
    };
    client: {
        runQuery: <T>(query: string, variables?: any, options?: {
            retries?: number;
            headers?: Record<string, string>;
        }) => Promise<T>;
        setAuthorization: (token: string) => void;
    };
    git: {
        version: string;
        /** The current user's email as pre git config */
        gitUserEmail: string;
        branch: string;
        commit: string;
        committerEmail?: string;
        committedAt: number;
        slug?: string;
        mergeCommit?: string;
        uncommittedHash?: string;
        parentCommits?: string[];
        baselineCommits?: string[];
        changedFiles?: string[];
        changedDependencyNames?: string[];
        replacementBuildIds?: [string, string][];
        matchesBranch?: (glob: true | string) => boolean;
        packageManifestChanges?: {
            changedFiles: string[];
            commit: string;
        }[];
    };
    storybook: {
        version: string;
        configDir: string;
        staticDir: string[];
        viewLayer: string;
        addons: {
            name: string;
            packageName?: string;
            packageVersion?: string;
        }[];
        builder: {
            name: string;
            packageName?: string;
            packageVersion?: string;
        };
    };
    spawnParams: {
        client: 'yarn' | 'npm';
        clientVersion: string;
        nodeVersion: string;
        platform: string;
        command: string;
        clientArgs: string[];
        scriptArgs: string[];
    };
    isolatorUrl: string;
    cachedUrl: string;
    announcedBuild: {
        id: string;
        number: number;
        status: string;
        autoAcceptChanges: boolean;
        reportToken: string;
        app: {
            id: string;
            turboSnapAvailability: string;
        };
    };
    build: {
        id: string;
        number: number;
        status: string;
        webUrl: string;
        cachedUrl: string;
        reportToken?: string;
        inheritedCaptureCount: number;
        actualCaptureCount: number;
        actualTestCount: number;
        specCount: number;
        componentCount: number;
        testCount: number;
        changeCount: number;
        errorCount: number;
        interactionTestFailuresCount: number;
        inProgressCount?: number;
        autoAcceptChanges: boolean;
        turboSnapEnabled?: boolean;
        wasLimited?: boolean;
        startedAt?: number;
        completedAt?: number;
        app: {
            manageUrl: string;
            setupUrl: string;
            account?: {
                exceededThreshold: boolean;
                paymentRequired: boolean;
                billingUrl: string;
            };
            repository?: {
                provider: string;
            };
        };
        features?: {
            uiTests: boolean;
            uiReview: boolean;
        };
        tests?: {
            spec: {
                name: string;
                component: {
                    name: string;
                    displayName: string;
                };
            };
            parameters: {
                viewport: number;
                viewportIsDefault: boolean;
            };
            mode: {
                id: string;
                name: string;
            };
        }[];
    };
    sourceDir: string;
    buildLogFile?: string;
    fileInfo?: {
        paths: string[];
        statsPath: string;
        lengths: {
            knownAs: string;
            pathname: string;
            contentLength: number;
        }[];
        total: number;
    };
    uploadedBytes?: number;
    turboSnap?: Partial<{
        unavailable?: boolean;
        rootPath: string;
        baseDir: string;
        storybookDir: string;
        staticDirs: string[];
        globs: string[];
        modules: string[];
        tracedFiles: string[];
        tracedPaths: Set<string>;
        changedDependencyNames: Set<string>;
        changedManifestFiles: Set<string>;
        affectedModuleIds: Set<string | number>;
        bailReason: {
            changedPackageFiles?: string[];
            changedStorybookFiles?: string[];
            changedStaticFiles?: string[];
            changedExternalFiles?: string[];
            invalidChangedFiles?: true;
            missingStatsFile?: true;
            noAncestorBuild?: true;
            rebuild?: true;
        };
    }>;
    mergeBase?: string;
    onlyStoryFiles?: string[];
    untracedFiles?: string[];
    rebuildForBuildId?: string;
}

interface Output {
    code: number;
    url: string;
    buildUrl: string;
    storybookUrl: string;
    specCount: number;
    componentCount: number;
    testCount: number;
    changeCount: number;
    errorCount: number;
    interactionTestFailuresCount: number;
    actualTestCount: number;
    actualCaptureCount: number;
    inheritedCaptureCount: number;
}
declare function run({ argv, flags, options, }: {
    argv?: string[];
    flags?: Flags;
    options?: Partial<Options>;
}): Promise<Output>;
declare function runAll(ctx: any, options?: Partial<Options>): Promise<void>;
declare type GitInfo = {
    slug: string;
    branch: string;
    commit: string;
    committedAt: number;
    committerEmail: string;
    committerName: string;
    uncommittedHash: string;
    userEmail: string;
    userEmailHash: string;
};
declare function getGitInfo(): Promise<GitInfo>;

export { GitInfo, getGitInfo, run, runAll };

interface AxiosErrorContext<TConfig> {
    response?: {
        status?: number;
    };
    config?: TConfig;
}

interface RetryableUnauthorizedRequest<TConfig> {
    response: {
        status?: number;
    };
    config: TConfig;
}

export const hasRetryableUnauthorizedRequest = <TConfig>(
    error: AxiosErrorContext<TConfig>
): error is RetryableUnauthorizedRequest<TConfig> => error.response?.status === 401 && error.config !== undefined;

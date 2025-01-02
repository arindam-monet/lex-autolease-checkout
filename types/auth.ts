export interface ConsumerLoginRequest extends LoginRequest { }

export interface ConsumerLoginResponse extends LoginResponse { }

export interface ConsumerLoginVerifyOtpRequest extends VerifyOtpRequest { }

export interface ConsumerLoginVerifyOtpResponse extends VerifyOtpResponse { }

interface LoginResponse {
    requestId: string;
    message: string;
}

interface LoginRequest {
    mobileNumber: string;
    countryCode: string;
}

interface VerifyOtpRequest {
    countryCode: string;
    mobileNumber: string;
    otp: string;
    requestId: string;
}

interface VerifyOtpResponse {
    message: string;
    tokens: Tokens;
    id: string;
}

export type Token = {
    token: string;
    expires: string;
};

type Tokens = {
    access: Token;
    refresh: Token;
};

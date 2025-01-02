import { ConsumerLoginRequest, ConsumerLoginResponse, ConsumerLoginVerifyOtpRequest, ConsumerLoginVerifyOtpResponse } from "@/types/auth"
import { RewardProgram } from "@/types/rewards"
import axios, { AxiosInstance } from "axios"

export class RewardsApiClient {
  private apiKey: string
  private baseUrl = "https://stageapi.loyalty.rewards.monet.work/v1" // Replace with actual API URL
  private axiosInstance: AxiosInstance

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.axiosInstance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config
    })
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        // "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  async requestOtp(payload: ConsumerLoginRequest) {
    return this.fetch<ConsumerLoginResponse>("/consumers/login", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async verifyOtp(payload: ConsumerLoginVerifyOtpRequest) {
    return this.fetch<ConsumerLoginVerifyOtpResponse>("/consumers/login/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async getRewards(phoneNumber: string): Promise<RewardProgram[]> {
    return this.fetch(`/rewards?phoneNumber=${phoneNumber}`)
  }
}


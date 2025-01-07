import { useState, useEffect } from "react"
import { RewardsApiClient } from "@/lib/api-client"
import { StreamResponse } from "@/types/consumer"
import { storage } from "@/lib/storage"
import { calculateLloydsPoints } from "@/lib/utils"

export function useRewardsAuth(apiKey: string) {
    const [showPhoneDialog, setShowPhoneDialog] = useState(false)
    const [showRewardsDialog, setShowRewardsDialog] = useState(false)
    const [streamData, setStreamData] = useState<StreamResponse[]>([])
    const [isVerified, setIsVerified] = useState(false)
    const apiClient = new RewardsApiClient(apiKey)

    const totalLloydsPoints = calculateLloydsPoints(streamData);

    useEffect(() => {
        if (!totalLloydsPoints) return;
        storage.set('totalLloydsPoints', totalLloydsPoints.toString());
    }, [totalLloydsPoints])


    useEffect(() => {
        if (showPhoneDialog && isVerified) {
            setShowPhoneDialog(false)
            setShowRewardsDialog(true)
        }
    }, [showPhoneDialog, isVerified])

    const handlePhoneVerified = async () => {
        try {
            const dashboardData = await apiClient.getConsumerDashboardData();
            storage.set("consumerId", dashboardData.session.consumerId);
            setStreamData([]);
            setIsVerified(true);

            const cleanup = apiClient.subscribeToRewardsStream(
                dashboardData.session.sessionId,
                dashboardData.session.consumerId,
                (data) => {
                    setStreamData(prev => {
                        if (prev.find(item => item.account.id === data.account.id)) {
                            return prev;
                        }
                        return [...prev, data];
                    });
                }
            );

            setShowPhoneDialog(false)
            setShowRewardsDialog(true)

            return () => {
                cleanup();
                setStreamData([]);
            };
        } catch (error) {
            console.error("Failed to fetch rewards:", error)
        }
    }

    return {
        showPhoneDialog,
        setShowPhoneDialog,
        showRewardsDialog,
        setShowRewardsDialog,
        streamData,
        setStreamData,
        isVerified,
        handlePhoneVerified,
        apiClient
    }
}
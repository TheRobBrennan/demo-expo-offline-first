import React, { ReactNode } from 'react';
import { NetworkProvider, useIsConnected } from 'react-native-offline';

interface AppNetworkProviderProps {
    children: ReactNode;
}

export default function AppNetworkProvider({ children }: AppNetworkProviderProps) {
    return (
        <NetworkProvider>
            {children}
        </NetworkProvider>
    );
}

export function useNetworkStatus() {
    const isConnected = useIsConnected();
    return isConnected;
}

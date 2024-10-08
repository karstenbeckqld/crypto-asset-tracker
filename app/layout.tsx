

import "./globals.css";
import React from "react";
import RegisterQueryClientProvider from './components/RegisterQueryClientProvider';

// const queryClient = new QueryClient();

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
            <html lang="en">
                <body>
                    <RegisterQueryClientProvider>
                        {children}
                    </RegisterQueryClientProvider>
                </body>
            </html>
    );
}

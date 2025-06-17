'use client';

import HandDrawingOnly from "./components/hand-event/HandDrawingOnly";
import { ResourceProvider } from "./context/ResourceContext";
import ResourcePage from "./context/ResourcePage";

export default function Page() {
    return (
        <ResourceProvider>
            <ResourcePage />
            <HandDrawingOnly />
        </ResourceProvider>
    )
}
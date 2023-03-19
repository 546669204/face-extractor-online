
import React, { useCallback, useEffect, useState } from "react"
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom"

const FaceExtart = React.lazy(() => import("./pages/face-extart"))
const FaceClip = React.lazy(() => import("./pages/face-clip"))

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <FaceExtart />
            ),
        },
        {
            path: "FaceClip",
            element: <FaceClip />,
        },
    ], {
        basename: "/face-extractor-online/"
    });
    return <RouterProvider router={router} />
}
export {
    App
}
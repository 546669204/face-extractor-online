import React, { useCallback, useEffect, useState } from "react"
import * as faceapi from '@vladmandic/face-api/dist/face-api.esm.js';
const str = (json: any) => (json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '');

const FaceClip = () => {
    const [isLoad, setIsLoad] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    useEffect(() => {
        (async () => {
            console.log('Loading FaceAPI models');
            const modelPath = './weights';
            await faceapi.nets.ssdMobilenetv1.load(modelPath);
            await faceapi.nets.faceLandmark68Net.load(modelPath);

            setIsLoad(false)
        })()
    }, [])

    const onGo = useCallback(async () => {
        setIsLoad(true);
        const zipFiles: { name: string, lastModified: Date, input: Blob }[] = [];
        let runIndex = 0;
        for (const file of images) {
            console.log(runIndex)
            runIndex++;
            const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.45 })
            const image = await faceapi.bufferToImage(file);
            // const detections = await faceapi.detectAllFaces(image, faceDetectionOptions).withFaceLandmarks()
            const detections = await faceapi.detectAllFaces(image, faceDetectionOptions).withFaceLandmarks()

            const detection = detections[0]

            if (!detection) continue;
            let canvas = document.createElement('canvas')
                , context = canvas['getContext']('2d');
            if (!context) return;

            canvas.width = image.width;
            canvas.height = image.height;

            context.drawImage(image, 0, 0, image.width, image.height, 0x0, 0x0, image.width, image.height);

            context.beginPath()
            let region = new Path2D();
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18].forEach((f, i) => {
                const v = detection.landmarks.positions[f - 1]
                if (i == 0) {
                    region?.moveTo(v.x, v.y);
                } else {
                    region?.lineTo(v.x, v.y);
                }
            })

            region.closePath();
            context.clip(region, "evenodd");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();


            await new Promise<void>(resolve => {
                canvas['toBlob'](function (blob) {
                    if (blob) {
                        const link = document.createElement("a")
                        link.href = URL.createObjectURL(blob)
                        link.download = file.name
                        link.click()
                        link.remove()
                    }
                    canvas.width = canvas.height = 0x0;
                    resolve();
                }, 'image/png')
            })


        }
        setIsLoad(false);
    }, [images])

    return (
        <div className="">
            <div className="border-base-300 bg-base-200 rounded-b-box rounded-tr-box flex min-h-screen min-w-[18rem] max-w-full flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-4 undefined" style={{
                backgroundSize: "5px 5px"
            }}>
                <div className="card w-1/2 min-h-[500px] bg-base-100 shadow-xl v-full">
                    <h2 className="font-bold ml-3">FaceClip</h2>
                    <div className="card-body">
                        <h2 className="card-title flex justify-between">
                            <input
                                className="file-input w-full max-w-xs"
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const files = e.target.files || [];
                                    for (const file of files) {
                                        //@ts-ignore
                                        file.url = URL.createObjectURL(file);
                                    }
                                    setImages([...images, ...files]);
                                }} />
                            <div className="flex items-center gap-3">
                                <button className={`btn btn-primary ${isLoad && 'loading'}`} disabled={isLoad} onClick={onGo}>Go</button>
                            </div>
                        </h2>
                        <div className="divider"></div>
                        <div className="waterfall-container">
                            {images.map((image, index) => (
                                <div className="indicator waterfall-card">
                                    <span className="indicator-item badge cursor-pointer bg-red" onClick={() => {
                                        images.splice(index, 1)
                                        URL.revokeObjectURL((image as any).url)
                                        setImages([...images])
                                    }}>X</span>
                                    <div className="card bg-base-100 shadow-xl overflow-hidden">
                                        <figure><img src={(image as any).url} alt="Shoes" /></figure>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FaceClip;
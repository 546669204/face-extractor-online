
import React, { useCallback, useEffect, useState } from "react"

import { downloadZip } from "client-zip"
import * as faceapi from '@vladmandic/face-api/dist/face-api.esm.js';

const FaceExtart = () => {
    const [isLoad, setIsLoad] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [outputWidth, setOutputWidth] = useState<number>();
    useEffect(() => {
        (async () => {
            await faceapi.loadSsdMobilenetv1Model('./weights');
            setIsLoad(false)
        })()
    }, [])

    const onGo = useCallback(async () => {
        setIsLoad(true);
        const zipFiles: { name: string, lastModified: Date, input: Blob }[] = [];
        for (const file of images) {
            const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.45 })
            const image = await faceapi.bufferToImage(file);
            const detections = await faceapi.detectAllFaces(image, faceDetectionOptions)

            const detection = detections[0]
            if (!detection) continue;
            let canvas = document.createElement('canvas')
                , context = canvas['getContext']('2d');
            if (!context) return;
            const config = {
                'x': detection.box['x'],
                'y': detection.box['y'],
                'width': 1.25 * detection.box['width'],
                'height': 1.25 * detection['box'].height
            };
            config['x'] -= (config.width - detection.box.width) / 0x2;
            config['y'] -= (config['height'] - detection.box.height) / 0x2;
            config.width < config.height && (config['x'] -= (config.height - config.width) / 0x2,
                config['width'] = config.height);

            config.height < config.width && (config['y'] -= (config['width'] - config.height) / 0x2,
                config.height = config['width']);
            config['x'] < 0x0 && (config['x'] = 0x0);
            config['x'] + config.width > image.width && (config.width = image.width - config['x']);
            config['y'] < 0x0 && (config['y'] = 0x0);
            config['y'] + config['height'] > image['height'] && (config.height = image['height'] - config['y']);
            config['width'] > config.height && (config['x'] += (config.width - config['height']) / 0x2,
                config.width = config.height);
            config['height'] > config.width && (config['y'] += (config.height - config.width) / 0x2,
                config.height = config['width']);
            canvas.height = canvas.width = outputWidth || 512;
            context.drawImage(image, config['x'], config['y'], config.width, config.height, 0x0, 0x0, canvas['width'], canvas['height']);


            await new Promise<void>(resolve => {
                canvas['toBlob'](function (blob) {
                    if (blob)
                        zipFiles.push({ name: file.name, lastModified: new Date(), input: blob });
                    canvas.width = canvas.height = 0x0;
                    resolve();
                }, 'image/jpeg')
            })


        }
        // get the ZIP stream in a Blob
        const blob = await downloadZip(zipFiles).blob()

        // make and click a temporary link to download the Blob
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "test.zip"
        link.click()
        link.remove()
        setIsLoad(false);
    }, [images])

    return (
        <div className="">
            <div className="border-base-300 bg-base-200 rounded-b-box rounded-tr-box flex min-h-screen min-w-[18rem] max-w-full flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-4 undefined" style={{
                backgroundSize: "5px 5px"
            }}>
                <div className="card w-1/2 min-h-[500px] bg-base-100 shadow-xl v-full">
                    <h2 className="font-bold ml-3">FaceExtart</h2>
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
                                <div className="form-control w-full max-w-xs">
                                    <input type="text" placeholder="output width default:512" className="input input-bordered w-full max-w-xs"
                                        value={outputWidth}
                                        onChange={(e) => { setOutputWidth(+e.target.value) }}
                                    />
                                </div>
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
export default FaceExtart;
import React, { useEffect, useState, useLayoutEffect, useCallback, useMemo, useRef } from "react";
import Quagga from "quagga";
import useSettings from "../../../../../Storage/useSettings";
import styled from "styled-components";
const ScannerContainer = styled.div`
  margin-top: 2rem;
  height: 20rem;
  marbin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  > video {
    position: absolute;
    width: 100%;
  }
  > canvas {
    position: absolute;
    width: 100%;
  }
`;
function getMedian(arr) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
        return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
    const medianOfErrors = getMedian(errors);
    return medianOfErrors;
}

const defaultConstraints = {
    width: 640,
    height: 480,
};

const defaultLocatorSettings = {
    patchSize: 'medium',
    halfSample: true,
};

const defaultDecoders = ['i2of5_reader', "code_128_reader","code_39_reader"];

const ScanResult = styled.p`
font-size: 3rem;
color: black;
text-align:center;
`;
const Scanner = ({
    onDetected,
    onScannerReady,
    cameraId,
    facingMode,
    constraints = defaultConstraints,
    locator = defaultLocatorSettings,
    numOfWorkers = 1,
    decoders = defaultDecoders,
    locate = true,
}) => {
    const { scannerMode, setScannerMode } = useSettings();
    const containerRef = useRef();


    const errorCheck = useCallback((result) => {
        if (!onDetected) {
            return;
        }


        const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
        // if Quagga is at least 75% certain that it read correctly, then accept the code.
        if (err < 0.35) {
            onDetected(result.codeResult.code);
        }

    }, [onDetected]);

    const handleProcessed = (result) => {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;
        drawingCtx.font = "24px Arial";
        drawingCtx.fillStyle = 'green';

        if (result) {

            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
                // result.boxes.filter((box) => box !== result.box).forEach((box) => {
                //     Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'purple', lineWidth: 2 });
                // });
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
            }
            if (result.codeResult) {
                // const validated = barcodeValidator(result.codeResult.code);
                // const validated = validateBarcode(result.codeResult.code);
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'green', lineWidth: 5 });
                //console.warn('* quagga onProcessed', result);
                // drawingCtx.fillStyle = validated ? 'green' : 'red';
                // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
                //drawingCtx.fillText(result.codeResult.code, 10, 20);
                // if (validated) {
                //     onDetected(result);
                // }
            }
        }
    };

    useEffect(() => {
        if (parseInt(scannerMode) !== 0) {
            Quagga.init({
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        ...constraints,
                        ...(cameraId && { deviceId: cameraId }),
                        ...(!cameraId && { facingMode }),
                    },
                    target: containerRef.current,
                    singleChannel: false
                },
                locator,
                numOfWorkers,
                decoder: { readers: decoders },
                locate,
            }, (err) => {
                Quagga.onProcessed(handleProcessed);

                if (err) {
                    return console.log('Error starting Quagga:', err);
                }
                if (containerRef && containerRef.current) {
                    Quagga.start();
                    if (onScannerReady) {
                        onScannerReady();
                    }
                }
            });
            Quagga.onDetected(errorCheck);
            return () => {
                Quagga.offDetected(errorCheck);
                Quagga.offProcessed(handleProcessed);
                Quagga.stop();
            };
        }
    }, [cameraId, onDetected, onScannerReady, containerRef, errorCheck, constraints, locator, decoders, locate]);
    return parseInt(scannerMode) !== 0 ? <ScannerContainer ref={containerRef} /> : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2D7rllBdtd4e4KISPcUCC7is8xMR0e_Jolw&usqp=CAU'></img>;
}



export default Scanner;

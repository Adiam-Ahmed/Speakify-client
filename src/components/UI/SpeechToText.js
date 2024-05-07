import React, { useState, useEffect, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const SpeechToText = ({ onTranscriptUpdate }) => {
    const recognitionInstance = useRef(new window.webkitSpeechRecognition());
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const recognition = recognitionInstance.current;
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            const interimTranscript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join('');
            onTranscriptUpdate(interimTranscript);
        };
        return () => {
            recognition.stop();
        };
    }, [onTranscriptUpdate]);

    const startRecording = () => {
        recognitionInstance.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        recognitionInstance.current.stop();
        setIsRecording(false);
    };

    return (
        <div>
            {isRecording ? <div>Currently recording</div> : null}
            <div className="flex flex-col items-center justify-center w-full p-4">
                <div className="flex items-center w-full max-w-2xl">
                    <div className="relative w-full">
                        <div className="border border-primary rounded-lg p-4 max-w-2xl mx-auto m-4">

                        </div>
                        <div
                            className="absolute inset-y-0 right-2 flex items-center pl-3"
                            style={{ cursor: 'pointer' }}>
                            <div>
                                {isRecording ? (
                                    <StopIcon onClick={stopRecording} style={{ pointerEvents: 'auto' }} />
                                ) : (
                                    <MicIcon onClick={startRecording} style={{ pointerEvents: 'auto' }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="ml-2"
                    style={{ cursor: 'pointer' }}
                >
                </div>
            </div>
        </div>

    );
};

export default SpeechToText;

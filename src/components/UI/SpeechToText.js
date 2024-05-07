import React, { useState, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const SpeechToText = ({ onTranscriptUpdate }) => {
    // console.log(onTranscriptUpdate)
    const recognitionInstanceMain = useRef(new window.webkitSpeechRecognition());
    const recognitionInstance = recognitionInstanceMain.current
    recognitionInstance.continuous = true;
    recognitionInstance.lang = 'en-US';
    // const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    recognitionInstance.onresult = (event) => {
        const interimTranscript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');
        onTranscriptUpdate(interimTranscript);
    };


    const startRecording = () => {
        recognitionInstance.continuous = true;
        onTranscriptUpdate('');
        setIsRecording(true);
        recognitionInstance.start();
    };

    const stopRecording = () => {
        console.log('i clicked')
        recognitionInstance.continuous = false;
        recognitionInstance.abort()
        setIsRecording(false);
        recognitionInstance.stop();
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


import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Upload, Square, Play, Pause } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AudioRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
  onAudioUploaded: (audioBlob: Blob) => void;
}

const AudioRecorder = ({ onAudioRecorded, onAudioUploaded }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        onAudioRecorded(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone"
      });
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Please allow microphone access",
        variant: "destructive"
      });
    }
  }, [onAudioRecorded]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRecording]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        const audioUrl = URL.createObjectURL(file);
        setRecordedAudio(audioUrl);
        onAudioUploaded(file);
        
        toast({
          title: "File Uploaded",
          description: `${file.name} uploaded successfully`
        });
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload an audio file",
          variant: "destructive"
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Recording Controls */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          size="lg"
          className={`${
            isRecording 
              ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
              : 'bg-purple-600 hover:bg-purple-700'
          } transition-all duration-200`}
        >
          {isRecording ? (
            <>
              <Square className="w-5 h-5 mr-2" />
              Stop ({formatTime(recordingTime)})
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              Record Voice
            </>
          )}
        </Button>
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="lg"
          className="border-slate-600 text-white hover:bg-slate-700"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload Audio
        </Button>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-red-400">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <span className="font-mono text-lg">{formatTime(recordingTime)}</span>
          </div>
          <p className="text-gray-400 mt-2">Recording in progress...</p>
        </div>
      )}

      {/* Audio Preview */}
      {recordedAudio && (
        <Card className="bg-slate-700/50 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium">Recorded Audio</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlayback}
                className="text-purple-400 hover:text-purple-300"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <audio
              ref={audioRef}
              src={recordedAudio}
              onEnded={() => setIsPlaying(false)}
              className="w-full"
              controls
            />
          </CardContent>
        </Card>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default AudioRecorder;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Play, Download, Settings, Zap } from 'lucide-react';

interface VoiceStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface VoiceTransformerProps {
  voiceStyles: VoiceStyle[];
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  onTransform: () => void;
  isTransforming: boolean;
  transformedAudio: string | null;
  onDownload: () => void;
}

const VoiceTransformer = ({
  voiceStyles,
  selectedStyle,
  onStyleChange,
  onTransform,
  isTransforming,
  transformedAudio,
  onDownload
}: VoiceTransformerProps) => {
  const [pitchShift, setPitchShift] = useState([0]);
  const [formantShift, setFormantShift] = useState([0]);
  const [noiseReduction, setNoiseReduction] = useState([50]);
  const [bassBoost, setBassBoost] = useState([0]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Voice Transformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Style Selection */}
        <div className="grid grid-cols-2 gap-3">
          {voiceStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedStyle === style.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{style.icon}</span>
                <span className="text-white font-medium text-sm">{style.name}</span>
              </div>
              <p className="text-gray-400 text-xs">{style.description}</p>
            </button>
          ))}
        </div>

        {/* Advanced Controls Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-gray-400 hover:text-white"
        >
          <Settings className="w-4 h-4 mr-2" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Controls
        </Button>

        {/* Advanced Audio Controls */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg">
            <div>
              <label className="text-white text-sm mb-2 block">
                Pitch Shift: {pitchShift[0] > 0 ? '+' : ''}{pitchShift[0]} semitones
              </label>
              <Slider
                value={pitchShift}
                onValueChange={setPitchShift}
                min={-12}
                max={12}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Formant Shift: {formantShift[0] > 0 ? '+' : ''}{formantShift[0]}%
              </label>
              <Slider
                value={formantShift}
                onValueChange={setFormantShift}
                min={-50}
                max={50}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Noise Reduction: {noiseReduction[0]}%
              </label>
              <Slider
                value={noiseReduction}
                onValueChange={setNoiseReduction}
                min={0}
                max={100}
                step={10}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Bass Boost: {bassBoost[0] > 0 ? '+' : ''}{bassBoost[0]} dB
              </label>
              <Slider
                value={bassBoost}
                onValueChange={setBassBoost}
                min={-10}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Transform Button */}
        <Button
          onClick={onTransform}
          disabled={isTransforming}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isTransforming ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Transforming Voice...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Transform Voice
            </>
          )}
        </Button>

        {/* Transformation Progress */}
        {isTransforming && (
          <div className="space-y-2">
            <Progress value={33} className="w-full" />
            <p className="text-center text-gray-400 text-sm">
              Processing audio with AI models...
            </p>
          </div>
        )}

        {/* Transformed Audio Preview */}
        {transformedAudio && (
          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Transformed Audio</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-purple-400">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" onClick={onDownload} className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              
              <audio controls className="w-full">
                <source src={transformedAudio} type="audio/wav" />
              </audio>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceTransformer;

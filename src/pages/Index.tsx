
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Upload, Play, Download, Settings, Zap, Crown, Share2, BarChart3, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import AudioRecorder from '@/components/AudioRecorder';
import VoiceTransformer from '@/components/VoiceTransformer';
import AuthModal from '@/components/AuthModal';
import PricingSection from '@/components/PricingSection';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedAudio, setTransformedAudio] = useState<string | null>(null);
  const [selectedVoiceStyle, setSelectedVoiceStyle] = useState('podcast');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentTab, setCurrentTab] = useState('transform');
  const [exportsUsed, setExportsUsed] = useState(0);
  const { user, subscription } = useAuth();

  const voiceStyles = [
    {
      id: 'podcast',
      name: 'Podcast Voice',
      description: 'Clear, professional speaking voice',
      icon: '🎙️',
      color: 'bg-blue-500'
    },
    {
      id: 'trailer',
      name: 'Movie Trailer Voice',
      description: 'Epic, cinematic narration',
      icon: '🎬',
      color: 'bg-red-500'
    },
    {
      id: 'deep',
      name: 'Sexy Deep Voice',
      description: 'Rich, smooth, and alluring',
      icon: '💫',
      color: 'bg-purple-500'
    },
    {
      id: 'villain',
      name: 'Villain Voice',
      description: 'Dark, menacing character voice',
      icon: '👹',
      color: 'bg-gray-800'
    }
  ];

  const handleAudioRecorded = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    setCurrentAudio(audioUrl);
    toast({
      title: "Audio Recorded",
      description: "Your audio has been recorded successfully!"
    });
  };

  const handleAudioUploaded = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    setCurrentAudio(audioUrl);
    toast({
      title: "Audio Uploaded",
      description: "Your audio file has been uploaded successfully!"
    });
  };

  const handleVoiceTransform = async () => {
    if (!currentAudio) {
      toast({
        title: "No Audio",
        description: "Please record or upload audio first.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Check export limits
    const freeLimit = 5;
    if (!subscription.subscribed && exportsUsed >= freeLimit) {
      toast({
        title: "Export Limit Reached",
        description: "Upgrade to continue transforming voices!",
        variant: "destructive"
      });
      setCurrentTab('pricing');
      return;
    }

    setIsTransforming(true);
    
    try {
      // Simulate voice transformation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll use the same audio
      // In a real app, this would be processed through AI models
      setTransformedAudio(currentAudio);
      setExportsUsed(prev => prev + 1);
      
      toast({
        title: "Voice Transformed!",
        description: `Applied ${voiceStyles.find(v => v.id === selectedVoiceStyle)?.name} filter`
      });
    } catch (error) {
      toast({
        title: "Transformation Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsTransforming(false);
    }
  };

  const handleDownload = () => {
    if (transformedAudio) {
      const link = document.createElement('a');
      link.href = transformedAudio;
      link.download = `deepvoicex-${selectedVoiceStyle}-${Date.now()}.wav`;
      link.click();
      
      toast({
        title: "Download Started",
        description: "Your transformed voice is being downloaded!"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            DeepVoiceX
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Transform your voice with AI-powered deep learning technology
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
              <Zap className="w-4 h-4 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
              Real-time Preview
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-300">
              Professional Quality
            </Badge>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50">
            <TabsTrigger value="transform" className="text-white">
              <Volume2 className="w-4 h-4 mr-2" />
              Transform
            </TabsTrigger>
            <TabsTrigger value="pricing" className="text-white">
              <Crown className="w-4 h-4 mr-2" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="share" className="text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Refer Friends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transform" className="space-y-8">
            {user && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    Usage Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Exports Used</span>
                    <span className="text-white">
                      {exportsUsed} / {subscription.subscribed ? '∞' : '5'}
                    </span>
                  </div>
                  {!subscription.subscribed && (
                    <Progress 
                      value={(exportsUsed / 5) * 100} 
                      className="mb-4"
                    />
                  )}
                  {subscription.subscribed && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                      Premium Member
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Record or Upload Audio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AudioRecorder 
                    onAudioRecorded={handleAudioRecorded}
                    onAudioUploaded={handleAudioUploaded}
                  />
                  
                  {currentAudio && (
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <p className="text-green-400 mb-2">✓ Audio ready for transformation</p>
                      <audio controls className="w-full">
                        <source src={currentAudio} type="audio/wav" />
                      </audio>
                    </div>
                  )}
                </CardContent>
              </Card>

              <VoiceTransformer 
                voiceStyles={voiceStyles}
                selectedStyle={selectedVoiceStyle}
                onStyleChange={setSelectedVoiceStyle}
                onTransform={handleVoiceTransform}
                isTransforming={isTransforming}
                transformedAudio={transformedAudio}
                onDownload={handleDownload}
              />
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <PricingSection />
          </TabsContent>

          <TabsContent value="analytics">
            {user ? (
              <AnalyticsDashboard />
            ) : (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Sign in to view analytics
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Track your usage and see detailed analytics
                  </p>
                  <Button onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="share">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-purple-400" />
                  Refer Friends & Earn Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Earn 5 Free Exports
                  </h3>
                  <p className="text-gray-300 mb-4">
                    For every friend who signs up with your referral code
                  </p>
                  {user ? (
                    <div className="space-y-4">
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <p className="text-gray-400 mb-2">Your Referral Code:</p>
                        <code className="text-purple-400 text-lg font-mono">
                          DEEPVOICE{user.id?.slice(-6).toUpperCase()}
                        </code>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Referral Link
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setShowAuthModal(true)}>
                      Sign Up to Get Your Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default Index;

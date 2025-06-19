
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PricingSection = () => {
  const handleSubscribe = (plan: string) => {
    toast({
      title: "Subscription",
      description: `${plan} subscription will be available soon!`
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
        <p className="text-gray-300">Transform unlimited voices with premium features</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Free Plan */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <CardTitle className="text-white">Free</CardTitle>
            </div>
            <div className="text-3xl font-bold text-white">₹0</div>
            <p className="text-gray-400">per month</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                5 voice exports per month
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                4 preset voice styles
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Basic audio quality
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Standard processing time
              </li>
            </ul>
            <Button className="w-full" variant="outline">
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Plan */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-400" />
              <CardTitle className="text-white">Weekly Pro</CardTitle>
            </div>
            <div className="text-3xl font-bold text-white">₹99</div>
            <p className="text-gray-400">per week</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Unlimited voice exports
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                All voice styles + custom
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                HD audio quality
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Priority processing
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Advanced audio tools
              </li>
            </ul>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => handleSubscribe('Weekly Pro')}
            >
              Subscribe Weekly
            </Button>
          </CardContent>
        </Card>

        {/* Monthly Plan */}
        <Card className="bg-gradient-to-b from-purple-600/20 to-pink-600/20 border-purple-500/50 relative">
          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
            Most Popular
          </Badge>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <CardTitle className="text-white">Monthly Pro</CardTitle>
            </div>
            <div className="text-3xl font-bold text-white">₹249</div>
            <p className="text-gray-400">per month</p>
            <p className="text-sm text-green-400">Save 37%</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Unlimited voice exports
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                All voice styles + custom
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                HD audio quality
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Priority processing
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Advanced audio tools
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Analytics dashboard
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Priority support
              </li>
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => handleSubscribe('Monthly Pro')}
            >
              Subscribe Monthly
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingSection;

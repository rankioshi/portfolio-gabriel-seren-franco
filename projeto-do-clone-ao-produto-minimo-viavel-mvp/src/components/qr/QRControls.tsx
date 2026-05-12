import React, { useState, useEffect } from 'react';
import { useQRStore, QRStyle, CornerSquareStyle, CornerDotStyle } from '@/store/useQRStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { optimizeQRContent, generateQRDescription } from '@/services/aiService';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, Box, Image as ImageIcon, Sparkles, Save, History, Trash2, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function QRControls() {
  const options = useQRStore();
  const { user } = useAuth();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      const unsubscribe = options.fetchSavedQRs(user.uid);
      return () => unsubscribe();
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        options.setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptimize = async () => {
    if (!options.data) return;
    setIsOptimizing(true);
    try {
      const optimized = await optimizeQRContent(options.data);
      options.setData(optimized);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleSave = async () => {
    if (!user || !options.data) return;
    setIsSaving(true);
    try {
      const name = await generateQRDescription(options.data);
      await options.saveQR(user.uid, name);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass p-1 mb-6">
          <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
            <Sparkles className="w-4 h-4 mr-2" />
            Create
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
            <History className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="data" className="text-lg font-semibold">Content</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleOptimize}
                  disabled={isOptimizing || !options.data}
                  className="glass-hover border-primary/30 text-primary"
                >
                  <Sparkles className={`w-4 h-4 mr-2 ${isOptimizing ? 'animate-spin' : ''}`} />
                  {isOptimizing ? 'Optimizing...' : 'AI Optimize'}
                </Button>
              </div>
              <Input
                id="data"
                value={options.data}
                onChange={(e) => options.setData(e.target.value)}
                className="bg-white/5 border-white/10 h-12 text-lg focus:ring-primary/50"
                placeholder="Enter URL or text..."
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="appearance" className="border-white/10">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 font-semibold">
                    <Palette className="w-5 h-5 text-primary" />
                    Appearance
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dots Type</Label>
                      <Select value={options.dotsType} onValueChange={(val: QRStyle) => options.setOptions({ dotsType: val })}>
                        <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded'].map(t => (
                            <SelectItem key={t} value={t}>{t.replace('-', ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Dots Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={options.dotsColor} onChange={(e) => options.setOptions({ dotsColor: e.target.value })} className="w-10 h-10 p-1 bg-white/5 border-white/10 cursor-pointer" />
                        <Input type="text" value={options.dotsColor} onChange={(e) => options.setOptions({ dotsColor: e.target.value })} className="flex-1 bg-white/5 border-white/10 font-mono text-xs" />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="corners" className="border-white/10">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 font-semibold">
                    <Box className="w-5 h-5 text-primary" />
                    Corners
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <Label className="text-xs uppercase tracking-widest opacity-50">Corner Square</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={options.cornersSquareType} onValueChange={(val: CornerSquareStyle) => options.setOptions({ cornersSquareType: val })}>
                        <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['dots', 'square', 'extra-rounded'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input type="color" value={options.cornersSquareColor} onChange={(e) => options.setOptions({ cornersSquareColor: e.target.value })} className="w-full h-10 p-1 bg-white/5 border-white/10 cursor-pointer" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="logo" className="border-none">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 font-semibold">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Logo & Branding
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="bg-white/5 border-white/10 cursor-pointer" />
                    {options.image && (
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <Label>Logo Size</Label>
                          <span className="opacity-50">{Math.round(options.imageSize * 100)}%</span>
                        </div>
                        <Slider value={[options.imageSize * 100]} onValueChange={(val) => options.setOptions({ imageSize: val[0] / 100 })} max={50} min={10} step={1} />
                        <Button variant="destructive" size="sm" onClick={() => options.setImage(null)} className="w-full">Remove Logo</Button>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {user && (
              <Button 
                onClick={handleSave} 
                disabled={isSaving || !options.data}
                className="w-full h-12 text-lg font-bold shadow-xl shadow-primary/20"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSaving ? 'Saving...' : 'Save to Collection'}
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {!user ? (
            <div className="glass rounded-2xl p-12 text-center space-y-4">
              <History className="w-12 h-12 mx-auto opacity-20" />
              <p className="text-muted-foreground">Login to see your saved QR codes</p>
            </div>
          ) : options.savedQRs.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center space-y-4">
              <History className="w-12 h-12 mx-auto opacity-20" />
              <p className="text-muted-foreground">No saved QR codes yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {options.savedQRs.map((qr) => (
                  <motion.div
                    key={qr.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass p-4 rounded-xl flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm truncate max-w-[150px]">{qr.name}</h4>
                        <div className="flex items-center gap-3 text-xs opacity-50">
                          <span>{qr.scans || 0} scans</span>
                          <span>•</span>
                          <span className="truncate max-w-[100px]">{qr.data}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => options.setOptions({ data: qr.data, ...qr.config })}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Sparkles className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => options.deleteQR(qr.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

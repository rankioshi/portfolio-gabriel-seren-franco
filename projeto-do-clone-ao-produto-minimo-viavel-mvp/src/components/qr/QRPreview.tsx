import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { FileExtension } from 'qr-code-styling';
import { useQRStore } from '@/store/useQRStore';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Download, Share2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function QRPreview() {
  const options = useQRStore();
  const [isPremium, setIsPremium] = useState(false);
  const [qrCode] = useState<QRCodeStyling>(() => new QRCodeStyling({
    width: options.width,
    height: options.height,
    margin: options.margin,
    data: options.data,
    dotsOptions: {
      color: options.dotsColor,
      type: options.dotsType,
    },
    backgroundOptions: {
      color: options.backgroundColor,
    },
    cornersSquareOptions: {
      color: options.cornersSquareColor,
      type: options.cornersSquareType,
    },
    cornersDotOptions: {
      color: options.cornersDotColor,
      type: options.cornersDotType,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: options.imageMargin,
      imageSize: options.imageSize,
    },
    image: options.image || undefined,
  }));

  const ref = useRef<HTMLDivElement>(null);
  const [fileExtension, setFileExtension] = useState<FileExtension>('png');

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    qrCode.update({
      width: isPremium ? options.width * 2 : options.width,
      height: isPremium ? options.height * 2 : options.height,
      margin: options.margin,
      data: options.data,
      dotsOptions: {
        color: options.dotsColor,
        type: options.dotsType,
      },
      backgroundOptions: {
        color: options.backgroundColor,
      },
      cornersSquareOptions: {
        color: options.cornersSquareColor,
        type: options.cornersSquareType,
      },
      cornersDotOptions: {
        color: options.cornersDotColor,
        type: options.cornersDotType,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: options.imageMargin,
        imageSize: options.imageSize,
      },
      image: options.image || undefined,
    });
  }, [qrCode, options, isPremium]);

  const onDownload = () => {
    qrCode.download({
      extension: fileExtension,
      name: `qrcraft-${Date.now()}`,
    });
  };

  return (
    <div className="sticky top-8 space-y-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div ref={ref} className="qr-container bg-white p-4 rounded-2xl shadow-inner" />
        
        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-primary/60">
          <ShieldCheck className="w-4 h-4" />
          Secure & Verified by QRCraft AI
        </div>
      </motion.div>
      
      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-bold">Premium High-Res</Label>
            <p className="text-[10px] text-muted-foreground">Double resolution for printing</p>
          </div>
          <Switch 
            checked={isPremium} 
            onCheckedChange={setIsPremium}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <div className="flex gap-3">
          <div className="w-32">
            <Select
              value={fileExtension}
              onValueChange={(value) => setFileExtension(value as FileExtension)}
            >
              <SelectTrigger className="h-12 bg-white/5 border-white/10">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="webp">WEBP</SelectItem>
                <SelectItem value="svg">SVG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={onDownload}
            className="flex-1 h-12 font-bold shadow-lg shadow-primary/20"
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 glass-hover border-white/10">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

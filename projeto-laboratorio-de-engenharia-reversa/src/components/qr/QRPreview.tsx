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
import { Download } from 'lucide-react';

export function QRPreview() {
  const options = useQRStore();
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
    });
  }, [qrCode, options]);

  const onDownload = () => {
    qrCode.download({
      extension: fileExtension,
      name: 'qr-code',
    });
  };

  return (
    <div className="sticky top-8 space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center justify-center overflow-hidden">
        <div ref={ref} className="qr-container" />
      </div>
      
      <div className="flex gap-3">
        <div className="w-32">
          <Select
            value={fileExtension}
            onValueChange={(value) => setFileExtension(value as FileExtension)}
          >
            <SelectTrigger className="h-12 bg-white border-gray-200">
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
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all h-12 shadow-md flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download
        </Button>
      </div>
    </div>
  );
}

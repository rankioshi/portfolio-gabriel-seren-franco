import React from 'react';
import { useQRStore, QRStyle, CornerSquareStyle, CornerDotStyle } from '@/store/useQRStore';
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
import { Settings, Palette, Box, Image as ImageIcon } from 'lucide-react';

export function QRControls() {
  const options = useQRStore();

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

  return (
    <div className="space-y-6">
      <div className="bg-[#e5e5e5] rounded-xl p-1 border border-gray-200 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          {/* Main Options */}
          <AccordionItem value="main" className="border-none px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <Settings className="w-5 h-5 text-purple-600" />
                Main Options
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label htmlFor="data">Data (URL or Text)</Label>
                <Input
                  id="data"
                  value={options.data}
                  onChange={(e) => options.setData(e.target.value)}
                  className="bg-white border-gray-300"
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={options.width}
                    onChange={(e) => options.setOptions({ width: Number(e.target.value) })}
                    className="bg-white border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={options.height}
                    onChange={(e) => options.setOptions({ height: Number(e.target.value) })}
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Margin</Label>
                  <span className="text-xs text-gray-500 font-mono">{options.margin}px</span>
                </div>
                <Slider
                  value={[options.margin]}
                  onValueChange={(val) => options.setOptions({ margin: Array.isArray(val) ? val[0] : val })}
                  max={50}
                  step={1}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Dots Options */}
          <AccordionItem value="dots" className="border-none px-4">
            <AccordionTrigger className="hover:no-underline py-4 border-t border-gray-300">
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <Palette className="w-5 h-5 text-purple-600" />
                Dots Options
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label>Dots Type</Label>
                <Select
                  value={options.dotsType}
                  onValueChange={(val: QRStyle) => options.setOptions({ dotsType: val })}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dots">Dots</SelectItem>
                    <SelectItem value="rounded">Rounded</SelectItem>
                    <SelectItem value="classy">Classy</SelectItem>
                    <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dotsColor">Dots Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="dotsColor"
                    type="color"
                    value={options.dotsColor}
                    onChange={(e) => options.setOptions({ dotsColor: e.target.value })}
                    className="w-12 h-10 p-1 bg-white border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={options.dotsColor}
                    onChange={(e) => options.setOptions({ dotsColor: e.target.value })}
                    className="flex-1 bg-white border-gray-300 font-mono"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Corners Options */}
          <AccordionItem value="corners" className="border-none px-4">
            <AccordionTrigger className="hover:no-underline py-4 border-t border-gray-300">
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <Box className="w-5 h-5 text-purple-600" />
                Corners Options
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Corners Square</h4>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={options.cornersSquareType}
                    onValueChange={(val: CornerSquareStyle) => options.setOptions({ cornersSquareType: val })}
                  >
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={options.cornersSquareColor}
                      onChange={(e) => options.setOptions({ cornersSquareColor: e.target.value })}
                      className="w-12 h-10 p-1 bg-white border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={options.cornersSquareColor}
                      onChange={(e) => options.setOptions({ cornersSquareColor: e.target.value })}
                      className="flex-1 bg-white border-gray-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Corners Dot</h4>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={options.cornersDotType}
                    onValueChange={(val: CornerDotStyle) => options.setOptions({ cornersDotType: val })}
                  >
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={options.cornersDotColor}
                      onChange={(e) => options.setOptions({ cornersDotColor: e.target.value })}
                      className="w-12 h-10 p-1 bg-white border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={options.cornersDotColor}
                      onChange={(e) => options.setOptions({ cornersDotColor: e.target.value })}
                      className="flex-1 bg-white border-gray-300 font-mono"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Logo Options */}
          <AccordionItem value="logo" className="border-none px-4">
            <AccordionTrigger className="hover:no-underline py-4 border-t border-gray-300">
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Logo Options
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Upload Logo</Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-white border-gray-300 cursor-pointer"
                />
                {options.image && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => options.setImage(null)}
                    className="w-full mt-2"
                  >
                    Remove Logo
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Logo Size</Label>
                  <span className="text-xs text-gray-500 font-mono">{Math.round(options.imageSize * 100)}%</span>
                </div>
                <Slider
                  value={[options.imageSize * 100]}
                  onValueChange={(val) => options.setOptions({ imageSize: (Array.isArray(val) ? val[0] : val) / 100 })}
                  max={50}
                  min={10}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Logo Margin</Label>
                  <span className="text-xs text-gray-500 font-mono">{options.imageMargin}px</span>
                </div>
                <Slider
                  value={[options.imageMargin]}
                  onValueChange={(val) => options.setOptions({ imageMargin: Array.isArray(val) ? val[0] : val })}
                  max={20}
                  step={1}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

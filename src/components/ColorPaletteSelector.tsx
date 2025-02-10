import React from "react";
import { Card } from "./ui/card";
import { Palette } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { COLOR_PALETTES } from "@/lib/color-palettes";
const ColorPaletteSelector = ({ palette, setPalette }: { palette: string; setPalette: (palette: string) => void }) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <span className="font-medium">Color Palette</span>
        </div>
        <Select value={palette} onValueChange={setPalette}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a color palette" />
          </SelectTrigger>
          <SelectContent>
            <SelectContent>
              <SelectItem value="none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-500" />
                  </div>
                  <span>No Color Restriction</span>
                </div>
              </SelectItem>
              {Object.entries(COLOR_PALETTES).map(([key, colors]) => {
                if (key === "none") return null; // Skip the none option since we added it above
                return (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {colors.colors.map((color) => (
                          <div
                            key={color}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="capitalize">{key}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default ColorPaletteSelector;

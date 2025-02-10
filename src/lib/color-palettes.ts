// Enhanced color palettes with descriptive names and hex + natural language colors


// Base colors for different themes
const THEME_BASES = {
    forest: {
      baseColors: ['#2D5A27', '#8B4513', '#A0522D', '#228B22'],
      descriptions: ['pine green', 'rich bark brown', 'redwood', 'forest green'],
      style: 'woodland and earthy'
    },
    candy: {
      baseColors: ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB'],
      descriptions: ['hot pink', 'deep pink', 'bubble gum', 'cotton candy'],
      style: 'sweet and playful'
    },
    cosmic: {
      baseColors: ['#663399', '#4B0082', '#9370DB', '#8A2BE2'],
      descriptions: ['cosmic purple', 'indigo night', 'mystic lavender', 'stellar violet'],
      style: 'mystical and ethereal'
    }
    // Add more base themes as needed
  };
  
  function generateColorVariation(baseColor: string, amount: number = 20): string {
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    
    // Adjust each channel
    const newR = Math.min(255, Math.max(0, r + (Math.random() - 0.5) * amount));
    const newG = Math.min(255, Math.max(0, g + (Math.random() - 0.5) * amount));
    const newB = Math.min(255, Math.max(0, b + (Math.random() - 0.5) * amount));
    
    // Convert back to hex
    return '#' + [newR, newG, newB]
      .map(x => Math.round(x).toString(16).padStart(2, '0'))
      .join('');
  }
  
  function generateThemeVariations() {
    const generatedPalettes: Record<string, any> = {
      none: {
        colors: [],
        descriptions: [],
        style: "unrestricted",
      }
    };
  
    // Generate variations for each theme
    Object.entries(THEME_BASES).forEach(([themeName, baseTheme]) => {
      // Generate main theme
      generatedPalettes[themeName] = {
        colors: baseTheme.baseColors,
        descriptions: baseTheme.descriptions,
        style: baseTheme.style
      };
  
      // Generate light version
      generatedPalettes[`${themeName}_light`] = {
        colors: baseTheme.baseColors.map(color => generateColorVariation(color, -40)),
        descriptions: baseTheme.descriptions.map(desc => `light ${desc}`),
        style: `light ${baseTheme.style}`
      };
  
      // Generate dark version
      generatedPalettes[`${themeName}_dark`] = {
        colors: baseTheme.baseColors.map(color => generateColorVariation(color, 40)),
        descriptions: baseTheme.descriptions.map(desc => `dark ${desc}`),
        style: `deep ${baseTheme.style}`
      };
    });
  
    return generatedPalettes;
  }
  
  // Generate season-based palettes
  function generateSeasonalPalettes() {
    return {
      spring: {
        colors: ['#FFB7C5', '#98FB98', '#87CEEB', '#DDA0DD'],
        descriptions: ['cherry blossom', 'fresh grass', 'spring sky', 'wild flower'],
        style: 'fresh and blooming'
      },
      summer: {
        colors: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3'],
        descriptions: ['summer coral', 'tropical aqua', 'sunshine yellow', 'beach foam'],
        style: 'bright and vibrant'
      },
      autumn: {
        colors: ['#D35400', '#C0392B', '#F39C12', '#935116'],
        descriptions: ['maple orange', 'autumn red', 'harvest gold', 'acorn brown'],
        style: 'warm and rustic'
      },
      winter: {
        colors: ['#2980B9', '#BDC3C7', '#2C3E50', '#ECF0F1'],
        descriptions: ['crystal blue', 'silver gray', 'deep azure', 'soft white'],
        style: 'serene and minimalist'
      }
    };
  }
  

  // Additional themed generators
const generateMoodPalettes = () => ({
    calm: {
      colors: ['#E0F4FF', '#87CEEB', '#B0C4DE', '#E6E6FA'],
      descriptions: ['serene blue', 'peaceful sky', 'gentle lavender', 'tranquil mist'],
      style: 'peaceful and calming'
    },
    energetic: {
      colors: ['#FF4500', '#FFD700', '#FF6B6B', '#FFA07A'],
      descriptions: ['vibrant orange', 'dynamic yellow', 'energetic red', 'lively coral'],
      style: 'dynamic and energizing'
    }
  });
  
  const generateCulturePalettes = () => ({
    mediterranean: {
      colors: ['#0073CF', '#FFFFFF', '#F5DEB3', '#7B3F00'],
      descriptions: ['aegean blue', 'white wash', 'sandy beige', 'terra cotta'],
      style: 'coastal mediterranean'
    },
    nordic: {
      colors: ['#FFFFFF', '#BCE7FD', '#BAB7B6', '#1B1B1B'],
      descriptions: ['pure white', 'glacier blue', 'stone gray', 'nordic black'],
      style: 'scandinavian minimal'
    }
  });
  export const COLOR_PALETTES = {
    ...generateThemeVariations(),
    ...generateSeasonalPalettes(),
    none: {
      colors: [],
      descriptions: [],
      style: "unrestricted",
    },
    modern: {
      colors: ["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9"],
      descriptions: ["charcoal gray", "slate gray", "light gray", "ice white"],
      style: "minimalist and contemporary",
    },
    nature: {
      colors: ["#27AE60", "#2ECC71", "#F1C40F", "#E67E22"],
      descriptions: [
        "emerald green",
        "fresh leaf green",
        "sunflower yellow",
        "autumn orange",
      ],
      style: "organic and natural",
    },
    ocean: {
      colors: ["#1ABC9C", "#3498DB", "#34495E", "#ECF0F1"],
      descriptions: ["turquoise", "ocean blue", "deep navy", "seafoam white"],
      style: "coastal and serene",
    },
    sunset: {
      colors: ["#E74C3C", "#C0392B", "#F39C12", "#F1C40F"],
      descriptions: [
        "bright red",
        "deep crimson",
        "amber orange",
        "golden yellow",
      ],
      style: "warm and dramatic",
    },
    pastel: {
      colors: ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"],
      descriptions: ["soft pink", "mint green", "baby blue", "light yellow"],
      style: "soft and delicate",
    },
  };

  // Combine all generators
  export const EXTENDED_COLOR_PALETTES = {
    ...COLOR_PALETTES,
    ...generateMoodPalettes(),
    ...generateCulturePalettes()
  };
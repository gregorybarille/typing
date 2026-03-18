// Accent color presets based on shadcn/ui color palette
// Each entry defines the HSL values for --primary, --primary-foreground, and --ring

export interface AccentColor {
  name: string
  label: string
  // HSL strings (without the hsl() wrapper) for CSS variable assignment
  primary: string
  primaryForeground: string
  ring: string
  // Hex approximation for the swatch preview circle
  swatch: string
}

export const ACCENT_COLORS: AccentColor[] = [
  {
    name: "blue",
    label: "Blue",
    primary: "221.2 83.2% 53.3%",
    primaryForeground: "210 40% 98%",
    ring: "221.2 83.2% 53.3%",
    swatch: "#3b82f6",
  },
  {
    name: "violet",
    label: "Violet",
    primary: "263.4 70% 50.4%",
    primaryForeground: "210 40% 98%",
    ring: "263.4 70% 50.4%",
    swatch: "#7c3aed",
  },
  {
    name: "rose",
    label: "Rose",
    primary: "346.8 77.2% 49.8%",
    primaryForeground: "355.7 100% 99%",
    ring: "346.8 77.2% 49.8%",
    swatch: "#e11d48",
  },
  {
    name: "orange",
    label: "Orange",
    primary: "24.6 95% 53.1%",
    primaryForeground: "60 9.1% 97.8%",
    ring: "24.6 95% 53.1%",
    swatch: "#f97316",
  },
  {
    name: "green",
    label: "Green",
    primary: "142.1 76.2% 36.3%",
    primaryForeground: "355.7 100% 99%",
    ring: "142.1 76.2% 36.3%",
    swatch: "#16a34a",
  },
  {
    name: "yellow",
    label: "Yellow",
    primary: "47.9 95.8% 53.1%",
    primaryForeground: "26 83.3% 14.1%",
    ring: "47.9 95.8% 53.1%",
    swatch: "#eab308",
  },
  {
    name: "slate",
    label: "Slate",
    primary: "215.3 25% 26.7%",
    primaryForeground: "210 40% 98%",
    ring: "215.3 25% 26.7%",
    swatch: "#334155",
  },
  {
    name: "zinc",
    label: "Zinc",
    primary: "240 5.9% 10%",
    primaryForeground: "0 0% 98%",
    ring: "240 5.9% 10%",
    swatch: "#18181b",
  },
]

export function applyTheme(colorName: string): void {
  const color = ACCENT_COLORS.find((c) => c.name === colorName) ?? ACCENT_COLORS[0]
  const root = document.documentElement
  root.style.setProperty("--primary", color.primary)
  root.style.setProperty("--primary-foreground", color.primaryForeground)
  root.style.setProperty("--ring", color.ring)
}

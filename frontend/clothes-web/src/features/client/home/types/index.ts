export interface BannerItem {
  title: string;
  tag: string;
  image: string;
}

export interface CategoryItemData {
  name: string;
  icon: string;
}

export interface MainContentProps {
  createRipple: (event: React.MouseEvent<HTMLElement>) => void;
}


export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

export interface MenuItemSlider {
  name: string;
  hasSubMenu: boolean;
}

export interface HeroSliderProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  parallaxOffset: number;
  createRipple: (event: React.MouseEvent<HTMLButtonElement>) => void;
  heroSlides: HeroSlide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}
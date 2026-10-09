export type DemoGeneratedImage = {
  id: string;
  src: string;
  garments?: string[];
  styles?: string[];
  occasions?: string[];
  colors?: string[];
  keywords?: string[];
};

export const demoGeneratedImages: DemoGeneratedImage[] = [
  {
    id: 'nhat-binh-red-temple',
    src: '/demo-generated/trang-phuc-1.jpg',
    garments: ['ao nhat binh', 'nhat binh', 'ao dai'],
    styles: ['traditional', 'truyen thong', 'thanh lich'],
    occasions: ['hue', 'temple', 'chua', 'heritage', 'di san'],
    colors: ['do', 'red', 'son', 'xanh cham', 'vang nghe'],
    keywords: ['cung dinh', 'co phuc', 'hue', 'den co'],
  },
  {
    id: 'tu-than-brown-heritage',
    src: '/demo-generated/trang-phuc-2.jpg',
    garments: ['ao tu than', 'tu than'],
    styles: ['traditional', 'truyen thong', 'retro', 'cottagecore'],
    occasions: ['hanoi', 'heritage', 'di san', 'chua'],
    colors: ['nau', 'brown', 'hong', 'den than'],
    keywords: ['non quai thao', 'pho co', 'lang co', 'ho nuoc'],
  },
  {
    id: 'ngu-than-blue-streetwear',
    src: '/demo-generated/trang-phuc-3.jpg',
    garments: ['ao ngu than', 'ngu than', 'ao the'],
    styles: ['streetwear', 'cach tan', 'y2k', 'toi gian'],
    occasions: ['hue', 'heritage', 'di san'],
    colors: ['xanh cham', 'blue', 'trang', 'den than'],
    keywords: ['ao khoac dai', 'co dung', 'cong thanh', 'hien dai'],
  },
  {
    id: 'tu-than-red-lotus',
    src: '/demo-generated/Áo đỏ bên hồ sen cổ kính.png',
    garments: ['ao tu than', 'tu than'],
    styles: ['traditional', 'truyen thong', 'thanh lich'],
    occasions: ['hanoi', 'temple', 'chua', 'heritage', 'di san'],
    colors: ['do', 'red', 'son', 'den than'],
    keywords: ['hoa sen', 'ho sen', 'sen', 'co kinh', 'ao do'],
  },
  { id: 'default', src: '/demo-generated/trang-phuc-2.jpg' },
];

export const DEMO_PLACEHOLDER = '/hero/hero-tu-than.webp';

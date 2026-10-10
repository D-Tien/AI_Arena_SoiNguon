export type DemoGeneratedImage = {
  id: string;
  src: string;
  gender?: 'male' | 'female';
  garments?: string[];
  styles?: string[];
  occasions?: string[];
  colors?: string[];
  keywords?: string[];
};

export const demoGeneratedImages: DemoGeneratedImage[] = [
  {
    id: 'nhat-binh-red-temple',
    gender: 'female',
    src: '/demo-generated/trang-phuc-1.jpg',
    garments: ['ao nhat binh', 'nhat binh', 'ao dai'],
    styles: ['traditional', 'truyen thong', 'thanh lich'],
    occasions: ['hue', 'temple', 'chua', 'heritage', 'di san'],
    colors: ['do', 'red', 'son', 'xanh cham', 'vang nghe'],
    keywords: ['cung dinh', 'co phuc', 'hue', 'den co'],
  },
  {
    id: 'tu-than-brown-heritage',
    gender: 'female',
    src: '/demo-generated/trang-phuc-2.jpg',
    garments: ['ao tu than', 'tu than'],
    styles: ['traditional', 'truyen thong', 'retro', 'cottagecore'],
    occasions: ['hanoi', 'heritage', 'di san', 'chua'],
    colors: ['nau', 'brown', 'hong', 'den than'],
    keywords: ['non quai thao', 'pho co', 'lang co', 'ho nuoc'],
  },
  {
    id: 'ngu-than-blue-streetwear',
    gender: 'female',
    src: '/demo-generated/trang-phuc-3.jpg',
    garments: ['ao ngu than', 'ngu than', 'ao the'],
    styles: ['streetwear', 'cach tan', 'y2k', 'toi gian'],
    occasions: ['hue', 'heritage', 'di san'],
    colors: ['xanh cham', 'blue', 'trang', 'den than'],
    keywords: ['ao khoac dai', 'co dung', 'cong thanh', 'hien dai'],
  },
  {
    id: 'tu-than-red-lotus',
    gender: 'female',
    src: '/demo-generated/Áo đỏ bên hồ sen cổ kính.png',
    garments: ['ao tu than', 'tu than'],
    styles: ['traditional', 'truyen thong', 'thanh lich'],
    occasions: ['hanoi', 'temple', 'chua', 'heritage', 'di san'],
    colors: ['do', 'red', 'son', 'den than'],
    keywords: ['hoa sen', 'ho sen', 'sen', 'co kinh', 'ao do'],
  },
  {
    id: 'ba-ba-red-heritage',
    gender: 'female',
    src: '/demo-generated/dc383066-b1e8-4fc5-a360-64d32feead7b.png',
    garments: ['ao ba ba', 'ba ba'],
    styles: ['traditional', 'truyen thong', 'thanh lich'],
    occasions: ['mien tay', 'nam bo', 'heritage', 'di san', 'lang que'],
    colors: ['do', 'red', 'son', 'do ruou', 'burgundy'],
    keywords: ['nha co', 'nha go', 'hoa sen', 'ho sen', 'sen', 'co kinh'],
  },
  {
    id: 'ngu-than-male-blue-hue',
    gender: 'male',
    src: '/demo-generated/0693c881-13ee-4986-86fe-d2315eaffa1c.png',
    garments: ['ao ngu than', 'ngu than', 'ao dai'],
    styles: ['traditional', 'truyen thong', 'thanh lich'],
    occasions: ['hue', 'heritage', 'di san', 'cung dinh'],
    colors: ['xanh cham', 'xanh duong', 'xanh navy', 'blue', 'navy'],
    keywords: ['dai noi', 'cong thanh', 'hoang thanh', 'cung dinh'],
  },
  {
    id: 'ba-ba-male-brown-river',
    gender: 'male',
    src: '/demo-generated/2b395584-2d04-4bb4-9e1f-3ee89cdd854c.png',
    garments: ['ao ba ba', 'ba ba'],
    styles: ['traditional', 'truyen thong', 'retro', 'moc mac'],
    occasions: ['nambo', 'mien tay', 'nam bo', 'lang que', 'song nuoc'],
    colors: ['nau', 'brown'],
    keywords: ['ben song', 'nha co', 'nha go', 'thuyen', 'ghe', 'mien tay'],
  },
  {
    id: 'ao-dai-male-green-heritage',
    gender: 'male',
    src: '/demo-generated/f132857c-a2b5-4f18-a8f6-7bfcd0aa8a41.png',
    garments: ['ao dai', 'ao the'],
    styles: ['traditional', 'truyen thong', 'thanh lich', 'retro'],
    occasions: ['hanoi', 'heritage', 'di san', 'lang co'],
    colors: ['xanh la', 'xanh luc', 'xanh reu', 'green'],
    keywords: ['nha co', 'nha go', 'san gach', 'co kinh'],
  },
  { id: 'default', gender: 'female', src: '/demo-generated/trang-phuc-2.jpg' },
  { id: 'default-male', gender: 'male', src: '/demo-generated/0693c881-13ee-4986-86fe-d2315eaffa1c.png' },
];

export const DEMO_PLACEHOLDER = '/hero/hero-tu-than.webp';

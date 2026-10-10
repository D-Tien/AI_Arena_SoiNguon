export type ImageKind = 'scene' | 'costume' | 'accessory' | 'look';

export interface ImageManifestItem {
    slot: string;
    alt: string;
    kind: ImageKind;
    localPath?: string;
    commons?: {
        fileTitle: string;
        author: string;
        license: string;
        sourceUrl: string;
    };
    aiPrompt?: string;
    credit: string;
}

export const imageManifest: ImageManifestItem[] = [
    // Scenes
    {
        slot: 'scene-hanoi',
        alt: 'Phố cổ Hà Nội tĩnh lặng',
        kind: 'scene',
        localPath: '/images/scene-hanoi.webp',
        aiPrompt: 'Ảnh phong cảnh phong cách tạp chí du lịch, phố cổ Hà Nội buổi sáng, mái ngói rêu, sương mỏng, ánh sáng tự nhiên, nét chân thực',
        credit: 'Ảnh do AI tạo'
    },
    {
        slot: 'scene-hue',
        alt: 'Đại nội Huế uy nghiêm',
        kind: 'scene',
        localPath: '/images/scene-hue.webp',
        aiPrompt: 'Ảnh phong cảnh phong cách tạp chí du lịch, Đại Nội Huế, ngọ môn, mái ngói lưu ly, ánh sáng vàng ấm, nét chân thực',
        credit: 'Ảnh do AI tạo'
    },
    {
        slot: 'scene-nambo',
        alt: 'Sông nước Nam Bộ thanh bình',
        kind: 'scene',
        localPath: '/images/scene-nambo.webp',
        aiPrompt: 'Ảnh phong cảnh phong cách tạp chí du lịch, chợ nổi Cái Răng miền Tây, ghe xuồng, hàng dừa nước, ánh sáng tự nhiên, nét chân thực',
        credit: 'Ảnh do AI tạo'
    },
    // Events
    {
        slot: 'event-cafe',
        alt: 'Quán cà phê góc phố',
        kind: 'scene',
        localPath: '/images/event-cafe.webp',
        aiPrompt: 'Quán cà phê vỉa hè Hà Nội, ghế nhựa, ánh nắng thu',
        credit: 'Ảnh do AI tạo'
    },
    {
        slot: 'event-heritage',
        alt: 'Thăm di tích lịch sử',
        kind: 'scene',
        localPath: '/images/event-heritage.webp',
        aiPrompt: 'Cổng đình làng, sân gạch đỏ cổ kính',
        credit: 'Ảnh do AI tạo'
    },
    {
        slot: 'event-spring',
        alt: 'Du xuân',
        kind: 'scene',
        localPath: '/images/event-spring.webp',
        aiPrompt: 'Chợ hoa ngày Tết, hoa đào hoa mai nở rộ',
        credit: 'Ảnh do AI tạo'
    },
    {
        slot: 'event-temple',
        alt: 'Đi lễ chùa',
        kind: 'scene',
        localPath: '/images/event-temple.webp',
        aiPrompt: 'Mái chùa cổ kính rêu phong, khói hương mờ ảo',
        credit: 'Ảnh do AI tạo'
    },
    // Costumes
    { slot: 'costume-ao-dai', alt: 'Áo dài', kind: 'costume', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-tu-than', alt: 'Áo tứ thân', kind: 'costume', localPath: '/images/costumes/ao-tu-than.jpg', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-ngu-than-female', alt: 'Áo ngũ thân', kind: 'costume', localPath: '/images/costumes/ngu-than-nu.jpg', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-ngu-than-male', alt: 'Áo ngũ thân', kind: 'costume', localPath: '/images/costumes/ngu-than-nam.jpg', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-nhat-binh', alt: 'Áo nhật bình', kind: 'costume', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-giao-linh', alt: 'Áo giao lĩnh', kind: 'costume', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-tac', alt: 'Áo tấc', kind: 'costume', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-the', alt: 'Áo the nam', kind: 'costume', localPath: '/images/costumes/ao-the.jpg', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-ba-ba-female', alt: 'Áo bà ba', kind: 'costume', localPath: '/images/costumes/ba-ba-nu.jpg', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-ba-ba-male', alt: 'Áo bà ba', kind: 'costume', localPath: '/images/costumes/ba-ba-nam.jpg', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-canh', alt: 'Áo cánh', kind: 'costume', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-yem', alt: 'Yếm váy', kind: 'costume', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-chen', alt: 'Áo chẽn', kind: 'costume', credit: 'Ảnh do AI tạo' },
    { slot: 'costume-ao-mang-bao', alt: 'Mạng bào', kind: 'costume', credit: 'Ảnh do AI tạo' },
];

export const getManifestItem = (slot: string): ImageManifestItem | undefined => {
    return imageManifest.find(item => item.slot === slot);
};

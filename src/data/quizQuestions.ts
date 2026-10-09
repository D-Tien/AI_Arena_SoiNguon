export type QuizQuestion = {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    xp: number;
    category?: string;
};

export const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Tên gọi áo ngũ thân nói đến đặc điểm nào?', options: ['Năm màu vải', 'Năm thân vải', 'Năm túi áo', 'Năm lớp cổ'], correctAnswer: 1, explanation: 'Áo ngũ thân được ghép từ năm thân vải, gồm bốn thân chính và một thân con.', xp: 10 },
    { id: 2, question: 'Áo tứ thân thường gắn với vùng nào?', options: ['Tây Nguyên', 'Nam Bộ', 'Bắc Bộ', 'Nam Trung Bộ'], correctAnswer: 2, explanation: 'Áo tứ thân gắn với trang phục phụ nữ truyền thống ở Bắc Bộ.', xp: 10 },
    { id: 3, question: 'Áo bà ba thường gắn với vùng nào?', options: ['Nam Bộ', 'Tây Bắc', 'Đông Bắc', 'Tây Nguyên'], correctAnswer: 0, explanation: 'Áo bà ba là trang phục quen thuộc trong đời sống của người dân Nam Bộ.', xp: 10 },
    { id: 4, question: 'Đặc điểm dễ nhận biết của áo dài là gì?', options: ['Không có tay áo', 'Chỉ dài đến eo', 'Luôn có bốn tà', 'Hai tà dài, xẻ hai bên'], correctAnswer: 3, explanation: 'Áo dài có hai tà trước và sau, với đường xẻ hai bên thân áo.', xp: 10 },
    { id: 5, question: 'Áo dài thường được mặc cùng trang phục nào?', options: ['Quần dài', 'Quần giáp', 'Váy tutu', 'Quần bơi'], correctAnswer: 0, explanation: 'Áo dài thường được kết hợp với quần dài, tạo nên dáng trang phục quen thuộc.', xp: 10 },
    { id: 6, question: 'Áo Nhật Bình gắn với triều đại nào?', options: ['Nhà Đinh', 'Nhà Nguyễn', 'Nhà Ngô', 'Nhà Hồ'], correctAnswer: 1, explanation: 'Áo Nhật Bình gắn với trang phục cung đình nữ thời Nguyễn.', xp: 10 },
    { id: 7, question: 'Phụ kiện nào thường đi cùng áo tứ thân trong hình ảnh quan họ?', options: ['Mũ bảo hiểm', 'Vương miện', 'Nón quai thao', 'Mũ cao bồi'], correctAnswer: 2, explanation: 'Nón quai thao thường xuất hiện cùng áo tứ thân trong hình ảnh liền chị quan họ.', xp: 10 },
    { id: 8, question: 'Khăn đóng là phụ kiện dùng ở đâu?', options: ['Cổ tay', 'Bàn chân', 'Thắt lưng', 'Đầu'], correctAnswer: 3, explanation: 'Khăn đóng là phụ kiện đội đầu, thường kết hợp với áo dài hoặc áo ngũ thân.', xp: 10 },
    { id: 9, question: 'Áo yếm truyền thống thường được mặc ở vị trí nào?', options: ['Bên trong áo ngoài', 'Bọc ngoài giày', 'Trùm lên đầu', 'Quấn quanh cổ tay'], correctAnswer: 0, explanation: 'Yếm che phần thân trước và thường được mặc bên trong áo ngoài, chẳng hạn áo tứ thân.', xp: 10 },
    { id: 10, question: 'Chất liệu nào được tạo từ sợi tơ tằm?', options: ['Da thuộc', 'Lụa', 'Nhựa', 'Kim loại'], correctAnswer: 1, explanation: 'Lụa tơ tằm được dệt từ sợi tơ, là một chất liệu dùng trong trang phục truyền thống.', xp: 10 },
    { id: 11, question: 'Tên gọi áo tứ thân nói đến điều gì?', options: ['Bốn chiếc túi', 'Bốn loại khuy', 'Bốn thân áo', 'Bốn chiếc khăn'], correctAnswer: 2, explanation: 'Tên áo tứ thân chỉ cấu tạo gồm bốn thân áo.', xp: 10 },
    { id: 12, question: 'Nón lá thường có hình dáng nào?', options: ['Hình lập phương', 'Hình trụ', 'Hình cầu', 'Hình chóp'], correctAnswer: 3, explanation: 'Nón lá quen thuộc có dáng hình chóp, giúp che nắng và che mưa.', xp: 10 },
    { id: 13, question: 'Áo bà ba thường có đặc điểm nào?', options: ['Áo ngắn, cài khuy phía trước', 'Tà kéo dài nhiều mét', 'Khung áo bằng kim loại', 'Không có phần thân áo'], correctAnswer: 0, explanation: 'Áo bà ba thường có thân áo ngắn, tay dài và hàng khuy ở phía trước.', xp: 10 },
    { id: 14, question: 'Khi tìm hiểu Việt phục, cách nào giúp hiểu đúng hơn?', options: ['Chỉ dựa vào màu áo', 'Tìm hiểu kiểu dáng và bối cảnh lịch sử', 'Coi mọi kiểu áo là giống nhau', 'Bỏ qua nguồn tư liệu'], correctAnswer: 1, explanation: 'Kiểu dáng, chất liệu và bối cảnh lịch sử giúp nhận diện và hiểu ý nghĩa của trang phục.', xp: 10 },
    { id: 15, question: 'Khi bảo quản áo lụa, nên làm gì?', options: ['Chà mạnh bằng bàn chải cứng', 'Ngâm thuốc tẩy đậm đặc', 'Làm theo hướng dẫn chăm sóc trên nhãn', 'Luôn giặt ở nhiệt độ cao nhất'], correctAnswer: 2, explanation: 'Làm theo nhãn chăm sóc giúp chọn cách giặt, phơi và là phù hợp với chất liệu của áo.', xp: 10 },
];

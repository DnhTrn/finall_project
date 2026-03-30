# 🎓 Phenikaa University Club Management System

> **A comprehensive system to digitalize the management, establishment, and operation of student clubs at Phenikaa University.**
> *Đây là đồ án tốt nghiệp đại học của tôi, xây dựng một hệ thống quản lý câu lạc bộ sinh viên toàn diện trên cả hai nền tảng Web và Mobile.*

---

## 🌟 Overview
Hệ thống được thiết kế để giải quyết bài toán quản lý thủ công các câu lạc bộ tại trường đại học. Cung cấp 2 nền tảng riêng biệt:
1. **Web Admin Dashboard:** Dành cho Đoàn Thanh niên / Ban quản lý trường duyệt hồ sơ và theo dõi hoạt động.
2. **Mobile App:** Dành cho sinh viên đăng ký tham gia, tạo câu lạc bộ mới và quản lý nội bộ câu lạc bộ.

## 🚀 Key Features
### 💻 Web Admin (For University Management)
- Quản lý danh sách các câu lạc bộ đang hoạt động.
- Xét duyệt (Approve/Reject) các yêu cầu thành lập câu lạc bộ mới.
- Quản lý tài khoản, phân quyền chủ nhiệm câu lạc bộ.
- Thống kê dữ liệu hoạt động.

### 📱 Mobile App (For Students & Club Members)
- **Sinh viên:** Khám phá các câu lạc bộ, nộp đơn xin gia nhập.
- **Chủ nhiệm CLB:** Duyệt đơn thành viên, quản lý quỹ, tạo thông báo và sự kiện (Events).
- Giao diện thân thiện, cập nhật dữ liệu theo thời gian thực (Real-time).

## 🛠 Tech Stack
Dự án được xây dựng theo kiến trúc **MVVM**, sử dụng các công nghệ:
- **Web App:** ReactJS
- **Mobile App:** React Native (Expo)
- **Backend/Database:** Firebase (Authentication, Firestore Realtime Database, Storage)
- **Tools:** Git, UML Diagrams

## 📂 Repository Structure
Dự án được chia thành các nhánh (branches) theo từng phần cụ thể để dễ quản lý. Vui lòng chuyển nhánh để xem source code tương ứng:

- [`master`](https://github.com/DnhTrn/finall_project/tree/master) : Chứa Source code của **Web Admin Dashboard** (ReactJS).
- [`mobile`](https://github.com/DnhTrn/finall_project/tree/mobile) : Chứa Source code của **Mobile App** (React Native/Expo).
- [`diagram`](https://github.com/DnhTrn/finall_project/tree/diagram) : Chứa các bản thiết kế hệ thống (Use case, Sequence diagrams, E-R diagrams).

## 📸 Screenshots & Demo
*(Thêm 2-3 hình ảnh đẹp nhất của Web và App vào đây. Tech Lead rất thích xem hình ảnh UI trước khi đọc code)*

| Web Admin Dashboard | Mobile App Interface |
|:---:|:---:|
| <img src="link_anh_web_cua_ban.png" width="400"/> | <img src="link_anh_app_cua_ban.png" width="200"/> |

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16.x or newer)
- npm or yarn
- Expo CLI (for Mobile App)

### Installation (Web Admin)
```
git checkout master
npm install
npm start
```
### Installation (Mobile App)
```
git checkout mobile
npm install
npx expo start
```
Author
Tran Cong Danh
Email: danh.trancong2002@gmail.com
GitHub: @DnhTrn

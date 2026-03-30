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

- [`master`](https://github.com/DnhTrn/finall_project/tree/clubs-manages) : Chứa Source code của **Web Admin Dashboard** (ReactJS).
- [`mobile`](https://github.com/DnhTrn/finall_project/tree/mobile) : Chứa Source code của **Mobile App** (React Native/Expo).
- [`diagram`](https://github.com/DnhTrn/finall_project/tree/diagram) : Chứa các bản thiết kế hệ thống (Use case, Sequence diagrams, E-R diagrams).

## 📸 Screenshots & Demo

| 💻 Web Admin Dashboard | 📱 Mobile App Interface |
| :---: | :---: |
| <img width="450" alt="Web Admin 1" src="https://github.com/user-attachments/assets/0dc81b92-bad1-40da-8ec3-0e0fbfe3d801" /> | <img width="250" alt="Mobile App 1" src="https://github.com/user-attachments/assets/4e2d0810-ddb8-4025-8fd4-5bee159ef072" /> |
| <img width="450" alt="Web Admin 2" src="https://github.com/user-attachments/assets/4c3e9f1a-ad73-470c-ba2a-311b8f7a6de9" /> | <img width="250" alt="Mobile App 2" src="https://github.com/user-attachments/assets/3b1ba768-ff4d-42d7-834b-be4cce04d623" /> |
| <img width="450" alt="Web Admin 3" src="https://github.com/user-attachments/assets/dffa0856-8dbc-4479-9da0-faef67f4b4de" /> | <img width="250" alt="Mobile App 3" src="https://github.com/user-attachments/assets/3b059533-c7ef-44b6-804a-1e42e6cdbe38" /> |
| <img width="450" alt="Web Admin 4" src="https://github.com/user-attachments/assets/5ea76541-32eb-4071-bb64-d09908b9897e" /> | <img width="250" alt="Mobile App 4" src="https://github.com/user-attachments/assets/232ecf66-2405-4b4f-ae2b-b159089b8ed0" /> |

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

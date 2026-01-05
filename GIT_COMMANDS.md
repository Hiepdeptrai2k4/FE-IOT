# 📤 HƯỚNG DẪN ĐẨY CODE LÊN GITHUB

## ⚠️ LỖI: `fatal: 'origin' does not appear to be a git repository`

Lỗi này xảy ra vì **chưa có remote repository** được cấu hình.

---

## 🔧 CÁCH SỬA:

### **Bước 1: Tạo Repository trên GitHub**

1. Vào [github.com](https://github.com) và đăng nhập
2. Click nút **"+"** → **"New repository"**
3. Đặt tên repository (vd: `FE-IOT` hoặc `iot-agriculture-system`)
4. Chọn **Public** hoặc **Private**
5. **KHÔNG** tích "Initialize with README" (vì đã có code rồi)
6. Click **"Create repository"**

### **Bước 2: Copy URL Repository**

Sau khi tạo xong, GitHub sẽ hiển thị URL, có 2 loại:
- **HTTPS**: `https://github.com/USERNAME/REPO_NAME.git`
- **SSH**: `git@github.com:USERNAME/REPO_NAME.git`

**Khuyến nghị**: Dùng HTTPS nếu chưa cấu hình SSH key.

---

### **Bước 3: Thêm Remote Repository**

```powershell
# Thay YOUR_USERNAME và REPO_NAME bằng thông tin của bạn
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**Ví dụ:**
```powershell
git remote add origin https://github.com/nguyenvana/FE-IOT.git
```

### **Bước 4: Kiểm tra Remote đã thêm chưa**

```powershell
git remote -v
```

Sẽ hiển thị:
```
origin  https://github.com/YOUR_USERNAME/REPO_NAME.git (fetch)
origin  https://github.com/YOUR_USERNAME/REPO_NAME.git (push)
```

---

## 📤 CÁC LỆNH ĐẨY CODE LÊN GITHUB

### **Lần đầu tiên (chưa có commit nào trên GitHub):**

```powershell
# 1. Kiểm tra file đã thay đổi
git status

# 2. Thêm tất cả file vào staging
git add .

# 3. Commit (lưu thay đổi)
git commit -m "Initial commit: Add IoT Agriculture System"

# 4. Đặt tên branch chính (thường là main hoặc master)
git branch -M main

# 5. Push lên GitHub
git push -u origin main
```

### **Các lần sau (đã có code trên GitHub):**

```powershell
# 1. Thêm file thay đổi
git add .

# 2. Commit
git commit -m "Mô tả thay đổi (vd: Add admin dashboard features)"

# 3. Push lên GitHub
git push
```

---

## 🔄 CÁC TÌNH HUỐNG THƯỜNG GẶP

### **1. Nếu đã có remote nhưng sai URL:**

```powershell
# Xóa remote cũ
git remote remove origin

# Thêm remote mới
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### **2. Nếu remote đã tồn tại và muốn đổi URL:**

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### **3. Nếu chưa có Git repository:**

```powershell
# Khởi tạo Git repository
git init

# Sau đó làm các bước ở trên
```

### **4. Nếu bị lỗi Authentication:**

GitHub yêu cầu xác thực:
- **HTTPS**: Dùng Personal Access Token (PAT) thay vì password
- **SSH**: Cấu hình SSH key

**Cách tạo Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Chọn quyền: `repo` (full control)
4. Copy token (chỉ hiển thị 1 lần)
5. Khi push, dùng token làm password

---

## 📋 QUY TRÌNH HOÀN CHỈNH

```powershell
# ============================================
# LẦN ĐẦU TIÊN
# ============================================

# 1. Kiểm tra Git đã khởi tạo chưa
git status

# 2. Nếu chưa, khởi tạo
git init

# 3. Thêm remote (THAY URL CỦA BẠN)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 4. Kiểm tra remote
git remote -v

# 5. Thêm file
git add .

# 6. Commit
git commit -m "Initial commit"

# 7. Đặt branch chính
git branch -M main

# 8. Push lên GitHub
git push -u origin main


# ============================================
# CÁC LẦN SAU (KHI CÓ THAY ĐỔI)
# ============================================

git add .
git commit -m "Mô tả thay đổi"
git push
```

---

## ✅ KIỂM TRA SAU KHI PUSH

1. Vào GitHub repository của bạn
2. Refresh trang
3. Kiểm tra code đã có trên GitHub chưa

---

## 💡 TIPS

- **Commit message**: Nên viết rõ ràng, mô tả thay đổi
- **Branch**: Mặc định là `main`, nếu GitHub dùng `master` thì đổi thành `master`
- **.gitignore**: Nên tạo file `.gitignore` để bỏ qua `node_modules`, `.env`, v.v.

**Ví dụ `.gitignore`:**
```
node_modules/
.env
.DS_Store
dist/
build/
*.log
```

---

## 🔗 TÀI LIỆU THAM KHẢO

- [GitHub Docs - Adding a remote](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)
- [GitHub Docs - Creating a repository](https://docs.github.com/en/get-started/quickstart/create-a-repo)

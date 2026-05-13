# 專案管理平台 — Firebase + GitHub Pages 部署教學

這是一個團隊共用的專案管理平台，資料存在 Firestore（雲端），透過 Google 登入認證。完成設定後會有一個 `https://你的帳號.github.io/repo名稱/` 的網址，團隊任何人登入都看到同一份資料、即時同步。

---

## 📦 檔案說明

| 檔案 | 用途 |
|------|------|
| `index.html` | 主程式（前端網頁） |
| `firebase-config.js` | Firebase 連線設定（**你必須編輯**） |
| `firestore.rules` | Firestore 安全規則（複製到 Firebase Console） |
| `README.md` | 本文件 |

---

## 🔥 第一階段：建立 Firebase 專案

### 1. 建立 Firebase 專案

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 點 **「新增專案」**，輸入專案名稱（例如 `my-pm-platform`）
3. Google Analytics 可以關掉（不需要）
4. 等待建立完成

### 2. 啟用 Google 登入

1. 左側選單 → **Authentication** → **開始使用**
2. 切到 **Sign-in method** 分頁
3. 點 **Google** → 啟用 → 選擇支援電子郵件 → 儲存

### 3. 建立 Firestore 資料庫

1. 左側選單 → **Firestore Database** → **建立資料庫**
2. 模式選 **「以正式環境模式啟動」**（規則之後會貼）
3. 地點選 **`asia-east1`**（台灣最近）→ 啟用

### 4. 套用安全規則

1. Firestore 頁面切到 **「規則」** 分頁
2. 把 `firestore.rules` 整段內容複製貼進去
3. 點 **「發佈」**

> 💡 **想限制只有特定成員可用嗎？**
> 編輯 `firestore.rules`，把 `isSignedIn()` 改成 `isTeamMember()`，並在下方填入團隊成員的 email。

### 5. 取得 Web App 設定

1. 點專案首頁的 **齒輪 ⚙️** → **專案設定**
2. 滾到下方「您的應用程式」→ 點 **`</>` (Web)**
3. 輸入暱稱（例如 `pm-web`）→ 不勾 Hosting → 註冊應用程式
4. 會看到一段 `firebaseConfig = { apiKey: "...", ... }` 物件
5. 複製花括號 `{ ... }` 裡面的所有內容
6. 打開本專案的 `firebase-config.js`，**取代**裡面的範本內容

範例：
```js
export const firebaseConfig = {
  apiKey: "AIzaSyB...實際金鑰...",
  authDomain: "my-pm-platform.firebaseapp.com",
  projectId: "my-pm-platform",
  storageBucket: "my-pm-platform.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

> ⚠️ apiKey 看起來像密碼，但其實 Firebase 的 apiKey **可以公開**，安全靠 Firestore Rules 把關。可以放心 commit 到 GitHub。

---

## 🚀 第二階段：部署到 GitHub Pages

### 1. 建立 GitHub Repo

1. 到 [GitHub](https://github.com/new) 建立新 repo（例如 `pm-platform`）
2. 設為 **Public**（GitHub Pages 免費版需要 Public）
3. 不勾 README、.gitignore、license

### 2. 上傳檔案

最簡單的方式是用網頁拖拉：

1. 進入剛建好的 repo 頁面
2. 點 **「uploading an existing file」**
3. 把 `index.html`、`firebase-config.js` 拖進去
4. **`firestore.rules` 和 `README.md` 可上可不上**（不影響網站運作）
5. 點下方 **Commit changes**

或用 git 指令：
```bash
git init
git add index.html firebase-config.js
git commit -m "init"
git remote add origin https://github.com/你的帳號/pm-platform.git
git push -u origin main
```

### 3. 啟用 GitHub Pages

1. 在 repo 頁面點 **Settings** → 左側 **Pages**
2. **Source** 選 **Deploy from a branch**
3. **Branch** 選 **main**，資料夾選 **/ (root)** → **Save**
4. 等 1〜2 分鐘，頁面上方會出現你的網址：
   `https://你的帳號.github.io/pm-platform/`

### 4. 把網域加進 Firebase 授權清單

這一步**很重要**，沒做的話 Google 登入會失敗：

1. 回到 Firebase Console → **Authentication** → **Settings** 分頁
2. 找到 **Authorized domains（授權網域）**
3. 點 **Add domain**，輸入 `你的帳號.github.io`（不要加 `https://`、不要加路徑）
4. 儲存

---

## ✅ 完成！測試清單

打開你的 GitHub Pages 網址，應該看到登入畫面：

- [ ] 點「使用 Google 登入」彈出 Google 視窗
- [ ] 登入後看到主畫面，右上角顯示你的頭像和名字
- [ ] 左下角綠點顯示「即時同步中」
- [ ] 點「＋ 新增專案」可以建立專案
- [ ] 在另一個瀏覽器或無痕視窗用其他帳號登入，會即時看到同一份資料
- [ ] 重新整理後資料還在

---

## 🛠 常見問題

### Q：點 Google 登入後出現「auth/unauthorized-domain」錯誤
A：第二階段第 4 步沒做。回到 Firebase Console → Authentication → Settings → Authorized domains，把你的 GitHub Pages 網域加進去。

### Q：開啟網頁後看到「尚未設定 Firebase」黃色警示
A：`firebase-config.js` 還沒填入正確的設定，或填錯了。檢查 apiKey 是不是真的數值而不是 `YOUR_API_KEY`。

### Q：登入成功但資料沒出現、紅點顯示「連線中斷」
A：Firestore 規則沒設好。回到 Firebase Console → Firestore → 規則分頁，確認 `firestore.rules` 內容已貼上並發佈。

### Q：要怎麼限制只有公司同事能用？
A：編輯 `firestore.rules`，把所有 `isSignedIn()` 改成 `isTeamMember()`，並在 `isTeamMember()` 函式裡填入團隊成員的 email 清單，重新發佈即可。

### Q：Firebase 免費額度夠用嗎？
A：免費 Spark 方案：每天 5 萬次讀取 / 2 萬次寫入 / 1GB 儲存。一個小團隊用很夠，超過才會被擋（不會自動扣款）。

### Q：可以改用自己的網域嗎（例如 pm.mycompany.com）？
A：可以。GitHub Pages 設定裡有 Custom domain 欄位，設好 DNS CNAME 指向 `你的帳號.github.io` 即可。記得也要把新網域加進 Firebase Authorized domains。

---

## 🔧 後續維護

- **修改程式碼**：直接在 GitHub 編輯檔案 → commit，1〜2 分鐘後網站就更新
- **看資料**：Firebase Console → Firestore Database → 資料分頁，可以直接看每個 project / task 的內容
- **匯出資料**：用 Firebase CLI 的 `firestore:export`，或用 Console 的「匯出資料」功能
- **備份**：建議每月手動匯出一次資料

---

享受你的專案管理平台！有任何問題歡迎再問我。

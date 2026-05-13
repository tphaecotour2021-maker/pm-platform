// =============================================================
// Firebase 設定檔 - pm-platform-eddea
// =============================================================
// 此設定已由 Claude 自動填入，可以直接使用。
// 若想改用其他 Firebase 專案，請替換為自己的設定。
// =============================================================

export const firebaseConfig = {
  apiKey: "AIzaSyAddRkIPpSd0j7CsGYF8nzY6bN-HrmLKzM",
  authDomain: "pm-platform-eddea.firebaseapp.com",
  projectId: "pm-platform-eddea",
  storageBucket: "pm-platform-eddea.firebasestorage.app",
  messagingSenderId: "39181458704",
  appId: "1:39181458704:web:1a35ec18bd8773b8905995"
};

// =============================================================
// 團隊白名單（選用）
// 留空陣列 [] 代表「任何登入的 Google 帳號都能用」
// 若要限制只有特定成員可用，請同時編輯 firestore.rules：
//   export const allowedEmails = ["alice@example.com", "bob@example.com"];
// =============================================================

export const allowedEmails = [];

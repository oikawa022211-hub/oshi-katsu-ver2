// 全ページ共通: 未ログインなら index.html へリダイレクト
// 各ページの <script type="module"> の先頭で import して使う
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export function requireAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'index.html';
    } else {
      callback(user);
    }
  });
}

export async function logout() {
  if (!confirm('ログアウトしますか？')) return;
  try {
    await signOut(auth);
  } catch(e) {
    console.error('logout error:', e);
  }
  // ログアウト直後のリダイレクトループを防ぐフラグ
  sessionStorage.setItem('just_logged_out', '1');
  window.location.href = 'index.html';
}

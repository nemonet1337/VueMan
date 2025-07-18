# 勤怠管理システム - Webアプリケーション

Vue 3（Composition API）+ Fastify + PostgreSQL を用いた、ブラウザベースの勤怠管理システムです。  
電子機器に過剰依存しない、簡潔で拡張可能な業務システムを目指しています。

---

## 🚀 概要

- **目的**: シンプルで自己完結型の勤怠管理システムを自社内で構築
- **特徴**:
  - Fastify による軽量・高速なバックエンド
  - JWT認証と権限管理
  - PostgreSQL による信頼性あるデータ管理
  - Docker による環境分離と再現性

---

## 🧭 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フロントエンド | Vue 3 + Pinia + Vuetify |
| バックエンド | Fastify + TypeScript |
| 認証 | JWT（@fastify/jwt） |
| DB | PostgreSQL（KVS用途に Redis を将来的に検討） |
| 環境管理 | Docker + dotenv |
| ドキュメント | MkDocs（`/docs` ディレクトリ） |

---

## 📁 ディレクトリ構成

```
project-root/
├── src/
│   ├── frontend/             # Vue 3 アプリケーション
│   ├── backend/              # Fastify ベース API群
│   └── shared/types/         # 共通型定義
├── database/
│   ├── ddl/                  # テーブル定義（DDL）
│   ├── erd/                  # ER図など
│   └── seed/                 # 初期データ
├── docs/                     # MkDocs 用ドキュメント
│   └── mkdocs.yml
├── docker/
│   └── docker-compose.yml
├── .env.example              # 環境変数テンプレート
├── README.md
└── LICENSE
```

---

## ✅ 実装済み機能

| 種別 | テーブル名 | 機能名 | 備考 |
|------|------------|--------|------|
| 🔐 認証 | - | ログイン / me取得 | Fastify + JWT |
| 🧑‍💼 マスタ | `m_users` | ユーザー管理 | 多対多ロール対応 |
| 👷‍♂️ マスタ | `m_employees` | 従業員管理 | 社員コードあり |
| 🏢 マスタ | `m_offices` | 事業所管理 | 所在地等 |
| 🪪 マスタ | `m_positions` | 役職管理 | 説明付き |
| 🧾 マスタ | `m_roles` | ロール管理 | RBAC拡張に対応 |
| 🔗 中間 | `m_user_roles` | ユーザーロール対応 | 多対多・中間テーブル |
| 🕒 マスタ | `m_work_patterns` | 勤務パターン管理 | シフトと連携予定 |

---

## 📌 今後の予定

- 出退勤ログ管理機能
- 勤怠集計・残業算出
- 管理者・一般ユーザーの権限分離
- スマートフォン最適化

---

## ⚖️ ライセンス

Apache License 2.0

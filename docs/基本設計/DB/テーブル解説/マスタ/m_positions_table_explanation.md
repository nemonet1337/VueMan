# `m_positions` テーブル構成の解説

このテーブルは、従業員の役職情報を管理するマスタテーブルです。

| カラム名  | 型     | 説明                             | NULL許容 |
|-----------|--------|----------------------------------|----------|
| `id`      | `UUID` | 役職識別子。主キー。             | ❌       |
| `title`   | `TEXT` | 役職名（例：店長、スタッフなど）。| ❌       |

---

## 備考

- `title` は表示名として使用され、システム内のラベルやフィルタに利用されます。
- このテーブルのデータは比較的固定的な内容であるため、初期マスタデータとして登録されることが多いです。
- 勤怠の集計や権限制御との紐付けを行う場合は、ロール（`m_roles`）との整合に注意が必要です。

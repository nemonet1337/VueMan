# `t_attendance_summaries` テーブル構成の解説

このテーブルは、従業員の勤怠情報を日次または月次で集計した結果をキャッシュ的に保持するトランザクションテーブルです。

| カラム名           | 型          | 説明                                                   | NULL許容 |
|--------------------|-------------|----------------------------------------------------------|----------|
| `id`               | `UUID`      | 勤怠集計レコードの識別子。主キー。                     | ❌       |
| `employee_id`      | `UUID`      | 対象従業員のID。`m_employees.id` を参照。               | ❌       |
| `office_id`        | `UUID`      | 対象事業所のID。`m_offices.id` を参照。                 | ❌       |
| `summary_type`     | `VARCHAR`   | 集計種別。`daily` または `monthly` を想定。             | ❌       |
| `target_date`      | `DATE`      | 集計対象日（日次の場合は日付、月次の場合は月初を使用）。| ❌       |
| `work_minutes`     | `INTEGER`   | 勤務時間（分単位）。                                    | ❌       |
| `break_minutes`    | `INTEGER`   | 休憩時間（分単位）。                                    | ❌       |
| `late_flag`        | `BOOLEAN`   | 遅刻があったかどうか。                                  | ⭕       |
| `early_leave_flag` | `BOOLEAN`   | 早退があったかどうか。                                  | ⭕       |
| `created_at`       | `TIMESTAMP` | レコード作成時刻。自動で現在時刻が挿入されます。       | ⭕（DEFAULTあり） |

---

## 備考

- 勤怠打刻データ（`t_attendance_records`）を基に、定期的にバッチやトリガーで生成・更新される想定です。
- 月次集計の場合は `target_date` に対象月の1日を記録し、`summary_type` で区別します。
- リアルタイムに再計算するのではなく、あらかじめ計算結果を保存することで、画面表示の高速化を図ります。
- `late_flag` や `early_leave_flag` によって、問題のある勤務パターンを抽出しやすくなります。

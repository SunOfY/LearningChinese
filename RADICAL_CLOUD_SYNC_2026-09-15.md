# Radical progress cloud sync

This version stores Radical/Component learning progress inside the existing `user_learning_state.progress` JSONB row. No new database column is required.

## Synced for signed-in users
- selected radical/component
- exact Focus Learning position for every radical
- completed lesson IDs for every radical
- handwriting completion counts
- last writing target per radical

Guests still use localStorage only. When a brand-new account has no cloud row, local progress is uploaded. Existing accounts from an older version automatically add the Radical payload on the next sync without deleting local Radical progress.

The data is stored under:

`progress.radicals`

Run `supabase/radical_progress_report.sql` manually in Supabase SQL Editor if the site owner wants a per-account summary.

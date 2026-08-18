# Custom Workspace Rules for SubDoc

This file defines project-scoped behavioral guidelines and rules for agents working on this codebase.

## Webhook Processing & Billing Integration Rules
- **Cryptographic Signing Secrets**: Always distinguish a notification destination/setting ID (e.g., `ntfset_...` or similar ID) from the actual private cryptographic signing key (often a long random token or string starting with `pdl_ntf_`). Using the destination ID as a signing secret causes signature verification to fail.
- **Defensive Event Dependency Checks**: Webhooks may arrive out-of-order or miss initial events. When handling child entity events (like a subscription), verify that the parent entity record (like a customer) exists in the database. If it is missing, fetch the parent details via api and pre-create the parent record before upserting the child to prevent database foreign key constraint violations.
- **Sandbox Webhook Fallback**: For sandbox/test environments, implement a fallback that catches signature unmarshal failures and gracefully parses the raw JSON body if `NEXT_PUBLIC_PADDLE_ENV === 'sandbox'`. Keep signature validation strictly enforced in production to ensure safety.

## Monorepo Prisma Commands
- **Local Dependency Execution**: To avoid global cache corruption or package mismatch issues when running Prisma commands, run them filtered through the workspace context using `npx pnpm --filter <package> exec prisma <command>`.

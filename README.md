# Altoids (Tier-2 Spec)

## One-liner
A token-gated "breath mints" meme app: **hold MINT to get access to the "Fresh Take" feed** (exclusive posts + drops).

## Core loop (PoC)
1. User connects wallet.
2. App checks `ERC20.balanceOf(user)` for the Altoids token ("MINT").
3. If balance >= threshold:
   - unlock "Fresh Take" feed
   - enable "Post" / "Mint a Take" button (demo only)
4. If not:
   - show buy widget (quote → swap) to get enough tokens.

## apps.fun surface used
- `AppsFun.deployAndLaunch(name, symbol, supply)` (optional: create MINT token)
- `quoteSwapExactETHForTokens` + `swapExactETHForTokens` (buy flow)
- `ERC20.balanceOf` (gating tiers)

## Tiers
- Tier 0 (< 1 MINT): read-only landing page
- Tier 1 (>= 1 MINT): unlock feed + rename badge ("Fresh")
- Tier 2 (>= 10 MINT): unlock "Post" button (still off-chain demo)

## UX screens
- Landing: pitch + connect + "Get Fresh" CTA
- Buy panel: amount input + slippage + tx link
- Gated feed: list of items (static JSON for PoC)

## Data model (PoC)
Off-chain only.
- `Take`: `{ id, title, body, createdAt, authorPseudo }`

## Risks / open questions
- Do we want actual on-chain posting (would require a contract) or keep it off-chain for PoC? (recommend off-chain)
- Token symbol/name collisions: use `Altoids` / `MINT` only for testnets.

## Success criteria
- Demo in 60s: connect → fail gate → buy 0.001 ETH → gate passes → feed unlocks.

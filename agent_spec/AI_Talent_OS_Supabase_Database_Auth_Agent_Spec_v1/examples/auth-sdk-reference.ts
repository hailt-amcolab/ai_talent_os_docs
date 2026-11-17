/** Reference adapter calls, not a complete Next.js auth implementation.
 * Inject REQUEST-SCOPED user client; never use admin client for user MFA.
 * Caller must provide CSRF, rate limit, attempt binding, cookies and registry policy.
 * Do not log input or returned sessions/codes/provider secrets. Pin and type-check SDK before use.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export async function passwordLogin(client: SupabaseClient, email: string, password: string) {
  return client.auth.signInWithPassword({ email, password })
  // Call app authorization/registry flow only after error check and verified identity.
}
export async function enrollPhoneMfa(client: SupabaseClient, approvedPhoneE164: string, friendlyName: string) {
  // Caller checks approved phone + ownership + purpose; enrollment alone sends no SMS.
  return client.auth.mfa.enroll({ factorType: 'phone', phone: approvedPhoneE164, friendlyName })
}
export async function sendPhoneMfaSms(client: SupabaseClient, ownedPhoneFactorId: string) {
  // Before this call: reserve sendRequestId, enforce cooldown/provider budget.
  // Default channel is SMS in the referenced SDK; do not switch to WhatsApp.
  return client.auth.mfa.challenge({ factorId: ownedPhoneFactorId })
}
export async function verifyPhoneMfaSms(client: SupabaseClient, ownedPhoneFactorId: string, boundChallengeId: string, code: string) {
  if (!/^[0-9]{6}$/.test(code)) throw new Error('INPUT_INVALID')
  return client.auth.mfa.verify({ factorId: ownedPhoneFactorId, challengeId: boundChallengeId, code })
  // On confirmed success: propagate cookies, verify aal2, record server-owned phone proof.
  // For SMS proof validate phone; TOTP proof is independently valid when allowed by app policy.
}
export async function readMfaState(client: SupabaseClient) {
  const [factors, assurance] = await Promise.all([
    client.auth.mfa.listFactors(), client.auth.mfa.getAuthenticatorAssuranceLevel()
  ])
  return { factors, assurance }
}
export async function removeOwnVerifiedFactor(client: SupabaseClient, factorId: string) {
  // App additionally checks recent auth, ownership and last-factor replacement policy.
  return client.auth.mfa.unenroll({ factorId })
}
export async function requestPasswordRecovery(client: SupabaseClient, email: string, allowlistedRedirect: string) {
  return client.auth.resetPasswordForEmail(email, { redirectTo: allowlistedRedirect })
}
export async function completePasswordChange(client: SupabaseClient, password: string) {
  return client.auth.updateUser({ password })
  // Reconcile operation, clear forced-change flag ONLY on confirmed success, revoke old app sessions.
}

/** TOTP: default method. Caller checks enrollment eligibility and method policy. */
export async function enrollAuthenticatorTotp(client: SupabaseClient, friendlyName: string) {
  return client.auth.mfa.enroll({ factorType: 'totp', friendlyName })
  // Show data.totp.qr_code / secret once. Do not persist or log either value.
}
export async function challengeAuthenticatorTotp(client: SupabaseClient, ownedTotpFactorId: string) {
  return client.auth.mfa.challenge({ factorId: ownedTotpFactorId })
  // No SMS send, no SMS resend/cost path for this call.
}
export async function verifyAuthenticatorTotp(client: SupabaseClient, ownedTotpFactorId: string, boundChallengeId: string, code: string) {
  if (!/^[0-9]{6}$/.test(code)) throw new Error('INPUT_INVALID')
  return client.auth.mfa.verify({ factorId: ownedTotpFactorId, challengeId: boundChallengeId, code })
  // On confirmed success: cookies + server-owned proof method=totp for the same session.
  // Do not require an additional SMS if app policy allows totp.
}

/** Mẫu service thuần: chưa có SDK/DB/Graph adapter; không dùng như production code. */
export type Actor = Readonly<{
  subject: string
  clientId: string
  grantId: string
  resource: string
}>
export type Operation = Readonly<{
  operationId: string
  proposalId: string
  status: 'accepted' | 'executing' | 'succeeded' | 'conflict' | 'failed' | 'outcome_unknown'
}>
export type CommitPorts = {
  // Kiểm tra token ở boundary trước khi tạo Actor. Mỗi call vẫn kiểm quyền DB.
  assertActiveManagerAndGrant: (actor: Actor) => Promise<void>
  assertCommitEnabled: () => Promise<void>
  // Cả lookup retry cũng phải bind actor/client/grant/resource và kiểm quyền Talent hiện tại.
  findAuthorizedOperation: (actor: Actor, proposalId: string) => Promise<Operation | null>
  // Một transaction: đọc/khóa proposal, kiểm Talent/policy/hash/eTag/expiry,
  // approval người thật + binding đầy đủ, consume approval + INSERT UNIQUE operation + audit + outbox.
  // Map vào domain_operations/outbox_events hiện có theo migration được review; không tạo hệ song song.
  // Khi race UNIQUE: chỉ trả operation cũ SAU khi kiểm tra lại binding/quyền.
  acceptApprovedProposal: (actor: Actor, proposalId: string) => Promise<Operation>
}

export async function commitProfile(
  ports: CommitPorts,
  actor: Actor,
  proposalId: string,
): Promise<Operation> {
  // Schema UUID/unknown properties được kiểm ở registry; actor không lấy từ arguments.
  await ports.assertActiveManagerAndGrant(actor)
  const existing = await ports.findAuthorizedOperation(actor, proposalId)
  if (existing) return existing // retry chỉ trả trạng thái, không gọi Graph lần nữa
  await ports.assertCommitEnabled()
  return ports.acceptApprovedProposal(actor, proposalId)
}

// accepted chỉ là nhận việc, chưa xác nhận OneDrive đã ghi. Dispatcher đưa operation/event IDs
// vào BullMQ + Redis; worker nhận operation bền vững, claim lease và kiểm lại quyền trước side effect.
// Queue retry không tự giải quyết outcome_unknown. Không chứa token/patch PII trong payload job.
// Không đặt fetch Graph trong transaction acceptApprovedProposal.
// Phải có If-Match, timeout=>outcome_unknown và reconciliation theo hướng dẫn §8.

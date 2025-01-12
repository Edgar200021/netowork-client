export const isRtkError = (
  error: unknown
): error is { data: unknown; status: number } => {
	const err = error as { data: unknown; status: number }
  return err.status !== undefined  && err.data !== undefined
}

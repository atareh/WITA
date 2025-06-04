export function getStatusBadge(status: string) {
  switch (status) {
    case "PENDING":
      return <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Pending</span>
    case "SUCCESS":
      return <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Success</span>
    case "FAILED":
      return <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">Failed</span>
    case "RUNNING":
      return <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Running</span>
    default:
      return <span className="bg-[#868d8f] text-white px-2 py-1 rounded text-xs">Unknown</span>
  }
}

export function getStatusIcon(status: string) {
  switch (status) {
    case "PENDING":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    case "SUCCESS":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "FAILED":
      return <XCircle className="h-5 w-5 text-red-500" />
    case "RUNNING":
      return <Play className="h-5 w-5 text-blue-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-[#868d8f]" />
  }
}

export function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

export function formatDuration(ms?: number) {
  if (!ms) return "—"
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60000).toFixed(1)}m`
}
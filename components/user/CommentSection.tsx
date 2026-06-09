'use client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/lib/hooks/useAuth'
import { getToken } from '@/lib/hooks/useToken'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

interface Comment {
  id: string
  content: string
  authorName: string
  authorId: string
  createdAt: string
}

export default function CommentSection({ blogId }: { blogId: string }) {
  const { user, isLoggedIn } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${blogId}/comments`)
      if (res.ok) {
        const data = await res.json()
        setComments(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch comments', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [blogId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setSubmitting(true)
    const token = await getToken()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })
      if (res.ok) {
        toast.success('Comment posted')
        setContent('')
        fetchComments()
      } else {
        toast.error('Failed to post comment')
      }
    } catch (error) {
      toast.error('Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this comment?')) return
    const token = await getToken()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        toast.success('Comment deleted')
        setComments(comments.filter(c => c.id !== id))
      } else {
        toast.error('Failed to delete comment')
      }
    } catch (error) {
      toast.error('Failed to delete comment')
    }
  }

  return (
    <div className="mt-16 pt-12 border-t border-[#2A2D4A]">
      <h3 className="text-white text-[24px] font-semibold mb-8">
        Comments ({comments.length})
      </h3>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-[#1A1D35] border border-[#2A2D4A] rounded-xl p-4 text-white text-[15px] focus:border-[#378ADD] focus:outline-none placeholder:text-[#5A5E7A] resize-none h-24 mb-3"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="btn-primary"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="card-dark flex items-center justify-between mb-10 bg-[#1A1D35]/50 border-dashed">
          <p className="text-[#8B8FA8] text-[15px]">Sign in to join the conversation.</p>
          <Link href="/login" className="btn-outline">
            Sign in
          </Link>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-6">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#2A2D4A]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[#2A2D4A] w-1/4 rounded" />
                <div className="h-16 bg-[#2A2D4A] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#378ADD] flex items-center justify-center shrink-0">
                <span className="text-white text-[14px] font-semibold">
                  {comment.authorName?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-[15px]">{comment.authorName}</span>
                  <span className="text-[#5A5E7A] text-[13px]">·</span>
                  <span className="text-[#5A5E7A] text-[13px]">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="card-dark !p-4 bg-[#1A1D35]">
                  <p className="text-[#8B8FA8] text-[15px] whitespace-pre-wrap">{comment.content}</p>
                </div>
                {user?.id === comment.authorId && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="flex items-center gap-1.5 text-[12px] text-[#F87171] hover:text-white transition-colors mt-2 ml-1"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#5A5E7A] text-[15px] text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}
    </div>
  )
}

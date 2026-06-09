'use client'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { getToken } from '@/lib/hooks/useToken'

interface LikeButtonProps {
  blogId: string
  initialLikes: number
  initialLiked: boolean
}

export default function LikeButton({ blogId, initialLikes, initialLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const toggleLike = async () => {
    if (!isLoggedIn) {
      toast.info('Sign in to like')
      router.push('/login')
      return
    }

    // Optimistic UI
    setLiked(!liked)
    setLikesCount(prev => liked ? prev - 1 : prev + 1)
    setLoading(true)

    const token = await getToken()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${blogId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to toggle like')
    } catch (error) {
      // Revert on error
      setLiked(liked)
      setLikesCount(likesCount)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full border text-[14px] font-medium transition-all
        ${liked 
          ? 'bg-[#378ADD20] border-[#378ADD] text-[#85B7EB]' 
          : 'bg-transparent border-[#2A2D4A] text-[#8B8FA8] hover:border-[#378ADD] hover:text-[#85B7EB]'
        }
      `}
    >
      <Heart size={18} className={liked ? 'fill-[#85B7EB]' : ''} />
      <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
    </button>
  )
}

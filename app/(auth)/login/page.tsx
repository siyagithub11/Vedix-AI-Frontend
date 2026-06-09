'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/lib/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async ({ email, password }: FormData) => {
    const { error } = await signIn(email, password)
    if (error) { toast.error(error.message); return }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    toast.success('Signed in!')
    router.push(user?.user_metadata?.role === 'admin' ? '/admin' : '/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0D0F1A] flex items-center justify-center px-6">
      <div className="card-dark w-full max-w-md p-10">
        <img src="/logo.png" alt="Vedix" className="h-12 w-auto mx-auto mb-6" />
        <h1 className="text-white text-[28px] font-semibold text-center mb-2">Welcome back</h1>
        <p className="text-[#8B8FA8] text-center mb-8 text-[15px]">Sign in to your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[13px] text-[#8B8FA8] mb-1.5">Email</label>
            <input type="email" {...register('email')}
              className="w-full bg-[#1A1D35] border border-[#2A2D4A] rounded-xl
              px-4 py-3 text-white text-[15px] focus:border-[#378ADD] focus:outline-none
              placeholder:text-[#5A5E7A]" placeholder="you@example.com" />
            {errors.email && <p className="text-[#F87171] text-[12px] mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-[13px] text-[#8B8FA8] mb-1.5">Password</label>
            <input type="password" {...register('password')}
              className="w-full bg-[#1A1D35] border border-[#2A2D4A] rounded-xl
              px-4 py-3 text-white text-[15px] focus:border-[#378ADD] focus:outline-none
              placeholder:text-[#5A5E7A]" placeholder="••••••••" />
            {errors.password && <p className="text-[#F87171] text-[12px] mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting}
            className="btn-primary w-full py-3 text-[15px] mt-2">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="text-center text-[13px] text-[#8B8FA8] mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#378ADD] hover:underline">Register</Link>
        </p>
        <p className="text-center mt-3">
          <Link href="/" className="text-[#5A5E7A] text-[13px] hover:text-[#8B8FA8]">
            Continue as guest &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}

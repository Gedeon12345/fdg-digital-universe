import { motion } from 'motion/react'

const variants = {
  primary: 'bg-orange text-on-orange hover:bg-orange-soft',
  secondary: 'border border-line text-text hover:border-orange',
  outline: 'border border-orange text-text hover:bg-orange hover:text-on-orange',
}
const sizes = {
  md: 'min-h-12 px-6 py-3.5 text-[15px]',
  sm: 'min-h-10 px-4 py-2 text-sm',
}

export default function Button({ variant = 'primary', size = 'md', href, className = '', children, ...rest }) {
  const Tag = href ? motion.a : motion.button
  const props = href ? { href } : { type: 'button' }
  return (
    <Tag
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
      {...rest}
    >
      {children}
    </Tag>
  )
}
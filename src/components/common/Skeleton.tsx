import React from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonProps = {
    className: string
}

export default function Skeleton({className}: SkeletonProps) {
  return (
    <div className={twMerge('animate-pulse h-3 w-[50vw] rounded-md bg-white/10', 
    className)}/>
  )
}

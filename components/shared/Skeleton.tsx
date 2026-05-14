import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-[#1A1D35] animate-pulse rounded-lg ${className}`} />;
}

Skeleton.Card = function SkeletonCard({ className = '' }: { className?: string }) {
  return <Skeleton className={`h-72 w-full ${className}`} />;
};

Skeleton.Text = function SkeletonText({ className = '' }: { className?: string }) {
  return <Skeleton className={`h-4 w-3/4 ${className}`} />;
};

Skeleton.Title = function SkeletonTitle({ className = '' }: { className?: string }) {
  return <Skeleton className={`h-8 w-1/2 ${className}`} />;
};

Skeleton.Avatar = function SkeletonAvatar({ className = '' }: { className?: string }) {
  return <Skeleton className={`w-12 h-12 rounded-full ${className}`} />;
};

export const BlogCardSkeleton = () => <Skeleton.Card />;
export const NewsCardSkeleton = () => <Skeleton.Card />;
export const ToolCardSkeleton = () => <Skeleton.Card />;

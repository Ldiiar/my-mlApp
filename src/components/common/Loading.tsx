
import { twMerge } from 'tailwind-merge';
import Skeleton from './Skeleton';
import React from 'react';


type LoadingProps = {
	className?: string;
};

export default function Loading({ className }: LoadingProps) {
	return (
		<div
			className={twMerge(
				'flex flex-col items-center justify-center gap-y-4 w-full mt-20',
				className
			)}
		>
			<Skeleton className='w-7/12' />
			<Skeleton className='w-5/12' />
			<Skeleton className='w-6/12' />
		</div>
	);
}

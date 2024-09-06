import React from 'react';


type LoadingProps = {
	className?: string;
};

export default function Loading({ className }: LoadingProps) {
	return (
	<div className="">
		<span className="loader"></span>
	</div>
	);
}

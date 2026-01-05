"use client";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	console.error(error);

	return (
		<div className="flex flex-col items-center justify-center py-10">
			<h2 className="text-lg font-semibold text-red-500">
				Something went wrong.
			</h2>
			<p className="text-gray-500">{error.message}</p>
			<button
				onClick={() => reset()}
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
			>
				Try again
			</button>
		</div>
	);
}

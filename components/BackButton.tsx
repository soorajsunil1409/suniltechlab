import { useRouter } from "next/navigation";

const BackButton = ({ destination } : { destination: string }) => {
	const router = useRouter();

	return (
		<div className="p-3 bg-gray-100 w-full border-b">
			<button
				onClick={() => router.push(destination)}
				className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Back
			</button>
		</div>
	)
}
export default BackButton
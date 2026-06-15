"use client"

import BackButton from "../../../components/BackButton"
import GroupSection from "../../../components/GroupSection"

const GroupsPageWidget = () => {
	return (
		<div className="w-full mx-auto z-20 flex flex-col gap-6">
			<BackButton destination="/worldcup2026" />

			<div className="w-full mx-auto p-8 flex flex-col gap-10">
				<div className="flex w-full mx-auto z-30 items-center justify-between">
					<div className="w-full">
						<h2 className="text-4xl font-bold text-gray-900 z-0 w-full">
							Groups & Standings
						</h2>
					</div>
				</div>
				<GroupSection />
			</div>
		</div>
	)
}
export default GroupsPageWidget
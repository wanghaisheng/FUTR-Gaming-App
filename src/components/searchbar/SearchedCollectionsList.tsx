import Image from "next/image"
import Link from "next/link"
import ErrorDisplay from "../ErrorDisplay"
import { useFetchPublicCollectionsQuery } from "@/redux/features/collectionsApiSlice"

type SearchedCollectionsListProps = {
	searchInput: string
	handleLinkClick: () => void
}

export default function SearchedCollectionsList({
	searchInput,
	handleLinkClick
}: SearchedCollectionsListProps) {
	const { data: publicCollectionsData, isError: isCollectionDataError } =
		useFetchPublicCollectionsQuery({})

	const filteredCollections = publicCollectionsData?.filter((collection) =>
		collection.title.toLowerCase().includes(searchInput.toLowerCase())
	)

	return (
		<div className="mt-5 border-b-[0.5px] pb-5">
			<h3 className="font-bold text-2xl">Collections</h3>
			{isCollectionDataError && (
				<ErrorDisplay errorMessage="Unable to load collections." />
			)}
			{filteredCollections && filteredCollections.length === 0 ? (
				<p>No collections found!</p>
			) : (
				<ul className="flex flex-col gap-3 mt-4">
					{filteredCollections?.map((collection) => (
						<li
							key={collection.id}
							className="flex items-center gap-2"
						>
							{collection.collectionBg && (
								<Image
									src={collection.collectionBg}
									alt={""}
									width={50}
									height={50}
									style={{ objectFit: "cover" }}
									className="rounded-md"
								/>
							)}

							<Link
								href={`/collections/${collection.id}`}
								onClick={handleLinkClick}
								className="font-bold md:text-lg hover:underline"
							>
								{collection.title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

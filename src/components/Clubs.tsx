import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubs } from "redux/selectors";
import { parseGET } from "utils/api";
import { fetchClubs } from "redux/club/club.actions";
import SearchBar from "./common/SearchBar";

/* eslint-disable array-callback-return */
type MembersAvatarProps = {
	list: object[];
};

const MembersAvatars = ({ list }: MembersAvatarProps) => {
	return (
		// eslint-disable-next-line react/jsx-no-comment-textnodes
		<div className="flex -space-x-1 overflow-hidden">
			{list.map((member: any, i) => {
				if (i < 2)
					return (
						<img
							className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
							src={member.avatar}
							alt=""
						/>
					);
			})}
			{list.length > 2 && (
				<div className="h-8 w-8 rounded-full ring-2 ring-white text-sm font-medium flex justify-center items-center bg-gray-200 text-indigo-500">
					<p>{list.length - 2}+</p>
				</div>
			)}
		</div>
	);
};

type ClubProps = {
	slug: string;
	imgURL: string;
	name: string;
	members: object[];
	description: string;
};

const Club = ({ imgURL, name, members, description }: ClubProps) => {
	return (
		<div className="w-full h-auto rounded-xl shadow-md bg-white hover:shadow-xl">
			<div
				style={{
					backgroundImage: `url(${imgURL})`,
					backgroundRepeat: "none",
					backgroundSize: "cover",
				}}
				className="h-40 rounded-t-xl"
			></div>
			<div className="p-3 flex flex-col gap-y-1 h-auto">
				<div className="flex justify-between items-center">
					<h1 className="text-base text-gray-700 font-semibold">{name}</h1>
					<p
						className={`text-sm ${
							members.length > 0
								? `text-indigo-600 hover:text-indigo-800 cursor-pointer`
								: `text-red-600 cursor-not-allowed`
						} font-semibold`}
					>
						{members.length} Member
					</p>
				</div>
				<p className="text-xs text-gray-500 text-justify">{description}</p>
				<div className="flex items-center justify-between mt-5">
					{members.length > 0 ? (
						<MembersAvatars list={members} />
					) : (
						<p className="text-base text-gray-500 font-semibold">N/A</p>
					)}
					<p className="text-sm text-green-500 font-semibold cursor-pointer hover:text-green-700">
						Add member
					</p>
				</div>
			</div>
		</div>
	);
};

export default function Clubs() {
	const clubs = useSelector((state) => getAllClubs(state));
	const [searchQuery, setSearchQuery] = useState("");

	const dispatch = useDispatch();

	const fetchData = async () => {
		try {
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/clubs`,
				{
					params: { _embed: "members" },
				}
			);
			if (result) {
				dispatch(fetchClubs(result));
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	const fetchSearchQueryData = async () => {
		try {
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/clubs`,
				{
					params: { name_like: searchQuery, _embed: "members" },
				}
			);
			if (result) {
				dispatch(fetchClubs(result));
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	useEffect(() => {
		searchQuery ? fetchSearchQueryData() : fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<div className="max-w-full h-full rounded-xl mx-5">
			<div className="container mx-auto py-10">
				<div className="flex justify-between items-center">
					<h1 className="font-semibold text-xl leading-10 text-gray-700">
						Discover Clubs
					</h1>
					<SearchBar
						placeHolder={`Search all ${clubs.length} clubs`}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="mt-5">
					{clubs.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
							{clubs.map((club: ClubProps) => (
								<Club
									slug={club.slug}
									imgURL={club.imgURL}
									name={club.name}
									members={club.members}
									description={`It is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.`}
								/>
							))}
						</div>
					) : (
						<p className="text-base text-gray-800">No clubs found.</p>
					)}
				</div>
			</div>
		</div>
	);
}

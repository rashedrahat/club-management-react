import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubs } from "redux/selectors";
import { parseGET, parsePOST } from "utils/api";
import { fetchClubs } from "redux/club/club.actions";
import SearchBar from "components/common/SearchBar";
import SlideOver from "components/common/SlideOver";
import { formatDate } from "utils/helpers";

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
							key={i}
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
	id: number;
	imgURL: string;
	name: string;
	members: object[];
	description: string;
	addMember: (clubId: number) => void;
};

const Club = ({
	id,
	imgURL,
	name,
	members,
	description,
	addMember,
}: ClubProps) => {
	return (
		<div
			className="w-full h-auto rounded-xl shadow-md bg-white hover:shadow-xl"
			key={id}
		>
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
								? `text-indigo-600 hover:text-indigo-800`
								: `text-red-600`
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
					<p
						className="text-sm text-green-500 font-semibold cursor-pointer hover:text-green-700"
						onClick={() => addMember(id)}
					>
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
	const [open, setOpen] = useState(false);
	const [clubIdToAddMember, setClubIdToAddMember] = useState<
		number | undefined
	>(undefined);

	const dispatch = useDispatch();

	const fetchData = async () => {
		try {
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/clubs`,
				{
					params: { _embed: "members", _sort: "name", _order: "asc" },
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

	const addMember = (clubId: number) => {
		setOpen(!open);
		setClubIdToAddMember(clubId);
	};

	useEffect(() => {
		if (!open) setClubIdToAddMember(undefined);
	}, [open]);

	const takeActionOfData = async (data: any) => {
		try {
			const formatData = {
				name: data.name,
				avatar: data.avatar,
				dob: data.dob,
				joinedAt: formatDate(new Date()),
				skills: [
					{
						technicalAbility: parseInt(data.technicalAbility),
					},
					{
						mentality: parseInt(data.mentality),
					},
				],
				clubId: clubIdToAddMember,
			};
			const result = await parsePOST(
				`${process.env.REACT_APP_API_ENDPOINT}/members`,
				formatData
			);
			if (result) {
				setOpen(false);
				fetchData();
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	return (
		<div className="max-w-full h-full rounded-xl mx-5">
			<div className="container mx-auto py-10">
				<SlideOver
					open={open}
					setOpen={setOpen}
					title="New member"
					description="Proceed by filling in the information below to add a member into this club."
					takeActionOfData={takeActionOfData}
				/>
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
									id={club.id}
									imgURL={club.imgURL}
									name={club.name}
									members={club.members}
									description={`It is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.`}
									addMember={addMember}
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

import { useEffect, useState } from "react";
import { fetchClubs } from "redux/club/club.actions";
import { fetchMembers } from "redux/member/member.actions";
import { parseGET, parsePOST } from "utils/api";
import { formatDate } from "utils/helpers";
import SlideOver from "./common/SlideOver";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers, getClubNames } from "redux/selectors";

type ClubsProps = {
	list: { name: string; id: number }[];
	selectedClubId: number | undefined;
	setSelectedClubId: (id: number | undefined) => void;
};

const Clubs = ({ list, selectedClubId, setSelectedClubId }: ClubsProps) => {
	return (
		<div className="flex flex-wrap gap-4 bg-white rounded-3xl p-5 items-center">
			{list.length > 1 && (
				<div
					onClick={() => setSelectedClubId(undefined)}
					className={`cursor-pointer rounded-full border-2 border-indigo-600 ${
						selectedClubId === undefined
							? `bg-indigo-600 text-white`
							: `text-gray-800`
					} hover:bg-indigo-600 hover:text-white px-3 py-2 text-base font-normal`}
				>
					All Clubs
				</div>
			)}
			{list.map((club, i) => (
				<div
					key={i}
					onClick={() => setSelectedClubId(club.id)}
					className={`cursor-pointer rounded-full border-2 border-indigo-600 ${
						selectedClubId === club.id
							? `bg-indigo-600 text-white`
							: `text-gray-800`
					} hover:bg-indigo-600 hover:text-white px-3 py-2 text-base font-normal`}
				>
					{club.name}
				</div>
			))}
		</div>
	);
};

type MembersTableProps = {
	list: object[];
};

const MembersTable = ({ list }: MembersTableProps) => {
	return (
		<div className="py-8">
			<h1 className="font-normal text-xl leading-10 text-gray-700">
				{list.length} Members
			</h1>
			{list.length > 0 && (
				<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
						<table className="min-w-full leading-normal">
							<thead>
								<tr>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Member
									</th>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Birthday
									</th>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Joined at
									</th>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Skills
									</th>
									<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
								</tr>
							</thead>
							<tbody>
								{list.map((member: any, i) => {
									return (
										<tr>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<div className="flex">
													<div className="flex-shrink-0 w-10 h-10">
														<img
															className="w-full h-full rounded-full"
															src={member.avatar}
															alt=""
														/>
													</div>
													<div className="ml-3">
														<p className="text-gray-900 whitespace-no-wrap">
															{member.name}
														</p>
														<p className="font-semibold text-xs text-indigo-600 whitespace-no-wrap">
															{member.club.name}
														</p>
													</div>
												</div>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">
													{member.dob}
												</p>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">
													{member.joinedAt}
												</p>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												{member.skills.map((skill: any, i: number) => {
													return (
														<>
															{i === 0 ? (
																<p className="text-gray-900 whitespace-no-wrap">
																	Technical Ability{" "}
																	<span
																		className={`relative inline-block px-3 py-1 font-semibold ${
																			skill.technicalAbility > 50
																				? `text-green-900`
																				: `text-red-900`
																		} leading-tight`}
																	>
																		<span
																			aria-hidden
																			className={`absolute inset-0 ${
																				skill.technicalAbility > 50
																					? `bg-green-200`
																					: `bg-red-200`
																			} opacity-50 rounded-full`}
																		></span>
																		<span className="relative">
																			{skill.technicalAbility}
																		</span>
																	</span>
																</p>
															) : (
																<p className="text-gray-900 whitespace-no-wrap">
																	Mentality{" "}
																	<span
																		className={`relative inline-block px-3 py-1 font-semibold ${
																			skill.mentality > 50
																				? `text-green-900`
																				: `text-red-900`
																		} leading-tight`}
																	>
																		<span
																			aria-hidden
																			className={`absolute inset-0 ${
																				skill.mentality > 50
																					? `bg-green-200`
																					: `bg-red-200`
																			} opacity-50 rounded-full`}
																		></span>
																		<span className="relative">
																			{skill.mentality}
																		</span>
																	</span>
																</p>
															)}
														</>
													);
												})}
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
												<button
													type="button"
													className="inline-block text-gray-500 hover:text-gray-700"
												>
													<svg
														className="inline-block h-6 w-6 fill-current"
														viewBox="0 0 24 24"
													>
														<path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
													</svg>
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default function Members() {
	const dispatch = useDispatch();
	const clubs = useSelector((state) => getClubNames(state));
	const members = useSelector((state) => getAllMembers(state));

	const [open, setOpen] = useState(false);
	const [selectedClubId, setSelectedClubId] = useState<number | undefined>(
		undefined
	);

	const fetchAllClubs = async () => {
		try {
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/clubs`,
				{
					params: {
						_sort: "name",
						_order: "asc",
					},
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

	const fetchAllMembers = async () => {
		try {
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/members`,
				{
					params: selectedClubId
						? {
								clubId_like: selectedClubId,
								_expand: "club",
								_sort: "id",
								_order: "desc",
						  }
						: { _expand: "club", _sort: "id", _order: "desc" },
				}
			);
			if (result) {
				dispatch(fetchMembers(result));
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	useEffect(() => {
		fetchAllClubs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchAllMembers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedClubId]);

	const takeActionOfData = async (data: any) => {
		// try {
		// 	const formatData = {
		// 		name: data.name,
		// 		avatar: data.avatar,
		// 		dob: data.dob,
		// 		joinedAt: formatDate(new Date()),
		// 		skills: [
		// 			{
		// 				technicalAbility: parseInt(data.technicalAbility),
		// 				mentality: parseInt(data.mentality),
		// 			},
		// 		],
		// 		clubId: clubIdToAddMember,
		// 	};
		// 	const result = await parsePOST(
		// 		`${process.env.REACT_APP_API_ENDPOINT}/members`,
		// 		formatData
		// 	);
		// 	if (result) {
		// 		setOpen(false);
		// 		fetchData();
		// 	}
		// } catch (err) {
		// 	// eslint-disable-next-line no-console
		// 	console.error(err);
		// }
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

				<div>
					<h1 className="font-semibold text-xl leading-10 text-gray-700">
						Discover Members
					</h1>
					<Clubs
						list={clubs}
						selectedClubId={selectedClubId}
						setSelectedClubId={setSelectedClubId}
					/>
				</div>

				<div>
					<MembersTable list={members} />
				</div>
			</div>
		</div>
	);
}

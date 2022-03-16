import { Fragment, useEffect, useRef, useState } from "react";
import { fetchClubs } from "redux/club/club.actions";
import { fetchMembers } from "redux/member/member.actions";
import { parseDELETE, parseGET, parsePUT } from "utils/api";
import SlideOver from "./common/SlideOver";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers, getClubNames } from "redux/selectors";
import {
	TrashIcon,
	PencilIcon,
	ExclamationIcon,
} from "@heroicons/react/outline";
import { formatDate } from "utils/helpers";
import { Transition, Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import {
	MEMBER_TASK_FAIL,
	MEMBER_TASK_LOADING,
	MEMBER_TASK_SUCCESS,
} from "redux/member/member.types";

type ClubsProps = {
	list: { name: string; id: number; avatar: string }[];
	selectedClubId: number | undefined;
	setSelectedClubId: (id: number | undefined) => void;
};

const Clubs = ({ list, selectedClubId, setSelectedClubId }: ClubsProps) => {
	return (
		<div className="flex flex-wrap gap-4 bg-white rounded-3xl p-5 items-center shadow">
			{list.length > 1 && (
				<div
					onClick={() => setSelectedClubId(undefined)}
					className={`text-sm cursor-pointer rounded-full border-2 border-indigo-600 ${
						selectedClubId === undefined
							? `bg-indigo-600 text-white`
							: `text-gray-800`
					} hover:bg-indigo-600 hover:text-white px-3 py-2 font-normal`}
				>
					All Clubs
				</div>
			)}
			{list.map((club, i) => (
				<div
					key={i}
					onClick={() => setSelectedClubId(club.id)}
					className={`text-sm cursor-pointer rounded-full border-2 border-indigo-600 ${
						selectedClubId === club.id
							? `bg-indigo-600 text-white`
							: `text-gray-800`
					} hover:bg-indigo-600 hover:text-white px-3 py-2 font-normal`}
				>
					{club.name}
				</div>
			))}
		</div>
	);
};

type DeleteConfirmationProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	handleDelete: () => void;
};

const DeleteConfirmation = ({
	open,
	setOpen,
	handleDelete,
}: DeleteConfirmationProps) => {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
										<ExclamationIcon
											className="h-6 w-6 text-red-600"
											aria-hidden="true"
										/>
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<Dialog.Title
											as="h3"
											className="text-lg leading-6 font-medium text-gray-900"
										>
											Delete member
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Are you sure you want to delete this member? Once you
												delete, the data will be permanently removed. This
												action cannot be undone.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => handleDelete()}
								>
									Yes, delete
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => setOpen(false)}
									ref={cancelButtonRef}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

type MembersTableProps = {
	list: object[];
	setOpenEdit: (open: boolean) => void;
	setOpenDelete: (open: boolean) => void;
	setSelectedMemberIdToBeEdited: (id: number | undefined) => void;
	setSelectedMemberIdToBeDeleted: (id: number | undefined) => void;
};

const MembersTable = ({
	list,
	setOpenEdit,
	setOpenDelete,
	setSelectedMemberIdToBeEdited,
	setSelectedMemberIdToBeDeleted,
}: MembersTableProps) => {
	const handleAction = (id: number, action: string) => {
		if (action === "edit") {
			setOpenEdit(true);
			setSelectedMemberIdToBeEdited(id);
		} else {
			setOpenDelete(true);
			setSelectedMemberIdToBeDeleted(id);
		}
	};

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
												<div className="flex gap-x-2 items-center">
													<PencilIcon
														className="h-6 w-6 cursor-pointer text-indigo-600 hover:text-indigo-800"
														onClick={() => handleAction(member.id, "edit")}
													/>
													<TrashIcon
														className="h-6 w-6 cursor-pointer text-red-600 hover:text-red-700"
														onClick={() => handleAction(member.id, "delete")}
													/>
												</div>
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

	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedClubId, setSelectedClubId] = useState<number | undefined>(
		undefined
	);
	const [selectedMemberIdToBeEdited, setSelectedMemberIdToBeEdited] = useState<
		number | undefined
	>(undefined);
	const [selectedMemberIdToBeDeleted, setSelectedMemberIdToBeDeleted] =
		useState<number | undefined>(undefined);

	useEffect(() => {
		if (!openEdit) setSelectedMemberIdToBeEdited(undefined);
		if (!openDelete) setSelectedMemberIdToBeDeleted(undefined);
	}, [openEdit, openDelete]);

	const fetchAllClubs = async () => {
		try {
			dispatch({ type: MEMBER_TASK_LOADING });
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/clubs`,
				{
					params: { _embed: "members", _sort: "name", _order: "asc" },
				}
			);
			if (result) {
				dispatch(fetchClubs(result));
				dispatch({ type: MEMBER_TASK_SUCCESS });
			}
		} catch (err) {
			dispatch({ type: MEMBER_TASK_FAIL });
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	const fetchAllMembers = async () => {
		try {
			dispatch({ type: MEMBER_TASK_LOADING });
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
				dispatch({ type: MEMBER_TASK_SUCCESS });
			}
		} catch (err) {
			dispatch({ type: MEMBER_TASK_FAIL });
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
		try {
			dispatch({ type: MEMBER_TASK_LOADING });
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
				clubId: data.clubId,
			};
			const result = await parsePUT(
				`${process.env.REACT_APP_API_ENDPOINT}/members/${selectedMemberIdToBeEdited}`,
				formatData
			);
			if (result) {
				dispatch({ type: MEMBER_TASK_SUCCESS });
				setOpenEdit(false);
				fetchAllMembers();
				toast.success("Successfully updated.");
			}
		} catch (err) {
			dispatch({ type: MEMBER_TASK_FAIL });
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	const proceedDelete = async () => {
		try {
			dispatch({ type: MEMBER_TASK_LOADING });
			const result = await parseDELETE(
				`${process.env.REACT_APP_API_ENDPOINT}/members/${selectedMemberIdToBeDeleted}`
			);
			if (result) {
				dispatch({ type: MEMBER_TASK_SUCCESS });
				setOpenDelete(false);
				fetchAllMembers();
				toast.success("Successfully deleted.");
			}
		} catch (err) {
			dispatch({ type: MEMBER_TASK_FAIL });
			// eslint-disable-next-line no-console
			console.error(err);
			toast.error("Failed to delete!");
		}
	};

	return (
		<div className="max-w-full h-full rounded-xl mx-5">
			<div className="container mx-auto py-10">
				<SlideOver
					open={openEdit}
					setOpen={setOpenEdit}
					title="Edit member"
					description="Proceed by filling in the information below to update a member into this club."
					takeActionOfData={takeActionOfData}
					actionMood="edit"
					selectedMemberId={selectedMemberIdToBeEdited}
					clubs={clubs}
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
					<MembersTable
						list={members}
						setOpenEdit={setOpenEdit}
						setOpenDelete={setOpenDelete}
						setSelectedMemberIdToBeEdited={setSelectedMemberIdToBeEdited}
						setSelectedMemberIdToBeDeleted={setSelectedMemberIdToBeDeleted}
					/>
				</div>

				<DeleteConfirmation
					open={openDelete}
					setOpen={setOpenDelete}
					handleDelete={proceedDelete}
				/>
			</div>
		</div>
	);
}

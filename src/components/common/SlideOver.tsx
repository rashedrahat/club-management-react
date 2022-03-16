import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Input from "./form/Input";
import Label from "./form/Label";
import { Upload } from "upload-js";
import { parseGET } from "utils/api";
import Select from "./form/Select";

const upload = new Upload({ apiKey: "public_12a1xiFAfR4joE1R72ix1S6Ucnsg" });
const initialInputs = {
	name: "",
	avatar:
		"https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE=",
	dob: "",
	technicalAbility: "50",
	mentality: "50",
};
const initialClubData = {
	id: 0,
	name: "",
	avatar: "",
};

type ClubProps = {
	id: number;
	name: string;
	avatar: string;
};

type SlideoverProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	description: string;
	takeActionOfData: (data: any) => void;
	actionMood?: "create" | "edit";
	selectedMemberId?: number | undefined;
	clubs?: ClubProps[];
};

export default function SlideOver({
	open,
	setOpen,
	title,
	description,
	takeActionOfData,
	actionMood = "create",
	selectedMemberId,
	clubs = [],
}: SlideoverProps) {
	const [inputs, setInputs] = useState(initialInputs);
	const [selectedClubItem, setSelectedClubItem] = useState(initialClubData);

	const [fileUploading, setFileUploading] = useState(false);
	const [fileUploadingProgress, setFileUploadingProgess] = useState(0);

	const fetchMember = async () => {
		try {
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/members`,
				{
					params: { id: selectedMemberId, _expand: "club" },
				}
			);
			if (result) {
				setInputs((values) => ({
					...values,
					...{
						name: result[0].name,
						dob: result[0].dob,
						avatar: result[0].avatar,
						technicalAbility: result[0].skills[0].technicalAbility,
						mentality: result[0].skills[1].mentality,
					},
				}));
				setSelectedClubItem((values) => ({
					...values,
					...{
						id: result[0].club.id,
						avatar: result[0].club.imgURL,
						name: result[0].club.name,
					},
				}));
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	useEffect(() => {
		if (open && actionMood === "edit") fetchMember();
	}, [open, actionMood]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const fileHandler = upload.createFileInputHandler({
		onProgress: ({ bytesSent, bytesTotal }) => {
			if (!fileUploading) setFileUploading(true);
			const completion = (bytesSent / bytesTotal) * 100;
			setFileUploadingProgess(Math.round(completion));
		},
		onUploaded: ({ fileUrl }) => {
			setFileUploading(false);
			setInputs((values) => ({ ...values, ...{ avatar: fileUrl } }));
		},
		onError: (error) => {
			setFileUploading(false);
			// eslint-disable-next-line no-console
			console.log(`Error!\n${error.message}`);
		},
	});

	const onSubmithandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		takeActionOfData({ ...inputs, ...{ clubId: selectedClubItem.id } });
		setInputs(initialInputs);
		if (actionMood === "edit") setSelectedClubItem(initialClubData);
	};

	const handleClose = () => {
		setInputs(initialInputs);
		if (actionMood === "edit") setSelectedClubItem(initialClubData);
		setOpen(false);
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 overflow-hidden"
				onClose={handleClose}
			>
				<div className="absolute inset-0 overflow-hidden">
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="pointer-events-auto relative w-screen max-w-md">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-500"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-500"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
										<button
											type="button"
											className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
											onClick={handleClose}
										>
											<span className="sr-only">Close panel</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>
								<div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
									<div className="px-4 sm:px-6 py-6 bg-indigo-600 rounded-b-3xl">
										<Dialog.Title className="text-lg font-medium text-gray-50">
											{" "}
											{title}{" "}
										</Dialog.Title>
										<Dialog.Description className="text-sm font-light text-gray-300">
											{description}
										</Dialog.Description>
									</div>

									<form onSubmit={onSubmithandler}>
										<div className="mt-6 flex flex-col gap-y-6 flex-1 px-4 sm:px-6">
											{actionMood === "edit" && (
												<Select
													label="Assigned club"
													list={clubs}
													selectedItem={selectedClubItem}
													setSelectedItem={setSelectedClubItem}
												/>
											)}
											<div>
												<h6 className="text-xl font-medium text-gray-700">
													Personal information
												</h6>
												<hr />
												<div className="mt-4 flex flex-col gap-y-2">
													<div>
														<Label
															htmlFor={"Name"}
															name={"Full name"}
															className={
																"mb-1 block text-sm font-medium text-gray-600"
															}
														/>
														<Input
															type={"text"}
															name={"name"}
															autoComplete={"on"}
															className={
																"rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															}
															value={inputs.name}
															onChange={(e) => onChangeHandler(e)}
														/>
													</div>

													<div>
														<Label
															htmlFor={"Date of birth"}
															name={"Date of birth"}
															className={
																"mb-1 block text-sm font-medium text-gray-600"
															}
														/>
														<Input
															type={"date"}
															name={"dob"}
															className={
																"rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															}
															value={inputs.dob}
															onChange={(e) => onChangeHandler(e)}
														/>
													</div>

													<div>
														<Label
															htmlFor={"Photo"}
															name={"Photo"}
															className={
																"mb-1 block text-sm font-medium text-gray-600"
															}
														/>
														<div className="mt-1 flex items-center">
															<div
																className="flex justify-center items-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
																style={{
																	backgroundImage: `url(${inputs.avatar})`,
																	backgroundPosition: "center",
																	backgroundRepeat: `no-repeat`,
																	backgroundSize: `cover`,
																}}
															>
																{fileUploading && (
																	<p className="text-sm font-semibold text-indigo-600">
																		{fileUploadingProgress}%
																	</p>
																)}
															</div>
															<div className="flex text-sm text-gray-600">
																<label
																	htmlFor="file-upload"
																	className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
																>
																	<div className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
																		Change
																	</div>
																	<input
																		required={actionMood !== "edit"}
																		accept="image/*"
																		id="file-upload"
																		name="avatar"
																		type="file"
																		className="sr-only"
																		onChange={fileHandler}
																	/>
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div>
												<h6 className="text-xl font-medium text-gray-700">
													Skills
												</h6>
												<hr />
												<div className="mt-4 flex flex-col gap-y-2">
													<div>
														<Label
															htmlFor={"Technical Ability"}
															name={"Technical Ability"}
															className={
																"mb-1 block text-sm font-medium text-gray-600"
															}
														/>
														<Input
															type={"range"}
															name={"technicalAbility"}
															className={"w-full"}
															value={inputs.technicalAbility}
															onChange={(e) => onChangeHandler(e)}
														/>
													</div>

													<div>
														<Label
															htmlFor={"Mentality"}
															name={"Mentality"}
															className={
																"mb-1 block text-sm font-medium text-gray-600"
															}
														/>
														<Input
															type={"range"}
															name={"mentality"}
															className={"w-full"}
															value={inputs.mentality}
															onChange={(e) => onChangeHandler(e)}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="absolute w-full bottom-0 flex justify-end gap-x-4 px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-100">
											<button
												onClick={handleClose}
												type="button"
												className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
											>
												Cancel
											</button>

											<button
												disabled={fileUploading}
												type="submit"
												className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												{actionMood === "create" ? `Add` : `Edit`}
											</button>
										</div>
									</form>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

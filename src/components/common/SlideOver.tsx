import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Input from "./form/Input";
import Label from "./form/Label";

type SlideoverProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	description: string;
};

export default function SlideOver({
	open,
	setOpen,
	title,
	description,
}: SlideoverProps) {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 overflow-hidden"
				onClose={setOpen}
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
											onClick={() => setOpen(false)}
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

									<div className="mt-6 flex flex-col gap-y-6 flex-1 px-4 sm:px-6">
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
														name={"Name"}
														autoComplete={"on"}
														className={
															"rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														}
														value={""}
														onChange={(e) => console.log(e)}
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
														name={"Name"}
														className={
															"rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														}
														value={"16/08/1994"}
														onChange={(e) => console.log(e)}
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
														<span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
															<svg
																className="h-full w-full text-gray-300"
																fill="currentColor"
																viewBox="0 0 24 24"
															>
																<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
															</svg>
														</span>
														<div className="flex text-sm text-gray-600">
															<label
																htmlFor="file-upload"
																className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
															>
																<div className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
																	Change
																</div>
																<input
																	id="file-upload"
																	name="avatar"
																	type="file"
																	className="sr-only"
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
														value={50}
														onChange={(e) => console.log(e)}
													/>
												</div>

												<div>
													<Label
														htmlFor={"mentality"}
														name={"Mentality"}
														className={
															"mb-1 block text-sm font-medium text-gray-600"
														}
													/>
													<Input
														type={"range"}
														name={"mentality"}
														className={"w-full"}
														value={50}
														onChange={(e) => console.log(e)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="flex justify-end gap-x-4 px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-100">
										<button
											onClick={() => setOpen(false)}
											type="button"
											className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
										>
											Cancel
										</button>

										<button
											type="submit"
											className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Add
										</button>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

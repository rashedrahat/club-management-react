import { Link, useLocation } from "react-router-dom";
import { appRoutes } from "utils/routes";
import { useDispatch } from "react-redux";
import { logOut } from "redux/auth/auth.actions";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { classNames } from "utils/helpers";
import toast from "react-hot-toast";

type NavbarProps = {
	auth: { isLoggedIn: boolean; me: { userName: string } | null };
};

const Navbar = ({ auth }: NavbarProps) => {
	const dispatch = useDispatch();
	const location = useLocation();

	const navigation = [
		{
			name: "Clubs",
			href: appRoutes.CLUBS,
			current: location.pathname === appRoutes.CLUBS,
		},
		{
			name: "Members",
			href: appRoutes.MEMBERS,
			current: location.pathname === appRoutes.MEMBERS,
		},
	];

	const handleLogOut = () => {
		dispatch(logOut());
		localStorage.removeItem("loggedInUser");
		toast.success("Successfully logged out.");
	};

	return (
		<div
			className={location.pathname === appRoutes.LOG_IN ? "hidden" : "block"}
		>
			<Disclosure as="nav" className="bg-gray-900 rounded-b-3xl">
				{({ open }) => (
					<>
						<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
							<div className="relative flex items-center justify-between h-16">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
									<div className="flex-shrink-0 flex items-center">
										<img
											className="block lg:hidden h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
											alt="Workflow"
										/>
										<img
											className="hidden lg:block h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
											alt="Workflow"
										/>
									</div>
									<div className="hidden sm:block sm:ml-6">
										<div className="flex space-x-4">
											{auth.isLoggedIn &&
												navigation.map((item) => (
													<Link
														key={item.name}
														to={item.href}
														className={classNames(
															item.current
																? "border-2 border-indigo-500 text-white"
																: "text-gray-300 hover:text-indigo-500",
															"px-3 py-2 rounded-3xl text-sm font-medium"
														)}
														aria-current={item.current ? "page" : undefined}
													>
														{item.name}
													</Link>
												))}
										</div>
									</div>
								</div>
								{auth.isLoggedIn && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
										{/* Profile dropdown */}
										<Menu as="div" className="ml-3 relative">
											<div>
												<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
													<Menu.Item>
														{({ active }) => (
															<Link
																onClick={handleLogOut}
																to="#"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Log out
															</Link>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								)}
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block px-3 py-2 rounded-md text-base font-medium"
										)}
										aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Link>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default Navbar;

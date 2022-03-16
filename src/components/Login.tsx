import { useDispatch } from "react-redux";
import { logIn } from "redux/auth/auth.actions";
import { LockClosedIcon } from "@heroicons/react/solid";
import Input from "components/common/form/Input";
import React, { useEffect, useState } from "react";
import { parseGET } from "utils/api";
import { useHistory } from "react-router-dom";
import { appRoutes } from "utils/routes";

const Login = () => {
	let history = useHistory();

	useEffect(() => {
		const loggedInUser = localStorage.getItem("loggedInUser");
		if (loggedInUser) history.push(appRoutes.CLUBS);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [inputs, setInputs] = useState({ userName: "", password: "" });
	const dispatch = useDispatch();

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const onSubmithandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const result = await parseGET(
				`${process.env.REACT_APP_API_ENDPOINT}/users`,
				{
					params: inputs,
				}
			);
			if (result) {
				const matchedUser = {
					userName: result[0].userName,
					name: result[0].name,
				};
				dispatch(logIn(matchedUser));
				localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
				history.push(appRoutes.CLUBS);
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	};

	return (
		<>
			<div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
					</div>
					<form className="mt-8 space-y-6" onSubmit={onSubmithandler}>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<Input
									type={"text"}
									name={"userName"}
									autoComplete={"on"}
									className={
										"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									}
									placeHolder={"Username"}
									value={inputs?.userName}
									onChange={(e) => onChangeHandler(e)}
								/>
							</div>
							<div>
								<Input
									type={"password"}
									name={"password"}
									className={
										"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									}
									placeHolder={"Password"}
									value={inputs.password}
									onChange={(e) => onChangeHandler(e)}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;

export const getAuthInfo = (state: any) => state.auth;

export const getAllClubs = (state: any) => state.club.list;

export const getClubNames = (state: any) =>
	state.club.list.map((club: any) => {
		return { id: club.id, name: club.name, avatar: club.imgURL };
	});

export const getAllMembers = (state: any) => state.member.list;

export const getLoadingStatus = (state: any) => {
	console.log(state);

	return state.auth.loading || state.club.loading || state.member.loading;
};

export const getAuthInfo = (state: any) => state.auth;

export const getAllClubs = (state: any) => state.club.list;

export const getClubNames = (state: any) =>
	state.club.list.map((club: any) => {
		return { name: club.name, id: club.id };
	});

export const getAllMembers = (state: any) => state.member.list;
